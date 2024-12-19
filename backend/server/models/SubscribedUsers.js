const mongoose = require('mongoose');

const SubscribedUsersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('SubscribedUsers', SubscribedUsersSchema);