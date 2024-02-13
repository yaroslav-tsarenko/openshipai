const mongoose = require('mongoose');
const { Schema } = mongoose;
const shortid = require('shortid');

const CarrierSchema = new Schema({
    name: String,
    secondName: String,
    companyName: String,
    usDocket: String,
    usDotNumber: String,
    email: String,
    phoneNumber: String,
    dunsNumber: String,
    carrierID: { type: String, default: shortid.generate }
});

const Carrier = mongoose.model('Carrier', CarrierSchema);

module.exports = Carrier;