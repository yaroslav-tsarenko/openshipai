import React, {useEffect, useState, useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faSearch} from "@fortawesome/free-solid-svg-icons";
import {faBars, faTimes, faSignOutAlt, faCog, faTruck, faRobot, faUser} from "@fortawesome/free-solid-svg-icons";
import {ReactComponent as UserAvatarComponent} from "../../../assets/userAvatar2.svg";
import {ReactComponent as BellComponent} from "../../../assets/bell.svg";
import '../AdminDashboard.css';
import {faKey, faBell, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import {faEdit, faTrashAlt, faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import html2canvas from 'html2canvas';
import {saveAs} from 'file-saver';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import {v4 as uuidv4} from 'uuid';
import Switch from 'react-switch';

const stripePromise = loadStripe('your-stripe-public-key');
const stripe = await stripePromise;

const CustomerSetings = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [chatEndpoint, setChatEndpoint] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const {personalEndpoint} = useParams();
    const [vehicleLoads, setVehicleLoads] = useState([]);
    const [motoEquipmentLoads, setMotoEquipmentLoads] = useState([]);
    const [commercialTruckLoads, setCommercialTruckLoads] = useState([]); // Add this line
    const [boatLoads, setBoatLoads] = useState([]); // Add this line
    const [constructionEquipmentLoads, setConstructionEquipmentLoads] = useState([]); // Add this line
    const [heavyEquipmentLoads, setHeavyEquipmentLoads] = useState([]); // Add this line
    const [data, setData] = useState([]);
    const [checked, setChecked] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
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
    const handleBidClick = (tableId) => {
        setCurrentTable(tableId);
        setShowBidPopup(true);
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };
    const handleButtonClick = () => {
        document.getElementById('hiddenFileInput').click();
    };
    const handleDeleteClick = () => {
        setSelectedImage(null); // Remove the selected image
    };
    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSwitchChange = (checked) => {
        setChecked(checked);
    };
    const handleCloseBidPopup = () => {
        setShowBidPopup(false);
    };

    const handleBidChange = (e) => {
        setBid(e.target.value);
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
        axios.get(`http://localhost:8080/get-user/${personalEndpoint}`)
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
    }, [personalEndpoint]); // Dependency array includes personalEndpoint to refetch when it changes
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
    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (e.target.name && e.target.secondName && e.target.email && e.target.address && e.target.password) {
            const updatedUser = {
                name: e.target.name.value,
                secondName: e.target.secondName.value,
                email: e.target.email.value,
                address: e.target.address.value,
                password: e.target.password.value
            };

            // Make a PUT request to the server
            axios.put(`http://localhost:8080/update-user/${personalEndpoint}`, updatedUser)
                .then(response => {
                    if (response.data && response.status === 200) {
                        setUser(response.data); // Update the user state with the updated data
                        setTimeout(() => setShowSuccess(false), 3000);
                    } else {
                        console.error('Error updating user data:', response);
                    }
                })
                .catch(error => {
                    console.error('Error updating user data:', error);
                });
        } else {
            console.error('Form fields are not defined');
        }
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
    }, []); // Empty dependency array means this effect runs once on component mount
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
                    <Link to={`/carrier-dashboard/${carrierID}`}
                          className="navigation-button"><FontAwesomeIcon
                        className="navigation-icon" icon={faTruck}/>My Shipments</Link>
                    <Link
                        to={`/carrier-drivers/${carrierID}`}
                        className="navigation-button-2">
                        <FontAwesomeIcon
                            className="navigation-icon"
                            icon={faTruck}/>
                        Drivers
                    </Link>
                    <Link to={`/carrier-deal-chat-conversation/${carrierID}`}
                          className="navigation-button"><FontAwesomeIcon
                        className="navigation-icon" icon={faComment}/>Chat with Customer</Link>
                    <Link to={`/jarvis-chat/${carrierID}/${chatEndpoint}`} className="navigation-button">
                        <FontAwesomeIcon className="navigation-icon" icon={faRobot}/>Jarvis Chat Page
                    </Link>
                </div>
                <div className="admin-side-bar-navigation">
                    <Link to="/admin-dashboard" className="navigation-button-settings"><FontAwesomeIcon
                        className="navigation-icon" icon={faCog}/>Settings</Link>
                    <Link to="/sign-in" className="navigation-button-logout"><FontAwesomeIcon
                        className="navigation-icon" icon={faSignOutAlt}/>Logout</Link>
                </div>
            </div>
            <button className="toggle-button" onClick={toggleSidebar}>
                <FontAwesomeIcon className="fa-bars-icon-times-icon" icon={isSidebarOpen ? faTimes : faBars}/>
            </button>
            <div className="admin-content">
                <div className="carrier-settings-header">
                    <h3>Carrier Settings</h3>
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
                                    <div className="carrier-photo">
                                        {selectedImage ?
                                            <img src={selectedImage} className="carrier-avatar" alt="Selected"/> :
                                            <UserAvatarComponent className="carrier-photo"/>}
                                    </div>
                                    <input type="file" id="hiddenFileInput" style={{display: 'none'}}
                                           onChange={handleFileChange}/>
                                    <div className="carrier-avatar-buttons">
                                        <button className="change-photo-carrier" onClick={handleButtonClick}>Change Customer Photo</button>
                                        <button className="delete-photo-carrier" onClick={handleDeleteClick}>Delete Photo</button>
                                    </div>
                                </div>
                                <form onSubmit={handleFormSubmit}>
                                    <div className="carrier-data-changing">
                                        <label>Name</label>
                                        <input type="text" name="name" placeholder={user ? user.name : ''}
                                               onChange={handleFormChange}/>
                                    </div>
                                    <div className="carrier-data-changing">
                                    <label>Second Name</label>
                                        <input type="text" name="secondName" placeholder={user ? user.secondName : ''} onChange={handleFormChange}/>
                                    </div>
                                    <div className="carrier-data-changing">
                                        <label>Email</label>
                                        <input type="tel" name="email" placeholder={user ? user.email : ''} onChange={handleFormChange}/>
                                    </div>
                                    <div className="carrier-data-changing">
                                        <label>address</label>
                                        <input type="text" name="address" placeholder={user ? user.phoneNumber : ''} onChange={handleFormChange}/>
                                    </div>
                                    <div className="carrier-data-changing">
                                        <label>Password</label>
                                        <input type="text" name="password" placeholder={user ? user.password : ''} onChange={handleFormChange}/>
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
                                <form>
                                    <div className="carrier-data-changing">
                                        <label>Password</label>
                                        <input type="text" name="password" value={user.password} placeholder={user ? user.password : ''}
                                               onChange={handleFormChange}/>
                                    </div>
                                    <div className="carrier-data-changing">
                                        <label>New Password</label>
                                        <input type="password" placeholder="New Password"/>
                                    </div>
                                    <div className="carrier-data-changing">
                                        <label>I want to get two-factor authentication code in my email</label>
                                        <Switch onChange={handleSwitchChange} checked={checked}/>
                                    </div>
                                </form>
                                <button className="submit-changes-button">Save Changes</button>
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
                                        <label>I want to get email notifications about succesfull registation\login</label>
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

export default CustomerSetings;
