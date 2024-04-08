import React from 'react';
import '../LandingPage.css';
import {ReactComponent as HowItWorksVector} from "../../../assets/how-it-works.svg";

const HowItWorks = () => {
    return (
        <div className="how-it-works-wrapper">
            <HowItWorksVector/>
        </div>
    );
};

export default HowItWorks;