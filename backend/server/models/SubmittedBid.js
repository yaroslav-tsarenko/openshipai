const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubmittedBidSchema = new Schema({
    carrier: String,
    loadType: String,
    currency: String,
    pickupLocation: String,
    deliveryLocation: String,
    status: String,
    bidPrice: Number,
    assignedDriver: String,
    commercialLoadID: String,
    submitBidID: String,
    userID: String,
});

module.exports = mongoose.model('SubmittedBid', SubmittedBidSchema);
