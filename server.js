const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from current directory
app.use(express.static(path.join(__dirname)));

app.use(express.json());

// OpenAI API route (optional, for /ask endpoint)
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 100,
    });

    res.json({ reply: completion.data.choices[0].text.trim() });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong with OpenAI" });
  }
});

// Fallback: serve index.html for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`MindPort AI running on port ${port}`);
});
