const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); // Import mongoose to connect to MongoDB
const routes = require('./routes');
const { connectToDatabase } = require('./database');
const { app, PORT } = require('./server');

connectToDatabase();

// Use the routes
app.use('/', routes);

// Define the schema for the user collection
// const userSchema = new mongoose.Schema({
//   registerName: String,
//   registerEmail: String,
//   registerPassword: String,
// });

// Create a model for the user collection
// const User = mongoose.model('User', userSchema);

// const app = express();
// const PORT = 5000;

// app.use(bodyParser.json());
// app.use(cors());




// app.get('/', (req, res) => {
//   res.send('Welcome to the backend server!');
// });

// // Endpoint to handle user registration
// app.post('/register', async (req, res) => {
//   const {
//     registerName,
//     registerEmail,
//     registerPassword
//   } = req.body;
//   if (!registerName || !registerEmail || !registerPassword) {
//     return res.status(400).json({
//       message: 'All fields are required.'
//     });
//   }

//   try {
//     // Check if the email is already registered
//     const existingUser = await User.findOne({
//       registerEmail
//     });

//     if (existingUser) {
//       return res.status(409).json({
//         message: 'Email is already registered.'
//       });
//     }

//     // Create a new user document and save it to the database
//     const newUser = new User({
//       registerName,
//       registerEmail,
//       registerPassword,
//     });
//     await newUser.save();

//     return res.status(201).json({
//       message: 'User registered successfully.'
//     });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     return res.status(500).json({
//       message: 'Internal server error.'
//     });
//   }
// });

// // Endpoint to handle user login
// app.post('/login', async (req, res) => {
//   const { loginEmail, loginPassword } = req.body;
//   if (!loginEmail || !loginPassword) {
//     return res.status(400).json({ message: 'Email and password are required.' });
//   }

//   try {
//     // Find the user document with the matching email
//     const user = await User.findOne({ registerEmail: loginEmail });

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials.' });
//     }

//     // Check if the password matches the one stored in the database
//     if (user.registerPassword !== loginPassword) {
//       return res.status(401).json({ message: 'Invalid credentials.' });
//     }

//     // In a real application, you might use a JWT (JSON Web Token) for authentication and send it back as a response.

//     return res.status(200).json({ message: 'Login successful.' });
//   } catch (error) {
//     console.error('Error logging in user:', error);
//     return res.status(500).json({ message: 'Internal server error.' });
//   }
// });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
