const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(bodyParser.json());

const configuration = new Configuration({
    apiKey: 'your_openai_api_key',
});
const openai = new OpenAIApi(configuration);

app.post('/api', async (req, res) => {
    const { question } = req.body;
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: question,
            max_tokens: 150,
        });
        res.json({ answer: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error generating response");
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
