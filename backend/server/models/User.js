const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    secondName: String,
    phoneNumber: String,
    email: String,
    password: String,
    personalEndpoint: { type: String, unique: true, required: true },
    chatEndpoints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChatHistory' }],
    role: { type: String, enum: ['customer', 'carrier', 'super-admin'], default: 'customer' },
})

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;