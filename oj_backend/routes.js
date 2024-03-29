// routes.js
const express = require('express');
const User = require('./userModel').User;
const Plist = require('./userModel').Plist;
const router = express.Router();
const generateCodeFile = require('./generateFile');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
require('dotenv').config();


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
        
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(registerPassword,saltRounds)
        // Create a new user document and save it to the database
        const newUser = new User({
          registerName,
          registerEmail,
          passwordHash,
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
      const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(loginPassword, user.passwordHash)
      // Check if the password matches the one stored in the database
      if (!(user && passwordCorrect)) {
        return response.status(401).json({
          error: 'invalid username or password'
        })
      }
      // In a real application, you might use a JWT (JSON Web Token) for authentication and send it back as a response.
      const userForToken = {
        username: user.registerEmail,
        id: user._id,
      }
      
      const token = jwt.sign(userForToken, process.env.SECRET)
      res.status(200).send({ token, userMail: user.registerEmail, name: user.registerName })
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
