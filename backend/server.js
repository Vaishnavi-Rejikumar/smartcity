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
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema for the user
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Create a model for the user collection
const User = mongoose.model('User', userSchema);

// Login route
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Find a user with the provided username and password
  User.findOne({ username: username, password: password }, (error, user) => {
    if (error) {
      console.error('Error executing login query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (user) {
      // User is logged in successfully
      res.json({ message: 'Login successful' });
    } else {
      // Invalid login credentials
      res.status(401).json({ error: 'Invalid login credentials' });
    }
  });
});

// Sign-up route
app.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Create a new user document
  const newUser = new User({ username: username, password: password });

  // Save the new user to the database
  newUser.save((error, savedUser) => {
    if (error) {
      console.error('Error executing sign-up query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // New user created successfully
    res.json({ message: 'Sign-up successful' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
