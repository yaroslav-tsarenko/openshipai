const express = require('express');
const app = express();
const port = 8080;
const axios = require('axios');
const mongoose = require('mongoose');
const path = require('path');
const shortid = require('shortid'); // Import the 'shortid' package
const cors = require('cors');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const UserModel = require('./models/User');
const User = require('./models/User');
const SubscribedCarriers = require('./models/SubscribedCarriers');
const SubscribedShippers = require('./models/SubscribedShippers');
const Shipper = require('./models/Shipper');
const ConfirmedLoad = require('./models/ConfirmedLoad');
const TakenLoad = require('./models/TakenLoad');
const ChatHistory = require('./models/ChatHistory');
const DealConversationChatHistoryMessage = require('./models/DealConversationChatHistoryMessage');
const Carrier = require('./models/Carrier');
const CommercialTruckLoad = require('./models/CommercialTruckLoad');
const CarOrLightTruckLoad = require('./models/CarOrLightTruckLoad');
const ConstructionEquipmentLoad = require('./models/ConstructionEquipmentLoad');
const MotoEquipmentLoad = require('./models/MotoEquipmentLoad');
const VehicleLoad = require('./models/VehicleLoad');
const HeavyEquipmentLoad = require('./models/HeavyEquipmentLoad');
const FTLLoad = require('./models/FTLLoad');
const Other = require('./models/Other');
const BoatLoad = require('./models/BoatLoad');
const ExpediteLoad = require('./models/ExpediteLoad');
const FreeConsultation = require('./models/FreeConsultation');
const LongDistanceMoving = require('./models/LongDistanceMoving');
const InternationalMoving = require('./models/InternationalMoving');
const CommercialBusinessMoving = require('./models/CommercialBusinessMoving');
const OfficeMoving = require('./models/OfficeMoving');
const HeavyLiftingAndMovingOnly = require('./models/HeavyLiftingAndMovingOnly');
const MovingAndStorageService = require('./models/MovingAndStorageService');
const AutoMotoBoatEquipment = require('./models/AutoMotoBoatEquipment');
const MilitaryMoving = require('./models/MilitaryMoving');
const CorporateMoving = require('./models/CorporateMoving');
const StudentMoving = require('./models/StudentMoving');
const SubscribedUsers = require('./models/SubscribedUsers');
const SubmittedBid = require('./models/SubmittedBid');
const DealChatConversation = require('./models/DealChatConversation');
const Photo = require('./models/Photo');
const Bid = require('./models/Bid');
const Signature = require('./models/Signature');
const Driver = require('./models/Driver');
const Load = require('./models/Load');
const LoadBid = require('./models/LoadBid');
const stripe = require('stripe')('sk_test_51O5Q6UEOdY1hERYnOo1J3Zep6yPIGV4Mxo8dSPjkQElYi7enLOmu3sD7YfxEzWOe1dYO98nsmHNaBu83gpBI7ekT004LeMr38x');
require('dotenv').config();
const fs = require('fs');
const nodemailer = require('nodemailer');
const multer = require('multer');
const apiKey = 'AIzaSyDVNDAsPWNwktSF0f7KnAKO5hr8cWSJmNM';
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

app.use('/uploads', express.static('uploads'));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 10 * 1024 * 1024} // Set file size limit to 10MB
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

function generatePersonalEndpoint() {
    return shortid.generate();
}

mongoose.connect('mongodb+srv://yaroslavdev:1234567890@haul-depot-db.7lk8rg9.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
});


const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
    },
});



async function sendEmailWithNode(driverEmail, driverPassword) {
    const info = await transporter.sendMail({
        from: "info@demomailtrap.com",
        to: "openshipai@gmail.com",
        subject: "Driver Credentials",
        text: `Driver Email: ${driverEmail}\nDriver Password: ${driverPassword}`,
        html: `<p>Driver Email: ${driverEmail}</p><p>Driver Password: ${driverPassword}</p>`,
    });
    console.log("Message sent: %s", info.messageId);
}



app.post('/send-driver-credentials', async (req, res) => {
    const {driverEmail, driverPassword} = req.body;
    try {
        await sendEmailWithNode(driverEmail, driverPassword);
        res.status(200).send({message: 'Email sent successfully'});
    } catch (error) {
        console.error('Failed to send email:', error);
        res.status(500).send({message: 'Failed to send email'});
    }
});

