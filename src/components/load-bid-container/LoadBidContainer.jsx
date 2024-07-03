import React from 'react';
import {ReactComponent as DirectionIcon} from "../../assets/load-container-directions-smaller.svg";
import "./LoadContainer.css"
import GoogleMapShowDirection from "../google-map-show-direction/GoogleMapShowDirection";

const LoadBidContainer = ({
                           loadStatus,
                           loadPrice,
                           loadPickupLocation,
                           loadPickupTime,
                           loadDeliveryLocation,
                           loadTitle,
                           loadDeliveryTime,
                           loadDescription,
                           loadCredentialID,
                           loadType,
                           loadWeight,
                           loadTrailerType,
                           loadVehicleModel,
                           loadVehicleYear,
                           loadMilesTrip,
                           loadQoutes,
                           loadTypeOfPackaging,
                           shipperID,
                       }) => {
    return (
        <div className="loadboard-load-container-wrapper">
            <div>
                {loadQoutes > 0 && <div className="load-quotes-circle">{loadQoutes}</div>}
            </div>
            <section className="loadboard-load-container-info">
                <div className="loadboard-load-info-main">
                    <div className="loadboard-load-status">
                        <span className="loadboard-status-circle"></span>
                        <p className="loadboard-status-text">{loadStatus}</p>
                    </div>
                    <h3 className="load-container-title">{loadType}</h3>
                    <h2 className="loadboard-load-price">{loadPrice}$</h2>
                    <div className="loadboard-load-direction-wrapper">
                        <DirectionIcon style={{marginRight: '10px'}}/>
                        <div className="loadboard-load-direction">
                            <span className="loadboard-load-direction-origin">
                                <h3>{loadPickupLocation}</h3>
                                <p>{loadPickupTime}</p>
                            </span>
                            <span className="loadboard-load-direction-destination">
                                <h3>{loadDeliveryLocation}</h3>
                                <p>{loadDeliveryTime}</p>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="loadboard-load-info-additional">
                    <div className="loadboard-credentials">
                        {loadCredentialID && <span>{loadCredentialID}</span>}
                        {loadType && <span>{loadType}</span>}
                        {loadWeight && <span>{loadWeight}</span>}
                        {loadTrailerType && <span>{loadTrailerType}</span>}
                        {loadVehicleModel && <span>{loadVehicleModel}</span>}
                        {loadVehicleYear && <span>{loadVehicleYear}</span>}
                        {loadMilesTrip && <span>{loadMilesTrip} mil</span>}
                        {loadTypeOfPackaging && <span>{loadTypeOfPackaging}</span>}
                        {loadDescription && <span>{loadDescription}</span>}
                    </div>
                </div>
            </section>
            <div className="map-load-section-load-container">
                <GoogleMapShowDirection origin={loadPickupLocation} destination={loadDeliveryLocation}/>
            </div>
        </div>
    );
};

export default LoadBidContainer;