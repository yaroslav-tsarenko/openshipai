import React from 'react';
import {ReactComponent as DirectionIconNumbers} from "../../assets/directions-number-icons.svg";
import {ReactComponent as BidArrowIcon} from "../../assets/bid-arrow-icon.svg";
import {Link, useParams} from "react-router-dom";
import GoogleMapShowDirection from "../google-map-show-direction/GoogleMapShowDirection";

const AssignedLoadContainer = ({loadTitle, driverID, loadPickupLocation, loadPickupLocationDate, loadCredentialID, loadDeliveryLocation, loadDeliveryLocationDate, loadType, loadWeight, loadTrip}) => {

    return (
        <div className="take-load-container">
            <div className="driver-load-directions-wrapper">
                <span>
                    <label htmlFor="">Load Title</label>
                    <h3>{loadTitle}</h3>
                </span>
                <div className="driver-load-directions">
                    <DirectionIconNumbers height="500px"/>
                    <div className="load-driver-direction">
                        <section>
                            <h3>{loadPickupLocation}</h3>
                            <p>{loadPickupLocationDate}</p>
                        </section>
                        <section>
                            <h3>{loadDeliveryLocation}</h3>
                            <p>{loadDeliveryLocationDate}</p>
                        </section>
                    </div>
                </div>
            </div>
            <div className="load-short-info">
                <span>
                    <label>Load Type</label>
                    <h3>{loadType}</h3>
                </span>
                <span>
                    <label>Weight</label>
                    <h3>{loadWeight}</h3>
                </span>
                <span>
                    <label>Trip</label>
                    <h3>{loadTrip}</h3>
                </span>
            </div>
            <div className="instant-book-load">
                <label>Assigned to you</label>
                <Link to={`/driver-assigned-load/${driverID}/${loadCredentialID}`}
                      className="bid-button">View<BidArrowIcon className="bid-arrow-icon"/></Link>
            </div>
            <div className="map-load-section-load-container">
                <GoogleMapShowDirection origin={loadPickupLocation} destination={loadDeliveryLocation}/>
            </div>
        </div>
    );
};

export default AssignedLoadContainer;