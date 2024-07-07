const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 7777;

app.use(cors());
app.use(bodyParser.json());

const openaiApiKey = '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';

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: [{ role: 'user', content: message }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${openaiApiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const aiMessage = response.data.choices[0].message.content;
        res.json({ message: aiMessage });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in processing your request');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
