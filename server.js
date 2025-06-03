require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// 🔑 OpenAI API setup
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// 📮 POST endpoint
app.post('/ask', async (req, res) => {
  try {
    const { prompt } = req.body;
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const answer = completion.data.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error('Error fetching OpenAI response:', error.message);
    res.status(500).json({ error: 'Failed to fetch response' });
  }
});

// 🚀 Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
