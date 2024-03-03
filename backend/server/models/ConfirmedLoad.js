const mongoose = require('mongoose');

const ConfirmedLoadSchema = new mongoose.Schema({
    loadID: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    payment: {
        type: Boolean,
        required: true
    }
});

const ConfirmedLoad = mongoose.model('ConfirmedLoad', ConfirmedLoadSchema);

module.exports = ConfirmedLoad;