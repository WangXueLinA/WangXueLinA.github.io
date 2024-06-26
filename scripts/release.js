/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/await-thenable */
const glob = require('glob');
const inquirer = require('inquirer');
const cp = require('child_process');
const { resolve } = require('./utils');

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const lerna = process.platform === 'win32' ? 'lerna.cmd' : 'npm';

const choices = glob.sync(resolve('./packages/*/package.json')).map((p) => ({
  name: require(p).name,
}));
const publish = async ({ name }) => {
  await cp.spawnSync(npm, ['publish'], {
    stdio: 'inherit',
    cwd: resolve(`./packages/${name.replace('@xuelinw/', '')}`),
  });
};
inquirer
  .prompt([
    {
      type: 'checkbox',
      message: '请选择要发布的模块(可多选)',
      name: 'modules',
      choices,
    },
  ])
  .then(async ({ modules }) => {
    if (modules.length === choices.length) {
      await cp.spawnSync(lerna, ['run', 'publish'], {
        stdio: 'inherit',
      });
    } else {
      choices.forEach(publish);
    }
  });
