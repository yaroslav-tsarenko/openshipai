import React, {useEffect, useState, useRef} from "react";
import './DriverDashboard.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faSearch} from "@fortawesome/free-solid-svg-icons";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import {faBars, faTimes, faSignOutAlt, faCog, faTruck, faRobot, faUser} from "@fortawesome/free-solid-svg-icons";
import {ReactComponent as UserAvatarComponent} from "../../assets/userAvatar2.svg";
import {ReactComponent as OriginAndDestinationComponent} from "../../assets/from1to2.svg";
import {ReactComponent as BellComponent} from "../../assets/bell.svg";
import {GoogleMap, LoadScript} from '@react-google-maps/api';
import html2canvas from 'html2canvas';
import {saveAs} from 'file-saver';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import MapComponent from "../map-component/MapComponent";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import mbxClient from '@mapbox/mapbox-sdk';
import PricePerKilometer from "./price-per-mil-component/PricePerMilKilometer";

mapboxgl.accessToken = 'pk.eyJ1IjoieWFyb2syMzIiLCJhIjoiY2xzeDJxdThnMDBlbDJsbXoweTFzNXdrMSJ9.rVdC_6tzqhtO66980kmwFA'; // Replace with your Mapbox access token
const stripePromise = loadStripe('your-stripe-public-key');
const stripe = await stripePromise;

