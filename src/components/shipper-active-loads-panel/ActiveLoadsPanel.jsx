import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ActiveLoadContainer from "./active-load-container/ActiveLoadContainer";
import {BACKEND_URL} from "../../constants/constants";
import useGsapAnimation from "../../hooks/useGsapAnimation";
import GoogleMapRealTimeTrafficComponent
    from "../driver-dashboard/google-map-real-time-traffic-data/GoogleMapRealTimeTrafficComponent";

const ActiveLoadsPanel = ({userRole, userID}) => {
    const [loads, setLoads] = useState([]);
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [selectedLoad, setSelectedLoad] = useState(null);

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
            axios.get(`${BACKEND_URL}/get-driver-loads/${userID}`)
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
                    setLoads(response.data.loads);
                    console.log('Load Bids:', response.data.loadBids);
                    console.log('Loads:', response.data.loads);
                })
                .catch(error => {
                    console.error('Error fetching load bids and loads:', error);
                });
        }
    }, [userRole, userID]);

    const handleClick = (load) => {
        setOrigin(load.loadPickupLocation);
        setDestination(load.loadDeliveryLocation);
    };

    return (
        <div className="shipper-dashboard-side-panel-wrapper" ref={animation}>
           {/* <div className="shipper-map-container">
                <GoogleMapRealTimeTrafficComponent
                    origin={selectedLoad ? selectedLoad.loadPickupLocation : origin}
                    destination={selectedLoad ? selectedLoad.loadDeliveryLocation : destination}/>
            </div>*/}
            <div className="shipper-dashboard-side-panel">
                {loads.length === 0 ? (
                    <p className="chat-message-alert">Currently you didn't have any active loads</p>
                ) : (
                    loads.map(load => (
                        <div onClick={() => handleClickLoad(load)} key={load.loadCredentialID}>
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
              {/*  {selectedLoad && (
                    <div>
                        <h2>Selected Load Details</h2>
                        <p>Status: {selectedLoad.loadStatus}</p>
                        <p>Pickup Location: {selectedLoad.loadPickupLocation}</p>
                        <p>Pickup Date: {selectedLoad.loadPickupDate}</p>
                        <p>Delivery Location: {selectedLoad.loadDeliveryLocation}</p>
                        <p>Delivery Date: {selectedLoad.loadDeliveryDate}</p>
                        <p>Type of Load: {selectedLoad.loadType}</p>
                        <p>Miles Trip: {selectedLoad.loadMilesTrip}</p>
                        <p>Credential ID: {selectedLoad.loadCredentialID}</p>
                    </div>
                )}*/}
            </div>
        </div>
    );
};

export default ActiveLoadsPanel;