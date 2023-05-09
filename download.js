import download from 'download-git-repo';
import ora from 'ora';
import shell from 'child_process'
import fs from 'fs'
import ejs from 'ejs'
const repo = "https://github.com/dengshaomin/AndroidSampleCLI";
async function handleDownload(projectName,packageName){
    const packageNamePath = packageName.replace(/\./g, '/');
    const loading = ora('start download template').start();
    //adb拉取git项目
    shell.exec(`git clone ${repo}`,(error,stdout,stderr)=>{
        if(error){
            loading.fail('download template fail');
        }else{
            //重命名projectName
            fs.renameSync('AndroidSampleCLI',`${projectName}`)
            //重命名packageName
            fs.renameSync(`${projectName}/app/src/main/java/com/android/sample`,`${projectName}/app/src/main/java/${packageNamePath}`)
            //移除git隐藏文件
            fs.rm(`${projectName}/.git`, { recursive: true }, (err) => {
                if (err) {
                    loading.fail('download template fail');
                } else {
                    try{
                        const tmpData = {"packageName" : `${packageName}`,"projectName":`${projectName}`};
                        //修改模板文件的projectName和packageName
                        var filePaths = [`${projectName}/build.gradle`,`${projectName}/app/src/main/res/values/strings.xml`,`${projectName}/app/src/main/java/${packageNamePath}/MainActivity.kt`,`${projectName}/settings.gradle`];
                        filePaths.forEach((path,index)=>{
                            ejs.renderFile(path,tmpData).then(data =>{
                                fs.writeFileSync(path,data)
                            });
                        });
                        loading.succeed('download template success');
                    }catch(err){
                        loading.fail('download template fail');
                    }
                }
              });
            
        }
    });
    
};
export {handleDownload}