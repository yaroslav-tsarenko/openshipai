const mongoose = require('mongoose');

const LoadSchema = new mongoose.Schema({
    loadID: String,
    loadType: String,
    loadTitle: String,
    loadPickupLocation: String,
    loadDeliveryLocation: String,
    loadDescription: String,
    loadWeight: String,
    loadLength: String,
    loadWidth: String,
    loadVehicleMake: String,
    loadVehicleYear: String,
    loadVehicleModel: String,
    loadHeight: String,
    loadQuantity: String,
    loadOperable: Boolean,
    loadConvertible: Boolean,
    loadModified: Boolean,
    shipperID: String,
});

module.exports = mongoose.model('Load', LoadSchema);