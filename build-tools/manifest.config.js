const glob = require("glob");
const fs = require('fs');
const rimraf = require("rimraf");
const chalk = require('chalk');

/** Remove scripts dir */
if(fs.existsSync('./docs/assets/manifests')){
    rimraf.sync('./docs/assets/manifests');
}

/** Generate new empty scripts dir */
fs.mkdir(`docs/assets/manifests`, (err)=>{
    if(err){
        console.log(chalk.red(`Failed to make manifests directory`));
        return;
    }

    cloneFiles();
});


function cloneFiles(){
    const manifestFiles = glob.sync('./docs/**/*.json');
    const files = [...manifestFiles];

    if(files.length){
        for(let i = 0; i < files.length; i++){
            const filename = getFilename(files[i]);
            
            fs.copyFile(`${  files[i] }`, `docs/assets/manifests/${ filename }.json`, (err)=>{
                if(err){
                    console.log(chalk.red(`Failed to move ${ files[i] } to the manifest with the name ${ filename }`));
                    return;
                }
            });
        }
    }
}

function getFilename(file){
    let filename = file.match(/[^/]+$/g)[0];
    filename = filename.replace('.json', '');
    filename = toKebabCase(filename);
    return filename;
}

function toKebabCase(str){
    return  str
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map(x => x.toLowerCase())
            .join('-');
}

 /**
  * TODO: copy all the manifest files into the `assets/manifests` folder with a lower kebab-case name.
  */