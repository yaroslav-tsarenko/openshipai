import React, {useEffect, useState} from "react";
import '../DriverDashboard.css';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";
import {ReactComponent as DefaultUserAvatar} from "../../../assets/images/default-avatar.svg";
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import {useNavigate} from 'react-router-dom';
import Alert from "../../floating-window-success/Alert";
import {BACKEND_URL} from "../../../constants/constants";
import {Skeleton} from "@mui/material";
import GoogleMapRealTimeTrafficComponent from "../google-map-real-time-traffic-data/GoogleMapRealTimeTrafficComponent";
import Button from "../../button/Button";
import RotatingLinesLoader from "../../rotating-lines/RotatingLinesLoader";

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
    useEffect(() => {
        const fetchRouteData = async () => {
            if (currentLocation.lat && currentLocation.lng && load.loadPickupLocation) {
                try {
                    const directionsService = new window.google.maps.DirectionsService();
                    const request = {
                        origin: new window.google.maps.LatLng(currentLocation.lat, currentLocation.lng),
                        destination: new window.google.maps.LatLng(load.loadPickupLocation.lat, load.loadPickupLocation.lng),
                        travelMode: window.google.maps.TravelMode.DRIVING
                    };

                    directionsService.route(request, (result, status) => {
                        if (status === window.google.maps.DirectionsStatus.OK) {
                            const route = result.routes[0];
                            const duration = route.legs[0].duration.value / 60; // Convert to minutes
                            const distance = route.legs[0].distance.value / 1000; // Convert to kilometers
                            const arrival = new Date();
                            arrival.setMinutes(arrival.getMinutes() + duration);
                            setTripDuration(`${Math.round(duration)} mins`);
                            setLoadMilesTrip(`${Math.round(distance * 0.621371)} miles`); // Convert km to miles
                            setArrivalTime(arrival.toLocaleTimeString());
                        } else {
                            console.error('Directions request failed due to ' + status);
                        }
                    });
                } catch (error) {
                    console.error('Error fetching route data:', error);
                }
            }
        };

        fetchRouteData();
    }, [currentLocation, load.loadPickupLocation]);

    const calculateDistance = async (origin, destination) => {
        try {
            const geocoder = new window.google.maps.Geocoder();

            const getCoordinates = (address) => {
                return new Promise((resolve, reject) => {
                    geocoder.geocode({address}, (results, status) => {
                        if (status === window.google.maps.GeocoderStatus.OK) {
                            resolve(results[0].geometry.location);
                        } else {
                            reject('Geocode was not successful for the following reason: ' + status);
                        }
                    });
                });
            };

            const originCoords = await getCoordinates(origin);
            const destinationCoords = await getCoordinates(destination);

            const directionsService = new window.google.maps.DirectionsService();
            const request = {
                origin: originCoords,
                destination: destinationCoords,
                travelMode: window.google.maps.TravelMode.DRIVING
            };

            directionsService.route(request, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    const route = result.routes[0];
                    const distanceInMeters = route.legs[0].distance.value;
                    const distanceInMiles = distanceInMeters / 1609.344; // More accurate conversion factor
                    const durationInSeconds = route.legs[0].duration.value;
                    const durationInMinutes = durationInSeconds / 60;
                    const hours = Math.floor(durationInMinutes / 60);
                    const minutes = Math.round(durationInMinutes % 60);
                    const arrival = new Date();
                    arrival.setMinutes(arrival.getMinutes() + durationInMinutes);
                    setDistance(distanceInMiles.toFixed(2));
                    setTripDuration(`${hours} hours ${minutes} min`);
                    setArrivalTime(arrival.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
                } else {
                    console.error('Directions request failed due to ' + status);
                    setDistance(null);
                    setTripDuration(null);
                    setArrivalTime(null);
                }
            });
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
            const response = await axios.put(`${BACKEND_URL}/update-load-status/${loadID}`, {
                newStatus: status
            });
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
            updateLoadStatus('Delivered')
            navigate(`/load-delivered-success/${driverID}`);
            if (response.status === 200) {
                console.log('Load status updated successfully');
                setIsLoadDeliveredStatus(true);
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
            updateLoadStatus('Picked Up')
            if (response.status === 200) {
                console.log('Load status updated successfully');
            } else {
                console.log('Error updating load status:', response);
            }
        } catch (error) {
            console.error('Error updating load status:', error);
        }
        setIsCompletingDelivering(false);
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
        const intervalId = setInterval(updateLocation, 34360000);
        return () => clearInterval(intervalId);
    }, []);


    return (
        <>
            {isLoadDeliveredStatus &&
                <Alert status="sucess" text="Success!" description="You succesfully delivered load!"/>}
            <div className="shipper-dashboard-wrapper">
                <DashboardSidebar
                    DashboardAI={{visible: true, route: `/driver-dashboard/${driverID}`}}
                    Settings={{visible: true, route: `/driver-settings/${driverID}`}}
                    AssignedLoad={{visible: true, route: `/driver-assigned-loads/${driverID}`}}
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
                                <GoogleMapRealTimeTrafficComponent
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
                                    type="driver"
                                    borderRadius={['25px', '25px', '0', '0']}
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
                                <>
                                    {load.loadStatus === "Delivered" ?
                                        <p className="load-delivered-status">Load delivered</p> :
                                        <>{load.loadTripStarted === "Not Started" ? (
                                            <Button variant="apply-non-responsive" onClick={handleStartTrip}>
                                                {isStartingTrip ? (
                                                    <>
                                                        <RotatingLinesLoader title={"Processing..."}/>
                                                    </>
                                                ) : (
                                                    'Start Trip'
                                                )}
                                            </Button>
                                        ) : load.loadTripStarted === "Started" ? (
                                            load.loadDeliveredStatus === "Picked Up" ? (
                                                <Button variant="apply-non-responsive" onClick={handleDeliveredClick}>
                                                    {isCompletingDelivering ? (
                                                        <>
                                                            <RotatingLinesLoader title={"Processing..."}/>
                                                        </>
                                                    ) : (
                                                        'Delivered'
                                                    )}
                                                </Button>
                                            ) : isPickedUp ? (
                                                <Button variant="apply-non-responsive" onClick={handleDeliveredClick}>
                                                    {isCompletingDelivering ? (
                                                        <>
                                                            <RotatingLinesLoader title={"Processing..."}/>
                                                        </>
                                                    ) : (
                                                        'Delivered'
                                                    )}
                                                </Button>
                                            ) : (
                                                <Button variant="apply-non-responsive" onClick={handleLoadPickup}>
                                                    {isCompletingDelivering ? (
                                                        <>
                                                            <RotatingLinesLoader title={"Processing..."}/>
                                                        </>
                                                    ) : (
                                                        'Picked Up'
                                                    )}
                                                </Button>
                                            )
                                        ) : null}
                                            <Button variant="outlined" onClick={updateLocation}>
                                                Transit Update
                                            </Button></>
                                    }
                                </>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DriverAssignedLoad;
