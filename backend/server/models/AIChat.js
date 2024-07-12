const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: String,
    content: String,
    timestamp: { type: Date, default: Date.now }
});

const AIChatSchema = new mongoose.Schema({
    userID: String,
    aiChatID: String,
    messages: [MessageSchema]
});

const AIChat = mongoose.model('AIChat', AIChatSchema);

module.exports = AIChat;
