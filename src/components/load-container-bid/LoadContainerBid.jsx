import React, {useState, useEffect} from 'react';
import "./LoadContainerBid.css";
import axios from 'axios';
import {ReactComponent as BidArrowIcon} from "../../assets/bid-arrow-icon.svg";
import {ReactComponent as MoreInfoArrow} from "../../assets/blue-arrow-down.svg";
import {ReactComponent as DirectionIconNumbers} from "../../assets/direction-icon.svg";
import {useParams} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import Alert from "../floating-window-success/Alert";
import FloatingWindowFailed from "../floating-window-failed/FloatingWindowFailed";
import {BACKEND_URL} from "../../constants/constants";
import Popup from "../popup/Popup";
import Button from "../button/Button";
import TextInput from "../text-input/TextInput";
import InfoItem from "../info-item/InfoItem";
import Grid from "../grid-two-columns/Grid";
import ImageSlider from "../image-slider/ImageSlider";
import RotatingLinesLoader from "../rotating-lines/RotatingLinesLoader";


const LoadContainerBid = ({
                              loadPrice,
                              loadTitle,
                              loadPickUpLocation,
                              loadPickUpDate,
                              loadDeliveryLocation,
                              loadDeliveryDate,
                              loadType,
                              loadWeight,
                              loadDistance,
                              loadQoutes,
                              loadID,
                              loadVehicleMake,
                              loadStatus,
                              loadVehicleModel,
                              loadVehicleYear,
                              loadWidth,
                              loadHeight,
                              loadLength,
                              loadTypeOfPackaging,
                              loadDescription,
                              loadCarrierConfirmation,
                              loadPaymentStatus,
                              loadAssignedDriverID,
                              loadSpecifiedItem,
                              loadMovingSize,
                              loadNumberOfBedrooms,
                              loadNumberOfPallets,
                              loadDeliveredStatus,
                              loadPickupStories,
                              loadDeliveryStories,
                              loadCredentialID,
                              loadSpecialHandlingRequirements,
                              loadIndustrySector,
                              loadPrimaryContactName,
                              loadMajorItems,
                              loadSecondaryContactName,
                              loadPickupFloor,
                              loadDeliveryFloor,
                              loadBusinessName,
                              loadTypeOfBusiness,
                              loadLiftedItemsQuantity,
                              loadHaveFreightElevator,
                              loadDestinationOptions,
                              loadServiceExpressOptions,
                              loadAreaOption,
                              loadQuantity,
                              loadOperable,
                              loadConvertible,
                              loadModified,
                              loadNumberOfItems,
                              loadTrike,
                              loadIsCrate,
                              loadIsPallet,
                              loadTripStarted,
                              loadAdditionalSelectedLoadOptions,
                              loadIsBox,
                              isOnTrailer,
                              hasTrailerPreference,
                              loadTypeOfTrailer,
                              loadLocationStops,
                              loadOriginDeliveryPreference,
                              shipperID
                          }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [bidPrice, setBidPrice] = useState(0);
    const [calculatedPrice, setCalculatedPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [loadImages, setLoadImages] = useState([]);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState(null);
    const {carrierID} = useParams();

    useEffect(() => {
        setCalculatedPrice(Math.floor(bidPrice + bidPrice * 0.1));
    }, [bidPrice]);

    useEffect(() => {
        const fetchLoad = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/load/${loadCredentialID}`);
                setLoadImages(response.data.loadImages.map(image => `${BACKEND_URL}/${image}`));
            } catch (error) {
                console.error('Error fetching load:', error);
            }
        };
        fetchLoad();
    }, [loadCredentialID]);

    useEffect(() => {
        setFormData(formData => ({
            ...formData,
            loadBidPrice: calculatedPrice.toString()
        }));
    }, [calculatedPrice]);

    let calculatedBidPrice = bidPrice + bidPrice * 0.1;
    console.log("Calculated bid price:" + calculatedBidPrice);

    const [formData, setFormData] = useState({
        loadBidCarrierID: carrierID,
        loadCredentialID: loadID,
        loadBidCoverLetter: '',
        loadBidPrice: `${calculatedPrice}`,
        loadBidDeliveryDate: '',
    });

    const handleChange = (input) => (e) => {
        setFormData({...formData, [input]: e.target.value});
    };

    const handleDeleteAllBids = async () => {
        try {
            const response = await axios.delete(`${BACKEND_URL}/delete-all-load-bids`);
            console.log(response.data);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/create-bid`, formData);
            console.log(response.data);
            setMessage({ status: 'success', text: 'Load Created Successfully', description: '' });
        } catch (error) {
            console.error(error);
            setMessage({ status: 'error', text: 'Something went wrong. Try Again', description: '' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickBidClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleMoreInfoClick = () => {
        setIsExpanded(!isExpanded);
    };


    return (
        <>
            {message && <Alert status={message.status} text={message.text} description={message.description} />}
            <div className={`take-load-bid-container-wrapper ${isExpanded ? 'expanded' : ''}`}>
                <div className="take-load-bid-container-short-info">
                    <div className="take-load-bid-container-content">
                        <InfoItem label="Load Title">
                            {loadTitle}
                        </InfoItem>
                        <InfoItem color="green" label="Avg Price">
                            {loadPrice} $
                        </InfoItem>
                        <div className="carrier-load-directions">
                            <DirectionIconNumbers height="100px"/>
                            <div className="load-carrier-direction">
                                <section>
                                    <h3>{loadPickUpLocation}</h3>
                                    <p>{loadPickUpDate}</p>
                                </section>
                                <section>
                                    <h3>{loadDeliveryLocation}</h3>
                                    <p>{loadDeliveryDate}</p>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div className="load-short-info">
                        <InfoItem label="Load Type">
                            {loadType}
                        </InfoItem>
                        <InfoItem label="Weight">
                            {loadWeight}
                        </InfoItem>
                        <InfoItem label="Trip">
                            {loadDistance}
                        </InfoItem>
                    </div>
                    <div className="instant-book-load">
                        <label>Instant Book</label>
                        <h3>{loadQoutes} Qoutes</h3>
                        <button className="bid-button" onClick={handleQuickBidClick}>Quick Bid<BidArrowIcon
                            className="bid-arrow-icon"/>
                        </button>
                        <button onClick={handleMoreInfoClick} className="more-info-button">
                            <MoreInfoArrow className={`more-info-icon-down ${isExpanded ? 'rotated' : ''}`}/>
                            {isExpanded ? 'Minimize' : 'More info'}
                        </button>
                    </div>
                </div>
                {isExpanded && (
                    <div className="load-container-bid-more-info">
                        <Grid columns="4, 2fr">
                            <ImageSlider images={loadImages}/>
                            <InfoItem label="Length">
                                {loadLength}
                            </InfoItem>
                            <InfoItem label="Width">
                                {loadWidth}
                            </InfoItem>
                            <InfoItem label="Height">
                                {loadHeight}
                            </InfoItem>
                            <InfoItem label="Type of Packaging">
                                {loadTypeOfPackaging}
                            </InfoItem>
                            <InfoItem label="Vehicle Make">
                                {loadVehicleMake}
                            </InfoItem>
                            <InfoItem label="Vehicle Year">
                                {loadVehicleYear}
                            </InfoItem>
                            <InfoItem label="Vehicle Model">
                                {loadVehicleModel}
                            </InfoItem>
                            <InfoItem label="Load Status">
                                {loadStatus}
                            </InfoItem>
                            <InfoItem label="Load ID">
                                {loadID}
                            </InfoItem>
                            <InfoItem label="Description">
                                {loadDescription}
                            </InfoItem>
                            <InfoItem label="Carrier Confirmation">
                                {loadCarrierConfirmation}
                            </InfoItem>
                            <InfoItem label="Payment Status">
                                {loadPaymentStatus}
                            </InfoItem>
                            <InfoItem label="Specified Item">
                                {loadSpecifiedItem}
                            </InfoItem>
                            <InfoItem label="Moving Size">
                                {loadMovingSize}
                            </InfoItem>
                            <InfoItem label="Number of Bedrooms">
                                {loadNumberOfBedrooms}
                            </InfoItem>
                            <InfoItem label="Number of Pallets">
                                {loadNumberOfPallets}
                            </InfoItem>
                            <InfoItem label="Delivered Status">
                                {loadDeliveredStatus}
                            </InfoItem>
                            <InfoItem label="Pickup Stories">
                                {loadPickupStories}
                            </InfoItem>
                            <InfoItem label="Delivery Stories">
                                {loadDeliveryStories}
                            </InfoItem>
                            <InfoItem label="Special Handling Requirements">
                                {loadSpecialHandlingRequirements}
                            </InfoItem>
                            <InfoItem label="Industry Sector">
                                {loadIndustrySector}
                            </InfoItem>
                            <InfoItem label="Primary Contact Name">
                                {loadPrimaryContactName}
                            </InfoItem>
                            <InfoItem label="Major Items">
                                {loadMajorItems}
                            </InfoItem>
                            <InfoItem label="Secondary Contact Name">
                                {loadSecondaryContactName}
                            </InfoItem>
                            <InfoItem label="Pickup Floor">
                                {loadPickupFloor}
                            </InfoItem>
                            <InfoItem label="Delivery Floor">
                                {loadDeliveryFloor}
                            </InfoItem>
                            <InfoItem label="Business Name">
                                {loadBusinessName}
                            </InfoItem>
                            <InfoItem label="Type of Business">
                                {loadTypeOfBusiness}
                            </InfoItem>
                            <InfoItem label="Lifted Items Quantity">
                                {loadLiftedItemsQuantity}
                            </InfoItem>
                            <InfoItem label="Have Freight Elevator">
                                {loadHaveFreightElevator}
                            </InfoItem>
                            <InfoItem label="Destination Options">
                                {loadDestinationOptions}
                            </InfoItem>
                            <InfoItem label="Service Express Options">
                                {loadServiceExpressOptions}
                            </InfoItem>
                            <InfoItem label="Area Option">
                                {loadAreaOption}
                            </InfoItem>
                            <InfoItem label="Quantity">
                                {loadQuantity}
                            </InfoItem>
                            <InfoItem label="Operable">
                                {loadOperable ? 'Yes' : 'No'}
                            </InfoItem>
                            <InfoItem label="Convertible">
                                {loadConvertible ? 'Yes' : 'No'}
                            </InfoItem>
                            <InfoItem label="Modified">
                                {loadModified ? 'Yes' : 'No'}
                            </InfoItem>
                            <InfoItem label="Number of Items">
                                {loadNumberOfItems}
                            </InfoItem>
                            <InfoItem label="Trike">
                                {loadTrike ? 'Yes' : 'No'}
                            </InfoItem>
                            <InfoItem label="Is Crate">
                                {loadIsCrate}
                            </InfoItem>
                            <InfoItem label="Is Pallet">
                                {loadIsPallet}
                            </InfoItem>
                            <InfoItem label="Trip Started">
                                {loadTripStarted}
                            </InfoItem>
                            <InfoItem label="Additional Selected Load Options">
                                {loadAdditionalSelectedLoadOptions.join(', ')}
                            </InfoItem>
                            <InfoItem label="Is Box">
                                {loadIsBox}
                            </InfoItem>
                            <InfoItem label="Is On Trailer">
                                {isOnTrailer ? 'Yes' : 'No'}
                            </InfoItem>
                            <InfoItem label="Has Trailer Preference">
                                {hasTrailerPreference ? 'Yes' : 'No'}
                            </InfoItem>
                            <InfoItem label="Type of Trailer">
                                {loadTypeOfTrailer}
                            </InfoItem>
                            <InfoItem label="Origin Delivery Preference">
                                {loadOriginDeliveryPreference.join(', ')}
                            </InfoItem>
                        </Grid>

                    </div>

                )}
            </div>
            {isPopupOpen && (
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
                            value={formData.loadBidCoverLetter}
                            onChange={handleChange('loadBidCoverLetter')}
                            label="Type message here"
                            style={{height: '130px'}}
                        />
                        <div className="bid-popup-value-inputs">
                            <TextInput
                                type="datetime-local"
                                id="loadBidDeliveryDate"
                                value={formData.loadBidDeliveryDate}
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
                        <Button variant="apply-non-responsive" className="submit-bid-button" onClick={handleSubmit}>
                            {isLoading ? <RotatingLinesLoader title="Processing..."/> : "Submit Bid"}
                        </Button>
                    </div>
                </Popup>
            )}
        </>
    );
};

export default LoadContainerBid;