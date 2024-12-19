const mongoose = require('mongoose');
const Shipper = require('../models/Shipper');

const getRandomNumber = () => Math.floor(Math.random() * 101);

// Function to update all Shipper documents
const updateShipperRatings = async () => {
    try {
        await Shipper.updateMany({}, {
            userShipperServiceRating: getRandomNumber(),
            userShipperServiceAgreement: getRandomNumber(),
            userShipperServiceActivity: getRandomNumber()
        });
        console.log('✅ Shipper ratings updated successfully!');
    } catch (error) {
        console.error('Error updating shipper ratings:', error);
    }
};

const startUpdating = async () => {
    try {
        await mongoose.connect('mongodb+srv://yaroslavdev:1234567890@haul-depot-db.7lk8rg9.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Update Rating Service have been connected to MongoDB');
        setInterval(updateShipperRatings, 3 * 24 * 60 * 60 * 1000);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

startUpdating();