const mongoose = require("mongoose");

const ShipperSchema = new mongoose.Schema({
    userShipperName: String,
    userShipperSecondName: String,
    userShipperPhoneNumber: String,
    userShipperEmail: String,
    userShipperPassword: String,
    userShipperAvatar: String,
    userShipperLocation: String,
    userShipperSelectedCard: String,
    userShipperNotificationFromDriver: Boolean,
    userShipperNotificationFromCarrier: Boolean,
    userShipperNotificationFromAI: Boolean,
    userShipperNotificationOfUpdates: Boolean,
    userShipperID: {type: String, unique: true, required: true},
    userShipperChatEndpoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'ChatHistory'}],
    userShipperRole: {type: String, default: 'shipper'},
})

const ShipperModel = mongoose.model("shippers", ShipperSchema);
module.exports = ShipperModel;