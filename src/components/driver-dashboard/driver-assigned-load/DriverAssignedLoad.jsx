import React, {useEffect, useState, useRef} from "react";
import '../DriverDashboard.css';
import {useParams} from 'react-router-dom';
import axios from "axios";
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import { useNavigate } from 'react-router-dom';
import GoogleMapShowDriverDirection from "../../google-driver-load-direction/GoogleMapShowDriverDirection";
import FloatingWindowSuccess from "../../floating-window-success/FloatingWindowSuccess";
import ClipLoader from "react-spinners/ClipLoader";

const DriverAssignedLoad = () => {
    const [isPickedUp, setIsPickedUp] = useState(false);
    const {loadID} = useParams();
    const [isLoadDeliveredStatus, setIsLoadDeliveredStatus] = useState(false);
    const [isCompletingDelivering, setIsCompletingDelivering] = useState(false);
    const [load, setLoad] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getLoad = async () => {
            try {
                const response = await axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-load/${loadID}`);
                setLoad(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching load:', error);
            }
        };

        getLoad();
    }, [loadID]);

    const handleDeliveredClick = async () => {
        setIsCompletingDelivering(true);
        try {
            const response = await axios.put(`https://jarvis-ai-logistic-db-server.onrender.com/load-update-delivered-status/${loadID}`, {
                loadDeliveredStatus: 'Delivered'
            });
            if (response.status === 200) {
                console.log('Load status updated successfully');
                setIsLoadDeliveredStatus(true);
                navigate(`/load-delivered-success/${driverID}`);
            } else {
                console.log('Error updating load status:', response);
            }
        } catch (error) {
            console.error('Error updating load status:', error);
        }
        setIsCompletingDelivering(false);
    };

    let loadDeliveryLocation = load.loadDeliveryLocation;
    let loadPickUpLocation = load.loadPickupLocation;

    const [currentLocation, setCurrentLocation] = useState(null);
    const {driverID} = useParams();

    const [currentDestination, setCurrentDestination] = useState(loadPickUpLocation);

    const updateLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLocation({lat: position.coords.latitude, lng: position.coords.longitude});
                },
                (error) => {
                    console.log(error);
                },
                {enableHighAccuracy: true}
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        updateLocation();
    }, []);


    const handlePickUp = () => {
        setIsPickedUp(true);
    };


    return (
        <>
            {isLoadDeliveredStatus && <FloatingWindowSuccess text="You succesfully delivered load"/>}
            <div className="driver-dashboard-wrapper">
                <DashboardSidebar
                    DashboardAI={{visible: true, route: `/driver-dashboard/${driverID}`}}
                    Settings={{visible: true, route: `/driver-settings/${driverID}`}}
                    AssignedLoad={{visible: true, route: `/driver-assigned-loads/${driverID}`}}
                    Profile={{visible: true, route: `/driver-profile/${driverID}`}}
                />
                <div className="driver-dashboard-content">
                    <HeaderDashboard
                        contentTitle="Driver Dashboard"
                        contentSubtitle="Welcome to your dashboard"
                        accountName="Jack Daniels"
                        accountRole="Driver"
                        profileLink={`/driver-profile/${driverID}`}
                        bellLink={`/driver-settings/${driverID}`}
                        settingsLink={`/driver-profile/${driverID}`}
                    />
                    <div className="driver-dashboard-content">
                        <div className="driver-map-direction-wrapper">
                            {currentLocation &&
                                <GoogleMapShowDriverDirection
                                    origin={currentLocation}
                                    destination={isPickedUp ? load.loadDeliveryLocation : load.loadPickupLocation}
                                />
                            }
                        </div>
                        <div className="driver-map-direction-nav">
                            <div className="driver-map-direction-nav-header">
                                <section>
                                    <h2>
                                        3 hr 18 min
                                    </h2>
                                    <span>
                                    <p>
                                    150 mi
                                    </p>
                                    <p>
                                    3:50pm
                                    </p>
                                </span>
                                </section>
                                <button className="exit-button">Exit</button>
                            </div>
                            <div className="driver-map-direction-nav-body">
                                <div>
                                    {isPickedUp ? (
                                        <button className="pick-up-button"
                                                onClick={handleDeliveredClick}>
                                            {isCompletingDelivering ?
                                                <>
                                                    <ClipLoader color="#fffff" loading={true} size={17}
                                                                className="payment-loader"/>
                                                    Processing...
                                                </>
                                                : 'Delivered'}
                                        </button>
                                    ) : (
                                        <button className="pick-up-button" onClick={handlePickUp}>Picked Up</button>
                                    )}
                                </div>
                                <button className="transit-update-button" onClick={updateLocation}>Transit Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default DriverAssignedLoad;
