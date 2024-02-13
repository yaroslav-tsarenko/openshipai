const mongoose = require('mongoose');

const DealChatConversationSchema = new mongoose.Schema({
    chatID: {
        type: String,
        required: true,
        unique: true
    },
    loadType: String,
    currency: String,
    pickupLocation: String,
    deliveryLocation: String,
    bidPrice: Number,
    loadID: String,
    personalEndpoint: String,
    carrierID: String,
});

module.exports = mongoose.model('DealChatConversation', DealChatConversationSchema);
