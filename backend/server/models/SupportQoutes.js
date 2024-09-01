const mongoose = require('mongoose');

const supportQuoteSchema = new mongoose.Schema({
    email: String,
    description: String,
    userID: String,
    timestamp: { type: Date, default: Date.now }
});

const SupportQuote = mongoose.model('SupportQuote', supportQuoteSchema);

module.exports = SupportQuote;