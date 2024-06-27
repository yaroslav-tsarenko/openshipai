import React from 'react';

import {ReactComponent as DirectionIcon} from "../../../assets/direction-icon.svg";
import {ReactComponent as CarrierIcon} from "../../../assets/trane-logo-carrier.svg";

const ActiveLoadContainer = ({loadStatus, loadPickupLocation, loadPickupDate, loadDeliveryLocation, loadDeliveryDate, typeOfLoad, loadMilTrip, loadCredentialID}) => {
    return (
        <div className="active-load-container">
            <div className="load-container-status">
                <section className="load-status-section">
                    <div className="load-status-icon"></div>
                    {loadStatus}
                </section>
                <div className="load-directions">
                    <DirectionIcon className="load-directions-icon"/>
                    <div className="origin-destination-container">
                        <section className="section-origin-destination">
                            <h3 className="load-directions-title">{loadPickupLocation}</h3>
                            <p className="load-directions-description">{loadPickupDate}</p>
                        </section>
                        <section className="section-origin-destination">
                            <h3 className="load-directions-title">{loadDeliveryLocation}</h3>
                            <p className="load-directions-description">{loadDeliveryDate}</p>
                        </section>
                    </div>
                </div>
            </div>
            <div className="load-container-info">
                <section className="load-info-section">{typeOfLoad}</section>
                <section className="load-info-section">{loadMilTrip}</section>
                <section className="load-info-section">{loadCredentialID}</section>
            </div>
            <div className="load-container-carrier">
                <CarrierIcon className="carrier-icon"/>
                <button className="chat-carrier-button">Chat with Carrier</button>
            </div>
        </div>
    );
};

export default ActiveLoadContainer;