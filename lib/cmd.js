#!/usr/bin/env node
const childProcess = require('child_process')
const which = require('which')
const chalk = require('chalk')
/**
 * 
 * 查找系统中用于安装依赖的命令
 */
function findNpm() {
    const npms = [ 'cnpm', 'npm','yarn'];
    for (let i = 0; i < npms.length; i++) {
      try {
        // 查找环境变量下指定的可执行文件的第一个实例
        which.sync(npms[i]);
        return npms[i]
      } catch (e) {
      }
    }
    throw new Error(chalk.red('请安装npm'));
  }
  function exec(cmd,args,fn){
      args = args||[]
      const runner = childProcess.spawn(cmd,args,{
          stdio:'inherit'
      })
      runner.on('close',function(code){
          if(fn){
              fn(code)
          }
      })
  }
  module.exports={
    findNpm,
    exec
  }