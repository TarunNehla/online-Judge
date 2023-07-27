// main.js
const { app, PORT } = require('./server');
const { connectToDatabase } = require('./database');
const routes = require('./routes');

// Connect to MongoDB
connectToDatabase();

// Use the routes
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
