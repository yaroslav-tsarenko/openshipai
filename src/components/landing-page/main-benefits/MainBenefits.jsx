import React from 'react';
import {ReactComponent as AutomatedDispatch} from "../../../assets/automated-dispatch-minimalistic.svg";
import {ReactComponent as Support24} from "../../../assets/support24-7-minimalistic.svg";
import {ReactComponent as SecurePayments} from "../../../assets/secure-payments-minimalistic.svg";

const MainBenefits = () => {
    return (
        <div className="main-benefits-wrapper">
            <div className="benefit-container-wrapper">
                <div className="benefit-container">
                    <AutomatedDispatch className="benefit-container-icon"/>
                    <h2>Automated Trucking & Dispatch</h2>
                </div>
                <div className="benefit-container">
                    <Support24 className="benefit-container-icon"/>
                    <h2>Support 24/7</h2>
                </div>
                <div className="benefit-container">
                    <SecurePayments className="benefit-container-icon"/>
                    <h2>Secure Payments</h2>

                </div>
               {/* <div className="benefit-container">
                    <Support24 className="benefit-container-icon"/>
                    <h2>24/7 Support</h2>
                    <p>Unlock the power of artificial intelligence. It's designed to be your 24/7 partner, offering
                        insights, automation, and support whenever you need it.</p>
                </div>*/}
                {/* <div className="benefit-container">
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
                </div>*/}
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