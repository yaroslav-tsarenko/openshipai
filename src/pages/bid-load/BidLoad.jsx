import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import Header from "../../components/landing-page-new/header/Header";
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";
import axios from 'axios';
import {BACKEND_URL} from '../../constants/constants';
import styles from './BidLoad.module.scss';
import ImageSlider from "../../components/image-slider/ImageSlider";
import useShipperStore from "../../stores/landing-registration-shipper/store";
import GoogleMapRealTimeTrafficComponent
    from "../../components/driver-dashboard/google-map-real-time-traffic-data/GoogleMapRealTimeTrafficComponent";
import InfoItem from "../../components/info-item/InfoItem";
import LoadInfoList from "../../components/load-direction-info-list/LoadInfoList";
import Button from "../../components/button/Button";
import TextInput from "../../components/text-input/TextInput";
import RotatingLinesLoader from "../../components/rotating-lines/RotatingLinesLoader";
import Popup from "../../components/popup/Popup";
import Grid from "../../components/grid-two-columns/Grid";
import Alert from "../../components/floating-window-success/Alert";

const BidLoad = () => {
    const {loadID} = useParams();
    const [load, setLoad] = useState(null);
    const [loadImages, setLoadImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isBidPopupOpen, setIsBidPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [showMore, setShowMore] = useState(false);
    const carrierID = useShipperStore((state) => state.carrierID);
    const [message, setMessage] = useState(null)
    const [bidPrice, setBidPrice] = useState(0);
    const [calculatedPrice, setCalculatedPrice] = useState(0);
    const [formData, setFormData] = useState({
        carrierUSDotNumber: '',
        carrierDotNumber: '',
        carrierContactCompanyName: '',
        carrierAccountName: '',
        carrierAccountAccountEmail: '',
        carrierAccountPassword: Math.random().toString(36).substring(2, 36) + Math.random().toString(36).substring(2, 36),
        carrierAvatar: "uploads/avatar-default.svg",
        role: 'carrier',
        carrierID: Math.random().toString(36).substring(2, 36) + Math.random().toString(36).substring(2, 36),
    });
    let calculatedBidPrice = bidPrice + bidPrice * 0.1;
    useEffect(() => {
        setCalculatedPrice(Math.floor(bidPrice + bidPrice * 0.1));
    }, [bidPrice]);
    const [bidData, setBidData] = useState({
        loadBidCarrierID: carrierID,
        loadCredentialID: loadID,
        loadBidCoverLetter: '',
        loadBidPrice: Number,
        loadBidDeliveryDate: '',
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };
    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };
    const handleChange = (input) => (e) => {
        setBidData({
            ...bidData,
            [input]: e.target.value,
        });
    };
    const handleOpenBidPopup = () => {
        setIsBidPopupOpen(true);
    };
    const handleShowMore = () => {
        setShowMore(!showMore);
    };
    useEffect(() => {

        const fetchLoadData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-load/${loadID}`);
                setLoad(response.data);
                setLoadImages(response.data.loadImages.map(image => `${BACKEND_URL}/${image}`));
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchLoadData();
    }, [loadID]);

    const handleCreateAccount = async () => {
        setIsLoading(true);
        const carrierID = Math.random().toString(36).substring(2, 36) + Math.random().toString(36).substring(2, 36);
        try {
            const response = await axios.post(`${BACKEND_URL}/create-carrier`, { ...formData, carrierID });
            setIsLoading(false);
            setIsPopupOpen(false);
            useShipperStore.getState().setCarrierID(carrierID);
            setMessage({
                status: 'success',
                text: 'Account created!',
                description: 'Now you can make bid for load'
            });
            handleOpenBidPopup();
        } catch (error) {
            setMessage({
                status: 'error',
                text: 'Something went wrong!',
                description: 'Try again...'
            });
            console.error('Error creating account:', error);
            setIsLoading(false);
        }
    };

    const handleCreateBid = async () => {
        setIsLoading(true);
        try {
            await axios.post(`${BACKEND_URL}/carrier-create-bid`, { ...bidData, loadID });
            setMessage({
                status: 'success',
                text: 'Bid submitted!',
                description: 'Bid submitted successfully'
            });
            navigate('/bid-success');
        } catch (error) {
            setMessage({
                status: 'error',
                text: 'Something went wrong!',
                description: 'Try again...'
            });
            console.error('Error creating bid:', error);
            setIsLoading(false);
        }
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            {message && <Alert status={message.status} text={message.text} description={message.description}/>}
            {isPopupOpen && (
                <Popup title="Before bid, you need to create account" onClose={handleClosePopup} footerText="After succesful registration, you will be able to make bid, then we will contact you via email, for other credentials of your account like password or etc..">
                    <Grid columns={"2, 1fr"}>
                        <TextInput id="carrierUSDotNumber" label="US DOT Number" value={formData.carrierUSDotNumber} onChange={handleInputChange} />
                        <TextInput id="carrierDotNumber" label="US DAT Number" value={formData.carrierDotNumber} onChange={handleInputChange} />
                        <TextInput id="carrierAccountAccountEmail" type="email" label="Email" value={formData.carrierAccountAccountEmail} onChange={handleInputChange} />
                        <TextInput id="carrierAccountName" label="Name" value={formData.carrierAccountName} onChange={handleInputChange} />
                        <TextInput id="carrierContactCompanyName" label="Company Name" value={formData.carrierContactCompanyName} onChange={handleInputChange} />
                        <TextInput id="phone" type="phone-number" label="Phone" value={formData.phone} onChange={handleInputChange} />
                    </Grid>
                    <Button variant="appy" onClick={handleCreateAccount}>
                        {isLoading ? <RotatingLinesLoader title="Processing..." /> : 'Create Account'}
                    </Button>
                </Popup>
            )}
            {isBidPopupOpen && (
                <Popup onClose={handleClosePopup} title={`Bid: ${loadID}`} footerText={`Attention! According to the terms of use, you agree to a 10% commission
                                        when using our service, the bet you make will be equal to - ${calculatedPrice} $.`}>
                    <div className="bid-popup-content">
                        <div className="bid-description">
                            <h3>Before bid</h3>
                            <p>Before bid we highly recommend to come up short but compelling message for
                                customer
                                and offer relevant price it will helps customer to choose the best carrier</p>
                        </div>
                        <TextInput
                            type="textarea"
                            id="loadBidCoverLetter"
                            value={bidData.loadBidCoverLetter}
                            onChange={handleChange('loadBidCoverLetter')}
                            label="Type message here"
                            style={{height: '130px'}}
                        />
                        <div className="bid-popup-value-inputs">
                            <TextInput
                                type="datetime-local"
                                id="loadBidDeliveryDate"
                                value={bidData.loadBidDeliveryDate}
                                onChange={handleChange('loadBidDeliveryDate')}
                                label="Delivery Date"
                            />
                            <TextInput
                                type="text"
                                id="loadBidPrice"
                                value={bidPrice}
                                onChange={(e) => {
                                    if (e.target.value === '') {
                                        setBidPrice('');
                                        console.log(setBidPrice(''));
                                    } else if (Number(e.target.value) >= 0) {
                                        setBidPrice(Number(e.target.value));
                                    }
                                }}
                                label="$ Bid Price"
                            />
                        </div>
                        <Button variant="apply" className="submit-bid-button" onClick={handleCreateBid}>
                            {isLoading ? <RotatingLinesLoader title="Processing..."/> : "Submit Bid"}
                        </Button>
                    </div>
                </Popup>
            )}
            <Header/>
            {load ? (
                <div className={styles.wrapper}>
                    <div className={styles.load}>
                        <h1>{load.loadType}</h1>
                        <InfoItem>
                            Load ID: {loadID}
                        </InfoItem>
                        <div className={styles.upper}>
                            <div className={styles.shortInfo}>
                                <div className={styles.infoCredentials}>
                                    <InfoItem label="Load Type">
                                        {load.loadType}
                                    </InfoItem>
                                    <InfoItem label="Load Title">
                                        {load.loadTitle}
                                    </InfoItem>
                                    <InfoItem label="Load Make">
                                        {load.loadVehicleMake}
                                    </InfoItem>
                                    <InfoItem label="Vehicle Year">
                                        {load.loadVehicleYear}
                                    </InfoItem>
                                    <InfoItem label="Model">
                                        {load.loadVehicleModel}
                                    </InfoItem>
                                    <InfoItem label="Trailer">
                                        {load.loadTypeOfTrailer}
                                    </InfoItem>
                                </div>
                                <LoadInfoList loadPickupLocation={load.loadPickupLocation}
                                              loadDeliveryLocation={load.loadDeliveryLocation}
                                              loadDeliveryLocationDate={load.loadDeliveryDate}
                                              loadPickupLocationDate={load.loadPickupDate}/>
                            </div>
                            <ImageSlider images={loadImages}/>
                            <div className={styles.map}>
                                <GoogleMapRealTimeTrafficComponent type="destination" origin={load.loadPickupLocation}
                                                                   destination={load.loadDeliveryLocation}
                                                                   borderRadius={['25px', '25px', '25px', '25px']}
                                />
                            </div>
                        </div>
                        {showMore && (
                            <div className={styles.additionalInfo}>
                                <InfoItem label="Load Description">
                                    {load.loadDescription}
                                </InfoItem>
                                <InfoItem label="Load Weight">
                                    {load.loadWeight}
                                </InfoItem>
                                <InfoItem label="Load Length">
                                    {load.loadLength}
                                </InfoItem>
                                <InfoItem label="Load Height">
                                    {load.loadHeight}
                                </InfoItem>
                                <InfoItem label="Load Width">
                                    {load.loadWidth}
                                </InfoItem>
                            </div>
                        )}
                        <div className={styles.bottom}>
                            <Button variant="apply" onClick={handleOpenPopup}>Make Bid</Button>
                            <Button variant="outlined" onClick={handleShowMore}>
                                {showMore ? 'Less' : 'Show More'}
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className={styles.error}>No load data found</p>
            )}
            <LandingPageFooter/>
        </>
    );
};

export default BidLoad;