// Load environment variables
require('dotenv').config();

// Import required modules
const express = require('express');
const path = require('path');
const app = express();

// Define the port to use (default to 3000)
const port = process.env.PORT || 3000;

// Serve static files from the public folder (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route for homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Sample API endpoint for testing
app.get('/api/hello', (req, res) => {
  res.json({ message: 'MindPort AI is working properly!' });
});

// Log the API Key (for debugging – remove this before production)
const apiKey = process.env.KEY;
console.log('🔑 API Key loaded:', apiKey);

// Start the server
app.listen(port, () => {
  console.log(`🚀 MindPort AI running at http://localhost:${port}`);
});
