const inquirer = require('inquirer');
const fs = require('fs-extra');
const ejs = require('ejs');
const { resolve } = require('./utils');
const cp = require('child_process');
var glob = require('glob');

const promptList = [
  {
    type: 'input',
    message: '请输入模块名称:',
    name: 'name',
    validate(val) {
      if (val) return true;
      return '请输入模块名称';
    },
  },
  {
    type: 'input',
    message: '请输入模块描述',
    name: 'description',
    validate(val) {
      if (val) return true;
      return '请输入模块描述';
    },
  },
  {
    type: 'input',
    message: '维护者',
    name: 'author',
    validate(val) {
      if (val) return true;
      return '请输入维护者';
    },
  },
];

inquirer.prompt(promptList).then(async (data) => {
  await Promise.all(
    glob.sync(resolve('./template/**'), { nodir: true }).map((p) => {
      const outPutPath = p.replace('/template/', `/packages/${data.name}/`);
      return fs.outputFile(
        outPutPath,
        ejs.render(fs.readFileSync(p).toString(), data),
      );
    }),
  );

  const lerna = process.platform === 'win32' ? 'lerna.cmd' : 'lerna';
  cp.spawn(lerna, ['bootstrap', '--use-workspaces'], { stdio: 'inherit' });
});
