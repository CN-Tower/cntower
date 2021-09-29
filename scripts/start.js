const path = require('path');
const inquirer = require('inquirer');
const glob = require('glob');
const { execSync } = require('child_process');

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const rootPath = path.resolve(__dirname, '../');
const staticProjs = glob.sync(path.join(rootPath, 'src/*')).map(proj => path.basename(proj));

inquirer.registerPrompt('search-list', require('inquirer-search-list'));
inquirer.prompt([{
  type: 'search-list',
  name: 'project',
  message: `请选择一个启动项目`,
  choices: staticProjs,
}], {}).then(({ project }) => {
  execSync(`${npm} run gulp:start -- ${project}`, { cwd: rootPath, stdio: 'inherit' });
});
