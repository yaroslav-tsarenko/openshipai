import React, {useEffect, useState, useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faSearch} from "@fortawesome/free-solid-svg-icons";
import {faBars, faTimes, faSignOutAlt, faCog, faTruck, faRobot, faUser} from "@fortawesome/free-solid-svg-icons";
import {ReactComponent as UserAvatarComponent} from "../../../assets/userAvatar2.svg";
import {faKey, faBell, faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import html2canvas from 'html2canvas';
import {saveAs} from 'file-saver';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import {v4 as uuidv4} from 'uuid';
import Switch from 'react-switch';
const stripePromise = loadStripe('your-stripe-public-key');
const stripe = await stripePromise;

const DriverSettings = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [chatEndpoint, setChatEndpoint] = useState(null);
    const {personalEndpoint} = useParams();
    const {driverID} = useParams();
    const [vehicleLoads, setVehicleLoads] = useState([]);
    const [motoEquipmentLoads, setMotoEquipmentLoads] = useState([]);
    const [commercialTruckLoads, setCommercialTruckLoads] = useState([]); // Add this line
    const [boatLoads, setBoatLoads] = useState([]); // Add this line
    const [constructionEquipmentLoads, setConstructionEquipmentLoads] = useState([]); // Add this line
    const [heavyEquipmentLoads, setHeavyEquipmentLoads] = useState([]); // Add this line
    const [data, setData] = useState([]);
    const [checked, setChecked] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const sidebarRef = useRef(null);
    const minSwipeDistance = 50;
    const [showSuccess, setShowSuccess] = useState(false);
    const stripePromise = loadStripe('pk_test_51O5Q6UEOdY1hERYnWp8hCCQNdKR8Jiz9ZPRqy1Luk2mxqMaVTDvo6Z0FFWDhjRQc1ELOE95KIUatO2Ve4wCKKqiJ00O0f9R2eo');
    const [editingLoad, setEditingLoad] = useState(null); // Holds the load currently being edited
    const [isEditFormVisible, setIsEditFormVisible] = useState(false); // Controls the visibility of the edit form
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLoad, setSelectedLoad] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [oldPassword, setOldPassword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [formData, setFormData] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const sigCanvas = useRef({});
    const [selectedDropdown, setSelectedDropdown] = useState(null);
    const dropdownRef = useRef(null);
    const [showBidPopup, setShowBidPopup] = useState(false);
    const [bid, setBid] = useState('');
    const [currentTable, setCurrentTable] = useState(null);
    const [bids, setBids] = useState({});
    const [carrier, setCarrier] = useState({});
    const [currentLoadID, setCurrentLoadID] = useState(null);
    const [newBid, setNewBid] = useState(null);
    const [isAddDriverPopupVisible, setIsAddDriverPopupVisible] = useState(false);
    const {carrierID} = useParams();
    const [drivers, setDrivers] = useState([]);
    const [activeSetting, setActiveSetting] = useState('Account');
    const [driver, setDriver] = useState(null);
    const [currentDriver, setCurrentDriver] = useState(null);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/get-all-drivers');
                setDrivers(response.data);
            } catch (error) {
                console.error('Error fetching drivers:', error);
            }
        };

        fetchDrivers();
    }, []);

    useEffect(() => {
        if (drivers) {
            const driver = drivers.filter(driver => driver.driverID === driverID);
            setCurrentDriver(driver[0]);
        }
    }, [drivers, driverID]);
    const handleBidClick = (tableId) => {
        setCurrentTable(tableId);
        setShowBidPopup(true);
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', e.target.name.value);
        formData.append('email', e.target.email.value);
        formData.append('phoneNumber', e.target.phoneNumber.value);
        formData.append('address', e.target.address.value);
        formData.append('companyName', e.target.companyName.value);
        formData.append('dunsNumber', e.target.dunsNumber.value);
        formData.append('usDocket', e.target.usDocket.value);
        formData.append('usDotNumber', e.target.usDotNumber.value);
        formData.append('carrierAvatar', document.getElementById('hiddenFileInput').files[0]);
        axios.put(`http://localhost:8080/update-carrier/${carrierID}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                if (response.data && response.status === 200) {
                    setCarrier(response.data); // Update the carrier state with the updated data
                    setShowSuccess(true); // Set showSuccess to true
                    setTimeout(() => setShowSuccess(false), 3000); // Hide the success message after 3 seconds
                }
            })
            .catch(error => {
                console.error('Error updating carrier:', error);
                setShowSuccess(false); // Set showSuccess to false
            });
    };
    const handleSwitchChange = (checked) => {
        setChecked(checked);
    };
    const handleDeleteClick = () => {
        setSelectedImage(null); // Remove the selected image
    };
    const handleCloseBidPopup = () => {
        setShowBidPopup(false);
    };

    const handleBidChange = (e) => {
        setBid(e.target.value);
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        setSelectedImage(URL.createObjectURL(file)); // Create a URL for the file and set it in state
    };
    const handleButtonClick = () => {
        document.getElementById('hiddenFileInput').click();
    };

    useEffect(() => {
        axios.get('http://localhost:8080/get-drivers')
            .then(response => {
                if (response.data && response.status === 200) {
                    setDrivers(response.data.drivers); // Set the drivers in state
                } else {
                    console.error('Error fetching drivers:', response);
                }
            })
            .catch(error => {
                console.error('Error fetching drivers:', error);
            });
    }, []);
    useEffect(() => {
        axios.get('http://localhost:8080/get-all-drivers')
            .then(response => {
                if (response.data && response.status === 200) {
                    setDrivers(response.data); // Set the drivers in state
                } else {
                    console.error('Error fetching drivers:', response);
                }
            })
            .catch(error => {
                console.error('Error fetching drivers:', error);
            });
    }, []);
    useEffect(() => {
        commercialTruckLoads.forEach(load => {
            axios.get(`http://localhost:8080/get-bid/${load.commercialLoadID}`)
                .then(response => {
                    setBids(prevBids => ({...prevBids, [load.commercialLoadID]: response.data.bid}));
                })
                .catch(error => {
                    console.error("Error fetching bid: ", error);
                });
        });
    }, [commercialTruckLoads]);

    const handleBidSubmit = (load, e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/submit-bid', {commercialLoadID: load.commercialLoadID, bid})
            .then(response => {
                console.log("Bid submitted successfully");
                setBid('');

                // Fetch the bid by commercialLoadID from the database
                axios.get(`http://localhost:8080/get-bid/${load.commercialLoadID}`)
                    .then(response => {
                        // Update the bids state with the fetched bid
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
            }) // Send a POST request to the server
                .then(response => {
                    console.log(response);
                    // Download the signature
                    const imgBlob = atob(imgData.split(',')[1]); // Decode the Base64 string
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
        setFormData(load); // Set the formData state to the current load
        setShowDetails(!showDetails);
    };
    const handleDelete = (driver) => {
        if (window.confirm('Are you sure you want to delete this driver?')) {
            axios.delete(`http://localhost:8080/delete-driver/${driver.driverID}`)
                .then(response => {
                    if (response.status === 200) {
                        // Remove the deleted driver from the state
                        setDrivers(drivers.filter(d => d.driverID !== driver.driverID));
                    } else {
                        console.error('Error deleting driver:', response);
                    }
                })
                .catch(error => {
                    console.error('Error deleting driver:', error);
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
                    setUser(response.data);
                } else {
                    console.error('Error fetching user data:', response);
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);
    useEffect(() => {
        axios.get(`http://localhost:8080/get-carrier/${carrierID}`)
            .then(response => {
                if (response.data && response.status === 200) {
                    setCarrier(response.data);
                } else {
                    console.error('Error fetching carrier data:', response);
                }
            })
            .catch(error => {
                console.error('Error fetching carrier data:', error);
            });
    }, [carrierID]);
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

    const handleDriverFormSubmit = async (event) => {
        event.preventDefault();
        const newDriver = {
            driverID: uuidv4(),
            carrierId: carrierID,
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            phoneNumber: event.target.phoneNumber.value,
            email: event.target.email.value,
            licensePlate: event.target.licensePlate.value,
            truck: event.target.truck.value
        };
        try {
            const response = await axios.post('http://localhost:8080/create-driver', newDriver);
            console.log(response.data);
            setIsAddDriverPopupVisible(false);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };
    const handlePasswordChange = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/update-carrier-password/${carrierID}`, { password: newPassword })
            .then(response => {
                if (response.data && response.status === 200) {
                    console.log("Password updated successfully");
                }
            })
            .catch(error => {
                console.error("Error updating password: ", error);
            });
    };
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
    }, []);
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
                    setMotoEquipmentLoads(response.data.loads); // Set the loads in state
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
                <p className="dashboard-title"><FontAwesomeIcon className="navigation-icon" icon={faUser}/>Settings</p>
                <div className="admin-side-bar-navigation">
                    <Link to={`/driver-dashboard/${driverID}`}
                          className="navigation-button"><FontAwesomeIcon
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
                <div className="carrier-settings-header">
                    <h3>Driver Settings</h3>
                    <h4>Change your profile and account settings</h4>
                </div>
                <div className="carrier-settings-wrapper">
                    <div className="settings-sidebar">
                        <button className="settings-button" onClick={() => setActiveSetting('Account')}>
                            <FontAwesomeIcon icon={faUser}/> Account
                        </button>
                        <button className="settings-button" onClick={() => setActiveSetting('Password')}>
                            <FontAwesomeIcon icon={faKey}/> Password
                        </button>
                        <button className="settings-button" onClick={() => setActiveSetting('Notifications')}>
                            <FontAwesomeIcon icon={faBell}/> Notifications
                        </button>
                        <button className="settings-button" onClick={() => setActiveSetting('Help')}>
                            <FontAwesomeIcon icon={faQuestionCircle}/> Help
                        </button>
                    </div>
                    <div className="settings-content">
                        {activeSetting === 'Account' &&
                            <div className="account-carrier-settings">
                                <h3>General Info</h3>
                                <div className="carrier-avatar-wrapper">
                                    <div className="carrier-avatar-wrapper">
                                        <div className="carrier-photo">
                                            {selectedImage ?
                                                <img src={selectedImage} className="carrier-avatar" alt="Selected"/> :
                                                <UserAvatarComponent className="carrier-photo"/>}
                                        </div>
                                        <input type="file" id="hiddenFileInput" style={{display: 'none'}}
                                               onChange={handleFileChange}/>
                                    </div>
                                    <div className="carrier-avatar-buttons">
                                        <button className="change-photo-carrier" onClick={handleButtonClick}>Change
                                            Driver Photo
                                        </button>
                                        <button className="delete-photo-carrier" onClick={handleDeleteClick}>Delete
                                            Photo
                                        </button>
                                    </div>
                                </div>
                                <form onSubmit={handleFormSubmit}>
                                    <div className="carrier-data-changing">
                                        <label>Name</label>
                                        <input type="text" name="name" placeholder={currentDriver && currentDriver.firstName}
                                               onChange={handleFormChange}/>
                                    </div>
                                    <div className="carrier-data-changing">
                                        <label>Email</label>
                                        <input type="text" name="email" placeholder={currentDriver && currentDriver.lastName}
                                               onChange={handleFormChange}/>
                                    </div>
                                    <div className="carrier-data-changing">
                                        <label>Phone Number</label>
                                        <input type="tel" name="phoneNumber" onChange={handleFormChange}
                                               placeholder={currentDriver && currentDriver.phoneNumber}/>
                                    </div>
                                    <button className="submit-changes-button" type="submit">Save Changes</button>
                                </form>
                            </div>
                        }
                        {showSuccess &&
                            <div className="success-message">
                                Success
                            </div>
                        }
                        {activeSetting === 'Password' &&
                            <div className="account-carrier-settings-password">
                                <h3>Password Settings</h3>
                                <form onSubmit={handlePasswordChange}>
                                    <div className="carrier-data-changing">
                                        <label>Current Password</label>
                                        <input type="password" placeholder="Old Password"
                                               onChange={(e) => setOldPassword(e.target.value)}/>
                                    </div>
                                    <div className="carrier-data-changing">
                                        <label>New Password</label>
                                        <input type="password" placeholder="New Password"
                                               onChange={(e) => setNewPassword(e.target.value)}/>
                                    </div>
                                    <div className="carrier-data-changing">
                                        <label>I want to get two-factor authentication code in my email</label>
                                        <Switch onChange={handleSwitchChange} checked={checked}/>
                                    </div>
                                </form>
                                <button className="submit-changes-button">Change
                                    Password
                                </button>
                            </div>
                        }
                        {activeSetting === 'Notifications' &&
                            <div className="account-carrier-settings-notifications">
                                <h3>Notifications</h3>
                                <form>
                                    <div className="carrier-data-changing-notifications">
                                        <label>I want to get email notifications about new bids</label>
                                        <Switch onChange={handleSwitchChange} checked={checked}/>
                                    </div>
                                    <div className="carrier-data-changing-notifications">
                                        <label>I want to get email notifications about customer messages</label>
                                        <Switch onChange={handleSwitchChange} checked={checked}/>
                                    </div>
                                    <div className="carrier-data-changing-notifications">
                                        <label>I want to get email notifications about customer messages</label>
                                        <Switch onChange={handleSwitchChange} checked={checked}/>
                                    </div>
                                    <div className="carrier-data-changing-notifications">
                                        <label>I want to get email notifications about succesfull
                                            registation\login</label>
                                        <Switch onChange={handleSwitchChange} checked={checked}/>
                                    </div>
                                </form>
                                <button className="submit-changes-button">Save Changes</button>
                            </div>
                        }
                        {activeSetting === 'Help' &&

                            <div className="help-info-container">
                                <h3>Help Info</h3>
                                <p>If you have any questions or issues, please refer to our <a
                                    href="https://example.com/faq">FAQ</a> or <a
                                    href="https://example.com/docs">documentation</a>.</p>
                                <p>For further assistance, you can reach out to our support team at
                                    support@example.com.</p>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DriverSettings;
