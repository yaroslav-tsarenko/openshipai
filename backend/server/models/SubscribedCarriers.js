const mongoose = require('mongoose');

const SubscribedCarriersSchema = new mongoose.Schema({
    email: String,
    name: String,
    phoneNumber: String,
    company: String
});

module.exports = mongoose.model('SubscribedCarriers', SubscribedCarriersSchema);