const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');

const CarrierSchema = new Schema({
    carrierPrequalification: {
        usDocket: String,
        usDotNumber: String,
        intrastateCarrier: String
    },
    contactInformation: {
        name: String,
        phoneNumber: String,
        email: String
    },
    salesContactInformation: {
        name: String,
        phoneNumber: String,
        email: String
    },
    contactAndPayInformation: {
        companyName: String,
        zipCode: String,
        stateProvince: String,
        country: String,
        city: String,
        isFactoringCompany: Boolean
    },
    payInformation: {
        companyName: String,
        zipCode: String,
        stateProvince: String,
        country: String,
        city: String,
        email: String,
        dunsNumber: String
    },
    carrierPersonalEndpoint: {
        type: String,
        default: () => crypto.randomBytes(32).toString('hex')
    }
});

const Carrier = mongoose.model('Carrier', CarrierSchema);

module.exports = Carrier;