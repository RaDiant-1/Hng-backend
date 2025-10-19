const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// CORS headers if needed
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// GET /me endpoint
app.get('/me', async (req, res) => {
  try {
    // Fetch cat fact from Cat Facts API with timeout
    const catFactResponse = await axios.get('https://catfact.ninja/fact', {
      timeout: 5000 // 5 second timeout
    });

    // Get current timestamp in ISO 8601 format
    const timestamp = new Date().toISOString();

    // Construct response with required fields
    const response = {
      status: "success",
      user: {
        email: "<your email>",
        name: "<your full name>",
        stack: "<your backend stack>"
      },
      timestamp: timestamp,
      fact: catFactResponse.data.fact
    };

    // Return JSON response with correct Content-Type
    res.status(200).json(response);

  } catch (error) {
    // Handle API failures gracefully
    console.error('Error fetching cat fact:', error.message);

    // Return fallback response if Cat Facts API fails
    const timestamp = new Date().toISOString();
    
    res.status(200).json({
      status: "success",
      user: {
        email: "<your email>",
        name: "<your full name>",
        stack: "<your backend stack>"
      },
      timestamp: timestamp,
      fact: "Cats are amazing creatures! (Cat Facts API temporarily unavailable)"
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GET /me endpoint available at http://localhost:${PORT}/me`);
});

module.exports = app;
