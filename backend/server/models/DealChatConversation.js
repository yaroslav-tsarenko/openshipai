const mongoose = require('mongoose');

const DealChatConversationSchema = new mongoose.Schema({
    loadType: String,
    currency: String,
    pickupLocation: String,
    deliveryLocation: String,
    bidPrice: Number,
    loadID: String,
    personalEndpoint: String,
    carrierPersonalEndpoint: String,
});

module.exports = mongoose.model('DealChatConversation', DealChatConversationSchema);
