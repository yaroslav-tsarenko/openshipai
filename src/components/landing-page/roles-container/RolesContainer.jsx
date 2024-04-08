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
                    <div className="role-content">
                        <h4>Pay Less</h4>
                        <p>Book the perfect mode for your load in minutes, save up to 20%, and enjoy seamless,
                            tech-driven car shipping solutions.</p>
                    </div>
                </div>
                <div className="broker-role-container">
                    <h2>Broker</h2>
                    <div className="role-content">
                        <h4>Get Paid Faster</h4>
                        <p>Accelerate cash flow and eliminate payment delays with our secure, automated payment
                            system.</p>
                    </div>
                </div>
                <div className="carrier-role-container">
                    <h2>Carrier</h2>
                    <div className="role-content">
                        <h4>Earn More</h4>
                        <p>Embrace AI-powered route optimization and load matching tools to earn 20% more, eliminate
                            empty miles, and maximize load capacities.</p>
                    </div>
                </div>
                <div className="dispatch-role-container">
                    <h2>Dispatch</h2>
                    <div className="role-content">
                        <h4>Dispatch From Anywhere</h4>
                        <p>Elevate dispatch operations with our cloud-based platform, featuring AI trip building,
                            real-time monitoring, and seamless communication tools</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RolesContainer;