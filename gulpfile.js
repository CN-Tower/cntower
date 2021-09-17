const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');
const rev = require('gulp-rev');
const revAll = require('gulp-rev-all');
const clean = require('gulp-clean');
const fn = require('funclib');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
const execSync = require('child_process').execSync;
const buildLangArt = require('./scripts/langart.js');

const proj = process.argv[4];
const isShowLog = process.argv[5];

let project = ''
   ,projPath = ''
   ,projSrc = ''
   ,distPath = ''
   ,excludeSrcs = ''
   ,excludeSrcIgs = ''
   ,distRev = '';

const projects = [
  'btdemo', 'cntower', 'gallery', 'iishadow', 'resume', 'shootgame', 'toolkit', 'vfarm', 'webfoss'
];

const excludes = [
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

const projectConfig = {
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
}

function getTargetProject(proj) {
  if (proj) {
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
  project = projPath = projSrc = libPath = distPath = '';
}

/**
 * gulp run
 * ===================================================
 */
gulp.task('run', () => {
  getTargetProject(proj);
  if (project) runSequence('less', 'start', 'watch');
});

gulp.task('start', () => browserSync.init({
  server: projPath,
  port: 8081
}));

gulp.task('startDist', () => browserSync.init({
  server: distPath,
  port: 8082
}));

gulp.task('reload', () => {
  return browserSync.reload();
});

gulp.task('watch', () => gulp.watch(projSrc, () => runSequence('less', 'reload')));

// gulp build
gulp.task('build', () => {
  if (proj === 'langart') {
    return buildLangArt();
  }
  if (proj !== 'all') {    
    getTargetProject(proj);
    if (project) {
      runSequence('clean', 'less', 'revProject', 'cpExcludes', 'revJs', 'logInfo');
    }
  } else {
    projects.forEach(pj => {
      console.log(`[${fn.chalk(fn.fmtDate('hh:mm:ss', new Date()), 'grey')}] Starting 'build' ${fn.chalk(pj, 'blue')}`);
      execSync(`gulp build -p ${pj} -s`);
      console.log(`[${fn.chalk(fn.fmtDate('hh:mm:ss', new Date()), 'grey')}] Finished 'build' ${fn.chalk(pj, 'blue')}`);
    });
  }
});

/**
 * rev static files
 * ===================================================
 */
gulp.task('clean', () => {
  if (project == 'cntower') {
    return gulp.src(['./docs/cntower', './docs/index.html']).pipe(clean());
  } else {
    return gulp.src(distPath).pipe(clean());
  }
});

gulp.task('less', () => {
  return gulp.src('./src/css/*.less')
    .pipe(less({ plugins: [autoprefix] }))
    .pipe(gulp.dest('./src/css'));
});

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

gulp.task('revJs', () => {
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
});

gulp.task('cpExcludes', () => {
  excludeSrcs.forEach((lib, i) => {
    const file = excludes[i].replace(/\/\*(\*)?/mg, '');
    const dist = distPath + (path.parse(file).ext ? path.dirname(file) : file);
    gulp.src(lib).pipe(gulp.dest(dist));
  });
});

gulp.task('logInfo', () => {
  fn.defer(() => fn.log('Build Success', '# Gulp'));
  if (isShowLog !== '-s') runSequence('startDist');
});