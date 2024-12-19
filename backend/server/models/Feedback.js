const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    email: String,
    description: String,
    userID: String,
    timestamp: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;