const mongoose = require('mongoose');

const CommercialTruckLoadSchema = new mongoose.Schema({
    vehicleType: String,
    vehicleModel: String,
    vehicleYear: String,
    vehicleColor: String,
    vehicleLicensePlate: String,
    vehicleVin: String,
    pickupLocation: String,
    deliveryLocation: String,
    isConvertible: Boolean,
    isModified: Boolean,
    isInoperable: Boolean,
    serviceLevel: String,
    enclosedTransport: Boolean,
    termsAgreed: Boolean,
    deliveryDate: Date,
    userEndpoint: String,
    commercialLoadID: String,
    commercialTruckLoadPrice: {
        type: Number,
        required: false
    },
});

module.exports = mongoose.model('CommercialTruckLoad', CommercialTruckLoadSchema);
