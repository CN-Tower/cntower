const fn = require('funclib');
const path = require('path');
const gulp = require('gulp');
const rev = require('gulp-rev');
const revAll = require('gulp-rev-all');
const clean = require('gulp-clean');
const less = require('gulp-less');
const glob = require('glob');
const merge = require('merge-stream');
const execSync = require('child_process').execSync;
const browserSync = require('browser-sync').create();
const LessAutoprefix = require('less-plugin-autoprefix');

const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
const proj = process.argv[4];
const isShowLog = process.argv[5];
const rootPath = path.resolve(__dirname);
const projects = glob.sync(path.join(rootPath, 'src/*')).map(proj => path.basename(proj));
const submoduleProjs = glob.sync(path.join(rootPath, 'submodules/*')).map(proj => path.basename(proj));
const projectConfig = getProjectConf();
const excludes = getExcludes();
const noobTask = done => done();

let project = ''
   ,projPath = ''
   ,projSrc = ''
   ,distPath = ''
   ,excludeSrcs = []
   ,excludeSrcIgs = []
   ,distRev = '';

/**
 * =================================================================================
 * Gulp 任务定义
 * =================================================================================
 */
/**
 * 获取目标项目信息
 * @param {*} proj 
 * @returns 
 */
function getTargetProject(proj) {
  if (proj) {
    if (submoduleProjs.includes(proj)) {
      project = proj;
      return distPath = `./docs`;
    } else {
      for (let i = 0; i < projects.length; i++) {
        if (projects[i].toLowerCase().startsWith(proj.toLowerCase())) {
          project = projects[i];
          projPath = `./src/${project}`;
          projSrc = `${projPath}/**`;
          distRev = `./rev/${project}`;
          distPath = project === 'cntower' ? './docs' : `./docs/${project}`;
          const porjConf = projectConfig[project];
          if (porjConf) porjConf.excImages.forEach(ex => excludes.push(ex));
          excludeSrcs = excludes.map(lib => `${projPath + lib}`);
          excludeSrcIgs = excludeSrcs.map(src => `!${src}`);
          return;
        }
      }
    }
  }
  project = projPath = projSrc = libPath = distPath = '';
}
getTargetProject(proj);

/**
 * 打包前清理
 */
gulp.task('clean', () => {
  if (project == 'cntower') {
    return gulp.src(['./docs/cntower', './docs/index.html'], { allowEmpty: true }).pipe(clean());
  } else {
    return gulp.src(distPath, { allowEmpty: true }).pipe(clean());
  }
});

/**
 * Less编译
 */
gulp.task('less', () => {
  return gulp.src('./src/css/*.less')
    .pipe(less({ plugins: [autoprefix] }))
    .pipe(gulp.dest('./src/css'));
});

/**
 * 给项目文件加哈希后缀
 */
gulp.task('revProject', () => {
  return gulp.src([projSrc, ...excludeSrcIgs])
    .pipe(revAll.revision({
      dontRenameFile: [/favicon.ico/g, /index.html/g],
      transformFilename: (file, hash) => {
        if (['index.html', 'favicon.ico'].some(fl => fn.contains(file.path, fl))) {
          return path.basename(file.path);
        }
        const ext = path.extname(file.path);
        return path.basename(file.path, ext) + '-' + hash.substr(0, 12) + ext;
      }
    }))
    .pipe(gulp.dest(distPath))
    .pipe(rev.manifest())
    .pipe(gulp.dest(distRev));;
});

/**
 * 处理Js中引用文件的哈希后缀
 */
