require('dotenv').config();  // Load environment variables from .env

const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
    });

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Something went wrong with the AI request.' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`MindPort running on port ${port}`);
});
