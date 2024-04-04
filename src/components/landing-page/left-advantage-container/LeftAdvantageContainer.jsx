import React from 'react';
import {Fade} from "react-awesome-reveal";
import {ReactComponent as RightArrowIconBlue} from "../../../assets/vector-right-arrow-blue.svg";
import "../LandingPage.css"

const LeftAdvantageContainer = ({ title, description, image }) => {
    return (
        <Fade>
            <div className="left-advantage-introduction-container">
                <img src={image} alt={title} className="landing-image" width="750" height="450"/>
                <div className="advantage-introduction-content">
                    <h2 className="advantage-container-title">{title}</h2>
                    <p>{description}</p>
                    <button className="get-started-button-advantage-container">Get Started <RightArrowIconBlue
                        className="right-arrow"/></button>
                </div>
            </div>
        </Fade>
    );
};

export default LeftAdvantageContainer;