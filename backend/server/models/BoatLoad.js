// backend/server/models/BoatLoad.js
const mongoose = require('mongoose');

const BoatLoadSchema = new mongoose.Schema({
    boatType: String,
    boatModel: String,
    boatYear: String,
    boatColor: String,
    boatLicensePlate: String,
    boatVin: String,
    pickupLocation: String,
    deliveryLocation: String,
    isConvertible: Boolean,
    isModified: Boolean,
    isInoperable: Boolean,
    serviceLevel: String,
    enclosedTransport: Boolean,
    termsAgreed: Boolean,
    deliveryDate: Date,
    userEndpoint: String, // Link the load to a user
});

module.exports = mongoose.model('BoatLoad', BoatLoadSchema);