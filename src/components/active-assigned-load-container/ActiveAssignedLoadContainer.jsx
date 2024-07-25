import React from 'react';
import {ReactComponent as DirectionIcon} from "../../assets/direction-icon.svg";
import "./ActiveAssignedLoadContainer.css";
import {ReactComponent as BidArrowIcon} from "../../assets/bid-arrow-icon.svg";
import {Link} from "react-router-dom";


const ActiveLoadContainer = ({ status, driverID, origin, originTime, destination, destinationTime, loadType, distance, loadID, onChatClick }) => {
    return (
        <div className="active-load-container">
            <div className="load-container-status">
                <section className="load-status-section">
                    <div className="load-status-icon"></div>
                    {status}
                </section>
                <div className="load-directions">
                    <DirectionIcon className="load-directions-icon"/>
                    <div className="origin-destination-container">
                        <section className="section-origin-destination">
                            <h3 className="load-directions-title">{origin}</h3>
                            <p className="load-directions-description">{originTime}</p>
                        </section>
                        <section className="section-origin-destination">
                            <h3 className="load-directions-title">{destination}</h3>
                            <p className="load-directions-description">{destinationTime}</p>
                        </section>
                    </div>
                </div>
            </div>
            <div className="load-container-info">
                <section className="load-info-section">{loadType}</section>
                <section className="load-info-section">{distance}</section>
                <section className="load-info-section">{loadID}</section>
            </div>
            <div className="load-container-driver">
                <Link to={`/driver-assigned-load/${driverID}/${loadID}`} className="chat-driver-button" >View<BidArrowIcon className="bid-arrow-icon"/></Link>
            </div>
        </div>
    );
};

export default ActiveLoadContainer;