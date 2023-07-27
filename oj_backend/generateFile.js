// generateFile.js
const fs = require('fs');
const path = require('path');

const generateCodeFile = (email, problemId, language, code) => {
  const folderPath = path.join(__dirname, 'codes');
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  const fileName = `${email}_${problemId}.${language}`;
  const filePath = path.join(folderPath, fileName);

  fs.writeFile(filePath, code, (err) => {
    if (err) {
      console.error('Error saving code file:', err);
    } else {
      console.log(`Code file "${fileName}" saved successfully.`);
    }
  });
};

module.exports = generateCodeFile;
