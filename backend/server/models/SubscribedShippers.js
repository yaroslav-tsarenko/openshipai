const mongoose = require('mongoose');

const SubscribedShippersSchema = new mongoose.Schema({
    email: String,
    name: String,
    phoneNumber: String,
});

module.exports = mongoose.model('SubscribedShippers', SubscribedShippersSchema);