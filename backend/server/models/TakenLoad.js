const mongoose = require('mongoose');

const TakenLoadSchema = new mongoose.Schema({
    assignedDriver: String,
    driverID: String,
    bidPrice: Number,
    commercialLoadID: String,
    currency: String,
    deliveryLocation: String,
    loadType: String,
    pickupLocation: String,
    status: String,
    submitBidID: String,
    userID: String,
    lat: {type: Number},
    lng: {type: Number},
    __v: Number,
    _id: String
});

module.exports = mongoose.model('TakenLoad', TakenLoadSchema);