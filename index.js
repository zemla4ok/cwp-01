var fs = require('fs');
const DIR_PATH = process.argv[2];

(() => {
    let fl = true;
    fs.access(DIR_PATH, (err) => {
            if (err) {
                console.log(err);
                console.log("Path error");
            }
            else {
                fs.appendFile(`${DIR_PATH}\\summary.js`, 'my file');
            }
        }
    )
});

