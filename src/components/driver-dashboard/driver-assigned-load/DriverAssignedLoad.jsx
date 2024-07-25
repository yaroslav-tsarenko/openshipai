import React, { useEffect, useState } from "react";
import '../DriverDashboard.css';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { ReactComponent as DefaultUserAvatar } from "../../../assets/default-avatar.svg";
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import { useNavigate } from 'react-router-dom';
import GoogleMapShowDriverDirection from "../../google-driver-load-direction/GoogleMapShowDriverDirection";
import FloatingWindowSuccess from "../../floating-window-success/FloatingWindowSuccess";
import ClipLoader from "react-spinners/ClipLoader";
import { BACKEND_URL } from "../../../constants/constants";
import { Skeleton } from "@mui/material";

const DriverAssignedLoad = () => {
    const [isPickedUp, setIsPickedUp] = useState(false);
    const { loadID, driverID } = useParams();
    const [loading, setLoading] = useState(false);
    const [driverInfo, setDriverInfo] = useState(null);
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [isLoadDeliveredStatus, setIsLoadDeliveredStatus] = useState(false);
    const [isCompletingDelivering, setIsCompletingDelivering] = useState(false);
    const [load, setLoad] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getDriver = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/get-driver/${driverID}`);
                const data = await response.json();
                setDriverInfo(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getDriver();
    }, [driverID]);

    useEffect(() => {
        const getAvatar = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-driver-avatar/${driverID}`);
                if (response.data.driverAvatar) {
                    setPreviewSavedImage(`${BACKEND_URL}/${response.data.driverAvatar}`);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getAvatar();
    }, [driverID]);

    useEffect(() => {
        if (driverInfo && driverInfo.driverAvatar) {
            setLoading(true);
            const avatarUrl = `${BACKEND_URL}/${driverInfo.driverAvatar}`;
            axios.get(avatarUrl)
                .then(() => {
                    setPreviewSavedImage(avatarUrl);
                    setLoading(false);
                })
                .catch(() => {
                    console.error('Image does not exist');
                    setLoading(false);
                });
        }
    }, [driverInfo]);

    useEffect(() => {
        const getLoad = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-load/${loadID}`);
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
            const response = await axios.put(`${BACKEND_URL}/load-update-delivered-status/${loadID}`, {
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

    const updateLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
                },
                (error) => {
                    console.log(error);
                },
                { enableHighAccuracy: true }
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
            {isLoadDeliveredStatus && <FloatingWindowSuccess text="You successfully delivered load" />}
            <div className="driver-dashboard-wrapper">
                <DashboardSidebar
                    DashboardAI={{ visible: true, route: `/driver-dashboard/${driverID}` }}
                    Settings={{ visible: true, route: `/driver-settings/${driverID}` }}
                    AssignedLoad={{ visible: true, route: `/driver-assigned-loads/${driverID}` }}
                />
                <div className="driver-dashboard-content">
                    <HeaderDashboard
                        contentTitle={driverInfo ?
                            <>Welcome back, {driverInfo.driverFirstAndLastName}!</> :
                            <Skeleton variant="text" width={250} />}
                        contentSubtitle="Monitor payments, loads, revenues"
                        accountName={driverInfo ? driverInfo.driverFirstAndLastName : <Skeleton variant="text" width={60} />}
                        accountRole={driverInfo ? driverInfo.role : <Skeleton variant="text" width={40} />}
                        profileLink={`/driver-profile/${driverID}`}
                        bellLink={`/driver-settings/${driverID}`}
                        settingsLink={`/driver-profile/${driverID}`}
                        avatar={previewSavedImage ? previewSavedImage : DefaultUserAvatar}
                    />
                    <div className="driver-dashboard-content">
                        <div className="driver-map-direction-wrapper">
                            {currentLocation &&
                                <GoogleMapShowDriverDirection
                                    origin={currentLocation}
                                    destination={isPickedUp ? load.loadDeliveryLocation : load.loadPickupLocation}
                                    currentLocation={currentLocation}
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
                                                                className="payment-loader" />
                                                    Processing...
                                                </>
                                                : 'Delivered'}
                                        </button>
                                    ) : (
                                        <button className="pick-up-button" onClick={handlePickUp}>Picked Up</button>
                                    )}
                                </div>
                                <button className="transit-update-button" onClick={updateLocation}>Transit Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DriverAssignedLoad;