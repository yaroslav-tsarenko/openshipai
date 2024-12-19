const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userID: String,
    amount: Number,
    paymentStatus: String,
    currentDate: String,
    currentTime: String
});

module.exports = mongoose.model('Transaction', TransactionSchema);