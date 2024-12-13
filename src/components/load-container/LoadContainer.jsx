import React from 'react';
import {ReactComponent as DirectionIcon} from "../../assets/images/load-container-directions-smaller.svg";
import {ReactComponent as DirectionIconMobile} from "../../assets/images/a-to-bo-direction-icon.svg";
import "./LoadContainer.css"
import GoogleMapShowDirection from "../google-map-show-direction/GoogleMapShowDirection";
import {Link} from "react-router-dom";


const LoadContainer = ({
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
        <>
            <Link to={`/shipper-load/${shipperID}/${loadCredentialID}`} className="loadboard-load-container-wrapper">
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
            </Link>
            <Link to={`/shipper-load/${shipperID}/${loadCredentialID}`}
                  className="loadboard-load-container-wrapper-mobile">
                <div>
                    {loadQoutes > 0 && <div className="load-quotes-circle">{loadQoutes}</div>}
                </div>
                <section className="loadboard-load-container-info">
                    <div className="loadboard-load-info-main">

                        <h3 className="load-container-title">{loadType}</h3>
                        <h2 className="loadboard-load-price-mobile">{loadPrice}$</h2>
                        <div className="loadboard-credentials-mobile">
                            {loadType && <span>{loadType}</span>}
                            {loadTrailerType && <span>{loadTrailerType}</span>}
                            {loadMilesTrip && <span>{loadMilesTrip} mil</span>}
                            {loadWeight && <span>{loadWeight}</span>}
                            {loadTypeOfPackaging && <span>{loadTypeOfPackaging}</span>}
                        </div>
                        <div className="loadboard-load-direction-wrapper-mobile">
                            <DirectionIconMobile style={{marginRight: '10px'}}/>
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
                </section>
            </Link>
        </>
    );
};

export default LoadContainer;