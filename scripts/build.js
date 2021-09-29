const fn = require('funclib');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const glob = require('glob');
const { execSync } = require('child_process');

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const rootPath = path.resolve(__dirname, '../');
const staticProjs = glob.sync(path.join(rootPath, 'src/*')).map(proj => path.basename(proj));
const submoduleProjs = glob.sync(path.join(rootPath, 'submodules/*')).map(proj => path.basename(proj));
const projectList = submoduleProjs.concat(staticProjs);

inquirer.registerPrompt('search-list', require('inquirer-search-list'));
inquirer.prompt([{
  type: 'search-list',
  name: 'project',
  message: '请选择一个需要打包的项目',
  choices: projectList,
}], {}).then(({ project }) => {
  inquirer.prompt([{
    type: 'confirm',
    name: 'isView',
    message: '是否在浏览器中打开',
  }]).then(({ isView }) => {
    if (staticProjs.includes(project)) {
      execSync(`${npm} run gulp:build -- ${project}${isView ? '' : ' -s'}`, { cwd: rootPath, stdio: 'inherit' });
    } else if (submoduleProjs.includes(project)) {
      const srcPath = path.join(rootPath, `submodules/${project}`);
      const srcDist = path.join(rootPath, `submodules/${project}/dist`);
      const distPath = path.join(rootPath, `docs/${project}`);
      if (fs.existsSync(srcDist)) {
        execSync(`git pull --reb`, { cwd: srcPath, stdio: 'inherit' });
        fn.rm(distPath);
        fn.timeout(500, () => {
          fn.cp(srcDist, distPath, true);
          fn.timeout(() => {
            if (isView) {
              execSync(`${npm} run gulp:preview -- ${project}`, { cwd: rootPath, stdio: 'inherit' });
            } else {
              fn.log(`Build project "${project}" success!`, 'Build');
            }
          }, 500);
        });
      }
    }
  });
});
