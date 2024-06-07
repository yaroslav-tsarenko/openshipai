const mongoose = require('mongoose');

const LoadBidSchema = new mongoose.Schema({
    loadBidCarrierID: String,
    loadCredentialID: String,
    loadBidCoverLetter: String,
    loadBidPrice: Number,
    loadBidDeliveryDate: String,
});

module.exports = mongoose.model('LoadBid', LoadBidSchema);