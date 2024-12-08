// Import necessary packages and modules
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

// Dynamic import for node-fetch
let fetch;
(async () => {
  fetch = (await import('node-fetch')).default;
})();

// Load environment variables
dotenv.config();

// Log the API key for debugging purposes
console.log('MeaningCloud API Key (on startup):', process.env.MEANING_CLOUD_API_KEY);

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

// Root route
app.get('/', function (req, res) {
  res.send("This is the server API page, you may access its services via the client app.");
});

// POST Route for URL Analysis
app.post('/api/analyze', async (req, res) => {
  console.log('MeaningCloud API Key (on request):', process.env.MEANING_CLOUD_API_KEY); // Log the API key on each request
  try {
    const { url } = req.body;

    // Validate URL input
    if (!url || !isValidURL(url)) {
      return res.status(400).json({ error: 'Invalid URL provided' });
    }

    // Call MeaningCloud API for URL analysis
    const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.MEANING_CLOUD_API_KEY}&lang=en&url=${encodeURIComponent(url)}`);
    const data = await response.json();

    // Return analyzed results
    res.json({
      url: url,
      sentiment: data.score_tag,
      confidence: data.confidence,
      irony: data.irony,
      subjectivity: data.subjectivity
    });
  } catch (error) {
    console.error('URL Analysis Error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze URL', 
      details: error.message 
    });
  }
});

// URL Validation Helper
function isValidURL(url) {
  try {
    new URL(url);
    return url.startsWith('http://') || url.startsWith('https://');
  } catch (error) {
    return false;
  }
}

// Start server if not being tested
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
  });
}

// Export for testing
module.exports = app;