app.post('/create-bid', async (req, res) => {
    try {
        const newLoadBid = new LoadBid(req.body);
        const savedLoadBid = await newLoadBid.save();

        const bids = await LoadBid.find({loadCredentialID: req.body.loadCredentialID});

        const averagePrice = bids.reduce((total, bid) => total + bid.loadBidPrice, 0) / bids.length;

        const load = await Load.findOne({loadCredentialID: req.body.loadCredentialID});

        const updatedQuotes = load.loadQoutes + 1;

        await Load.updateOne({loadCredentialID: req.body.loadCredentialID}, {
            loadPrice: averagePrice,
            loadQoutes: updatedQuotes
        });

        res.json(savedLoadBid);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/distance', async (req, res) => {
    const { origin, destination } = req.query;
    const apiKey = '5b3ce3597851110001cf6248aaf2054f2cee4e6da1ceb0598a98a7ca'; // Replace with your OpenRouteService API key

    try {
        const originResponse = await axios.get(`https://api.openrouteservice.org/geocode/search`, {
            params: {
                api_key: apiKey,
                text: origin,
            },
        });

        const destinationResponse = await axios.get(`https://api.openrouteservice.org/geocode/search`, {
            params: {
                api_key: apiKey,
                text: destination,
            },
        });

        const originCoords = originResponse.data.features[0].geometry.coordinates;
        const destinationCoords = destinationResponse.data.features[0].geometry.coordinates;

        const distanceResponse = await axios.get('https://api.openrouteservice.org/v2/directions/driving-car', {
            params: {
                api_key: apiKey,
                start: `${originCoords[0]},${originCoords[1]}`,
                end: `${destinationCoords[0]},${destinationCoords[1]}`,
            },
        });

        const distanceInMeters = distanceResponse.data.routes[0].summary.distance;
        const distanceInMiles = (distanceInMeters / 1609.34).toFixed(2);

        res.json({ distance: distanceInMiles });
    } catch (err) {
        res.status(500).json({ error: 'Error calculating distance' });
    }
});


app.get('/calculate-distance', async (req, res) => {
    const { origin, destination } = req.query;

    if (!origin || !destination) {
        return res.status(400).json({ error: 'Missing origin or destination' });
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'OK' && data.rows[0].elements[0].status === 'OK') {
            const distance = data.rows[0].elements[0].distance.text;
            res.json({ distance });
        } else {
            res.status(400).json({ error: 'Error fetching distance', details: data.error_message });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

app.get('/get-drivers/:carrierID', async (req, res) => {
    const { carrierID } = req.params;
    try {
        const drivers = await Driver.find({ driverCreatedByCarrierID: carrierID });
        res.json(drivers);
    } catch (error) {
        console.error('Error fetching drivers:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/load/:loadCredentialID', async (req, res) => {
    const {loadCredentialID} = req.params;
    try {
        const load = await Load.findOne({loadCredentialID: loadCredentialID});
        if (!load) {
            return res.status(404).json({message: 'Load not found'});
        }
        res.json(load);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/get-all-load-bids', async (req, res) => {
    try {
        const loadBids = await LoadBid.find({});
        res.status(200).json(loadBids);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.delete('/delete-all-load-bids', async (req, res) => {
    try {
        await LoadBid.deleteMany({});
        res.status(200).send({status: 'Success', message: 'All LoadBids deleted successfully'});
    } catch (err) {
        res.status(500).send({status: 'Error', message: 'Failed to delete all LoadBids'});
    }
});

app.post('/upload-shipper-avatar/:shipperID', upload.single('avatar'), async (req, res) => {
    const {shipperID} = req.params;

    try {
        if (!req.file) {
            return res.status(400).json({message: 'No file uploaded'});
        }
        const avatarPath = `uploads/${req.file.filename}`;
        const shipper = await Shipper.findOneAndUpdate(
            {userShipperID: shipperID},
            {userShipperAvatar: avatarPath},
            {new: true}
        );

        if (!shipper) {
            return res.status(404).json({message: 'Shipper not found'});
        }

        res.json(shipper);
    } catch (error) {
        console.error('Error uploading avatar:', error);
        res.status(500).json({message: error.message});
    }
});

app.post('/upload-driver-avatar/:driverID', upload.single('avatar'), async (req, res) => {
    const {driverID} = req.params;

    try {
        if (!req.file) {
            return res.status(400).json({message: 'No file uploaded'});
        }
        const avatarPath = `uploads/${req.file.filename}`;
        const driver = await Driver.findOneAndUpdate(
            {driverID: driverID},
            {driverAvatar: avatarPath},
            {new: true}
        );

        if (!driver) {
            return res.status(404).json({message: 'Driver not found'});
        }

        res.json(driver);

    } catch (error) {
        console.error('Error uploading avatar:', error);
        res.status(500).json({message: error.message});
    }
});

app.put('/update-driver/:driverID', async (req, res) => {
    const {driverID} = req.params;
    const {driverFirstAndLastName, driverEmail, driverPhoneNumber} = req.body;

    try {
        const driver = await Driver.findOne({driverID: driverID});
        if (!driver) {
            return res.status(404).json({message: 'Driver not found'});
        }
        if (driverFirstAndLastName) driver.driverFirstAndLastName = driverFirstAndLastName;
        if (driverEmail) driver.driverEmail = driverEmail;
        if (driverPhoneNumber) driver.driverPhoneNumber = driverPhoneNumber;
        await driver.save();
        res.json(driver);
    } catch (error) {
        console.error('Error updating shipper:', error);
        res.status(500).json({message: error.message});
    }
});

app.put('/update-carrier/:carrierID', async (req, res) => {
    const {carrierID} = req.params;
    const {name, secondName, phoneNumber, email, companyName, dotNumber} = req.body;

    try {
        const carrier = await Carrier.findOne({carrierID: carrierID});
        if (!carrier) {
            return res.status(404).json({message: 'Carrier not found'});
        }

        if (name) carrier.carrierAccountName = name;
        if (secondName) carrier.carrierAccountLastName = secondName;
        if (phoneNumber) carrier.carrierCorporatePhoneNumber = phoneNumber;
        if (email) carrier.carrierAccountAccountEmail = email;
        if (companyName) carrier.carrierContactCompanyName = companyName;
        if (dotNumber) carrier.carrierDotNumber = dotNumber;

        await carrier.save();
        res.json(carrier);
    } catch (error) {
        console.error('Error updating carrier:', error);
        res.status(500).json({message: error.message});
    }
});

app.post('/upload-carrier-avatar/:carrierID', upload.single('avatar'), async (req, res) => {
    const {carrierID} = req.params;

    try {
        if (!req.file) {
            return res.status(400).json({message: 'No file uploaded'});
        }
        const avatarPath = `uploads/${req.file.filename}`;
        const carrier = await Carrier.findOneAndUpdate(
            {carrierID: carrierID},
            {carrierAvatar: avatarPath},
            {new: true}
        );

        if (!carrier) {
            return res.status(404).json({message: 'Carrier not found'});
        }

        res.json(carrier);
    } catch (error) {
        console.error('Error uploading avatar:', error);
        res.status(500).json({message: error.message});
    }
});

app.get('/get-carrier-avatar/:carrierID', async (req, res) => {
    try {
        const carrier = await Carrier.findOne({ carrierID: req.params.carrierID });
        if (!carrier) {
            return res.status(404).json({ message: 'Carrier not found' });
        }
        res.json({ carrierAvatar: carrier.carrierAvatar });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/get-shipper-avatar/:shipperID', async (req, res) => {
    try {
        const shipper = await Shipper.findOne({userShipperID: req.params.shipperID});
        if (!shipper || !shipper.userShipperAvatar) {
            return res.status(404).json({message: 'Shipper or avatar not found'});
        }
        const imagePath = path.join(__dirname, shipper.userShipperAvatar);
        console.log('Attempting to serve image from:', imagePath); // Log the constructed path
        if (fs.existsSync(imagePath)) {
            res.sendFile(imagePath);
        } else {
            res.status(404).json({message: 'Image file not found'});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

app.get('/get-driver-avatar/:driverID', async (req, res) => {
    try {
        const driver = await Driver.findOne({driverID: req.params.driverID});
        if (!driver || !driver.driverAvatar) {
            return res.status(404).json({message: 'Driver or avatar not found'});
        }
        const imagePath = path.join(__dirname, driver.driverAvatar);
        console.log('Attempting to serve image from:', imagePath);
        if (fs.existsSync(imagePath)) {
            res.sendFile(imagePath);
        } else {
            res.status(404).json({message: 'Image file not found'});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

app.put('/update-shipper/:shipperID', async (req, res) => {
    const {shipperID} = req.params;
    const {name, secondName, phoneNumber, email} = req.body;
    try {
        const shipper = await Shipper.findOne({userShipperID: shipperID});
        if (!shipper) {
            return res.status(404).json({message: 'Shipper not found'});
        }
        if (name) shipper.userShipperName = name;
        if (secondName) shipper.userShipperSecondName = secondName;
        if (phoneNumber) shipper.userShipperPhoneNumber = phoneNumber;
        if (email) shipper.userShipperEmail = email;
        await shipper.save();
        res.json(shipper);
    } catch (error) {
        console.error('Error updating shipper:', error);
        res.status(500).json({message: error.message});
    }
});

app.get('/get-all-loads', async (req, res) => {
    try {
        const loads = await Load.find();
        res.json(loads);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/create-deal-chat-conversation', async (req, res) => {
    const {chatID, loadID, shipperID, carrierID} = req.body;

    try {
        const newChat = new DealChatConversation({
            chatID,
            loadID,
            shipperID,
            carrierID
        });

        await newChat.save();
        res.status(200).json({message: 'DealChatConversation created successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error creating DealChatConversation:', error});
    }
});

app.delete('/delete-all-loads', async (req, res) => {
    try {
        await Load.deleteMany({});
        res.status(200).send('All loads deleted successfully');
    } catch (error) {
        console.error('Error deleting loads:', error);
        res.status(500).send('Error deleting loads');
    }
});

app.post('/subscribe-carrier', async (req, res) => {
    const {email, name, phoneNumber, company} = req.body;

    const newCarrier = new SubscribedCarriers({
        email,
        name,
        phoneNumber,
        company
    });

    try {
        await newCarrier.save();
        res.status(200).json({message: 'Shipper subscribed successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error subscribing shipper', error: error.message});
    }
});

app.post('/subscribe-shipper', async (req, res) => {
    const {email, name, phoneNumber} = req.body;

    const newShipper = new SubscribedShippers({
        email,
        name,
        phoneNumber,
    });

    try {
        await newShipper.save();
        res.status(200).json({message: 'Shipper subscribed successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error subscribing shipper', error: error.message});
    }
});
app.post('/subscribe-user', async (req, res) => {
    const {email, phoneNumber, name} = req.body;

    try {
        const user = new SubscribedUsers({email, phoneNumber, name});
        await user.save();

        res.status(201).json({message: 'User subscribed successfully'});
    } catch (error) {
        res.status(500).json({error: 'An error occurred while subscribing the user'});
    }
});

app.post('/upload-photos', upload.array('images'), async (req, res) => {
    try {
        const images = req.files.map(file => {
            return new Photo({
                url: file.path,
                text: req.body.text,
                userEmail: req.body.userEmail
            });
        });

        await Photo.insertMany(images);

        res.status(200).send('Images uploaded successfully');
    } catch (error) {
        console.error('Error uploading images: ', error);
        res.status(500).send('Error uploading images');
    }
});

app.get('/get-all-deal-chat-conversation/:chatID', async (req, res) => {
    const {chatID} = req.params;
    try {
        const dealChatConversation = await DealChatConversation.find({chatID: chatID});
        if (dealChatConversation.length === 0) {
            return res.status(404).json({message: 'No conversation found for this chatID'});
        }
        res.json(dealChatConversation);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
app.get('/get-confirmed-load/:loadID', async (req, res) => {
    const {loadID} = req.params;

    try {
        const confirmedLoad = await ConfirmedLoad.findOne({loadID: loadID});

        if (!confirmedLoad) {
            return res.status(404).json({message: 'No confirmed load found for this loadID'});
        }

        res.status(200).json(confirmedLoad);
    } catch (error) {
        res.status(500).json({error: 'There was an error fetching the confirmed load'});
    }
});

app.get('/get-deal-chat-conversation/:chatID', async (req, res) => {
    try {
        const conversation = await DealChatConversation.findOne({chatID: req.params.chatID});
        res.status(200).send(conversation);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/get-deal-chat-conversation/:chatID', async (req, res) => {
    const {chatID} = req.params;

    try {
        const dealChatConversation = await DealChatConversation.findOne({chatID: chatID});
        if (dealChatConversation) {
            res.json(dealChatConversation);
        } else {
            res.status(404).json({message: 'DealChatConversation not found'});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

app.get('/get-load-by-chat/:chatID', async (req, res) => {
    const {chatID} = req.params;

    try {
        const dealChatConversation = await DealChatConversation.findOne({chatID: chatID});

        if (!dealChatConversation) {
            return res.status(404).json({message: 'Chat not found'});
        }

        const load = await Load.findOne({loadCredentialID: dealChatConversation.loadID});

        if (!load) {
            return res.status(404).json({message: 'Load not found'});
        }

        res.json(load);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/get-load-confirmation/:loadID', async (req, res) => {
    const {loadID} = req.params;

    try {
        const load = await Load.findOne({loadID: loadID});
        if (load) {
            res.json({loadCarrierConfirmation: load.loadCarrierConfirmation});
        } else {
            res.status(404).json({message: 'Load not found'});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

app.get('/get-load-by-chat/:chatID', async (req, res) => {
    try {
        const chatID = req.params.chatID;
        const dealChatConversation = await DealChatConversation.findOne({chatID: chatID});
        const load = await Load.findOne({loadID: dealChatConversation.loadID});
        res.json(load);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

app.put('/confirm-load/:chatID', async (req, res) => {
    try {
        console.log(`Fetching DealChatConversation with chatID: ${req.params.chatID}`);
        const dealChatConversation = await DealChatConversation.findOne({chatID: req.params.chatID});
        if (!dealChatConversation) {
            console.log(`DealChatConversation with chatID: ${req.params.chatID} not found`);
            return res.status(404).json({message: 'DealChatConversation not found'});
        }
        console.log(`Fetching Load with loadID: ${dealChatConversation.loadID}`);
        const load = await Load.findOne({loadCredentialID: dealChatConversation.loadID});
        if (!load) {
            console.log(`Load with loadID: ${dealChatConversation.loadID} not found`);
            return res.status(404).json({message: 'Load not found'});
        }
        console.log(`Updating loadCarrierConfirmation for Load with loadID: ${dealChatConversation.loadID}`);
        load.loadCarrierConfirmation = 'Confirmed';
        await load.save();
        console.log(`Load with loadID: ${dealChatConversation.loadID} updated successfully`);
        res.status(200).json({message: 'Load confirmed successfully'});
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({message: 'Server error'});
    }
});

app.post('/submit-bid', async (req, res) => {
    const {commercialLoadID, bid, loadType, pickupLocation, deliveryLocation, carrierID, assignedDriver} = req.body;
    const newBid = new Bid({
        commercialLoadID,
        bid,
        loadType,
        pickupLocation,
        deliveryLocation,
        carrierID,
        assignedDriver
    });
    try {
        await newBid.save();
        res.status(200).send({message: 'Bid submitted successfully'});
        console.log(newBid);
    } catch (error) {
        console.error(error);
        res.status(500).send({error: error.toString()});
    }
});

app.post('/create-deal-chat-conversation', async (req, res) => {
    const dealChatConversation = new DealChatConversation(req.body);
    try {
        await dealChatConversation.save();
        res.status(201).send(dealChatConversation);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/get-all-deal-chat-conversations', async (req, res) => {
    try {
        const conversations = await DealChatConversation.find();
        res.json(conversations);
    } catch (error) {
        res.json({message: error});
    }
});

app.get('/get-all-carriers', async (req, res) => {
    try {
        const carriers = await Carrier.find({});
        res.send(carriers);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/update-carrier-password/:carrierID', async (req, res) => {
    const {carrierID} = req.params;
    const {password} = req.body;
    try {
        const carrier = await Carrier.findOneAndUpdate(
            {carrierID: carrierID},
            {password: password},
            {new: true} // This option returns the updated document
        );

        if (!carrier) {
            return res.status(404).json({message: 'Carrier not found'});
        }

        res.status(200).json(carrier);
    } catch (error) {
        console.error('Error updating carrier password:', error);
        res.status(500).json({message: 'Server error'});
    }
});

app.get('/get-carrier-by-load/:commercialLoadID', async (req, res) => {
    try {
        const bid = await Bid.findOne({commercialLoadID: req.params.commercialLoadID});
        if (!bid) {
            return res.status(404).send();
        }
        const carrier = await Carrier.findOne({carrierID: bid.carrier});
        if (!carrier) {
            return res.status(404).send();
        }
        res.send(carrier);
    } catch (error) {
        res.status(500).send();
    }
});
app.get('/get-deal-chat-conversation/:chatID', async (req, res) => {
    try {
        const conversation = await DealChatConversation.findOne({chatID: req.params.chatID});
        res.json(conversation);
    } catch (error) {
        res.json({message: error});
    }
});

app.get('/get-user/:personalEndpoint', async (req, res) => {
    try {
        const user = await User.findOne({personalEndpoint: req.params.personalEndpoint});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
});

app.get('/get-user/:chatID', async (req, res) => {
    const {chatID} = req.params;
    try {
        const chatConversation = await DealChatConversation.findOne({chatID: chatID});
        if (!chatConversation) {
            return res.status(404).json({message: 'Chat conversation not found'});
        }
        const {personalEndpoint} = chatConversation;
        const user = await UserModel.findOne({personalEndpoint: personalEndpoint});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
});

app.post('/save-taken-load', (req, res) => {
    const {lat, lng, ...otherFields} = req.body;
    const takenLoad = new TakenLoad({
        ...otherFields,
        lat,
        lng
    });
    takenLoad.save()
        .then(() => res.json({status: 'Success'}))
        .catch(error => res.json({status: 'Error', message: error.message}));
});

app.post('/apply-bid', async (req, res) => {
    const bidData = req.body;
    const newBid = new SubmittedBid(bidData);
    try {
        await newBid.save();
        res.status(200).json({message: 'Bid submitted successfully'});
    } catch (error) {
        res.status(500).json({error: 'Error submitting bid'});
    }
});

app.get('/get-bid-statuses/:userID', async (req, res) => {
    const userID = req.params.userID;

    try {
        const bids = await SubmittedBid.find({userID: userID});
        const statuses = bids.map(bid => bid.status);
        res.status(200).json(statuses);
    } catch (error) {
        res.status(500).json({message: 'Error fetching bid statuses', error: error});
    }
});

app.get('/get-bid-statuses/:commercialLoadID', async (req, res) => {
    const commercialLoadID = req.params.commercialLoadID;

    try {
        const bids = await SubmittedBid.find({commercialLoadID: commercialLoadID});
        const statuses = bids.map(bid => bid.status);
        res.status(200).json(statuses);
    } catch (error) {
        res.status(500).json({message: 'Error fetching bid statuses', error: error});
    }
});
app.get('/get-bids-by-user/:userID', async (req, res) => {
    const userID = req.params.userID;

    try {
        const bids = await SubmittedBid.find({userID: userID});
        res.status(200).json(bids);
    } catch (error) {
        res.status(500).json({message: 'Error fetching bids:', error});
    }
});

app.get('/get-deal-chat-conversation/:chatID', async (req, res) => {
    const {chatID} = req.params;
    try {
        const dealChatConversation = await DealChatConversation.findOne({chatID: chatID});
        res.json(dealChatConversation);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
app.post('/save-chat-message', async (req, res) => {
    const {chatID, receiver, sender, text, date} = req.body;
    const message = new DealConversationChatHistoryMessage({chatID, receiver, sender, text, date});
    try {
        await message.save();
        res.status(200).json({message: 'Chat message saved successfully.'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Create the endpoint to fetch chat history by chatID
app.get('/get-chat-history/:chatID', async (req, res) => {
    const {chatID} = req.params;
    try {
        const chatHistory = await DealConversationChatHistoryMessage.find({chatID: chatID});
        res.json(chatHistory);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
app.get('/get-carrier-by-id/:carrierID', async (req, res) => {
    const {carrierID} = req.params;
    try {
        const carrier = await Carrier.findOne({_id: carrierID});
        res.json(carrier);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.put('/update-user/:personalEndpoint', async (req, res) => {
    const {personalEndpoint} = req.params;
    const updatedUser = req.body;

    try {
        const user = await UserModel.findOneAndUpdate(
            {personalEndpoint: personalEndpoint},
            updatedUser,
            {new: true} // This option returns the updated document
        );

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        res.json(user);
    } catch (error) {
        console.error('Error updating user data:', error);
        res.status(500).json({message: 'Server error'});
    }
});

app.get('/get-carrier/:carrierID', async (req, res) => {
    try {
        const carrier = await Carrier.findOne({carrierID: req.params.carrierID});
        res.json(carrier);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

app.delete('/delete-all-carriers', async (req, res) => {
    try {
        await Carrier.deleteMany({});
        res.status(200).send({status: 'Success', message: 'All carriers deleted successfully'});
    } catch (err) {
        res.status(500).send({status: 'Error', message: 'Failed to delete all carriers'});
    }
});
app.get('/get-bid/:commercialLoadID', async (req, res) => {
    const {commercialLoadID} = req.params;

    try {
        const bid = await Bid.findOne({commercialLoadID});

        if (!bid) {
            return res.status(404).json({message: 'No bid found for this commercialLoadID'});
        }

        res.status(200).json(bid);
    } catch (error) {
        res.status(500).json({error: 'There was an error fetching the bid'});
    }
});
app.post('/save-carrier-data', async (req, res) => {
    const carrierData = req.body;
    const newCarrier = new Carrier(carrierData);
    try {
        const savedCarrier = await newCarrier.save();
        res.json({status: 'Success', carrier: savedCarrier});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});

app.post('/save-shipper-data', async (req, res) => {
    const shipperData = req.body;
    const newShipper = new Shipper(shipperData);
    try {
        const savedShipper = await newShipper.save();
        res.json({status: 'Success', shipper: savedShipper});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});

app.post('/save-load-data', async (req, res) => {
    console.log('Received request to /save-load-data');
    const loadData = req.body;
    console.log('Request body:', loadData);
    const newLoad = new Load(loadData);
    try {
        const savedLoad = await newLoad.save();
        console.log('Saved load:', savedLoad);
        res.json({status: 'Success', load: savedLoad});
    } catch (error) {
        console.error('Error saving load:', error);
        res.status(500).json({status: 'Error', message: error.message});
    }
});

app.post('/api/save-signature', (req, res) => {
    const newSignature = new Signature({
        imgData: req.body.imgData,
        userEndpoint: req.body.userEndpoint,
        email: req.body.email,
        signed: true,
    });

    newSignature.save()
        .then(() => res.json('Signature saved!'))
        .catch(err => res.status(400).json('Error: ' + err));
});
app.get('/api/get-all-signatures', (req, res) => {
    Signature.find()
        .then(signatures => {
            res.json(signatures);
        })
        .catch(err => {
            res.status(500).json({message: err.message});
        });
});
app.get('/schema-data/:schemaName', async (req, res) => {
    const {schemaName} = req.params;

    try {
        // Get the Mongoose model for the specified schema
        const Model = mongoose.model(schemaName);

        // Fetch all documents of the schema
        const documents = await Model.find();

        // Send the documents as the response
        res.status(200).json(documents);
    } catch (error) {
        console.error(`Error fetching documents of schema ${schemaName}:`, error);
        res.status(500).json({message: 'Server error'});
    }
});
app.post('/submit-office-moving', async (req, res) => {
    const movingData = req.body;
    const newMoving = new OfficeMoving(movingData);
    try {
        const savedMoving = await newMoving.save();
        res.json({status: 'Success', moving: savedMoving});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});
app.post('/submit-student-moving', async (req, res) => {
    const movingData = req.body;
    const newMoving = new StudentMoving(movingData);
    try {
        await newMoving.save();
        res.status(200).json({status: 'Success', data: newMoving});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});

app.get('/get-student-moving/:personalEndpoint', async (req, res) => {
    const {personalEndpoint} = req.params;
    try {
        const moving = await StudentMoving.find({userEndpoint: personalEndpoint});
        res.status(200).json({status: 'Success', data: moving});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});
app.post('/submit-military-moving', async (req, res) => {
    const movingData = req.body;
    const newMoving = new CarOrLightTruckLoad(movingData);
    try {
        await newMoving.save();
        res.status(200).json({status: 'Success', data: newMoving});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});
app.get('/user-loads', async (req, res) => {
    try {
        const userLoads = await MilitaryMoving.find(); // Replace LoadModel with your actual Mongoose model
        res.status(200).json(userLoads);
    } catch (error) {
        console.error('Error fetching user loads:', error);
        res.status(500).json({message: 'Server error'});
    }
});
app.get('/get-military-moving/:personalEndpoint', async (req, res) => {
    const {personalEndpoint} = req.params;
    try {
        const moving = await MilitaryMoving.find({userEndpoint: personalEndpoint});
        res.status(200).json({status: 'Success', data: moving});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});
app.post('/submit-corporate-moving', async (req, res) => {
    const movingData = req.body;
    const newMoving = new CorporateMoving(movingData);
    try {
        await newMoving.save();
        res.status(200).json({status: 'Success', data: newMoving});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});

app.get('/get-corporate-moving/:personalEndpoint', async (req, res) => {
    const {personalEndpoint} = req.params;
    try {
        const moving = await CorporateMoving.find({userEndpoint: personalEndpoint});
        res.status(200).json({status: 'Success', data: moving});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});

app.post('/submit-moving-and-storage-service', async (req, res) => {
    const movingData = req.body;
    const newMoving = new MovingAndStorageService(movingData);
    try {
        const savedMoving = await newMoving.save();
        res.json({status: 'Success', moving: savedMoving});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});


app.post('/submit-auto-moto-boat-equipment', async (req, res) => {
    const equipmentData = req.body;
    const newEquipment = new AutoMotoBoatEquipment(equipmentData);
    try {
        await newEquipment.save();
        res.status(200).json({status: 'Success', data: newEquipment});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});

app.get('/get-auto-moto-boat-equipment/:personalEndpoint', async (req, res) => {
    const {personalEndpoint} = req.params;
    try {
        const equipment = await AutoMotoBoatEquipment.find({userEndpoint: personalEndpoint});
        res.status(200).json({status: 'Success', data: equipment});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});
app.get('/get-moving-and-storage-service', async (req, res) => {
    try {
        const moving = await MovingAndStorageService.find();
        res.json({status: 'Success', moving: moving});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});
app.post('/submit-heavy-lifting-and-moving-only', async (req, res) => {
    const movingData = req.body;
    const newMoving = new HeavyLiftingAndMovingOnly(movingData);
    try {
        const savedMoving = await newMoving.save();
        res.json({status: 'Success', moving: savedMoving});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});

app.get('/get-heavy-lifting-and-moving-only', async (req, res) => {
    try {
        const moving = await HeavyLiftingAndMovingOnly.find();
        res.json({status: 'Success', moving: moving});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});
app.get('/get-office-moving', async (req, res) => {
    try {
        const moving = await OfficeMoving.find();
        res.json({status: 'Success', moving: moving});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});
app.post('/submit-other', async (req, res) => {
    const otherData = req.body;
    const newOther = new Other(otherData);
    try {
        const savedOther = await newOther.save();
        res.json({status: 'Success', other: savedOther});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});
app.post('/submit-international-moving', async (req, res) => {
    const movingData = req.body;
    const newMoving = new InternationalMoving(movingData);
    try {
        const savedMoving = await newMoving.save();
        res.json({status: 'Success', moving: savedMoving});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});
app.post('/submit-commercial-business-moving', async (req, res) => {
    const movingData = req.body;
    const newMoving = new CommercialBusinessMoving(movingData);
    try {
        const savedMoving = await newMoving.save();
        res.json({status: 'Success', moving: savedMoving});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});

app.get('/get-commercial-business-moving', async (req, res) => {
    try {
        const moving = await CommercialBusinessMoving.find();
        res.json({status: 'Success', moving: moving});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});
app.get('/get-international-moving', async (req, res) => {
    try {
        const moving = await InternationalMoving.find();
        res.json({status: 'Success', moving: moving});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});
app.get('/get-other', async (req, res) => {
    try {
        const other = await Other.find();
        res.json({status: 'Success', other: other});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});
app.post('/submit-free-consultation', async (req, res) => {
    const consultationData = req.body;
    const newConsultation = new FreeConsultation(consultationData);
    try {
        const savedConsultation = await newConsultation.save();
        res.json({status: 'Success', consultation: savedConsultation});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});
app.post('/submit-long-distance-moving', async (req, res) => {
    const movingData = req.body;
    const newMoving = new LongDistanceMoving(movingData);
    try {
        const savedMoving = await newMoving.save();
        res.json({status: 'Success', moving: savedMoving});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});

app.get('/get-load-id/:chatID', async (req, res) => {
    const {chatID} = req.params;
    try {
        const chatSession = await DealChatConversation.findOne({chatID: chatID});
        if (!chatSession) {
            return res.status(404).json({message: 'Chat session not found'});
        }
        const loadID = chatSession.loadID;
        res.status(200).json({loadID});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/get-long-distance-moving', async (req, res) => {
    try {
        const moving = await LongDistanceMoving.find();
        res.json({status: 'Success', moving: moving});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});
app.get('/get-free-consultations', async (req, res) => {
    try {
        const consultations = await FreeConsultation.find();
        res.json({status: 'Success', consultations: consultations});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});
app.post('/submit-ftl-load', async (req, res) => {
    const ftlLoad = new FTLLoad(req.body);
    try {
        await ftlLoad.save();
        res.status(200).send({ftlLoad});
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/get-ftl-load', async (req, res) => {
    try {
        const ftlLoad = await FTLLoad.find({});
        res.status(200).send({ftlLoad});
    } catch (error) {
        res.status(500).send(error);
    }
});
app.get('/hello', (req, res) => {
    res.send('Express server is running');
});

app.get('/test', (req, res) => {
    res.send('testing endpoint');
});

app.post('/submit-moto-equipment-load', async (req, res) => {
    const motoEquipmentData = req.body;
    const newMotoEquipmentLoad = new MotoEquipmentLoad(motoEquipmentData);
    try {
        const savedMotoEquipmentLoad = await newMotoEquipmentLoad.save();
        res.json({status: 'Success', load: savedMotoEquipmentLoad});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});
// backend/server/mongodb.js


app.get('/get-heavy-equipment-loads', async (req, res) => {
    try {
        const heavyEquipmentLoads = await HeavyEquipmentLoad.find();
        res.json({status: 'Success', loads: heavyEquipmentLoads});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});
app.post('/submit-construction-equipment-load', async (req, res) => {
    const constructionEquipmentData = req.body;
    const newConstructionEquipmentLoad = new ConstructionEquipmentLoad(constructionEquipmentData);
    try {
        const savedConstructionEquipmentLoad = await newConstructionEquipmentLoad.save();
        res.json({status: 'Success', load: savedConstructionEquipmentLoad});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});
app.get('/get-construction-equipment-loads', async (req, res) => {
    try {
        const constructionEquipmentLoads = await ConstructionEquipmentLoad.find();
        res.json({status: 'Success', loads: constructionEquipmentLoads});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});

app.post('/submit-boat-load', async (req, res) => {
    const boatLoadData = req.body;
    const newBoatLoad = new BoatLoad(boatLoadData);
    try {
        const savedBoatLoad = await newBoatLoad.save();
        res.json({status: 'Success', load: savedBoatLoad});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});
app.post('/submit-expedite-load', async (req, res) => {
    const expediteLoadData = req.body;
    const newExpediteLoad = new ExpediteLoad(expediteLoadData);
    try {
        const savedExpediteLoad = await newExpediteLoad.save();
        res.json({status: 'Success', load: savedExpediteLoad});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});
app.get('/get-expedite-loads', async (req, res) => {
    try {
        const expediteLoads = await ExpediteLoad.find();
        res.json({status: 'Success', loads: expediteLoads});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});

app.post('/create-driver', async (req, res) => {
    const driverData = req.body;
    try {
        const existingDriver = await Driver.findOne({driverEmail: driverData.driverEmail});
        if (existingDriver) {
            return res.status(400).json({status: 'Error', message: 'Driver with this email already exists'});
        }
        const newDriver = new Driver(driverData);
        const savedDriver = await newDriver.save();
        res.status(200).json({status: 'Success', driver: savedDriver});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({status: 'Error', message: error.message});
    }
});

app.get('/get-driver/:driverID', async (req, res) => {
    const {driverID} = req.params;
    try {
        const driver = await Driver.findOne({driverID: driverID});
        if (!driver) {
            return res.status(404).json({message: 'Driver not found'});
        }
        res.json(driver);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.put('/update-driver-info/:driverID', async (req, res) => {
    const { driverID } = req.params;
    const { driverLicenceClass, driverTruck, driverInsurance } = req.body;
    try {
        const driver = await Driver.findOne({ driverID });
        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        driver.driverLicenceClass = driverLicenceClass;
        driver.driverTruck = driverTruck;
        driver.driverInsurance = driverInsurance;
        await driver.save();
        res.json({ message: 'Driver information updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/update-load-assigning/:loadID', async (req, res) => {
    const {loadID} = req.params;
    const {loadAssignedDriverID} = req.body;

    try {
        const load = await Load.findOne({loadCredentialID: loadID});
        if (!load) {
            return res.status(404).json({message: 'Load not found'});
        }

        load.loadAssignedDriverID = loadAssignedDriverID;
        await load.save();

        res.status(200).json(load);
    } catch (error) {
        console.error('Error updating load:', error);
        res.status(500).json({message: error.message});
    }
});

app.get('/get-load/:loadID', async (req, res) => {
    const {loadID} = req.params;
    try {
        const load = await Load.findOne({loadCredentialID: loadID});
        if (!load) {
            return res.status(404).json({message: 'Load not found'});
        }
        res.json(load);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/get-assigned-loads/:driverID', async (req, res) => {
    const {driverID} = req.params;
    try {
        const assignedLoads = await Load.find({driverID: driverID});
        res.status(200).json(assignedLoads);
    } catch (error) {
        console.error('Error fetching assigned loads:', error);
        res.status(500).json({message: error.message});
    }
});

app.get('/get-all-taken-loads', async (req, res) => {
    try {
        const takenLoads = await TakenLoad.find();
        res.status(200).json(takenLoads);
    } catch (error) {
        console.error('Error fetching all taken loads:', error);
        res.status(500).json({message: 'Server error'});
    }
});

app.get('/get-drivers', async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
app.get('/get-boat-loads', async (req, res) => {
    try {
        const boatLoads = await BoatLoad.find();
        res.json({status: 'Success', loads: boatLoads});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});


app.get('/get-all-drivers', async (req, res) => {
    try {
        const drivers = await Driver.find({});
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.put('/assign-load/:driverID', async (req, res) => {
    const {driverID} = req.params;
    const {loadID} = req.body;

    try {
        const driver = await Driver.findOne({driverID: driverID});

        if (!driver) {
            return res.status(404).json({message: 'Driver not found'});
        }

        // Add the loadID to the driver's assigned loads
        driver.driverAssignedLoadsID.push(loadID);

        // Save the updated driver
        await driver.save();

        res.status(200).json({message: 'Load assigned successfully to driver', driver: driver});
    } catch (error) {
        console.error('Error assigning load to driver:', error);
        res.status(500).json({message: error.message});
    }
});

app.get('/get-bids-by-driver/:driverID', async (req, res) => {
    const {driverID} = req.params;
    try {
        const bids = await SubmittedBid.find({driverID: driverID, assignedDriver: driverID});
        res.status(200).json(bids);
    } catch (error) {
        res.status(500).send('Error fetching bids');
    }
});

app.delete('/delete-driver/:driverID', async (req, res) => {
    try {
        const driver = await Driver.findOneAndDelete({driverID: req.params.driverID});

        if (!driver) return res.status(404).send();
        res.send(driver);
    } catch (error) {
        res.status(500).send();
    }
});
app.get('/get-commercial-truck-loads', async (req, res) => {
    try {
        const commercialTruckLoads = await CommercialTruckLoad.find();
        res.json({status: 'Success', loads: commercialTruckLoads});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});
app.get('/get-last-carrier', (req, res) => {
    Carrier.find().sort({_id: -1}).limit(1)
        .then(carrier => {
            if (carrier) {
                res.json({
                    status: "Success",
                    carrier: carrier
                });
            } else {
                res.json({
                    status: "Error",
                    message: "No carriers found"
                });
            }
        })
        .catch(err => {
            res.json({
                status: "Error",
                message: err.message
            });
        });
});

app.get('/get-all-submitted-bids', async (req, res) => {
    try {
        const bids = await SubmittedBid.find();
        res.json(bids);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/user/:personalEndpoint', (req, res) => {
    const {personalEndpoint} = req.params;

    UserModel.findOne({personalEndpoint: personalEndpoint})
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({message: 'User not found'});
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message});
        });
});

app.get('/user-by-email/:email', (req, res) => {
    const {email} = req.params;

    UserModel.findOne({email: email})
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({message: 'User not found'});
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message});
        });
});

app.get('/all-users', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({message: 'Server error'});
    }
});

app.get('/get-moto-equipment-loads', async (req, res) => {
    try {
        const motoEquipmentLoads = await MotoEquipmentLoad.find();
        res.json({status: 'Success', loads: motoEquipmentLoads});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});
app.post('/submit-commercial-truck-load', async (req, res) => {
    const commercialTruckData = req.body;
    const newCommercialTruckLoad = new CommercialTruckLoad(commercialTruckData);
    try {
        const savedCommercialTruckLoad = await newCommercialTruckLoad.save();
        res.json({status: 'Success', load: savedCommercialTruckLoad});
    } catch (error) {
        res.status(500).json({status: 'Error', message: error.message});
    }
});

app.put('/update-load-price/:commercialLoadID', async (req, res) => {
    const commercialLoadID = req.params.commercialLoadID;
    const newPrice = req.body.commercialTruckLoadPrice;
    try {
        const updatedLoad = await CommercialTruckLoad.findOneAndUpdate(
            {commercialLoadID: commercialLoadID},
            {commercialTruckLoadPrice: newPrice},
            {new: true}
        );

        res.status(200).json(updatedLoad);
    } catch (error) {
        res.status(500).json({error: 'An error occurred while updating the load price.'});
    }
});
app.post('/create-chat-session', (req, res) => {
    const {userEndpoint} = req.body;
    const newChatSession = new ChatHistory({
        userEndpoint: userEndpoint,
        chatEndpoint: generatePersonalEndpoint(),
        chats: []
    });

    newChatSession.save()
        .then(chatSession => {
            res.json({status: 'Success', chatEndpoint: chatSession.chatEndpoint});
        })
        .catch(err => {
            console.error('Error creating chat session:', err);
            res.status(500).json({status: 'Error', message: err.message});
        });
});
app.post('/create-checkout-session', async (req, res) => {
    const {amount} = req.body;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Commercial Truck Load',
                },
                unit_amount: amount * 100,
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: 'https://dashboard.stripe.com/test/apikeys',
        cancel_url: 'https://dashboard.stripe.com/test/apikeys',
    });

    res.json({sessionId: session.id});
});

app.put('/load-update-delivered-status/:loadID', async (req, res) => {
    const loadID = req.params.loadID;
    const {loadDeliveredStatus} = req.body;

    try {
        const load = await Load.findOne({loadCredentialID: loadID});
        if (!load) {
            return res.status(404).json({message: 'Load not found'});
        }
        load.loadDeliveredStatus = loadDeliveredStatus;
        await load.save();
        res.status(200).json({message: 'Load status updated successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

app.put('/update-load-payment-status/:chatID', async (req, res) => {
    try {
        const chatID = req.params.chatID;
        const dealChatConversation = await DealChatConversation.findOne({chatID: chatID});
        const loadID = dealChatConversation.loadID;
        const load = await Load.findOne({loadCredentialID: loadID});
        load.loadPaymentStatus = "Paid";
        await load.save();
        res.json({message: "Load payment status updated successfully"});
    } catch (error) {
        console.error('Error updating load payment status:', error);
        res.status(500).json({message: "Internal server error"});
    }
});

app.post('/create-checkout-session-2', async (req, res) => {

    const {amount, loadType, description, shipperID, chatID} = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: (loadType + (description))
                    },
                    unit_amount: amount * 100, // Stripe expects the amount in cents
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `http://localhost:3000/payment-success/${shipperID}/${chatID}`,
            cancel_url: 'http://localhost:3000/payment-failed',
        });

        res.json({sessionId: session.id});
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({error: 'An error occurred while creating the checkout session.'});
    }
});

app.post('/save-confirmed-arrival', async (req, res) => {
    const {loadID, status, payment} = req.body;
    try {
        const confirmedLoad = new ConfirmedLoad({
            loadID,
            status,
            payment
        });
        const savedConfirmedLoad = await confirmedLoad.save();
        res.json({
            status: 'Success',
            message: 'Data saved successfully',
            data: savedConfirmedLoad
        });
    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: 'Error saving data',
            error: error.message
        });
    }
});
app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({message: 'Server error'});
    }
});

app.post('/submit-vehicle-load', async (req, res) => {
    try {
        const newLoad = new CarOrLightTruckLoad(req.body); // Use the new model here
        await newLoad.save();
        res.status(200).json({message: 'Vehicle load submitted successfully', load: newLoad});
    } catch (error) {
        console.error('Error submitting vehicle load:', error);
        res.status(500).json({message: error.message});
    }
});


app.get('/submit-vehicle-load/:personalEndpoint', async (req, res) => {
    const {personalEndpoint} = req.params;
    const vehicleLoads = await CarOrLightTruckLoad.find({userEndpoint: personalEndpoint});
    if (vehicleLoads) {
        res.json(vehicleLoads);
    } else {
        res.status(404).json({message: 'No vehicle loads found for this user.'});
    }
});

app.get('/vehicle-load/:personalEndpoint', async (req, res) => {
    const {personalEndpoint} = req.params;
    const vehicleLoads = await VehicleLoad.find({userEndpoint: personalEndpoint});
    if (vehicleLoads) {
        res.json(vehicleLoads);
    } else {
        res.status(404).json({message: 'No vehicle loads found for this user.'});
    }
});


app.post('/chat-history', (req, res) => {
    const {userName, userEndpoint, chat} = req.body;

    ChatHistory.findOneAndUpdate(
        {userEndpoint: userEndpoint},
        {$push: {chats: chat}, userName: userName},
        {upsert: true, new: true, setDefaultsOnInsert: true}
    ).then(chatHistory => {
        res.json({status: 'Success', chatHistory: chatHistory});
    }).catch(err => {
        res.json({status: 'Error', message: err});
    });
});


const API_KEY = process.env.API_KEY
app.post('/completions', async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{role: "assistant", content: req.body.message}],
            max_tokens: 1000,
        })
    }
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", options)
        const data = await response.json()
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})

app.get('/chat-session/:chatEndpoint', (req, res) => {
    const {chatEndpoint} = req.params;

    ChatHistory.findOne({chatEndpoint: chatEndpoint})
        .then(chatSession => {
            if (chatSession) {
                res.json(chatSession);
            } else {
                res.status(404).json({message: 'Chat session not found'});
            }
        })
        .catch(err => {
            console.error('Error fetching chat session:', err);
            res.status(500).json({message: err.message});
        });
});

app.delete('/delete-all-chat-sessions/:personalEndpoint', (req, res) => {
    const {personalEndpoint} = req.params;

    ChatHistory.deleteMany({userEndpoint: personalEndpoint})
        .then(() => {
            res.status(200).json({message: 'All chat sessions deleted'});
        })
        .catch(err => {
            console.error('Error deleting chat sessions:', err);
            res.status(500).json({message: err.message});
        });
});

app.delete('/user-email/:email', (req, res) => {
    const email = req.params.email;

    UserModel.findOneAndDelete({email: email})
        .then(() => {
            res.status(200).json({message: 'User deleted successfully'});
        })
        .catch(err => {
            console.error('Error deleting user:', err);
            res.status(500).json({message: err.message});
        });
});

app.get('/user-chat-sessions/:personalEndpoint', (req, res) => {
    const {personalEndpoint} = req.params;

    // Assuming ChatHistory model has a 'userEndpoint' field
    ChatHistory.find({userEndpoint: personalEndpoint})
        .then(chatSessions => {
            res.json({chatSessions: chatSessions});
        })
        .catch(err => {
            console.error('Error fetching chat sessions:', err);
            res.status(500).json({message: err.message});
        });
});

app.post('/chat-message', (req, res) => {
    const {userEndpoint, chatEndpoint, chat} = req.body;
    ChatHistory.findOneAndUpdate(
        {userEndpoint: userEndpoint, chatEndpoint: chatEndpoint},
        {$push: {chats: chat}},
        {upsert: true, new: true}
    ).then(chatHistory => {
        res.json({status: 'Success', chatHistory: chatHistory});
    }).catch(err => {
        res.status(500).json({status: 'Error', message: err.message});
    });
});

app.put('/approve-agreement/:chatID', async (req, res) => {
    const chatID = req.params.chatID;
    const chatConversation = await DealChatConversation.findById(chatID);
    chatConversation.approvalStatus[req.user.id] = true;
    await chatConversation.save();
    if (Object.values(chatConversation.approvalStatus).every(status => status)) {
        const load = await Load.findById(chatConversation.loadID);
        load.loadStatus = "Booked";
        await load.save();
    }
    res.sendStatus(200);
});

app.get('/get-shipper/:shipperID', async (req, res) => {

    const {shipperID} = req.params;

    try {
        const shipper = await Shipper.findOne({userShipperID: shipperID});
        if (shipper) {
            res.json(shipper);
        } else {
            res.status(404).json({message: 'Shipper not found'});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

app.get('/get-deal-conversation-chat/:chatID', async (req, res) => {
    const {chatID} = req.params;

    try {
        const dealConversationChat = await DealChatConversation.findOne({chatID: chatID});
        if (dealConversationChat) {
            const carrier = await Carrier.findOne({carrierID: dealConversationChat.carrierID});
            if (carrier) {
                res.json(carrier);
            } else {
                res.status(404).json({message: 'Carrier not found'});
            }
        } else {
            res.status(404).json({message: 'DealConversationChat not found'});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

app.put('/confirm-load/:loadID', async (req, res) => {
    try {
        const load = await Load.findOne({loadID: req.params.loadID});
        if (!load) {
            return res.status(404).json({message: 'Load not found'});
        }
        load.loadCarrierConfirmation = req.body.loadCarrierConfirmation;
        await load.save();
        res.status(200).json(load);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

app.get('/chat-session/:chatEndpoint', (req, res) => {
    const {chatEndpoint} = req.params;

    ChatHistory.findOne({chatEndpoint: chatEndpoint})
        .then(chatSession => {
            if (chatSession) {
                res.json(chatSession);
            } else {
                res.status(404).json({message: 'Chat session not found'});
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message});
        });
});

app.get('/chat-histories/:personalEndpoint', (req, res) => {
    const {personalEndpoint} = req.params;

    ChatHistory.find({userEndpoint: personalEndpoint})
        .then(chatHistories => {
            if (chatHistories) {
                res.json(chatHistories); // Send the chat histories as JSON
            } else {
                res.status(404).json({message: 'Chat histories not found'}); // Chat histories not found
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message}); // Server error
        });
});

app.get('/chat-history/:personalEndpoint', (req, res) => {
    const {personalEndpoint} = req.params;

    ChatHistory.findOne({userEndpoint: personalEndpoint})
        .then(chatHistory => {
            if (chatHistory) {
                res.json(chatHistory); // Send the chat history as JSON
            } else {
                res.status(404).json({message: 'Chat history not found'}); // Chat history not found
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message}); // Server error
        });
});
app.post('/save-chat', (req, res) => {
    const {chatEndpoint, chat} = req.body;

    ChatHistory.findOneAndUpdate(
        {chatEndpoint: chatEndpoint},
        {$push: {chats: chat}},
        {new: true}
    ).then(updatedChatHistory => {
        res.json({status: 'Success', updatedChatHistory});
    }).catch(err => {
        console.error('Error updating chat session:', err);
        res.status(500).json({status: 'Error', message: err.message});
    });
});
app.post('/sign-up', (req, res) => {
    const {name, secondName, phoneNumber, email, password} = req.body;
    const personalEndpoint = generatePersonalEndpoint();
    const newUser = new UserModel({
        name,
        secondName,
        phoneNumber,
        email,
        password,
        personalEndpoint,
    });

    newUser
        .save()
        .then(() => {
            res.json({status: 'Success', message: 'User registered successfully'});
        })
        .catch((err) => {
            console.error('Error during registration:', err);
            res.json({status: 'Error', message: err});
        });
});

app.get('/get-current-user/:userRole/:userID', async (req, res) => {
    const {userRole, userID} = req.params;

    try {
        let user;

        switch (userRole) {
            case 'shipper':
                user = await Shipper.findOne({userShipperID: userID});
                break;
            case 'carrier':
                user = await Carrier.findOne({carrierID: userID});
                break;
            case 'driver':
                user = await Driver.findOne({driverID: userID});
                break;
            default:
                return res.status(400).json({message: 'Invalid user role'});
        }

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

//

app.post('/sign-in', async (req, res) => {
    const {email, password} = req.body;

    const [carrier, shipper, driver] = await Promise.all([
        Carrier.findOne({carrierAccountAccountEmail: email}),
        Shipper.findOne({userShipperEmail: email}),
        Driver.findOne({driverEmail: email})
    ]);

    if (carrier && carrier.carrierAccountPassword === password) {
        res.json({status: 'Success', role: 'carrier', id: carrier.carrierID});
    } else if (shipper && shipper.userShipperPassword === password) {
        res.json({status: 'Success', role: 'shipper', id: shipper.userShipperID});
    } else if (driver && driver.driverPassword === password) {
        res.json({status: 'Success', role: 'driver', id: driver.driverID});
    } else {
        res.json({status: 'Error', message: 'Invalid email or password'});
    }
});

/*WORKING CODE*/

/*app.post('/google-login', async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });

        const payload = ticket.getPayload();

        // Find or create user in your database
        const user = await UserModel.findOneAndUpdate(
            { email: payload['email'] },
            {
                email: payload['email'],
                name: payload['name'], // or any other details you want to save
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        res.json({ status: "Success", user: user });
    } catch (error) {
        console.error(error); // This will log the entire error to your server's console
        res.status(500).json({ status: "Error", message: error.message });
    }
});*/

app.post('/google-login', async (req, res) => {
    try {
        const {token} = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        // Generate a unique personal endpoint for the user
        const personalEndpoint = generatePersonalEndpoint();

        // Find or create user in your database with the personal endpoint
        const user = await UserModel.findOneAndUpdate(
            {email: payload['email']},
            {
                email: payload['email'],
                name: payload['name'],
                personalEndpoint, // Save the personal endpoint
            },
            {upsert: true, new: true, setDefaultsOnInsert: true}
        );
        res.json({status: "Success", user: user});
    } catch (error) {
        console.error(error);
        res.status(500).json({status: "Error", message: error.message});
    }
});


app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
});
