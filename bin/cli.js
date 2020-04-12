#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const inquirer = require('inquirer');
const { updateFile } = require('../lib/file');
const { autoInstall } = require('../lib/install');
const {tempList} = require('../lib/list')
const symbols = require('log-symbols');
const chalk = require('chalk');
const fs = require('fs');
const {delDir} = require('../lib/deldir')

// 定义和用户交互时的questions
const prompt = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'author',
      message: '请输入作者的名称'
    },
    {
      type: 'input',
      name: 'repository',
      message: '请输入GitHub的项目地址'
    },
    {
      type:'list',
      name:'choice',
      message:'请选择要开发的项目',
      choices:[
        'duan-admin-pc',
        'duan-mobile'
      ]
    },
    {
      type: 'confirm',
      name: 'isOk',
      message: '请确认输入是否ok?'
    }
  ])
};

program
  .version(require('../package.json').version, '-v, --version');

program
  .command('create <ProjectName>')
  .description('创建一个新项目')
  .action((projectName) => {
    prompt().then(async (results) => {
      const { author, repository,choice, isOk } = results;
      console.log(choice)
      if (!isOk) {
        return;
      }
      if(!fs.existsSync(projectName)){
        // 1. clone git项目
        const { clone } = require('../lib/download');
        console.log('🚀创建项目: ' + projectName);

        await clone(`github.com:lifenglei/${choice}`, projectName);
        console.log(symbols.success,chalk.green(`项目${projectName}创建成功`));
        // 2. 同步package.json的配置.
        const packageJson = path.join(path.resolve(projectName), 'package.json');
        const repositoryObj = repository ? {
          type: "git",
          url: repository
        } : {};
        updateFile(packageJson, {
          name: projectName,
          author,
          repository: repositoryObj
        });
        // 3. 自动安装依赖
        console.log(chalk.red('安装依赖🔥...'))
        //4. 将node工作目录更改成构建的项目根目录下
        const projectPath = path.resolve(projectName);
        process.chdir(projectPath);
        // 执行安装命令
        autoInstall();
      }
    });
  })

program.command('list')
.description('显示要使用的项目模板')
.alias('ls')
.action(()=>{
  tempList()
})
program.parse(process.argv);
if(program.args.length===0){
  program.help()
}
