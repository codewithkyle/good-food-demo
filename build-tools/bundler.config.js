const glob = require("glob");
const fs = require('fs');
const rimraf = require("rimraf");
const chalk = require('chalk');

/** Remove scripts dir */
if(fs.existsSync('./docs/assets/scripts')){
    rimraf.sync('./docs/assets/scripts');
}

/** Generate new empty scripts dir */
fs.mkdir(`docs/assets/scripts`, (err)=>{
    if(err){
        console.log(chalk.red(`Failed to make scripts directory`));
        return;
    }

    cloneFiles();
});


function cloneFiles(){
    const transpiledJavaScriptFiles = glob.sync('./_compiled/**/*.js');
    const files = [...transpiledJavaScriptFiles];

    if(files.length){
        for(let i = 0; i < files.length; i++){
            const filename = getFilename(files[i]);
            
            fs.copyFile(`${  files[i] }`, `docs/assets/scripts/${ filename }.js`, (err)=>{
                if(err){
                    console.log(chalk.red(`Failed to move ${ files[i] } to the script with the name ${ filename }`));
                    return;
                }
            });
        }
    }
}

function getFilename(file){
    let filename = file.match(/[^/]+$/g)[0];
    filename = filename.replace('.js', '');
    filename = toKebabCase(filename);
    return filename;
}

function toKebabCase(str){
    return  str
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map(x => x.toLowerCase())
            .join('-');
}