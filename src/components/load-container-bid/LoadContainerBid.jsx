import React, {useState, useEffect} from 'react';
import "./LoadContainerBid.css";
import axios from 'axios';
import {ReactComponent as BidArrowIcon} from "../../assets/bid-arrow-icon.svg";
import {ReactComponent as MoreInfoArrow} from "../../assets/blue-arrow-down.svg";
import {ReactComponent as DirectionIconNumbers} from "../../assets/directions-number-icons.svg";
import {useParams} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import Alert from "../floating-window-success/Alert";
import FloatingWindowFailed from "../floating-window-failed/FloatingWindowFailed";
import {BACKEND_URL} from "../../constants/constants";
import {Fade} from "react-awesome-reveal";


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
                              loadLength,
                              loadWidth,
                              loadHeight,
                              loadTypeOfPackaging,
                              loadID,
                              loadVehicleMake,
                              loadVehicleYear,
                              loadStatus,
                              loadVehicleModel

                          }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [bidPrice, setBidPrice] = useState(0);
    const [calculatedPrice, setCalculatedPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [isError, setIsError] = useState(false);
    const {carrierID} = useParams();

    useEffect(() => {
        setCalculatedPrice(Math.floor(bidPrice + bidPrice * 0.1));
    }, [bidPrice]);

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
            setIsSuccess(true);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error(error);
            setIsError(true);
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
                {isSuccess && <Alert text="Load Created Successfully"/>}
                {isError && <FloatingWindowFailed text="Something went wrong. Try Again"/>}
                <div className={`take-load-bid-container-wrapper ${isExpanded ? 'expanded' : ''}`}>
                    <div className="take-load-bid-container-short-info">
                        <div className="take-load-bid-container-content">
                <span>
                    <label>Load Title</label>
                    <h3>{loadTitle}</h3>
                </span>
                            <span>
                    <label>Avg Price</label>
                    <h1>{loadPrice} $</h1>
                </span>
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
                <span>
                    <label>Load Type</label>
                    <h3>{loadType}</h3>
                </span>
                            <span>
                    <label>Weight</label>
                    <h3>{loadWeight}</h3>
                </span>
                            <span>
                    <label>Trip</label>
                    <h3>{loadDistance}</h3>
                </span>
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
                            <div className="load-short-info">
                    <span>
                    <label>Length</label>
                    <h3>{loadLength}</h3>
                    </span>
                                <span>
                    <label>Width</label>
                    <h3>{loadWidth}</h3>
                    </span>
                                <span>
                    <label>Height</label>
                    <h3>{loadHeight}</h3>
                    </span>
                            </div>
                            <div className="load-short-info">
                    <span>
                    <label>Type of Packaging</label>
                    <h3>{loadTypeOfPackaging}</h3>
                    </span>
                                <span>
                    <label>Vehicle Make</label>
                    <h3>{loadVehicleMake}</h3>
                    </span>
                                <span>
                    <label>Vehicle Year</label>
                    <h3>{loadVehicleYear}</h3>
                    </span>
                            </div>
                            <div className="load-short-info">
                    <span>
                    <label>Vehicle Model</label>
                    <h3>{loadVehicleModel}</h3>
                    </span>
                                <span>
                    <label>Load Status</label>
                    <h3>{loadStatus}</h3>
                    </span>
                                <span>
                    <label>Load ID</label>
                    <h3>{loadID}</h3>
                    </span>
                            </div>
                        </div>

                    )}
                </div>
                {isPopupOpen && (
                    <div className="bid-popup-overlay">
                        <div className="bid-popup">
                            <div className="bid-popup-header">
                                <h2>Bid: {loadID}</h2>
                                <button className="close-button" onClick={handleClosePopup}>Close</button>
                            </div>
                            <div className="bid-popup-content">
                                <div className="bid-description">
                                    <h3>Before bid</h3>
                                    <p>Before bid we highly recommend to come up short but compelling message for
                                        customer
                                        and offer relevant price it will helps customer to choose the best carrier</p>
                                </div>
                                <div className="google-input-wrapper">
                                <textarea
                                    type="text"
                                    id="loadBidCoverLetter"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    style={{height: '130px'}}
                                    onChange={handleChange('loadBidCoverLetter')}
                                    value={formData.loadBidCoverLetter}
                                />
                                    <label htmlFor="loadBidCoverLetter" className="google-style-input-label">Type
                                        message
                                        here</label>
                                </div>
                                <div className="bid-popup-value-inputs">
                                    <div className="google-input-wrapper" style={{width: '425px'}}>
                                        <input
                                            type="datetime-local"
                                            id="loadBidDeliveryDate"
                                            autoComplete="off"
                                            className="google-style-input"
                                            required
                                            onChange={handleChange('loadBidDeliveryDate')}
                                            value={formData.loadBidDeliveryDate}
                                        />
                                        <label htmlFor="loadBidDeliveryDate" className="google-style-input-label">Delivery
                                            Date</label>
                                    </div>
                                    <div className="google-input-wrapper" style={{width: '425px'}}>
                                        <input
                                            type="text"
                                            id="loadBidPrice"
                                            autoComplete="off"
                                            className="google-style-input"
                                            required
                                            value={bidPrice}
                                            onChange={(e) => {
                                                if (e.target.value === '') {
                                                    setBidPrice('');
                                                    console.log(setBidPrice(''));
                                                } else if (Number(e.target.value) >= 0) {
                                                    setBidPrice(Number(e.target.value));

                                                }
                                            }}
                                        />
                                        <label htmlFor="loadBidPrice" className="google-style-input-label">$ Bid
                                            Price</label>
                                    </div>
                                </div>
                                <div className="bid-description">
                                    <h3>Attention</h3>
                                    <p>According to the terms of use, you agree to a 10% commission
                                        when using our service, the bet you make will be equal to - {calculatedPrice} $.
                                    </p>
                                </div>
                                <button className="submit-bid-button" onClick={handleSubmit}>
                                    {isLoading ? <ClipLoader size={15} color={"#ffffff"}/> : "Submit Bid"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

        </>

    );
};

export default LoadContainerBid;