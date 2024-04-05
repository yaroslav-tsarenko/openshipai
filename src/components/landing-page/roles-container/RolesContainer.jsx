import React from 'react';
import ShipperImage from "../../../assets/shipper-image.jpg";
import BrokerImage from "../../../assets/broker-image.jpg";
import DispatchImage from "../../../assets/dispatch-image.jpg";
import CarrierImage from "../../../assets/carrier-image.jpg";

const RolesContainer = () => {
    return (
        <div className="roles-container-wrapper">
            <div className="roles-description">
                <h4>ALL IN ONE</h4>
                <h2>Universal Shipments</h2>
                <p>OpenshipAI is a platform that connects shippers and carriers. Shippers can post their loads and
                    carriers can bid on them. Here are the roles you can choose from</p>
                <button className="learn-more-button">Learn More</button>
            </div>
            <div className="roles-image-wrapper">
                <div className="shipper-role-container">
                    <h2>Shipper</h2>
                    <h4>Pay Less</h4>
                    <p>Book the perfect mode for your load in minutes, save up to 20%, and enjoy seamless, tech-driven
                        car shipping solutions.</p>
                </div>
                <div className="broker-role-container">
                    <h2>Broker</h2>
                </div>
                <div className="carrier-role-container">
                    <h2>Carrier</h2>
                </div>
                <div className="dispatch-role-container">
                    <h2>Dispatch</h2>
                </div>
            </div>
        </div>
    );
};

export default RolesContainer;