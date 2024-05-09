import React from 'react';
import {ReactComponent as DirectionIcon} from "../../assets/direction-icon.svg";
import {ReactComponent as CarrierLogo} from "../../assets/trane-logo-carrier.svg";
import "./LoadContainer.css"
import GoogleMapShowDirection from "../google-map-show-direction/GoogleMapShowDirection";

const LoadContainer = () => {
    return (
        <div className="loadboard-load-container-wrapper">
            <section className="loadboard-load-container-info">
                <div className="loadboard-load-info-main">
                    <div className="loadboard-load-status">
                        <span className="loadboard-status-circle"></span>
                        <p className="loadboard-status-text">Booked</p>
                    </div>
                    <h2 className="loadboard-load-price">560$</h2>
                    <div className="loadboard-load-direction-wrapper">
                        <DirectionIcon height="150px" style={{marginRight: '10px'}}/>
                        <div className="loadboard-load-direction">
                            <span className="loadboard-load-direction-origin">
                                <h3>New York, USA</h3>
                                <p>4 March - 13:00</p>
                            </span>
                            <span className="loadboard-load-direction-destination">
                                <h3>Los Angeles, USA</h3>
                                <p>4 March - 13:00</p>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="loadboard-load-info-additional">
                    <CarrierLogo className="loadboard-carrier-load-logo"/>
                    <div className="loadboard-credentials">
                        <span>5673-5385-6525-8642</span>
                        <span>Vehicle Load</span>
                        <span>1300 lb</span>
                        <span>Dry Van</span>
                    </div>
                </div>
            </section>
            <div className="map-load-section">
                <GoogleMapShowDirection origin="New York" destination="Los Angeles"/>
            </div>
        </div>
    );
};

export default LoadContainer;