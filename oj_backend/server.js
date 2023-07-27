// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

const corsOptions = {
  origin: ['http://localhost:5000', 'http://localhost:3000'],
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

module.exports = { app, PORT };
