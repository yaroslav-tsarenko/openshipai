import React from 'react';
import {ReactComponent as RightArrowIcon} from "../../../assets/vector-right-arrow.svg";
import "../LandingPage.css"
import {useNavigate} from "react-router-dom";

const LeftIntroductionContainer = ({ title, description, image }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/sign-up");
    };


    return (
        <div className="left-landing-introduction-container">
            <div className="landing-introduction-content">
                <h1>{title}</h1>
                <p>{description}</p>
                <button onClick={handleNavigate}>Get Started <RightArrowIcon className="right-arrow"/></button>
            </div>
            <img src={image} alt={title} className="landing-image" width="750" height="450" />
        </div>
    );
};

export default LeftIntroductionContainer;