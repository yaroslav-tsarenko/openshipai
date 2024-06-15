const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    driverFirstAndLastName: String,
    driverEmail: String,
    driverPhoneNumber: String,
    driverDateOfBirth: String,
    driverAddress: String,
    driverLicenseClass: String,
    driverPhoto: String,
    driverPassword: String,
    driverAssignedLoadsID: [String],
    driverID: String,
    driverCreatedByCarrierID: String,
    role: { type: String, default: 'driver' },
});

module.exports = mongoose.model('Driver', DriverSchema);
