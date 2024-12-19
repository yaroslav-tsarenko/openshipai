import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactComponent as MoreButton } from "../../assets/images/more-button.svg";
import { ReactComponent as DefaultUserAvatar } from "../../assets/images/default-user-avatar.svg";
import './DriverContainer.css';
import GoogleMapRealTimeTrafficComponent
    from "../driver-dashboard/google-map-real-time-traffic-data/GoogleMapRealTimeTrafficComponent";

const DriverContainer = ({
                             driverNameAndLastName,
                             driverLat,
                             driverLng,
                             driverTruck,
                             driverEmail,
                             driverInsuranceStatus,
                             driverExpiredInsurance
                         }) => {
    const [driverCurrentLocation, setDriverCurrentLocation] = useState("Driver didn't give access to location");

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
                    params: {
                        lat: driverLat,
                        lon: driverLng,
                        format: 'json'
                    }
                });
                const { address } = response.data;
                const location = `${address.country}, ${address.town || address.city || address.village || address.hamlet || 'Unknown location'}`;
                setDriverCurrentLocation(location);
            } catch (error) {
                console.error("Error fetching location:", error);
            }
        };

        if (driverLat && driverLng) {
            fetchLocation();
        }
    }, [driverLat, driverLng]);

    const latitude = Number(driverLat);
    const longitude = Number(driverLng);


    return (
        <div className="driver-container-card">
            <DefaultUserAvatar className="driver-photo-example" />
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
                    <label>Insurance Expired Date</label>
                    <h3>{driverExpiredInsurance || "N/A"}</h3>
                </section>
                <section>
                    <label>Current Location</label>
                    <h3>{driverCurrentLocation}</h3>
                </section>
            </div>
            <div className="driver-info-action-container">
                <div className="more-driver-info">
                    <MoreButton />
                </div>
                <button>
                    Get Driver's Location
                </button>
            </div>
            <div className="driver-location-map">
                <GoogleMapRealTimeTrafficComponent type="location" lat={latitude} lng={longitude} borderRadius={["0px", "30px", "30px", "0px"]} />
            </div>
        </div>
    );
};

export default DriverContainer;
