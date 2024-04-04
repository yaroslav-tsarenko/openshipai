import React from 'react';
import {ReactComponent as RightArrowIcon} from "../../../assets/vector-right-arrow.svg";
import "../LandingPage.css"

const RightIntroductionContainer = ({ title, description, image }) => {
    return (
        <div className="right-landing-introduction-container">
            <img src={image} alt={title} className="landing-image" width="750" height="450"/>
            <div className="landing-introduction-content">
                <h1>{title}</h1>
                <p>{description}</p>
                <button>Get Started <RightArrowIcon className="right-arrow"/></button>
            </div>
        </div>
    );
};

export default RightIntroductionContainer;