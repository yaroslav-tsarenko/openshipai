import React, {useEffect, useState, useRef} from "react";
import './DriverDashboard.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faSearch} from "@fortawesome/free-solid-svg-icons";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import {faBars, faTimes, faSignOutAlt, faCog, faTruck, faRobot, faUser} from "@fortawesome/free-solid-svg-icons";
import {ReactComponent as UserAvatarComponent} from "../../assets/userAvatar2.svg";
import {ReactComponent as OriginAndDestinationComponent} from "../../assets/from1to2.svg";
import {ReactComponent as BellComponent} from "../../assets/bell.svg";
import html2canvas from 'html2canvas';
import {saveAs} from 'file-saver';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import PricePerKilometer from "./price-per-mil-component/PricePerMilKilometer";
import {ClipLoader} from "react-spinners";
import GoogleMapContainer from "./google-map-container/GoogleMapContainer";
import GoogleMapRealTimeTrafficComponent from "./google-map-real-time-traffic-data/GoogleMapRealTimeTrafficComponent";
import FloatingWindowSuccess from "../floating-window-success/FloatingWindowSuccess";
import WeatherComponent from "../weather-component/WeatherComponent";
import FloatingWindowFailed from "../floating-window-failed/FloatingWindowFailed";

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
    const [selectedBid, setSelectedBid] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [showFloatingWindow, setShowFloatingWindow] = useState(false);
    const [location, setLocation] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8080/get-all-submitted-bids')
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
                const response = await axios.get(`http://localhost:8080/get-driver/${driverID}`);
                setDriver(response.data);
            } catch (error) {
                console.error('Failed to fetch driver:', error);
            }
        };
        fetchDriver();
    }, [driverID]);

    useEffect(() => {
        const fetchDrivers = async () => {
            const response = await axios.get('http://localhost:8080/get-all-drivers');
            setDrivers(response.data);
        };
        fetchDrivers();
    }, []);


    useEffect(() => {
        const driver = drivers.find(driver => driver.driverID === driverID);
        setCurrentDriver(driver);
    }, [drivers, driverID]);
    useEffect(() => {
        const fetchBids = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/get-bids-by-driver/${driverID}`);
                setBids(response.data);
            } catch (error) {
                console.error('Failed to fetch bids:', error);
            }
        };

        fetchBids();
    }, [driverID]);
    useEffect(() => {
        commercialTruckLoads.forEach(load => {
            axios.get(`http://localhost:8080/get-bid/${load.commercialLoadID}`)
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
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${"AIzaSyBRtLE7Bp4U4rlvAMrEpVoJ2R_evqeohZo"}`)
                    .then(response => {
                        if (response.data.results[0]) {
                            const result = response.data.results[0];
                            const city = result.address_components.find(component => component.types.includes('locality')).long_name;
                            const country = result.address_components.find(component => component.types.includes('country')).long_name;
                            setLocation({ city, country });
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching location details:', error);
                    });
            });
        }
    }, []);
    useEffect(() => {
        axios.get('http://localhost:8080/get-all-carriers')
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
        axios.get('http://localhost:8080/get-drivers')
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
    const handleLoadSubmit = (bid) => {
        axios.post('http://localhost:8080/save-taken-load', bid)
            .then(response => {
                if (response.data.status === 'Success') {
                    setShowFloatingWindow(true);
                } else {
                    console.error('Error saving taken load:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Error saving taken load:', error);
            });
    }
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
        const response = await axios.post('http://localhost:8080/create-checkout-session', {amount});
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
        setFormData(load);
        setShowDetails(!showDetails);
    };
    const handleDelete = (load) => {
        if (window.confirm('Are you sure you want to delete this load?')) {
            axios.delete(`https://jarvis-ai-logistic-db-server.onrender.com/delete-commercial-truck-load/${load._id}`)
                .then(response => {
                    if (response.status === 200) {
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
    const takeLoadSubmit = () => {
        axios.post('http://localhost:8080/save-taken-load', bid)
            .then(response => {
                if (response.data.status === 'Success') {
                    setShowFloatingWindow(true);
                } else {
                    console.error('Error saving taken load:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Error saving taken load:', error);
            });
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
        axios.get(`http://localhost:8080/get-carrier/${carrierID}`)
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
    }, []);
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
    const monthName = months[currentDate.getMonth()];
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
                        className="navigation-icon" icon={faTruck}/>My Shipments</Link>
                    <Link to={`/driver-chat/${driverID}`} className="navigation-button"><FontAwesomeIcon
                        className="navigation-icon" icon={faComment}/>Chat with Carrier</Link>
                    <Link to={`/driver-details/${driverID}`} className="navigation-button"><FontAwesomeIcon
                        className="navigation-icon" icon={faUser}/>Driver Details</Link>
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
                                {currentDriver ? currentDriver.firstName :
                                    <ClipLoader color={"#e7e7e7"} loading={true} size={25}/>}
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
                            <div key={index} className="load-card" onClick={() => console.log(bid)}>
                                <div className="card-content-wrapper">
                                    <div className="current-load-price-h5">
                                        <h5>{bid.currency}</h5>
                                        <h5>{bid.bidPrice}</h5>
                                        <PricePerKilometer mil={routeDistance} price={bid.bidPrice}/>
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
                                        <button className="take-load-button" onClick={() => {
                                            if (navigator.geolocation) {
                                                navigator.geolocation.getCurrentPosition(position => {
                                                    const {latitude, longitude} = position.coords;
                                                    const bidWithLocation = {
                                                        ...bid,
                                                        lat: latitude,
                                                        lng: longitude
                                                    };
                                                    axios.post('http://localhost:8080/save-taken-load', bidWithLocation)
                                                        .then(response => {
                                                            if (response.data.status === 'Success') {
                                                                setShowFloatingWindow(true);
                                                            } else {
                                                                console.error('Error saving taken load:', response.data.message);
                                                            }
                                                        })
                                                        .catch(error => {
                                                            console.error('Error saving taken load:', error);
                                                        });
                                                });
                                            }
                                        }}>Take Load
                                        </button>
                                    </div>
                                </div>
                                <WeatherComponent/>
                                <GoogleMapRealTimeTrafficComponent origin="Oregon" destination="Los Angeles"/>
                            </div>
                        ))}
                    </div>
                    <p className="current-location">
                        {location.city}, {location.country}
                    </p>
                    {showFloatingWindow && <FloatingWindowSuccess text="Load taken successfully!"/>}
                </div>
            </div>
        </div>
    )
        ;
};

export default DriverDashboard;
