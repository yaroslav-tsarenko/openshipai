const mongoose = require('mongoose');

// Function to calculate the distance between two locations
async function calculateDistance(loadPickupLocation, loadDeliveryLocation) {
    const fetch = await import('node-fetch').then(mod => mod.default);
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your actual API key
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${encodeURIComponent(loadPickupLocation)}&destinations=${encodeURIComponent(loadDeliveryLocation)}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.rows && data.rows[0] && data.rows[0].elements && data.rows[0].elements[0] && data.rows[0].elements[0].distance) {
        const distance = data.rows[0].elements[0].distance.text;
        return distance;
    } else {
        console.error('Error: Invalid data structure');
        return null;
    }
}

const LoadSchema = new mongoose.Schema({
    loadID: String,
    loadType: String,
    loadSubType: String,
    loadTitle: String,
    loadStatus: String,
    loadPrice: Number,
    loadPickupLocation: String,
    loadPickupDate: String,
    loadPickupTime: String,
    loadDeliveryLocation: String,
    loadDeliveryDate: String,
    loadDeliveryTime: String,
    loadDescription: String,
    loadTypeOfPackaging: String,
    loadWeight: String,
    loadCarrierConfirmation: String,
    loadLength: String,
    loadWidth: String,
    loadQoutes: Number,
    loadMilesTrip: { type: Number, default: null },
    loadPaymentStatus: String,
    loadAssignedDriverID: String,
    loadSpecifiedItem: String,
    loadMovingSize: String,
    loadNumberOfBedrooms: String,
    loadNumberOfPallets: String,
    loadDeliveredStatus: String,
    loadPickupStories: String,
    loadDeliveryStories: String,
    loadSpecialHandlingRequirements: String,
    loadIndustrySector: String,
    loadPrimaryContactName: String,
    loadMajorItems: String,
    loadSecondaryContactName: String,
    loadPickupFloor: String,
    loadDeliveryFloor: String,
    loadBusinessName: String,
    loadTypeOfBusiness: String,
    loadLiftedItemsQuantity: String,
    loadHaveFreightElevator: String,
    loadDestinationOptions: String,
    loadServiceExpressOptions: String,
    loadAreaOption: String,
    loadVehicleMake: String,
    loadVehicleYear: String,
    loadVehicleModel: String,
    loadHeight: String,
    loadQuantity: String,
    loadOperable: Boolean,
    loadConvertible: Boolean,
    loadModified: Boolean,
    loadNumberOfItems: String,
    loadTrike: Boolean,
    loadIsCrate: String,
    loadIsPallet: String,
    loadTripStarted: String,
    loadAdditionalSelectedLoadOptions: [String],
    loadIsBox: String,
    isOnTrailer: Boolean,
    hasTrailerPreference: Boolean,
    loadTypeOfTrailer: String,
    loadCredentialID: String,
    shipperID: String,
});

LoadSchema.pre('save', async function (next) {
    if (!this.loadMilesTrip) {
        const distance = await calculateDistance(this.loadPickupLocation, this.loadDeliveryLocation);
        if (distance) {
            this.loadMilesTrip = parseFloat(distance.replace(' mi', ''));
        }
    }
    next();
});

module.exports = mongoose.model('Load', LoadSchema);
