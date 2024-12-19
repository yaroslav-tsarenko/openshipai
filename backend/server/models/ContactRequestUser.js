const mongoose = require('mongoose');

const ContactRequestUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('ContactRequestUser', ContactRequestUserSchema);