var fs = require('fs');
var path = require('path');

const DIR_PATH = process.argv[2];
const EXTENSION = '*.txt';

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
let copyright;

(() => {
    fs.access(DIR_PATH, (err) => {
            if (err) {
                console.log(err);
                console.log("Path error");
            }
            else {
                let dirPath = createDirForTXT();
                createSummaryScript();
                setCopyright();
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

function setCopyright() {
    fs.readFile("config.json", (err, data) => {
        if (err) {
            console.log(err);
            console.log("error in config.json")
            copyright = 'null';
        }
        else {
            copyright = JSON.parse(data);
        }
    })
}

function createDirForTXT() {
    let dir = `${DIR_PATH}\\${path.basename(DIR_PATH)}`;
    fs.mkdir(dir, (err) => {
        if (err) {
            console.log(err);
            console.log("error in creatind directory for *.txt files");
            throw  err;
        }
    });
    return dir;
}

function copyTXT(dir, dirOfTXTFiles) {
    fs.readdir(dir, function (err, files) {
        if (err)
            console.log(err);
        else {
            for(let file in files){
                let currentFile = `${dir}\\${files[file]}`;
                if(fs.stat(currentFile).isDirectory()){
                    copyTXT(currentFile, dirOfTXTFiles);
                }
                else{
                    if(path.extname(currentFile) === EXTENSION){
                        fs.readFile(currentFile, 'utf8', (err, data) => {
                            if(err){
                                console.log(err);
                                console.log(`can't read file ${currentFile}`);
                            }
                            else{

                            }
                        })
                    }
                }
            }
        }
    })
}

function addCopyright(path, data) {
    let text = copyright["copyright"] + data + copyright["copyright"];
    fs.appendFile(path, text, 'utf8', (err) => {
        if(err){
            console.log(err);
            console.log("error in adding copyright");
        }
    })
}