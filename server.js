const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,  // Make sure .env file has this key set correctly!
});
const openai = new OpenAIApi(configuration);

app.post('/api/ask', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o-mini',  // Make sure your model name is correct and available
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    });

    res.json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI error:', error.response?.data || error.message || error);
    res.status(500).json({ error: 'AI request failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 MindPort AI backend running on port ${PORT}`));
