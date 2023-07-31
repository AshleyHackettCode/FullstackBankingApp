const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const cors = require('cors');
const crypto = require('crypto');
require('dotenv').config();

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

// Middleware
app.use(bodyParser.json());
const allowedOrigins = ['http://localhost:3001'];
app.use(cors({
  origin: allowedOrigins,
}));

// Other middleware and routes


// MongoDB connection
const MONGO_URI = 'mongodb+srv://ashleygarvey96:9mSLcgiL9VvPvq96@cluster0.rmunyzb.mongodb.net/';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
const userRoutes = require('./routes/userRoutes'); // Pass the secret key to userRoutes
const authMiddleware = require('./middleware/authMiddleware');

app.get('/', (req, res) => {
  res.send('Hello, this is the root path!');
});

app.use('/api', userRoutes);

// Protected route example - require user to be logged in (with valid token) to access
app.get('/api/protected', authMiddleware.authenticateUser, (req, res) => {
  res.status(200).json({ message: 'This is a protected route.' });
});

// Output the generated secret key
console.log('Generated secret key:', secretKey);
