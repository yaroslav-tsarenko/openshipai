const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName: String,
    userSecondName: String,
    userPhoneNumber: String,
    userEmail: String,
    userPassword: String,
    userID: { type: String, unique: true, required: true },
    userChatEndpoints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChatHistory' }],
    userRole: { type: String, default: 'user' },
})

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;