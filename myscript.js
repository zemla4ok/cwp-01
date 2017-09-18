const fs = require('fs');
const path = require('path');

(function getFiles(baseDir) {
    fs.readdir(baseDir, function (err, files) {
        for (let i in files) {
            let currentDir = baseDir + path.sep + files[i];
            fs.stat(currentDir, (err, stats) => {
                    if (stats.isDirectory()) {
                        getFiles(currentDir);
                    } else {
                        console.log(path.relative(__dirname, currentDir));
                    }
                }
            );
        }
    });
})(__dirname, null);