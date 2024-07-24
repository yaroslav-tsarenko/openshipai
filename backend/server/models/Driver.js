const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    driverFirstAndLastName: String,
    driverEmail: String,
    driverPhoneNumber: String,
    driverDateOfBirth: String,
    driverAddress: String,
    driverLicenseClass: String,
    driverAvatar: String,
    driverPassword: String,
    driverAssignedLoadsID: [String],
    driverID: String,
    driverCreatedAt: { type: Date, default: Date.now },
    driverInsurance: String,
    driverCurrentLocation: String,
    driverTruckID: String,
    driverCreatedByCarrierID: String,
    role: { type: String, default: 'driver' },
});

module.exports = mongoose.model('Driver', DriverSchema);
