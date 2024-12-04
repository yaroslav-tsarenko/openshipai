import React, {useEffect, useState} from "react";
import '../DriverDashboard.css';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";
import {ReactComponent as DefaultUserAvatar} from "../../../assets/default-avatar.svg";
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import {useNavigate} from 'react-router-dom';
import GoogleMapShowDriverDirection from "../../google-driver-load-direction/GoogleMapShowDriverDirection";
import Alert from "../../floating-window-success/Alert";
import ClipLoader from "react-spinners/ClipLoader";
import {BACKEND_URL} from "../../../constants/constants";
import {Skeleton} from "@mui/material";
import OpenRouteService from 'openrouteservice-js'; // Import OpenRouteService

const DriverAssignedLoad = () => {
    const [isPickedUp, setIsPickedUp] = useState(false);
    const {loadID, driverID} = useParams();
    const [loading, setLoading] = useState(false);
    const [driverInfo, setDriverInfo] = useState(null);
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [isLoadDeliveredStatus, setIsLoadDeliveredStatus] = useState(false);
    const [isCompletingDelivering, setIsCompletingDelivering] = useState(false);
    const [isStartingTrip, setIsStartingTrip] = useState(false);
    const [load, setLoad] = useState([]);
    const [currentLocation, setCurrentLocation] = useState({lat: null, lng: null});
    const navigate = useNavigate();
    const [position, setPosition] = useState({lat: null, lng: null});
    const [tripDuration, setTripDuration] = useState('');
    const [loadMilesTrip, setLoadMilesTrip] = useState('');
    const [locationName, setLocationName] = useState('');
    const [destination, setDestination] = useState('');
    const [distance, setDistance] = useState(null);
    const [arrivalTime, setArrivalTime] = useState(null);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };
    const calculateDistance = async (origin, destination) => {
        const apiKey = '5b3ce3597851110001cf6248aaf2054f2cee4e6da1ceb0598a98a7ca';
        try {
            const originResponse = await axios.get(
                `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${origin}`
            );
            const destinationResponse = await axios.get(
                `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${destination}`
            );
            const originCoords = originResponse.data.features[0].geometry.coordinates;
            const destinationCoords = destinationResponse.data.features[0].geometry.coordinates;
            const routeResponse = await axios.post(
                `https://api.openrouteservice.org/v2/directions/driving-car`,
                {
                    coordinates: [originCoords, destinationCoords]
                },
                {
                    headers: {
                        Authorization: apiKey,
                        'Content-Type': 'application/json'
                    }
                }
            );
            const distanceInMeters = routeResponse.data.routes[0].summary.distance;
            const distanceInMiles = distanceInMeters / 1609.344; // More accurate conversion factor
            const durationInSeconds = routeResponse.data.routes[0].summary.duration;
            const durationInMinutes = durationInSeconds / 60;
            const hours = Math.floor(durationInMinutes / 60);
            const minutes = Math.round(durationInMinutes % 60);
            const arrival = new Date();
            arrival.setMinutes(arrival.getMinutes() + durationInMinutes);
            setDistance(distanceInMiles.toFixed(2));
            setTripDuration(`${hours} hours ${minutes} min`);
            setArrivalTime(arrival.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
        } catch (error) {
            console.error('Error calculating distance:', error);
            setDistance(null);
            setTripDuration(null);
            setArrivalTime(null);
        }
    };

    const loadPickupLocation = load.loadPickupLocation;
    const loadDeliveryLocation = load.loadDeliveryLocation;

    useEffect(() => {
        if (locationName && loadPickupLocation) {
            calculateDistance(locationName, loadPickupLocation);
        }
    }, [locationName, loadPickupLocation]);

    useEffect(() => {
        if (locationName && loadDeliveryLocation && load.loadDeliveredStatus === "Picked Up") {
            calculateDistance(locationName, loadDeliveryLocation);
        }
    }, [locationName, loadDeliveryLocation, load.loadDeliveredStatus]);

    useEffect(() => {
        const getlocationByName = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const {latitude, longitude} = position.coords;
                        try {
                            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                            const address = response.data.address;
                            const country = address.country || '';
                            const city = address.city || address.town || address.village || '';
                            const road = address.road || '';
                            const houseNumber = address.house_number || '';
                            const formattedLocation = `${country}, ${city}, ${houseNumber} ${road}`.trim();
                            setLocationName(formattedLocation);
                            console.log(formattedLocation);
                        } catch (error) {
                            console.error('Error fetching location:', error);
                        }
                    },
                    (error) => {
                        console.error('Error getting current position:', error);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000, // Optional: Set a timeout to avoid long waiting times
                        maximumAge: 0 // Optional: Ensure the position is not cached
                    }
                );
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        };

        getlocationByName();
    }, []);

    useEffect(() => {
        const getCurrentPosition = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const {latitude, longitude} = position.coords;
                        setPosition({lat: latitude, lng: longitude});
                        try {
                            await axios.put(`${BACKEND_URL}/update-driver-location/${driverID}`, {
                                driverLat: latitude,
                                driverLng: longitude
                            });
                            console.log('Driver location updated');
                        } catch (error) {
                            console.error('Error updating driver location:', error);
                        }
                    },
                    (error) => {
                        console.error('Error getting current position:', error);
                    },
                    {enableHighAccuracy: true}
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        getCurrentPosition();

        const intervalId = setInterval(getCurrentPosition, 60000); // Update every 60 seconds

        return () => clearInterval(intervalId);
    }, [driverID]);

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

    const updateLoadStatus = async (status) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/update-load-status-custom/${loadID}/${status}`);
            if (response.status === 200) {
                console.log(`Load status updated to ${status}`);
            } else {
                console.error('Error updating load status:', response);
            }
        } catch (error) {
            console.error('Error updating load status:', error);
        }
    };

    const handleDeliveredClick = async () => {
        setIsCompletingDelivering(true);
        try {
            const response = await axios.put(`${BACKEND_URL}/load-update-delivered-status/${loadID}`, {
                loadDeliveredStatus: 'Delivered'
            });
            if (response.status === 200) {
                console.log('Load status updated successfully');
                setIsLoadDeliveredStatus(true);
                updateLoadStatus('Delivered')
                const response = await axios.post(`${BACKEND_URL}/payment-for-carrier`, { loadID: loadID });
                console.log('Payment response:', response.data);
                navigate(`/load-delivered-success/${driverID}`);
            } else {
                console.log('Error updating load status:', response);
            }
        } catch (error) {
            console.error('Error updating load status:', error);
        }
        setIsCompletingDelivering(false);
    };

    const handleLoadPickup = async () => {
        setIsCompletingDelivering(true);
        try {
            const response = await axios.put(`${BACKEND_URL}/update-load-picked-up/${loadID}`, {
                loadDeliveredStatus: 'Picked Up'
            });
            if (response.status === 200) {
                console.log('Load status updated successfully');
                updateLoadStatus('Picked Up')
            } else {
                console.log('Error updating load status:', response);
            }
        } catch (error) {
            console.error('Error updating load status:', error);
        }
        setIsCompletingDelivering(false);
        window.location.reload();
    };

    const handleStartTrip = async () => {
        setIsStartingTrip(true);
        try {
            const response = await axios.put(`${BACKEND_URL}/start-trip/${loadID}`);
            if (response.status === 200) {
                setLoad(prevLoad => ({...prevLoad, loadTripStarted: 'Started'}));
                updateLoadStatus('Dispatched');
            } else {
                console.error('Error starting trip:', response);
            }
        } catch (error) {
            console.error('Error starting trip:', error);
        }
        window.location.reload();
        setIsStartingTrip(false);
    };

    const updateLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLocation({lat: position.coords.latitude, lng: position.coords.longitude});
                },
                (error) => {
                    console.log(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 1000, // Optional: Set a timeout to avoid long waiting times
                    maximumAge: 0 // Optional: Ensure the position is not cached
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        updateLocation();
        const intervalId = setInterval(updateLocation, 60000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchRouteData = async () => {
            if (currentLocation.lat && currentLocation.lng && load.loadPickupLocation) {
                try {
                    const client = new OpenRouteService.Directions({
                        api_key: '5b3ce3597851110001cf6248aaf2054f2cee4e6da1ceb0598a98a7ca'
                    });

                    const response = await client.calculate({
                        coordinates: [[currentLocation.lng, currentLocation.lat], [load.loadPickupLocation.lng, load.loadPickupLocation.lat]],
                        profile: 'driving-car',
                        format: 'geojson'
                    });

                    const route = response.routes[0];
                    const duration = route.summary.duration / 60; // Convert to minutes
                    const distance = route.summary.distance / 1000; // Convert to kilometers
                    const arrival = new Date();
                    arrival.setMinutes(arrival.getMinutes() + duration);
                    setTripDuration(`${Math.round(duration)} mins`);
                    setLoadMilesTrip(`${Math.round(distance * 0.621371)} miles`); // Convert km to miles
                    setArrivalTime(arrival.toLocaleTimeString());

                } catch (error) {
                    console.error('Error fetching route data:', error);
                }
            }
        };

        fetchRouteData();
    }, [currentLocation, load.loadPickupLocation]);

    return (
        <>
            {isLoadDeliveredStatus && <Alert text="You successfully delivered load"/>}
            <div className="shipper-dashboard-wrapper">
                <DashboardSidebar
                    DashboardAI={{ visible: true, route: `/driver-dashboard/${driverID}` }}
                    Settings={{ visible: true, route: `/driver-settings/${driverID}` }}
                    AssignedLoad={{ visible: true, route: `/driver-assigned-loads/${driverID}` }}
                    isMobileSidebarOpen={isMobileSidebarOpen} toggleMobileSidebar={toggleMobileSidebar}
                />
                <div className="shipper-dashboard-content">
                    <HeaderDashboard
                        contentTitle={driverInfo ? <>Welcome back, {driverInfo.driverFirstAndLastName}!</> :
                            <Skeleton variant="text" width={250}/>}
                        contentSubtitle="Monitor payments, loads, revenues"
                        accountName={driverInfo ? driverInfo.driverFirstAndLastName :
                            <Skeleton variant="text" width={60}/>}
                        accountRole={driverInfo ? driverInfo.role : <Skeleton variant="text" width={40}/>}
                        profileLink={`/driver-profile/${driverID}`}
                        bellLink={`/driver-settings/${driverID}`}
                        settingsLink={`/driver-profile/${driverID}`}
                        avatar={previewSavedImage ? previewSavedImage : DefaultUserAvatar}
                        onBurgerClick={toggleMobileSidebar}
                    />
                    <div className="driver-dashboard-content-assigned-load">
                        <div className="driver-map-direction-wrapper">
                            {currentLocation &&
                                <GoogleMapShowDriverDirection
                                    origin={
                                        load.loadDeliveredStatus === "Picked Up"
                                            ? position
                                            : (load.loadTripStarted === "Started" ? position : load.loadPickupLocation)
                                    }
                                    destination={
                                        load.loadDeliveredStatus === "Picked Up"
                                            ? load.loadDeliveryLocation
                                            : (load.loadTripStarted === "Started" ? load.loadPickupLocation : load.loadDeliveryLocation)
                                    }
                                    currentLocation={position}
                                    driverAvatar={previewSavedImage ? previewSavedImage : DefaultUserAvatar}
                                    isTripStarted={load.loadTripStarted}
                                />
                            }
                        </div>
                        <div className="driver-map-direction-nav">
                            <div className="driver-map-direction-nav-header">
                                <section>
                                    <h2>{tripDuration}</h2>
                                    <span>
                                        <p>
                                            {distance} miles
                                        </p>
                                        <p>{arrivalTime}</p>
                                    </span>
                                </section>
                                <Link to={`/driver-assigned-loads/${driverID}`} className="exit-button">Exit</Link>
                            </div>
                            <div className="driver-map-direction-nav-body">
                                <div>
                                    {load.loadTripStarted === "Not Started" ? (
                                        <button className="pick-up-button" onClick={handleStartTrip}>
                                            {isStartingTrip ? (
                                                <>
                                                    <ClipLoader color="#fffff" loading={true} size={17}
                                                                className="payment-loader"/>
                                                    Processing...
                                                </>
                                            ) : (
                                                'Start Trip'
                                            )}
                                        </button>
                                    ) : load.loadTripStarted === "Started" ? (
                                        load.loadDeliveredStatus === "Picked Up" ? (
                                            <button className="pick-up-button" onClick={handleDeliveredClick}>
                                                {isCompletingDelivering ? (
                                                    <>
                                                        <ClipLoader color="#fffff" loading={true} size={17}
                                                                    className="payment-loader"/>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    'Delivered'
                                                )}
                                            </button>
                                        ) : isPickedUp ? (
                                            <button className="pick-up-button" onClick={handleDeliveredClick}>
                                                {isCompletingDelivering ? (
                                                    <>
                                                        <ClipLoader color="#fffff" loading={true} size={17}
                                                                    className="payment-loader"/>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    'Delivered'
                                                )}
                                            </button>
                                        ) : (
                                            <button className="pick-up-button" onClick={handleLoadPickup}>
                                                {isCompletingDelivering ? (
                                                    <>
                                                        <ClipLoader color="#fffff" loading={true} size={17}
                                                                    className="payment-loader"/>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    'Picked Up'
                                                )}
                                            </button>
                                        )
                                    ) : null}
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