gulp.task('revJs', done => {
  const revJsConf = projectConfig[project] || {};
  const revManifest = require(`./rev/${project}/rev-manifest.json`);
  if (revJsConf.isRevJs) {
    revJsConf.distJsPaths.forEach(distJsPath => {
      glob(distJsPath, (err, fds) => {
        fds.forEach(fd => {
          let distJsStr = fn.rd(fd);
          revJsConf.srcDirs.forEach(dir => {
            fn.forIn(revManifest, (revKey, revVal) => {
              if (revKey.startsWith(dir) || revKey.startsWith(dir.replace(/^\//, ''))) {
                const fiSrcName = '/' + path.parse(revKey).base;
                const fiDistName = '/' + path.parse(revVal).base;
                distJsStr = distJsStr.replace(new RegExp(fiSrcName, 'mg'), fiDistName);
              }
            });
          });
          revJsConf.srcFiles.forEach(fi => {
            const fiSrcName = path.parse(fi).base;
            const fiDistName = path.parse(revManifest[fi]).base;
            distJsStr = distJsStr.replace(new RegExp(fiSrcName, 'mg'), fiDistName);
          });
          fn.wt(fd, distJsStr);
        });
      });
    });
  }
  done();
});

/**
 * 拷贝排除文件到目标目录
 */
gulp.task('cpExcludes', () => merge(...excludeSrcs.map((lib, i) => {
  const file = excludes[i].replace(/\/\*(\*)?/mg, '');
  const dist = distPath + (path.parse(file).ext ? path.dirname(file) : file);
  return gulp.src(lib, { allowEmpty: true }).pipe(gulp.dest(dist));
})));

/**
 * 刷新页面
 */
gulp.task('reload', done => {
  browserSync.reload();
  done();
});

/**
 * 监听Src项目目录
 */
gulp.task('watch', () => gulp.watch(projSrc, gulp.series('less', 'reload')));

/**
 * 启动Src中的项目
 */
gulp.task('start', done => {
  browserSync.init({ server: projPath, port: 8081 });
  done();
});

/**
 * 启动打包后的项目
 */
gulp.task('startDist', done => {
  browserSync.init({ server: distPath, port: 8082 });
  done();
});

/**
 * 打印打包信息
 */
gulp.task('logInfo', (() => {
  if (isShowLog !== '-s') return gulp.series('startDist');
  return done => {
    fn.timeout(() => fn.log('Build Success', '# Gulp'), 500);
    done();
  };
})());

/**
 * =================================================================================
 * 入口任务定义
 * =================================================================================
 */
/**
 * 启动项目的任务
 */
gulp.task('run', project ? gulp.parallel('less', 'start', 'watch') : noobTask);

/**
 * 预览打包后的项目
 * @returns 
 */
gulp.task('preview', done => {
  if (project) {
    browserSync.init({ server: distPath, port: 8082, startPath: project });
  }
  done();
});

/**
 * 打包项目的任务
 */
gulp.task('build', (() => {
  if (proj !== 'all') {    
    if (project) {
      return gulp.series('clean', 'less', 'revProject', 'cpExcludes', 'revJs', 'logInfo');
    }
  } else {
    projects.forEach(pj => {
      console.log(`[${fn.chalk(fn.fmtDate('hh:mm:ss', new Date()), 'grey')}] Starting 'build' ${fn.chalk(pj, 'blue')}`);
      execSync(`gulp build -p ${pj} -s`);
      console.log(`[${fn.chalk(fn.fmtDate('hh:mm:ss', new Date()), 'grey')}] Finished 'build' ${fn.chalk(pj, 'blue')}`);
    });
  }
  return noobTask;
})());

/**
 * =================================================================================
 * Gulp 项目配置
 * =================================================================================
 */
/**
 * 项目基本配置
 * @returns 
 */
function getProjectConf() {
  return {
    'resume': {
      isRevJs: true,
      srcDirs: [
        '/img'
      ],
      srcFiles: [ ],
      distJsPaths: [
        './docs/resume/js/*.js'
      ],
      excImages: [ ]
    },
    'gallery': {
      isRevJs: true,
      srcDirs: [
        '/img'
      ],
      srcFiles: [ ],
      distJsPaths: [
        './docs/gallery/js/*.js'
      ],
      excImages: [ ]
    },
    'webfoss': {
      isRevJs: true,
      srcDirs: [ ],
      srcFiles: [ ],
      distJsPaths: [
        './docs/webfoss/js/*.js'
      ],
      excImages: [
        '/img/**',
      ]
    }
  };
}

/**
 * Rev排除设置
 * @returns 
 */
function getExcludes() {
  return [
    '/lib/**/*',
    '/js/lib/**/*',
    '/font/**/*',
    '/files/**/*',
    '/less/**/*',
    '/cntower/lib/**/*',
    '/css/normalize.css',
    '/css/animate.css',
    '/css/animate.min.css',
    '/css/font-awesome.css',
    '/css/font-awesome.min.css',
    '/css/bootstrap.min.css',
    '/js/html5shiv.js',
    '/js/html5shiv.min.js',
    '/js/respond.min.js',
    '/js/modernizr-2.8.3.min.js',
    '/js/wow.min.js',
    '/js/funclib.min.js',
    '/js/bootstrap.min.js',
    '/js/jquery.js',
    '/js/jquery.min.js',
    '/js/jquery.color.js',
    '/js/jquery.prettyPhoto.js',
    '/js/jquery.isotope.min.js',
    '/js/jquery-1.8.2.min.js',
    '/js/jquery-3.3.1.min.js',
    '/js/jquery.rotate.min.js',
    '/js/jquery.nav.js',
  ];
}