const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 7777;

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors());
app.use(bodyParser.json());

const openaiApiKey = "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";

app.post('/api/chat', async (req, res) => {
    const { message, imageUrl } = req.body;

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

app.post('/api/upload-image', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        res.json({ imageUrl: `https://dummyurl.com/${file.originalname}` });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading image');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
