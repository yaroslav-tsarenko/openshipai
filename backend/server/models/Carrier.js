const mongoose = require('mongoose');
const {Schema} = mongoose;
const shortid = require('shortid');

const CarrierSchema = new Schema({
    carrierUSDotNumber: {
        type: String,
        unique: true,
    },
    carrierDotNumber: {
        type: String,
        unique: true,
    },
    intrastateCarrier: {
        type: String
    },
    carrierContactCompanyName: {
        type: String,
    },
    carrierContactAddress: {
        type: String,
    },
    carrierContactSuiteOffice: {
        type: String,
    },
    carrierContactCity: {
        type: String,
    },
    carrierContactStateProvince: {
        type: String,
    },
    carrierContactZip: {
        type: String,
    },
    carrierContactCountry: {
        type: String,
    },
    carrierPayToCompanyName: {
        type: String,
    },
    carrierPayToAddress: {
        type: String
    },
    categories: {
        type: [String],
        default: []
    },
    equipment: {
        type: [String],
        default: []
    },
    carrierPayToSuiteOffice: {
        type: String
    },
    carrierPayToCity: {
        type: String
    },
    carrierPayToStateProvince: {
        type: String
    },
    carrierPayToZipPostal: {
        type: String
    },
    carrierPayToCountry: {
        type: String
    },
    carrierDunsNumber: {
        type: String
    },
    carrierCorporateNameLastName: {
        type: String
    },
    carrierCorporatePhoneNumber: {
        type: String
    },
    carrierCorporateTitle: {
        type: String
    },
    carrierCorporateSellPhone: {
        type: String
    },
    carrierSalesContactNameLastName: {
        type: String
    },
    carrierSalesPhoneNumber: {
        type: String
    },
    carrierSalesTitle: {
        type: String
    },
    carrierSalesSellPhone: {
        type: String
    },
    carrierSalesFax: {
        type: String
    },
    carrierDispatchNameLastName: {
        type: String
    },
    carrierDispatchPhoneNumber: {
        type: String
    },
    carrierDispatchTitle: {
        type: String
    },
    carrierDispatchSellPhone: {
        type: String
    },
    carrierDispatchFax: {
        type: String
    },
    brokerCarrierAgreement:{
        type: String
    },
    carrierInsuranceAgencyCompanyName:{
        type: String
    },
    carrierInsuranceAgencyPhoneNumber:{
        type: String
    },
    carrierInsuranceAgencyFax:{
        type: String
    },
    carrierInsuranceAgencyEmail:{
        type: String
    },
    carrierInsurancePolicyNumber:{
        type: String
    },
    carrierRequestForTaxPayerName:{
        type: String
    },
    carrierRequestForTaxPayerBusinessName:{
        type: String
    },
    carrierRequestForTaxPayerAddress:{
        type: String
    },
    carrierRequestForTaxPayerCityStateZip:{
        type: String
    },
    carrierRequestForTaxPayerSocialSecurityNumber:{
        type: String
    },
    carrierRequestForTaxPayerEmployerIdentificationNumber:{
        type: String
    },
    carrierAccountName:{
        type: String
    },
    carrierAccountLastName:{
        type: String
    },
    carrierAccountAccountEmail:{
        type: String
    },
    carrierAccountPassword:{
        type: String
    },
    role: {
        type: String,
        default: 'carrier'
    },
    carrierSelectedCard:{
        type: String,
    },
    carrierAvatar:{
        type: String,
    },
    carrierNotificationFromDriver: Boolean,
    carrierNotificationFromCarrier: Boolean,
    carrierNotificationFromAI: Boolean,
    carrierNotificationOfUpdates:Boolean,
    carrierID: {
            type: String,
            default: shortid.generate
    }
});

const Carrier = mongoose.model('Carrier', CarrierSchema);

module.exports = Carrier;