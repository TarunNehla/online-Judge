const {exec} = require('child_process')
const fs = require('fs').promises; // Use the promise-based version of the fs module
const path = require('path');


const executeFile = async (filePath) => {
    const folderPath = path.join(__dirname, 'output');
    try {
        await fs.access(folderPath);
    } catch {
        await fs.mkdir(folderPath);
    }
    const fileName = path.basename(filePath).split('.')[0];
    const outPath = path.join(folderPath, fileName + '.exe');
    return new Promise((resolve, reject) => {
        exec(`g++ ${filePath} -o ${outPath} && ${outPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                reject({success: false, message: error});
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            resolve({success: true, message: stdout});
        });
    });
};


module.exports = executeFile;