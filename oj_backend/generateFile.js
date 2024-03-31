const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises; // Ensure you're using the Promise-based version of 'fs'
const path = require('path');

const generateCodeFile = async (problemId, language, code) => {
  if (!code) {
    throw new Error('No code provided to save.');
  }

  // Define the path to the folder where code files will be saved
  const folderPath = path.join(__dirname, 'codes');

  // Check if the folder exists, create it if not
  try {
    await fs.access(folderPath);
  } catch {
    await fs.mkdir(folderPath);
  }

  // Generate a unique file name using UUID and the provided language extension
  const fileName = `${uuidv4()}.${language}`;
  const filePath = path.join(folderPath, fileName);

  // Write the code to the file and handle any errors
  try {
    await fs.writeFile(filePath, code);
    return { success: true, message: `Code file "${fileName}" saved successfully.`, path : filePath };
  } catch (err) {
    console.error('Error saving code file:', err);
    throw new Error(`Failed to save code file: ${err.message}`); // Provide a clearer error message
  }
};

module.exports = generateCodeFile; // Export the function for use in other parts of your application
