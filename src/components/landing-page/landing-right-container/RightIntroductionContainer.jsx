import React from 'react';
import {ReactComponent as RightArrowIcon} from "../../../assets/vector-right-arrow.svg";
import "../LandingPage.css"
import {useNavigate} from "react-router-dom";

const RightIntroductionContainer = ({ title, description, image }) => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/sign-up");
    };


    return (
        <div className="right-landing-introduction-container">
            <img src={image} alt={title} className="landing-image" width="750" height="450"/>
            <div className="landing-introduction-content">
                <h1>{title}</h1>
                <p>{description}</p>
                <button onClick={handleNavigate}>Get Started <RightArrowIcon className="right-arrow"/></button>
            </div>
        </div>
    );
};

export default RightIntroductionContainer;