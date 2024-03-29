const routes = require('./routes');
const { connectToDatabase } = require('./database');
const { app, PORT } = require('./server');

connectToDatabase();

// Use the routes
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
