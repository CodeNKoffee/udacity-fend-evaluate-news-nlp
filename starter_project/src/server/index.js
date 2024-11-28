const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const MeaningCloud = require('meaning-cloud');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Configure MeaningCloud API client
const meaningCloudApi = new MeaningCloud({
  application_key: process.env.MEANING_CLOUD_API_KEY,
  secure: true,             // HTTPS or HTTPS. Optional, true by default.
  uri: 'custom-uri'         // URI to create the API endpoints. Optional.
});

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
  try {
    const { url } = req.body;

    // Validate URL input
    if (!url || !isValidURL(url)) {
      return res.status(400).json({ error: 'Invalid URL provided' });
    }

    // Call MeaningCloud API for URL analysis
    const meaningCloudResponse = await analyzeSentiment(url);

    // Return analyzed results
    res.json({
      url: url,
      sentiment: meaningCloudResponse.score_tag,
      confidence: meaningCloudResponse.confidence,
      irony: meaningCloudResponse.irony,
      subjectivity: meaningCloudResponse.subjectivity
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

// MeaningCloud Sentiment Analysis Helper
async function analyzeSentiment(url) {
  return new Promise((resolve, reject) => {
    meaningCloudApi.sentiment({
      url: url,
      lang: 'en'
    }, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });
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