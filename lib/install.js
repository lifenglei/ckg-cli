#!/usr/bin/env node
const which = require('which');
const { exec, findNpm } = require('./cmd');
const chalk = require('chalk');

/**
 * 执行npm install命令, 安装项目依赖.
 */
const run = () => {
  const npm = findNpm();
  exec(which.sync(npm), ['run','dev'], function () {
    console.log(chalk.green(npm + '运行项目'));
  })
};
const autoInstall = () => {
  console.log('查找项目依赖')
  const npm = findNpm();
  exec(which.sync(npm), ['install'], function () {
    console.log(chalk.yellow(npm + '安装完成'));
    run()
  })
};
module.exports = {
  autoInstall,
  run
};
