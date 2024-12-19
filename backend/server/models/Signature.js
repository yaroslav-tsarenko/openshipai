const mongoose = require('mongoose');

const SignatureSchema = new mongoose.Schema({
    imgData: String,
    userEndpoint: String,
    email: String,
    signed: { type: Boolean, default: false }, // Add this line
});

module.exports = mongoose.model('Signature', SignatureSchema);