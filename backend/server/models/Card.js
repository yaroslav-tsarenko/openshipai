const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    cardLastNameFirstName: String,
    cardNumber: String,
    expirationDate: String,
    cvv: String,
    cardPaymentSystem: String,
    cardColor: String,
    userID: String,
    userEmail: String,
    stripeAccountID: String
});

module.exports = mongoose.model('CardSchema', CardSchema);