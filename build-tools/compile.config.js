const rimraf = require("rimraf");
const fs = require('fs');

if(fs.existsSync('./docs/assets/scripts')){
    rimraf.sync('./docs/assets/scripts');
}
