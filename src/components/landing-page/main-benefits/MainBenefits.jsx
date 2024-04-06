import React from 'react';
import {ReactComponent as StarIconExample} from "../../../assets/star-icon-example.svg";
const MainBenefits = () => {
    return (
        <div className="main-benefits-wrapper">
            <h1>Why Our New Transportation Platform Will Transform the Industry</h1>
            <div className="benefit-container-wrapper">
                <div className="benefit-container">
                    <StarIconExample className="benefit-container-icon"/>
                    <h2>Automated Dispatch</h2>
                    <p>Our AI system efficiently allocates loads, ensuring optimal route selection and timely
                        dispatch.</p>
                </div>
                <div className="benefit-container">
                    <StarIconExample className="benefit-container-icon"/>
                    <h2>Real-Time Tracking</h2>
                    <p>Enjoy visibility into your shipment's journey with continuous, AI-enhanced tracking updates.</p>
                </div>
                <div className="benefit-container">
                    <StarIconExample className="benefit-container-icon"/>
                    <h2>Guaranteed On-Time Delivery</h2>
                    <p>Our AI closely monitors and adjusts routes in real-time, guaranteeing timely deliveries.</p>
                </div>
                <div className="benefit-container">
                    <StarIconExample className="benefit-container-icon"/>
                    <h2>Stress-Free Logistics</h2>
                    <p>Streamline your logistics with AI that simplifies complex processes, from scheduling to
                        delivery.</p>
                </div>
                <div className="benefit-container">
                    <StarIconExample className="benefit-container-icon"/>
                    <h2>Proactive Problem Solving</h2>
                    <p>Rely on AI for efficient handling of your logistics, providing you with
                        confidence and stress-free experience</p>
                </div>
                <div className="benefit-container">
                    <StarIconExample className="benefit-container-icon"/>
                    <h2>Availability</h2>
                    <p>Our customer support is accessible 24/7, ensuring assistance is always just a call or message
                        away.</p>
                </div>
                {/*<div className="benefit-container">
                    <h2>Responsive Service</h2>
                    <p> Fast, efficient responses to inquiries and issues, no matter the time of day.</p>
                </div>
                <div className="benefit-container">
                    <h2>Exceptional Care</h2>
                    <p>Dedicated support team providing personalized solutions, enhancing your overall experience.</p>
                </div>
                <div className="benefit-container">
                    <h2>Instant Quotes & Carrier Matching</h2>
                    <p>Find carriers in real time, matching your specific transportation needs instantly</p>
                </div>
                <div className="benefit-container">
                    <h2>Momentary Quotes</h2>
                    <p>Receive immediate pricing quotes from a network of carriers, enabling quick decision-making.</p>
                </div>*/}
            </div>
        </div>
    );
};

export default MainBenefits;