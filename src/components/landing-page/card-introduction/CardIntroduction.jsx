import React from 'react';
import "../LandingPage.css"
import {ReactComponent as FirstCard} from "../../../assets/card1.svg";
import {ReactComponent as SecondCard} from "../../../assets/card2.svg";
import {ReactComponent as ThirdCard} from "../../../assets/card3.svg";
import {ReactComponent as FourthCard} from "../../../assets/card4.svg";

const CardIntroduction = () => {
    return (
        <div className="card-wrapper-content">
            <h1>How It Works</h1>
            <p>We - can save your time, can save your money.</p>
            <div className="introduction-card-wrapper">
                <FirstCard  className="introduction-card-vector" />
                <SecondCard className="introduction-card-vector" />
                <ThirdCard  className="introduction-card-vector" />
                <FourthCard className="introduction-card-vector" />
            </div>
        </div>
    );
};

export default CardIntroduction;