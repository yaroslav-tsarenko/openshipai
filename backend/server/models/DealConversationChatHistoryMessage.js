const mongoose = require('mongoose');


const DealConversationChatHistoryMessageSchema = new mongoose.Schema({
    chatID: String,
    receiver: String,
    sender: String,
    text: String,
    date: Date
});


const DealConversationChatHistoryMessage = mongoose.model('DealConversationChatHistoryMessage', DealConversationChatHistoryMessageSchema);
module.exports = DealConversationChatHistoryMessage;