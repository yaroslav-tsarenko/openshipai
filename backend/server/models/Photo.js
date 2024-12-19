const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
    url: String,
    text: String,
    userEmail: String
});

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;