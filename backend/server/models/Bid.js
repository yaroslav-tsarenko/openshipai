const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
    commercialLoadID: {
        type: String,
        required: true
    },
    bid: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: '$'
    },
    loadType: {
        type: String,
        required: true
    },
    pickupLocation: {
        type: String,
        required: true
    },
    deliveryLocation: {
        type: String,
        required: true
    },
    carrierID: {
        type: String,
        required: true
    },
    assignedDriver: {
        type: String,
    }
});

module.exports = mongoose.model('Bid', BidSchema);
