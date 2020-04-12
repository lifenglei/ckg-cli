#!/usr/bin/env node
const chalk = require('chalk');
const fs = require('fs-extra');

/**
 * 更新文件内容.
 * @param {String} filePath 
 * @param {Object} contents 
 */
const updateFile = (filePath, contents) => {
  if(fs.existsSync(filePath)){
    const fileContent = Object.assign({}, require(filePath), contents);
    fs.writeJSONSync(filePath, fileContent, { spaces: '\t' });
  } else{
    throw new Error(chalk.red(`${filePath}不存在`));
  }
};

module.exports = {
  updateFile
}