const DriverDashboard = () => {
    const [routeDuration, setRouteDuration] = useState(0);
    const [routeDistance, setRouteDistance] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState(null);
    const [carrier, setCarrier] = useState(null);
    const navigate = useNavigate();
    const [chatEndpoint, setChatEndpoint] = useState(null);
    const {personalEndpoint} = useParams();
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [vehicleLoads, setVehicleLoads] = useState([]);
    const [motoEquipmentLoads, setMotoEquipmentLoads] = useState([]);
    const [commercialTruckLoads, setCommercialTruckLoads] = useState([]);
    const [boatLoads, setBoatLoads] = useState([]); // Add this line
    const [constructionEquipmentLoads, setConstructionEquipmentLoads] = useState([]); // Add this line
    const [heavyEquipmentLoads, setHeavyEquipmentLoads] = useState([]); // Add this line
    const [data, setData] = useState([]);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const sidebarRef = useRef(null);
    const minSwipeDistance = 50;
    const {carrierID} = useParams();
    const stripePromise = loadStripe('pk_test_51O5Q6UEOdY1hERYnWp8hCCQNdKR8Jiz9ZPRqy1Luk2mxqMaVTDvo6Z0FFWDhjRQc1ELOE95KIUatO2Ve4wCKKqiJ00O0f9R2eo');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLoad, setSelectedLoad] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [formData, setFormData] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const sigCanvas = useRef({});
    const [selectedDropdown, setSelectedDropdown] = useState(null);
    const dropdownRef = useRef(null);
    const [showBidPopup, setShowBidPopup] = useState(false);
    const [bid, setBid] = useState('');
    const [currentTable, setCurrentTable] = useState(null);
    const [bids, setBids] = useState({});
    const [loadPrice, setLoadPrice] = useState(0);
    const [currentLoadID, setCurrentLoadID] = useState(null);
    const [showDriverPopup, setShowDriverPopup] = useState(false);
    const [newBid, setNewBid] = useState(null);
    const [showMapPopup, setShowMapPopup] = useState(false);
    const [currentLocation, setCurrentLocation] = useState({lat: 0, lng: 0});
    const [drivers, setDrivers] = useState([]);
    const [currentDriver, setCurrentDriver] = useState(null);
    const {driverID} = useParams();
    const [driver, setDriver] = useState(null);
    const [submittedBids, setSubmittedBids] = useState([]);
    const [directions, setDirections] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    const mapStyles = {
        height: "50vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 44.0, lng: -120.5 // Coordinates for Oregon
    }
    useEffect(() => {
        axios.get('https://jarvis-ai-logistic-db-server.onrender.com/get-all-submitted-bids')
            .then(response => {
                setSubmittedBids(response.data);
            })
            .catch(error => {
                console.error('Error fetching submitted bids:', error);
            });
    }, []);
    useEffect(() => {
        const fetchDriver = async () => {
            try {
                const response = await axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-driver/${driverID}`);
                setDriver(response.data);
            } catch (error) {
                console.error('Failed to fetch driver:', error);
            }
        };
        fetchDriver();
    }, [driverID]);

    const Popup = () => (
        <div className="driver-popup-overlay">
            <div className="driver-popup">
                <h2>Popup</h2>
                <button className="edit-form-cancel" onClick={() => setShowDriverPopup(false)}>Close</button>
                <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={() => setShowDriverPopup(false)} />
            </div>
        </div>
    );

    useEffect(() => {
        const fetchDrivers = async () => {
            const response = await axios.get('https://jarvis-ai-logistic-db-server.onrender.com/get-all-drivers');
            setDrivers(response.data);
        };
        fetchDrivers();
    }, []);


    const MapComponent = ({ from, to }) => {
        const mapContainerRef = useRef(null);
        const [fromCoordinates, setFromCoordinates] = useState(null);
        const [toCoordinates, setToCoordinates] = useState(null);

        useEffect(() => {
            const geocodingClient = mbxGeocoding(mbxClient({ accessToken: mapboxgl.accessToken }));

            geocodingClient.forwardGeocode({ query: from, limit: 1 })
                .send()
                .then(response => {
                    const { features } = response.body;
                    if (features.length > 0) {
                        const { center } = features[0];
                        setFromCoordinates({ lng: center[0], lat: center[1] });
                    }
                });

            geocodingClient.forwardGeocode({ query: to, limit: 1 })
                .send()
                .then(response => {
                    const { features } = response.body;
                    if (features.length > 0) {
                        const { center } = features[0];
                        setToCoordinates({ lng: center[0], lat: center[1] });
                    }
                });
        }, [from, to]);

        useEffect(() => {
            if (!fromCoordinates || !toCoordinates) {
                return;
            }

            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [fromCoordinates.lng, fromCoordinates.lat],
                zoom: 12
            });

            map.on('load', () => {
                const directions = new MapboxDirections({
                    accessToken: mapboxgl.accessToken,
                    unit: 'metric',
                    profile: 'mapbox/driving'
                });

                map.addControl(directions, 'top-right');

                directions.setOrigin([fromCoordinates.lng, fromCoordinates.lat]);
                directions.setDestination([toCoordinates.lng, toCoordinates.lat]);

                directions.on('route', e => {
                    const routes = e.route;
                    if (routes.length > 0) {
                        const { duration, distance } = routes[0];
                        setRouteDuration(duration / 3600); // Convert duration from seconds to hours
                        setRouteDistance(distance / 1000); // Convert distance from meters to kilometers
                    }
                });
            });

            return () => map && map.remove();
        }, [fromCoordinates, toCoordinates]);

        return <div ref={mapContainerRef} style={{ width: '50%', height: '300px' }} />;
    };

    useEffect(() => {
        const driver = drivers.find(driver => driver.driverID === driverID);
        setCurrentDriver(driver);
    }, [drivers, driverID]);
    useEffect(() => {
        const fetchBids = async () => {
            try {
                const response = await axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-bids-by-driver/${driverID}`);
                setBids(response.data);
            } catch (error) {
                console.error('Failed to fetch bids:', error);
            }
        };

        fetchBids();
    }, [driverID]);
    useEffect(() => {
        commercialTruckLoads.forEach(load => {
            axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-bid/${load.commercialLoadID}`)
                .then(response => {
                    console.log("Bid fetched successfully")
                    setBids(prevBids => ({...prevBids, [load.commercialLoadID]: response.data.bid}));
                })
                .catch(error => {
                    console.error("Error fetching bid: ", error);
                });
        });
    }, [commercialTruckLoads]);

    useEffect(() => {
        axios.get('https://jarvis-ai-logistic-db-server.onrender.com/get-all-carriers')
            .then(response => {
                if (response.data && response.status === 200) {
                    const carriers = response.data;
                    const carrier = carriers.filter(carrier => carrier.carrierID === carrierID);
                    setCarrier(carrier[0]);
                }
            })
            .catch(error => {
                console.error('Error fetching carriers:', error);
            });
    }, [carrierID]);

    useEffect(() => {
        axios.get('https://jarvis-ai-logistic-db-server.onrender.com/get-drivers')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setDrivers(response.data);
                } else {
                    console.error('Error: response data is not an array');
                }
            })
            .catch(error => {
                console.error('Error fetching drivers:', error);
            });
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const saveSignature = () => {
        const docWrapper = document.querySelector('.doc-wrapper');
        html2canvas(docWrapper).then(canvas => {
            const imgData = canvas.toDataURL(); // Convert the canvas to a Base64 string
            axios.post('https://jarvis-ai-logistic-db-server.onrender.com/api/save-signature', {
                imgData,
                userEndpoint: user.personalEndpoint,
                email: user.email,
                signed: true,
            })
                .then(response => {
                    console.log(response);
                    const imgBlob = atob(imgData.split(',')[1]);
                    const array = [];
                    for (let i = 0; i < imgBlob.length; i++) {
                        array.push(imgBlob.charCodeAt(i));
                    }
                    const file = new Blob([new Uint8Array(array)], {type: 'image/png'});
                    saveAs(file, 'signature.png');
                })
                .catch(error => console.error(error));
        });
    };

    const handlePay = async (amount) => {
        const response = await axios.post('https://jarvis-ai-logistic-db-server.onrender.com/create-checkout-session', {amount});
        const sessionId = response.data.sessionId;

        const stripe = await stripePromise;
        const {error} = await stripe.redirectToCheckout({sessionId});

        if (error) {
            console.log(error);
        }
    };
    const clearSignature = () => {
        sigCanvas.current.clear();
    };

    const handleOpenPopup = () => {
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };
    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleEdit = (load) => {
        setSelectedLoad(load);
        setFormData(load); // Set the formData state to the current load
        setShowEditForm(true); // Open the edit form
    };
    const handleCancel = () => {
        setShowEditForm(false); // Close the edit form
    };
    const handleDetails = (load) => {
        setSelectedLoad(load);
        setFormData(load); // Set the formData state to the current load
        setShowDetails(!showDetails);
    };
    const handleDelete = (load) => {
        if (window.confirm('Are you sure you want to delete this load?')) {
            axios.delete(`https://jarvis-ai-logistic-db-server.onrender.com/delete-commercial-truck-load/${load._id}`)
                .then(response => {
                    if (response.status === 200) {
                        // Remove the deleted load from the state
                        setCommercialTruckLoads(commercialTruckLoads.filter(l => l._id !== load._id));
                    } else {
                        console.error('Error deleting load:', response);
                    }
                })
                .catch(error => {
                    console.error('Error deleting load:', error);
                });
        }
    };
    const toggleOpen = (index) => {
        if (selectedDropdown === index) {
            setSelectedDropdown(null);
        } else {
            setSelectedDropdown(index);
        }
    };
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        const target = sidebarRef.current;
        const handleTouchStart = (e) => {
            setTouchEnd(null);
            setTouchStart(e.targetTouches[0].clientX);
        };
        const handleTouchMove = (e) => {
            setTouchEnd(e.targetTouches[0].clientX);
        };
        target.addEventListener('touchstart', handleTouchStart);
        target.addEventListener('touchmove', handleTouchMove);
        return () => {
            target.removeEventListener('touchstart', handleTouchStart);
            target.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);
    useEffect(() => {
        axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/user/${personalEndpoint}`)
            .then(response => {
                if (response.data && response.status === 200) {
                    setUser(response.data); // Set the user state with the fetched data
                } else {
                    console.error('Error fetching user data:', response);
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);


    useEffect(() => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            setIsSidebarOpen(false);
        } else if (isRightSwipe) {
            setIsSidebarOpen(true);
        }
    }, [touchStart, touchEnd]);
    useEffect(() => {
        axios.get('https://jarvis-ai-logistic-db-server.onrender.com/all-user-loads')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const handleUpdateLocation = () => {
        setModalIsOpen(true);
    };
    const closeMapPopup = () => {
        setShowMapPopup(false);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://jarvis-ai-logistic-db-server.onrender.com/update-commercial-truck-load/${selectedLoad._id}`, formData)
            .then(response => {
                if (response.data && response.status === 200) {
                    // Update the load in the state
                    setCommercialTruckLoads(commercialTruckLoads.map(load => load._id === selectedLoad._id ? response.data : load));
                    setShowDetails(false); // Close the details div
                } else {
                    console.error('Error updating load:', response);
                }
            })
            .catch(error => {
                console.error('Error updating load:', error);
            });
    };
    useEffect(() => {
        axios.get('https://jarvis-ai-logistic-db-server.onrender.com/get-heavy-equipment-loads')
            .then(response => {
                if (response.data && response.status === 200) {
                    setHeavyEquipmentLoads(response.data.loads); // Set the loads in state
                } else {
                    console.error('Error fetching Heavy Equipment loads:', response);
                }
            })
            .catch(error => {
                console.error('Error fetching Heavy Equipment loads:', error);
            });
    }, []); // Empty dependency array means this effect runs once on component mount
    useEffect(() => {
        axios.get('https://jarvis-ai-logistic-db-server.onrender.com/get-construction-equipment-loads')
            .then(response => {
                if (response.data && response.status === 200) {
                    setConstructionEquipmentLoads(response.data.loads); // Set the loads in state
                } else {
                    console.error('Error fetching Construction Equipment loads:', response);
                }
            })
            .catch(error => {
                console.error('Error fetching Construction Equipment loads:', error);
            });
    }, []);
    useEffect(() => {
        axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-carrier/${carrierID}`)
            .then(response => {
                if (response.data && response.status === 200) {
                    setCarrier(response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching carrier data:', error);
            });
    }, [carrierID]);

    useEffect(() => {
        axios.get('https://jarvis-ai-logistic-db-server.onrender.com/get-boat-loads')
            .then(response => {
                if (response.data && response.status === 200) {
                    setBoatLoads(response.data.loads); // Set the loads in state
                } else {
                    console.error('Error fetching Boat Loads:', response);
                }
            })
            .catch(error => {
                console.error('Error fetching Boat Loads:', error);
            });
    }, []); // Empty dependency array means this effect runs once on component mount
    useEffect(() => {
        axios.get('https://jarvis-ai-logistic-db-server.onrender.com/get-commercial-truck-loads')
            .then(response => {
                if (response.data && response.status === 200) {
                    setCommercialTruckLoads(response.data.loads); // Set the loads in state
                } else {
                    console.error('Error fetching Commercial Truck loads:', response);
                }
            })
            .catch(error => {
                console.error('Error fetching Commercial Truck loads:', error);
            });
    }, []);
    useEffect(() => {
        axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/submit-vehicle-load/${personalEndpoint}`)
            .then(response => {
                if (response.data && response.status === 200) {
                    setVehicleLoads(response.data);
                } else {
                    console.error('No vehicle loads found');
                }
            })
            .catch(error => {
                console.error('Error fetching vehicle loads:', error);
            });
    }, [personalEndpoint]);

    useEffect(() => {
        axios.get('https://jarvis-ai-logistic-db-server.onrender.com/get-moto-equipment-loads')
            .then(response => {
                if (response.data && response.status === 200) {
                    setMotoEquipmentLoads(response.data.loads);
                } else {
                    console.error('Error fetching Moto Equipment loads:', response);
                }
            })
            .catch(error => {
                console.error('Error fetching Moto Equipment loads:', error);
            });
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const [searchQuery, setSearchQuery] = useState("");
    const averageSpeed = 60;
    const estimatedTravelTime = routeDistance / averageSpeed;
    const currentDate = new Date();
    const day = currentDate.getDate();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = months[currentDate.getMonth()]; // getMonth() returns a zero-based value (where zero indicates the first month)
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const currentDateTimeString = `${day} ${monthName} - ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    const estimatedArrivalTime = new Date(currentDate.getTime() + estimatedTravelTime * 60 * 60 * 1000);
    const estimatedArrivalTimeString = `${estimatedArrivalTime.getDate()} ${monthName} - ${estimatedArrivalTime.getHours()}:${estimatedArrivalTime.getMinutes()}`;

    return (
        <div className="admin-dashboard-wrapper">
            <div className={`admin-side-bar ${isSidebarOpen ? "" : "closed"}`} ref={sidebarRef}>
                <p className="dashboard-title"><FontAwesomeIcon className="navigation-icon" icon={faUser}/>Driver
                    Dashboard</p>
                <div className="admin-side-bar-navigation">
                    <Link to={`/driver-dashboard/${driverID}`}
                          className="navigation-button-2"><FontAwesomeIcon
                        className="navigation-icon" icon={faTruck}/>My Shipments</Link>\
                    <Link to={`/driver-chat/${driverID}`} className="navigation-button"><FontAwesomeIcon
                        className="navigation-icon" icon={faComment}/>Chat with Carrier</Link>
                    <Link to={`/jarvis-chat/${driverID}/${chatEndpoint}`} className="navigation-button">
                        <FontAwesomeIcon className="navigation-icon" icon={faRobot}/>Jarvis Chat Page
                    </Link>
                </div>
                <div className="admin-side-bar-navigation">
                    <Link to={`/driver-settings/${driverID}`} className="navigation-button-settings"><FontAwesomeIcon
                        className="navigation-icon" icon={faCog}/>Settings</Link>
                    <Link to="/sign-in" className="navigation-button-logout">
                        <FontAwesomeIcon className="navigation-icon" icon={faSignOutAlt}/>Logout
                    </Link>
                </div>
            </div>
            <button className="toggle-button" onClick={toggleSidebar}>
                <FontAwesomeIcon className="fa-bars-icon-times-icon" icon={isSidebarOpen ? faTimes : faBars}/>
            </button>
            <div className="admin-content">
                <div className="admin-content-wrapper">
                    <div className="admin-inner-content-first">
                        <div className="search-bar">
                            <FontAwesomeIcon icon={faSearch} className="search-icon"/>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search all loads, drivers, etc."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="user-details-wrapper">
                            <UserAvatarComponent className="user-avatar"/>
                            <div className="user-details">
                                {currentDriver ? currentDriver.firstName : <ClipLoader color={"#e7e7e7"} loading={true} size={25} />}
                                <p className="user-status">Driver</p>
                            </div>
                            <BellComponent className="bell-icon"/>
                        </div>
                    </div>
                    <div className="admin-inner-content-second">
                        <div className="inner-content-second-text">
                            <p className="inner-content-second-text-first">Active Loads</p>
                            <p className="inner-content-second-text-second">Active loads, status, payments etc.</p>
                        </div>
                        <div className="data-operations-wrapper">
                            <div className="little-search-bar">
                                <FontAwesomeIcon icon={faSearch} className="search-icon-little-search-bar"/>
                                <input
                                    type="text"
                                    className="little-search-input"
                                    placeholder="Search loads"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}/>
                            </div>
                            <button className="custom-button-filter"><FontAwesomeIcon className="filter-icon"
                                                                                      icon={faFilter}/> Filter
                            </button>
                        </div>
                    </div>

                    <div className="table-wrapper">
                        {submittedBids.filter(bid => bid.assignedDriver === driverID).map((bid, index) => (
                            <div key={index} className="load-card" onClick={() => setShowDriverPopup(true)}>
                                <div className="card-content-wrapper">
                                    <div className="current-load-price">
                                        <h5>{bid.currency}</h5>
                                        <h5>{bid.bidPrice}</h5>
                                        <PricePerKilometer mil={routeDistance} price={bid.bidPrice} />
                                    </div>
                                    <div className="card-content">
                                        <div className="load-metrics-wrapper">
                                            <div className="load-metrics">
                                                {routeDistance.toFixed(1) / 1.6} mil
                                            </div>
                                            <div className="load-metrics">
                                                Dry Van (V)
                                            </div>
                                            <div className="load-metrics">
                                                3k lbs
                                            </div>
                                        </div>
                                        <div className="destination-wrapper">
                                            <OriginAndDestinationComponent className="origin-destination-component"/>
                                            <div className="destination-text-wrapper">
                                                <p className="origin-location">
                                                    {bid.pickupLocation}
                                                    <h5>{currentDateTimeString}</h5>
                                                </p>
                                                <p className="destination-location">
                                                    {bid.deliveryLocation}
                                                    <h5>{estimatedArrivalTimeString}</h5>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bid-time-posted-wrapper">
                                            <div className="bid-time-posted">
                                                <h5>2 hours ago</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <MapComponent
                                    from="Oregon"
                                    to="Los Angeles"
                                    setRouteDistance={setRouteDistance}
                                />
                            </div>
                        ))}
                    </div>
                    {showDriverPopup && <Popup />}
                </div>
            </div>
        </div>
    )
};

export default DriverDashboard;
