import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {ReactComponent as DirectionIcon} from "../../../assets/images/direction-icon.svg";
import {ReactComponent as CarrierIcon} from "../../../assets/images/trane-logo-carrier.svg";
import {ReactComponent as ShipperIcon} from "../../../assets/images/shipper-icon.svg";
import Button from "../../button/Button";
import {BACKEND_URL} from "../../../constants/constants";
import axios from "axios";
import ActiveLoadStatusLabel from "../../active-load-status-label/ActiveLoadStatusLabel";

const ActiveLoadContainer = ({
                                 loadStatus,
                                 loadPickupLocation,
                                 loadPickupDate,
                                 loadDeliveryLocation,
                                 loadDeliveryDate,
                                 typeOfLoad,
                                 loadMilTrip,
                                 loadCarrierID,
                                 shipperID,
                                 type,
                                 loadCredentialID
                             }) => {
    const navigate = useNavigate();
    const [chat, setChat] = useState(null);
    const {carrierID} = useParams();

    useEffect(() => {
        const fetchChatData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-deal-chat-conversation-by-load/${loadCredentialID}`);
                setChat(response.data);
            } catch (error) {
                console.error('Error fetching chat data:', error);
            }
        };
        fetchChatData();
    }, [loadCredentialID]);

    const handleClick = () => {
        if (type === "carrier") {
            navigate(`/carrier-chat-conversation/${carrierID}`);
        } else {
            navigate(`/customer-deal-chat-conversation/${shipperID}/${chat.chatID}`);
        }
    };

    return (
        <>
            <div className="active-load-container">
                <div className="load-container-status">
                    <ActiveLoadStatusLabel loadStatus={loadStatus}/>
                    <div className="load-directions">
                        <DirectionIcon className="load-directions-icon"/>
                        <div className="origin-destination-container">
                            <div className="section-origin-destination">
                                <h3 className="load-directions-title">{loadPickupLocation}</h3>
                                <p className="load-directions-description">{loadPickupDate}</p>
                            </div>
                            <div className="section-origin-destination">
                                <h3 className="load-directions-title">{loadDeliveryLocation}</h3>
                                <p className="load-directions-description">{loadDeliveryDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="load-container-info">
                    <div className="load-info-section">{typeOfLoad}</div>
                    <div className="load-info-section">{loadMilTrip}</div>
                    <div className="load-info-section">{loadCredentialID}</div>
                </div>
                <div className="load-container-carrier">
                    {type === "carrier" ? <ShipperIcon className="carrier-icon"/> :
                        <CarrierIcon className="carrier-icon"/>}
                    {type === "driver" ?
                        null :
                        <Button variant="outlined-non-responsive" onClick={handleClick}>
                            {type === "carrier" ? "Chat with Shipper" : "Chat with Carrier"}
                        </Button>}

                </div>
            </div>
            <hr/>
        </>
    );
};

export default ActiveLoadContainer;