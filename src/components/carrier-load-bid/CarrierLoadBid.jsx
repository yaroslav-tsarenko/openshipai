import React, {useEffect, useState} from 'react';
import {ReactComponent as CarrierAvatar} from "../../assets/images/userAvatar2.svg"
import {useNavigate} from 'react-router-dom';
import "./CarrierLoadBid.css"
import axios from "axios";
import Alert from "../floating-window-success/Alert";
import {BACKEND_URL} from "../../constants/constants";
import Button from "../button/Button";
import Popup from "../popup/Popup";
import RotatingLinesLoader from "../rotating-lines/RotatingLinesLoader";
import {Skeleton} from "@mui/material";

const CarrierLoadBid = ({
                            loadCarrierID,
                            loadBidPrice,
                            loadID,
                            loadBidCoverLetter,
                            shipperID,
                            loadEstimatedDeliveryTime,
                            loadCarrierName
                        }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const date = new Date(loadEstimatedDeliveryTime);
    const navigate = useNavigate();
    const day = date.getDate();
    const [carrier, setCarrier] = useState(null);
    const month = date.toLocaleString('default', {month: 'long'});
    const time = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    const formattedDate = `${day} ${month} at ${time}`;
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [alert, setAlert] = useState(null);
    const [isSuccess, setIsSuccess] = useState(null);

    useEffect(() => {
        console.log(loadCarrierID + "loadCarrierID")

        const fetchCarrier = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-carrier/${loadCarrierID}`);
                setCarrier(response.data);
            } catch (error) {
                console.error('Error fetching carrier:', error);
            }
        }

        fetchCarrier();
    }, [loadCarrierID]);


    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const sendEmail = async (userType, userID) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/send-email-2`, {
                userType,
                userID
            });

            if (response.status === 200) {
                console.log('Email sent successfully');
            } else {
                console.error('Error sending email:', response.data.message);
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };



    const updateLoadStatus = async (loadID, newStatus) => {
        try {
            await axios.put(`${BACKEND_URL}/update-load-status/${loadID}`, {newStatus});
            console.log('Load status updated successfully');
        } catch (error) {
            console.error('Error updating load status:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const chatID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const chatData = {
            chatID: chatID,
            loadID: loadID,
            shipperID: shipperID,
            carrierID: loadCarrierID,
        };

        try {
            const response = await axios.post(`${BACKEND_URL}/create-deal-chat-conversation`, chatData);
            if (response.status === 200) {
                console.log('DealChatConversation created successfully');
                await updateLoadStatus(loadID, 'Booked');
               sendEmail('carrier', loadCarrierID);
                await axios.post(`${BACKEND_URL}/update-load-price/${loadID}/${loadBidPrice}`);
            } else {
                console.error('Failed to create DealChatConversation:', response.data);
                setStatusMessage('Failed to apply bid. Try again');
                setIsSuccess(false);
                setAlert({status: "error", text: "Failed to apply bid", description: "Try again"});
            }
        } catch (error) {
            console.error('Error creating DealChatConversation:', error);
            setStatusMessage('Failed to apply bid. Try again');
            setIsSuccess(false);
            setAlert({status: "error", text: "Failed to apply bid", description: "Try again"});
        } finally {
            setIsLoading(false);
            navigate(`/shipper-chat-conversation/${shipperID}`);
        }
    };

    return (
        <>
            {alert && <Alert text={alert.text} status={alert.status} description={alert.description}/>}
            <div className="carrier-load-bid-container">
                <div className="carrier-load-bid-container-header">
                    <section>
                        <CarrierAvatar/>
                        <h2>{loadCarrierName}</h2>
                        <h2>{carrier ? carrier.carrierContactCompanyName : <Skeleton width={100} height={30}/>}</h2>
                    </section>
                    <section>
                        <h4>Estimated delivery: {formattedDate}</h4>
                        <h3>{loadBidPrice}$</h3>
                    </section>
                </div>
                <div className="carrier-load-bid-container-body">
                    <p>{loadBidCoverLetter}</p>
                </div>
                <div className="carrier-load-bid-container-bottom">
                    <div style={{width: "250px"}}>
                        <Button variant="apply" onClick={handleOpenPopup}>Apply Bid</Button>
                    </div>
                </div>
            </div>
            {isPopupOpen && (
                <Popup title={`Applying bid for load: ${loadID}`} onClose={handleClosePopup} footerText="Do not follow the carrier's instructions to conduct business in
                                        other messengers to prevent scam actions.">
                    <div className="carrier-bid-popup-content">
                        <div className="carrier-bid-description">
                            <h3>Before accepting</h3>
                            <p>Before accepting the bid, you agree to <a href="#">the terms of usage</a> and
                                enter
                                into a
                                joint venture with the carrier, you will coordinate all further steps with him
                                through the service chat and all further steps will be decided in the chat</p>
                        </div>
                        <div className="carrier-bid-description">
                            <h3>After continuing</h3>
                            <p>After the renewal takes effect and you cannot re-select the carrier, a chat will
                                be
                                automatically created between you and the carrier, to which you will be
                                automatically
                                redirected in a few seconds.d</p>
                        </div>
                        <div className="carrier-bid-description">
                            <h3>Note</h3>
                            <p>Do not follow the carrier's instructions to conduct business in
                                other messengers to prevent scam actions.</p>
                        </div>
                        <section style={{width: "250px"}}>
                            <Button variant="apply" onClick={handleSubmit}>
                                {isLoading ? <RotatingLinesLoader title="Processing..."/> : "Continue"}
                            </Button>
                        </section>
                    </div>
                </Popup>
            )}
        </>
    );
};

export default CarrierLoadBid;