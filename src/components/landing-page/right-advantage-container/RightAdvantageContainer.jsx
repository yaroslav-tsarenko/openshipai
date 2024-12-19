import React from 'react';
import {Fade} from "react-awesome-reveal";
import {ReactComponent as RightArrowIconBlue} from "../../../assets/images/vector-right-arrow-blue.svg";
import "../LandingPage.css"

const RightAdvantageContainer = ({ title, description, image }) => {
    return (
        <Fade>
            <div className="right-advantage-introduction-container">
                <div className="advantage-introduction-content">
                    <h2 className="advantage-container-title">{title}</h2>
                    <p>{description}</p>
                    <button className="get-started-button-advantage-container">Get Started <RightArrowIconBlue
                        className="right-arrow"/></button>
                </div>
                <img src={image} alt={title} className="landing-image" width="750" height="450"/>
            </div>
        </Fade>
    );
};

export default RightAdvantageContainer;