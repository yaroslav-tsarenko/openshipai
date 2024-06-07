const mongoose = require('mongoose');

const DealChatConversationSchema = new mongoose.Schema({
    chatID: String,
    loadID: String,
    shipperID: String,
    carrierID: String,
});

module.exports = mongoose.model('DealChatConversation', DealChatConversationSchema);
