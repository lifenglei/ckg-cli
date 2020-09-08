#!/usr/bin/env node
const {promisify} = require('util')
const ora = require('ora')
const chalk = require('chalk');
/**
 * 从git仓库上下载项目到本地
 * @param { string } repo git仓库地址
 * @param { string } desc 本地路径
 */
const clone = async function (repo, desc) {
  console.log(repo,desc)
    //包装为promise方法
    const download = promisify(require('download-git-repo'))
    //显示下载进度
    const snip = ora('正在拉取模板，🍵...')
    snip.start()
    try{
        await download(repo,desc)
        snip.succeed()
    }catch(err){
        console.log('    ','----------------------------------------')
        console.log('    ',chalk('x构建失败'), err.message);
        process.exit(0);
        // process.fail(err.message)
    }
}
module.exports={
    clone
}
