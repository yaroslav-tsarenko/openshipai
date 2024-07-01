import React, {useState} from 'react';
import {ReactComponent as CarrierAvatar} from "../../assets/userAvatar2.svg"
import {useNavigate} from 'react-router-dom';
import "./CarrierLoadBid.css"
import {ClipLoader} from "react-spinners";
import axios from "axios";
import FloatingWindowSuccess from "../floating-window-success/FloatingWindowSuccess";
import FloatingWindowFailed from "../floating-window-failed/FloatingWindowFailed";
import {BACKEND_URL} from "../../constants/constants";
const CarrierLoadBid = ({
                            loadCarrierID,
                            loadBidPrice,
                            loadID,
                            loadBidCoverLetter,
                            shipperID,
                            loadEstimatedDeliveryTime
                        }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const date = new Date(loadEstimatedDeliveryTime);
    const navigate = useNavigate();
    const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'long'});
    const time = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    const formattedDate = `${day} ${month} at ${time}`;
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(null);

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
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
                setStatusMessage('Your bid applied successfully');
                setTimeout(() => {
                    navigate(`/shipper-chat-conversation/${shipperID}`);
                }, 1000);
                setIsSuccess(true);
            } else {
                console.error('Failed to create DealChatConversation:', response.data);
                setStatusMessage('Failed to apply bid. Try again');
                setIsSuccess(false);
            }
        } catch (error) {
            console.error('Error creating DealChatConversation:', error);
            setStatusMessage('Failed to apply bid. Try again');
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isSuccess === true && <FloatingWindowSuccess text={statusMessage}/>}
            {isSuccess === false && <FloatingWindowFailed text={statusMessage}/>}
            <div className="carrier-load-bid-container">
                <div className="carrier-load-bid-container-header">
                    <section>
                        <CarrierAvatar/>
                        <h2>TRANE</h2>
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
                    <button className="apply-bid-button" onClick={handleOpenPopup}>Apply Bid</button>
                </div>
            </div>
            {isPopupOpen && (
                <div className="carrier-bid-popup-overlay">
                    <div className="carrier-bid-popup">
                        <div className="carrier-bid-popup-header">
                            <h2>Applying bid for load: {loadID}</h2>
                            <button className="close-button" onClick={handleClosePopup}>Close</button>
                        </div>
                        <div className="carrier-bid-popup-content">
                            <div className="carrier-bid-description">
                                <h3>Before accepting</h3>
                                <p>Before accepting the bid, you agree to <a href="#">the terms of usage</a> and enter
                                    into a
                                    joint venture with the carrier, you will coordinate all further steps with him
                                    through the service chat and all further steps will be decided in the chat</p>
                            </div>
                            <div className="carrier-bid-description">
                                <h3>After continuing</h3>
                                <p>After the renewal takes effect and you cannot re-select the carrier, a chat will be
                                    automatically created between you and the carrier, to which you will be
                                    automatically
                                    redirected in a few seconds.d</p>
                            </div>
                            <div className="carrier-bid-description">
                                <h3>Note</h3>
                                <p>Do not follow the carrier's instructions to conduct business in
                                    other messengers to prevent scam actions.</p>
                            </div>
                            <button className="carrier-submit-bid-button" onClick={handleSubmit}>
                                {isLoading ? <ClipLoader size={15} color={"#ffffff"}/> : "Continue"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CarrierLoadBid;