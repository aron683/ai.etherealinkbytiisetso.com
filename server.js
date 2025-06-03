require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// ✅ OpenAI v3 Setup
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// 🧠 MindPort Endpoint
app.post('/ask', async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const answer = completion.data.choices[0].message.content;
    res.json({ answer });

  } catch (error) {
    console.error("OpenAI Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong internally." });
  }
});

// 🚀 Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
