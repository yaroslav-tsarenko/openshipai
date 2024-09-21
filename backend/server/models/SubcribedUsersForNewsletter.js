const mongoose = require('mongoose');

const SubscribedUsersForNewsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('SubscribedUsersForNewsletter', SubscribedUsersForNewsletterSchema);