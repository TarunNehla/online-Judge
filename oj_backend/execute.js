const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

const executeFile = async (filePath, problemId) => {
    const inputFolderPath = path.join(__dirname, 'input');
    const outputFolderPath = path.join(__dirname, 'answer');
    const inputFile = path.join(inputFolderPath, `${problemId}.txt`);
    const outputFile = path.join(outputFolderPath, `${problemId}.txt`);

    try {
        const inputData = await fs.readFile(inputFile, 'utf-8');
        const folderPath = path.join(__dirname, 'output');
        try {
            await fs.access(folderPath);
        } catch {
            await fs.mkdir(folderPath);
        }
        const fileName = path.basename(filePath).split('.')[0];
        const outPath = path.join(folderPath, fileName + '.exe');
        return new Promise((resolve, reject) => {
            exec(`g++ ${filePath} -o ${outPath} && ${outPath} < ${inputFile}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    reject({ success: false, message: error });
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);

                // Compare output with expected output
                fs.readFile(outputFile, 'utf-8')
                    .then((expectedOutput) => {
                        if (stdout.trim() === expectedOutput.trim()) {
                            resolve({ success: true, message: 'Output matches expected output.' });
                        } else {
                            reject({ success: false, message: 'Output does not match expected output.' });
                        }
                    })
                    .catch((err) => {
                        reject({ success: false, message: 'Error reading expected output file.' });
                    });
            });
        });
    } catch (err) {
        console.error('Error reading input file:', err);
        throw err;
    }
};

module.exports = executeFile;
