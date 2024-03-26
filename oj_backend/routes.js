// routes.js
const express = require('express');
const User = require('./userModel').User;
const Plist = require('./userModel').Plist;
const router = express.Router();
const generateCodeFile = require('./generateFile');

router.post('/register', async (req, res) => {
    const {
        registerName,
        registerEmail,
        registerPassword
      } = req.body;
      if (!registerName || !registerEmail || !registerPassword) {
        return res.status(400).json({
          message: 'All fields are required.'
        });
      }
    
      try {
        // Check if the email is already registered
        const existingUser = await User.findOne({
          registerEmail
        });
    
        if (existingUser) {
          return res.status(409).json({
            message: 'Email is already registered.'
          });
        }
    
        // Create a new user document and save it to the database
        const newUser = new User({
          registerName,
          registerEmail,
          registerPassword,
        });
        await newUser.save();
    
        return res.status(201).json({
          message: 'User registered successfully.'
        });
      } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({
          message: 'Internal server error.'
        });
      }
});

router.post('/login', async (req, res) => {
    const { loginEmail, loginPassword } = req.body;
    if (!loginEmail || !loginPassword) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
  
    try {
      // Find the user document with the matching email
      const user = await User.findOne({ registerEmail: loginEmail });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
  
      // Check if the password matches the one stored in the database
      if (user.registerPassword !== loginPassword) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
  
      // In a real application, you might use a JWT (JSON Web Token) for authentication and send it back as a response.
  
      return res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
      console.error('Error logging in user:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
});

router.get('/api/plist', async (req, res) => {
  try {
    // Fetch all documents from the 'plist' collection
    const data = await Plist.find();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from the database:', error);

    // Send a detailed error response with status code 500 and error message
    res.status(500).json({ error: 'Error fetching data from the database', details: error.message });
  }
})

router.post('/generateCodeFile', (req, res) => {
  const { problemId, language, code } = req.body;
  generateCodeFile(problemId, language, code);
  res.status(200).json({ message: 'Code file generated and saved successfully.' });
});


module.exports = router;
