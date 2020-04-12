#!/usr/bin/env node
const fs = require('fs');
function delDir(path){
    let files = []
    if(fs.existsSync(path)){
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            //读取文件信息
            let stats = fs.statSync(curPath)
            if(stats.isFile()){
                fs.unlinkSync(curPath); 
            }else{
                delDir(curPath)
            }
        });
        //删除空文件夹
        fs.rmdirSync(path);
    }
}
module.exports={
    delDir
}