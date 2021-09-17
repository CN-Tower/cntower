const fn = require('funclib');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootPath = path.resolve(__dirname, '../');
const srcPath = path.join(rootPath, 'langart/dist');
const distPath = path.join(rootPath, 'docs/langart');

module.exports = function buildLangArt() {
  execSync(`git pull --reb`, { cwd: path.join(rootPath, 'langart') });
  if (fs.existsSync(srcPath)) {
    fn.rm(distPath);
    fn.timeout(500, () => {
      fn.cp(srcPath, distPath, true);
      fn.log('Build project `Langart` success!', 'Gulp Build');
    });
  }
}
