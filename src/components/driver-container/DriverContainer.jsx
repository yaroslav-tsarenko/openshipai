import React from 'react';
import {ReactComponent as DriverAvatarExample} from "../../assets/default-user-avatar.svg";
import {ReactComponent as MoreButton} from "../../assets/more-button.svg";
import './DriverContainer.css';
import GoogleMapShowDriverLocation from "../google-map-show-driver-location/GoogleMapShowDriverLocation";

const DriverContainer = ({driverNameAndLastName, driverTruck, driverEmail, driverInsuranceStatus, driverExpiredInsurance, driverCurrentLocation}) => {
    return (
        <div className="driver-container-card">
            <DriverAvatarExample className="driver-photo-example"/>
            <div className="driver-info-container">
                <section>
                    <label>Name & Last Name</label>
                    <h3>{driverNameAndLastName || "N/A"}</h3>
                </section>
                <section>
                    <label>Truck</label>
                    <h3>{driverTruck || "N/A"}</h3>
                </section>
                <section>
                    <label>Email</label>
                    <h3>{driverEmail || "N/A"}</h3>
                </section>
            </div>
            <div className="driver-info-container">
                <section>
                    <label>Insurance Status</label>
                    <h3>{driverInsuranceStatus || "N/A"}</h3>
                </section>
                <section>
                    <label>Insurance Expired Data</label>
                    <h3>{driverExpiredInsurance || "N/A"}</h3>
                </section>
                <section>
                    <label>Current Location</label>
                    <h3>{driverCurrentLocation || "Driver didn't give access to location"}</h3>
                </section>
            </div>
            <div className="driver-info-action-container">
                <div className="more-driver-info">
                    <MoreButton/>
                </div>
                <button>
                    Get Driver's Location
                </button>
            </div>
            <GoogleMapShowDriverLocation/>
        </div>
    );
};

export default DriverContainer;