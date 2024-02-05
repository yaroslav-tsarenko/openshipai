const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    driverID: {
        type: String,
        required: true,
        unique: true
    },
    carrierId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    licensePlate: {
        type: String,
        required: true
    },
    truck: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Driver', DriverSchema);
