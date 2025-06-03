const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// 🔐 OpenAI setup
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// 🧠 AI Endpoint
app.post('/ask', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const answer = completion.data.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).send('Error generating response');
  }
});

// 🚀 Server start
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
