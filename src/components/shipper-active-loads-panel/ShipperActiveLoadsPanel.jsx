import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GoogleMapRealTimeTrafficComponent
    from "../driver-dashboard/google-map-real-time-traffic-data/GoogleMapRealTimeTrafficComponent";
import axios from 'axios';
import {ReactComponent as DirectionIcon} from "../../assets/direction-icon.svg";
import {ReactComponent as CarrierIcon} from "../../assets/trane-logo-carrier.svg";
import ActiveLoadContainer from "./active-load-container/ActiveLoadContainer";

const ShipperActiveLoadsPanel = () => {
    const { shipperID } = useParams();
    const [loads, setLoads] = useState([]);
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8080/get-all-loads') // replace with your actual API endpoint
            .then(response => {
                const filteredLoads = response.data.filter(load => load.shipperID === shipperID);
                setLoads(filteredLoads);
            })
            .catch(error => {
                console.error('Error fetching loads:', error);
            });
    }, [shipperID]);

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
                    destination={destination}/>
            </div>
            <div className="shipper-dashboard-side-panel">
                {loads.map(load => (
                    <div onClick={() => handleClick(load)}>
                        <ActiveLoadContainer
                            key={load.loadCredentialID}
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
                ))}
            </div>
        </div>
    );
};

export default ShipperActiveLoadsPanel;