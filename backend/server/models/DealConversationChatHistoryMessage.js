const mongoose = require('mongoose');


const DealConversationChatHistoryMessageSchema = new mongoose.Schema({
    chatID: String,
    receiver: String,
    sender: String,
    text: String,
    date: Date,
    file: {
        type: String, // This will store the file path
        default: null, // Default value is null which means no file attached
    },
});


const DealConversationChatHistoryMessage = mongoose.model('DealConversationChatHistoryMessage', DealConversationChatHistoryMessageSchema);
module.exports = DealConversationChatHistoryMessage;