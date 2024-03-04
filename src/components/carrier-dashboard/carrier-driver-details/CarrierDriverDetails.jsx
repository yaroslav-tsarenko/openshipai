import React, {useEffect, useState, useRef} from "react";
import "../CarrierDashboard.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faSearch} from "@fortawesome/free-solid-svg-icons";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import {faBars, faTimes, faSignOutAlt, faCog, faTruck, faRobot, faUser} from "@fortawesome/free-solid-svg-icons";
import {ReactComponent as UserAvatarComponent} from "../../../assets/userAvatar2.svg";
import {ReactComponent as BellComponent} from "../../../assets/bell.svg";
import {ReactComponent as OriginAndDestinationComponent} from "../../../assets/from1to2.svg";
import html2canvas from 'html2canvas';
import {saveAs} from 'file-saver';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import {ClipLoader} from "react-spinners";
import ShowLocation from "../../show-location/ShowLocation";
import FloatingWindowSuccess from "../../floating-window-success/FloatingWindowSuccess";

const stripePromise = loadStripe('your-stripe-public-key');
const stripe = await stripePromise;

const CarrierDriverDetails = () => {

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
    const {driverID} = useParams();
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
    const [newBid, setNewBid] = useState(null);
    const [drivers, setDrivers] = useState([]);
    const [driver, setDriver] = useState(null);
    const [takenLoads, setTakenLoads] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false); // Add this line at the beginning of your component

    const handleConfirmArrival = (load) => {
        const data = {
            loadID: load.commercialLoadID,
            status: 'Confirmed',
            payment: false
        };

        axios.post('https://jarvis-ai-logistic-db-server.onrender.com/save-confirmed-arrival', data)
            .then(response => {
                if (response.data.status === 'Success') {
                    console.log('Data saved successfully');
                    setShowSuccess(true); // Set the showSuccess state to true
                } else {
                    console.error('Error saving data:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Error saving data:', error);
            });
    };
    useEffect(() => {
        axios.get('https://jarvis-ai-logistic-db-server.onrender.com/get-all-taken-loads')
            .then(response => {
                if (response.data && response.status === 200) {
                    const allTakenLoads = response.data;
                    const filteredTakenLoads = allTakenLoads.filter(load => load.assignedDriver === driverID);
                    setTakenLoads(filteredTakenLoads);
                } else {
                    console.error('Error fetching taken loads:', response);
                }
            })
            .catch(error => {
                console.error('Error fetching taken loads:', error);
            });
    }, [driverID]); // Dependency array ensures this runs when driverID changes
    const handleBidClick = (tableId) => {
        setCurrentTable(tableId);
        setShowBidPopup(true);
    };
    const handleCloseBidPopup = () => {
        setShowBidPopup(false);
    };

    const handleBidChange = (e) => {
        setBid(e.target.value);
    };
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
        // Fetch the driver data when the component mounts
        axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-driver/${driverID}`)
            .then(response => {
                if (response.data && response.status === 200) {
                    setDriver(response.data.driver); // Set the driver data in state
                } else {
                    console.error('Error fetching driver:', response);
                }
            })
            .catch(error => {
                console.error('Error fetching driver:', error);
            });
    }, [driverID]); // Dependency array ensures this runs when driverID changes
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
    const handleBidSubmit = (load, e) => {
        e.preventDefault();
        const selectedDriver = drivers.find(driver => driver.email === driver.email);
        if (!selectedDriver) {
            console.error(`No driver found with ID: ${selectedDriver}`);
            return;
        }
        axios.post('https://jarvis-ai-logistic-db-server.onrender.com/submit-bid', {
            commercialLoadID: load.commercialLoadID,
            bid,
            loadType: 'Commercial Truck Load',
            pickupLocation: load.pickupLocation,
            deliveryLocation: load.deliveryLocation,
            carrierID: carrierID,
            assignedDriver: selectedDriver.driverID,
        })
            .then(response => {
                console.log("Bid submitted successfully");
                setBid('');
                axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-bid/${load.commercialLoadID}`)
                    .then(response => {
                        console.log("Bid fetched successfully")
                        console.log(selectedDriver);
                        setBids(prevBids => ({...prevBids, [load.commercialLoadID]: response.data.bid}));
                    })
                    .catch(error => {
                        console.error("Error fetching bid: ", error);
                    });
            })
            .catch(error => {
                console.error("Error submitting bid: ", error);
            });
    };
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
    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Send a PUT request to the server to update the load
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
    }, [personalEndpoint]); // Ensure this runs when personalEndpoint changes

    useEffect(() => {
        axios.get('https://jarvis-ai-logistic-db-server.onrender.com/get-moto-equipment-loads')
            .then(response => {
                if (response.data && response.status === 200) {
                    setMotoEquipmentLoads(response.data.loads); // Set the loads in state
                } else {
                    console.error('Error fetching Moto Equipment loads:', response);
                }
            })
            .catch(error => {
                console.error('Error fetching Moto Equipment loads:', error);
            });
    }, []);
    useEffect(() => {
        // Fetch all drivers data when the component mounts
        axios.get('https://jarvis-ai-logistic-db-server.onrender.com/get-all-drivers')
            .then(response => {
                if (response.data && response.status === 200) {
                    // Filter drivers by driverID and set the state with the filtered driver
                    const filteredDriver = response.data.filter(driver => driver.driverID === driverID);
                    setDriver(filteredDriver[0]);
                } else {
                    console.error('Error fetching drivers:', response);
                }
            })
            .catch(error => {
                console.error('Error fetching drivers:', error);
            });
    }, [driverID]); // Dependency array ensures this runs when driverID changes

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = () => {
        console.log(searchQuery);
    };
    const handleLogout = () => {
        setUser(null); // Clear the user data from the state
        navigate('/sign-in'); // Navigate to the login form
    };
    return (
        <div className="admin-dashboard-wrapper">
            <div className={`admin-side-bar ${isSidebarOpen ? "" : "closed"}`} ref={sidebarRef}>
                <p className="dashboard-title"><FontAwesomeIcon className="navigation-icon" icon={faUser}/>Carrier's
                    dashboard</p>
                <div className="admin-side-bar-navigation">
                    <Link to={`/carrier-dashboard/${carrierID}`}
                          className="navigation-button"><FontAwesomeIcon
                        className="navigation-icon" icon={faTruck}/>My Shipments</Link>
                    <Link
                        to={`/carrier-drivers/${carrierID}`}
                        className="navigation-button-2">
                        <FontAwesomeIcon
                            className="navigation-icon"
                            icon={faTruck}/>
                        Current Driver
                    </Link>
                    <Link to={`/carrier-deal-chat-conversation/${carrierID}`} className="navigation-button"><FontAwesomeIcon
                        className="navigation-icon" icon={faComment}/>Chat with Customer</Link>
                    <Link to={`/jarvis-chat/${carrierID}/${chatEndpoint}`} className="navigation-button">
                        <FontAwesomeIcon className="navigation-icon" icon={faRobot}/>Jarvis Chat Page
                    </Link>
                </div>
                <div className="admin-side-bar-navigation">
                    <Link to={`/carrier-settings/${carrierID}`} className="navigation-button-settings"><FontAwesomeIcon
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
                                <p className="user-name">{carrier?.companyName}</p>
                                <p className="user-status">Carrier</p>
                            </div>
                            <BellComponent className="bell-icon"/>
                        </div>
                    </div>
                    <div className="admin-inner-content-second">
                        <div className="inner-content-second-text">
                            <p className="inner-content-second-text-first">Driver
                                - {driver ? driver.firstName : 'Loading...'}</p>
                            <p className="inner-content-second-text-second">Monitor driver load, status</p>
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
                    <div className="taken-loads-wrapper">
                        {takenLoads.map(load => (
                            <div className="taken-load-container" key={load._id}>
                                <div className="load-container-left">
                                    <div className="current-load-price">
                                        {load.bidPrice}
                                        {load.currency}
                                    </div>
                                    <h5>
                                        <label className="load-metrics">Load ID:</label>
                                        {load.commercialLoadID}
                                        <div className="load-metrics">
                                            Dry Van (V)
                                        </div>
                                        <div className="load-metrics">
                                            3k lbs
                                        </div>
                                    </h5>
                                    <div className="destination-wrapper">
                                        <OriginAndDestinationComponent className="origin-destination-component"/>
                                        <div className="destination-text-wrapper">
                                            <p className="origin-location">
                                                {load.pickupLocation}
                                            </p>
                                            <p className="destination-location">
                                                {load.deliveryLocation}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="button-wrapper">
                                        <button
                                            className="submit-bid-button"
                                            onClick={() => handleConfirmArrival(load)}
                                        >
                                            Confirm Arrival
                                        </button>
                                        <button className="edit-form-cancel">Decline Arrival</button>
                                    </div>
                                </div>
                                <div className="load-container-right">
                                <ShowLocation lat={load.lat} lng={load.lng}/>
                                </div>
                            </div>

                        ))}
                    </div>
                    {showSuccess && <FloatingWindowSuccess text="Load confirmed!" />}
                </div>
            </div>
        </div>
    );
};

export default CarrierDriverDetails;
