const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection setup
// Replace the placeholders with your actual MongoDB connection string
const dbURI = 'mongodb+srv://josnanayathode:3md6tU8uKX0GbSL5@cluster.gulxxns.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Create a schema for the user
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Create a model for the user collection
const User = mongoose.model('User', userSchema);

// Sign-up route
app.post('/api/register', (req, res) => {
  const username = req.body.signupUsername;
  const password = req.body.signupPassword;

  // Create a new user document
  const newUser = new User({ username: username, password: password });

  // Save the new user to the database
  newUser.save()
    .then((savedUser) => {
      // New user created successfully
      res.json({ message: 'Sign-up successful' });
    })
    .catch((error) => {
      console.error('Error executing sign-up query:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});
