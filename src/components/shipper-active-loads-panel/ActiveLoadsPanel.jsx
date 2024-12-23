import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ActiveLoadContainer from "./active-load-container/ActiveLoadContainer";
import { BACKEND_URL } from "../../constants/constants";
import useGsapAnimation from "../../hooks/useGsapAnimation";
import GoogleMapRealTimeTrafficComponent from "../driver-dashboard/google-map-real-time-traffic-data/GoogleMapRealTimeTrafficComponent";
import Button from "../button/Button";

const ActiveLoadsPanel = ({ userRole, userID, type }) => {
    const [loads, setLoads] = useState([]);
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [selectedLoad, setSelectedLoad] = useState(null);
    const [filter, setFilter] = useState('All');

    const handleClickLoad = (load) => {
        setSelectedLoad(load);
        console.log('Selected Load:', load); // For debugging purposes
    };

    const animation = useGsapAnimation('slideLeft');

    useEffect(() => {
        if (userRole === 'shipper') {
            axios.get(`${BACKEND_URL}/get-all-loads/${userID}`)
                .then(response => {
                    const filteredLoads = response.data.filter(load => load.shipperID === userID);
                    setLoads(filteredLoads);
                })
                .catch(error => {
                    console.error('Error fetching loads:', error);
                });
        } else if (userRole === 'driver') {
            axios.get(`${BACKEND_URL}/driver-assigned-loads/${userID}`)
                .then(response => {
                    setLoads(response.data);
                    console.log('Loads:', response.data);
                })
                .catch(error => {
                    console.error('Error fetching loads:', error);
                });
        } else if (userRole === 'carrier') {
            axios.get(`${BACKEND_URL}/get-load-bids-by-carrier/${userID}`)
                .then(response => {
                    setLoads(response.data);
                })
                .catch(error => {
                    console.error('Error fetching load bids and loads:', error);
                });
        }
    }, [userRole, userID]);

    const filteredLoads = filter === 'All' ? loads : loads.filter(load => load.loadStatus === filter);

    return (
        <div className="shipper-dashboard-side-panel-wrapper" ref={animation}>
            <div className="shipper-map-container">
                <GoogleMapRealTimeTrafficComponent
                    type="destination"
                    origin={selectedLoad ? selectedLoad.loadPickupLocation : origin}
                    destination={selectedLoad ? selectedLoad.loadDeliveryLocation : destination}
                    borderRadius={["20px", "20px", "20px", "20px"]}
                />
            </div>
            <div className="shipper-dashboard-side-panel">
                <div className="active-loads-panel-nav">
                    <button onClick={() => setFilter('All')}>All</button>
                    <button onClick={() => setFilter('Active')}>Active</button>
                    <button onClick={() => setFilter('Booked')}>Booked</button>
                    <button onClick={() => setFilter('Dispatched')}>Dispatched</button>
                    <button onClick={() => setFilter('Picked Up')}>Picked</button>
                    <button onClick={() => setFilter('Delivered')}>Delivered</button>
                    <button onClick={() => setFilter('Completed')}>Completed</button>
                </div>
                {Array.isArray(filteredLoads) && filteredLoads.length === 0 ? (
                    <p className="chat-message-alert">Currently you didn't have any active loads</p>
                ) : (
                    Array.isArray(filteredLoads) && filteredLoads.map(load => (
                        <div onClick={() => handleClickLoad(load)} key={load.loadCredentialID}>
                            <ActiveLoadContainer
                                loadStatus={load.loadStatus}
                                loadPickupLocation={load.loadPickupLocation}
                                loadPickupDate={load.loadPickupDate}
                                loadDeliveryLocation={load.loadDeliveryLocation}
                                loadDeliveryDate={load.loadDeliveryDate}
                                typeOfLoad={load.loadType}
                                shipperID={load.shipperID}
                                carrierID={load.loadCarrierID}
                                type={type}
                                loadMilTrip={load.loadMilesTrip}
                                loadCredentialID={load.loadCredentialID}
                                loadCarrierID={load.loadCarrierID}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ActiveLoadsPanel;