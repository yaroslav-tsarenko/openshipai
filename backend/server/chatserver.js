const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
require('dotenv').config();
const AIChat = require('./models/AIChat');

const app = express();
const PORT = process.env.PORT || 8888;

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://yaroslavdev:1234567890@haul-depot-db.7lk8rg9.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ AI Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
});

const openaiApiKey = process.env.OPENAI_API_KEY;

app.post('/api/chat', async (req, res) => {
    const { message, imageUrl, audioUrl, aiChatID } = req.body;

    try {
        let audioText = '';
        if (audioUrl) {
            const response = await axios.post(
                'https://api.openai.com/v1/transcriptions',
                {
                    model: 'whisper-1',
                    file: audioUrl,
                    language: 'en'
                },
                {
                    headers: {
                        'Authorization': `Bearer ${openaiApiKey}`,
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );
            audioText = response.data.text;
        }

        const finalMessage = audioText ? `${message} ${audioText}` : message;

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: [{ role: 'user', content: finalMessage }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${openaiApiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const aiMessage = response.data.choices[0].message.content;

        const chat = await AIChat.findOne({ aiChatID });
        if (chat) {
            chat.messages.push({ sender: 'assistant', content: aiMessage });
            await chat.save();
        }

        res.json({ message: aiMessage });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in processing your request');
    }
});

app.post('/save-message', async (req, res) => {
    const { aiChatID, sender, content, imageUrl, audioUrl } = req.body;

    try {
        const chat = await AIChat.findOne({ aiChatID });
        if (chat) {
            chat.messages.push({ sender, content, imageUrl, audioUrl });
            await chat.save();
            res.status(200).json({ message: 'Message saved successfully' });
        } else {
            res.status(404).json({ message: 'Chat not found' });
        }
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

app.get('/get-messages/:aiChatID', async (req, res) => {
    const { aiChatID } = req.params;
    try {
        const chat = await AIChat.findOne({ aiChatID }, 'messages');
        if (chat) {
            res.json(chat.messages);
        } else {
            res.status(404).json({ message: 'Chat not found' });
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

app.get('/get-ai-chats/:shipperID', async (req, res) => {
    const { shipperID } = req.params;
    try {
        const aiChats = await AIChat.find({ userID: shipperID });
        if (aiChats.length > 0) {
            res.json(aiChats);
        } else {
            res.status(404).json({ message: 'No AI Chats found for this shipperID' });
        }
    } catch (error) {
        console.error('Error fetching AI Chats:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

app.post('/create-ai-chat', async (req, res) => {
    const { aiChatID, userID } = req.body;
    try {
        const newAIChat = new AIChat({ aiChatID, userID });
        const savedAIChat = await newAIChat.save();
        res.status(201).json(savedAIChat);
    } catch (error) {
        console.error('Error creating AIChat:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
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

app.post('/api/upload-audio', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        const filePath = `/uploads/${file.originalname}`;
        fs.writeFileSync(filePath, file.buffer);

        // Transcode the audio file to a format supported by OpenAI
        const outputFilePath = `/uploads/${file.originalname.split('.')[0]}.mp3`;
        ffmpeg(filePath)
            .toFormat('mp3')
            .on('end', () => {
                fs.unlinkSync(filePath); // Remove the original file
                res.json({ audioUrl: outputFilePath });
            })
            .on('error', (err) => {
                console.error('Error transcoding audio file:', err);
                res.status(500).send('Error transcoding audio file');
            })
            .save(outputFilePath);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading audio');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
