var fs = require('fs');

const DIR_PATH = process.argv[2];

let myScriptForSummary =
    'const fs = require(\'fs\');\n' +
    'const path = require(\'path\');\n' +
    '\n' +
    '(function getFiles(baseDir) {\n' +
    '    fs.readdir(baseDir, function (err, files){\n' +
    '        for (let i in files) {\n' +
    '            let currentDir = baseDir + path.sep + files[i];\n' +
    '            fs.stat(currentDir, (err, stats) => {\n' +
    '                    if (stats.isDirectory()) {\n' +
    '                        getFiles(currentDir);\n' +
    '                    } else {\n' +
    '                        console.log(path.relative(__dirname, currentDir));\n' +
    '                    }\n' +
    '                }\n' +
    '            );\n' +
    '        }\n' +
    '    });\n' +
    '})(__dirname, null);';

(() => {
    fs.access(DIR_PATH, (err) => {
            if (err) {
                console.log(err);
                console.log("Path error");
            }
            else {
                console.log("great");
                createSummaryScript();
            }
        }
    )
})();

function createSummaryScript() {
    fs.appendFile(`${DIR_PATH}\\summary.js`, myScriptForSummary, (err) => {
        if (err) {
            console.log(err);
            console.log('Error in appending file');
        }
    });
}