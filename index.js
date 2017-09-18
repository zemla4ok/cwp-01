var fs = require('fs');
const DIR_PATH = process.argv[2];

fs.appendFile(`${DIR_PATH}\\summary.js`, 'my file');