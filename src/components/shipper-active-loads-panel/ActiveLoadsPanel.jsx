import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GoogleMapRealTimeTrafficComponent from "../driver-dashboard/google-map-real-time-traffic-data/GoogleMapRealTimeTrafficComponent";
import axios from 'axios';
import ActiveLoadContainer from "./active-load-container/ActiveLoadContainer";
import { BACKEND_URL } from "../../constants/constants";

const ActiveLoadsPanel = ({ user, userID }) => {
    const [loads, setLoads] = useState([]);
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");

    useEffect(() => {
        if (user === 'shipper') {
            axios.get(`${BACKEND_URL}/get-all-loads/${userID}`)
                .then(response => {
                    const filteredLoads = response.data.filter(load => load.shipperID === userID);
                    setLoads(filteredLoads);
                })
                .catch(error => {
                    console.error('Error fetching loads:', error);
                });
        } else if (user === 'driver') {
            axios.get(`${BACKEND_URL}/get-all-loads`)
                .then(response => {
                    const filteredLoads = response.data.filter(load => load.loadAssignedDriverID === userID);
                    setLoads(filteredLoads);
                    console.log('Loads:', response.data);
                })
                .catch(error => {
                    console.error('Error fetching loads:', error);
                });
        } else if (user === 'carrier') {

        }
    }, [user, userID]);

    const handleClick = (load) => {
        setOrigin(load.loadPickupLocation);
        setDestination(load.loadDeliveryLocation);
    };

    return (
        <div className="shipper-dashboard-side-panel-wrapper">
            <div className="shipper-map-container">
                <GoogleMapRealTimeTrafficComponent
                    className="shipper-info-google-map-container"
                    origin={origin}
                    destination={destination} />
            </div>
            <div className="shipper-dashboard-side-panel">
                {loads.length === 0 ? (
                    <p className="chat-message-alert">Currently you didn't have any active loads</p>
                ) : (
                    loads.map(load => (
                        <div onClick={() => handleClick(load)} key={load.loadCredentialID}>
                            <ActiveLoadContainer
                                loadStatus={load.loadStatus}
                                loadPickupLocation={load.loadPickupLocation}
                                loadPickupDate={load.loadPickupDate}
                                loadDeliveryLocation={load.loadDeliveryLocation}
                                loadDeliveryDate={load.loadDeliveryDate}
                                typeOfLoad={load.loadType}
                                loadMilTrip={load.loadMilesTrip}
                                loadCredentialID={load.loadCredentialID}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ActiveLoadsPanel;