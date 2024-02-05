import React, {useEffect, useState, useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faSearch} from "@fortawesome/free-solid-svg-icons";
import "../AdminDashboard.css";
import io from 'socket.io-client';
import {faBars, faTimes, faSignOutAlt, faCog, faTruck, faRobot, faUser} from "@fortawesome/free-solid-svg-icons";
import {ReactComponent as UserAvatarComponent} from "../../../assets/userAvatar2.svg";
import {ReactComponent as BellComponent} from "../../../assets/bell.svg";
import {faDollarSign} from '@fortawesome/free-solid-svg-icons';
import html2canvas from 'html2canvas';
import {saveAs} from 'file-saver';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe('your-stripe-public-key');
const stripe = await stripePromise;

const CustomerChatPage = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [chatEndpoint, setChatEndpoint] = useState(null);
    const {personalEndpoint} = useParams();
    const [vehicleLoads, setVehicleLoads] = useState([]);
    const [motoEquipmentLoads, setMotoEquipmentLoads] = useState([]);
    const [commercialTruckLoads, setCommercialTruckLoads] = useState([]); // Add this line
    const [boatLoads, setBoatLoads] = useState([]); // Add this line
    const [constructionEquipmentLoads, setConstructionEquipmentLoads] = useState([]); // Add this line
    const [heavyEquipmentLoads, setHeavyEquipmentLoads] = useState([]); // Add this line
    const [data, setData] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const sidebarRef = useRef(null);
    const minSwipeDistance = 50;
    const [currentUser, setCurrentUser] = useState("user1");
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
    const [bid, setBid] = useState(null);
    const [isBidApplied, setIsBidApplied] = useState(false);
    const [bids, setBids] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedBid, setSelectedBid] = useState(null);
    const [carrier, setCarrier] = useState(null);
    const [isChatButtonDisabled, setIsChatButtonDisabled] = useState(true);
    const [inputMessage, setInputMessage] = useState("");

    const [chatMessages, setChatMessages] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect('http://localhost:8083');

        socketRef.current.on('chat message', (message) => {
            setChatMessages((messages) => [...messages, message]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);


    const sendMessage = (message) => {
        const newMessage = {
            text: message,
            date: new Date(),
        };

        socketRef.current.emit('chat message', newMessage, (error) => {
            if (error) {
                console.error('Error sending message:', error);
            } else {
                setChatMessages((messages) => [...messages, newMessage]);
            }
        });
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents the default action to be taken
            sendMessage(inputMessage);
            setInputMessage(''); // Clears the input field
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/get-bids-by-user/${personalEndpoint}`)
            .then(response => {
                const bids = response.data;
                setBids(bids);
                console.log(bids);
            })
            .catch(error => {
                console.error('Error fetching bids:', error);
            });
    }, [personalEndpoint]);
    const handleBidApply = async () => {
        const bidData = {
            carrier: selectedBid.carrier,
            loadType: selectedBid.loadType,
            currency: selectedBid.currency,
            pickupLocation: selectedBid.pickupLocation,
            deliveryLocation: selectedBid.deliveryLocation,
            status: "Applied",
            bidPrice: selectedBid.bid,
            assignedDriver: selectedBid.assignedDriver,
            commercialLoadID: selectedBid.commercialLoadID,
            submitBidID: Math.floor(Math.random() * 100000000000),
            userID: personalEndpoint,
        };

        try {
            await axios.post('http://localhost:8080/apply-bid', bidData);
            alert('Bid submitted successfully');
            setIsBidApplied(true);
            setIsPopupOpen(false);
        } catch (error) {
            console.error('Error submitting bid:', error);
        }
    };



    useEffect(() => {
        if (selectedBid && selectedBid.carrierPersonalEndpoint) {
            axios.get(`http://localhost:8080/get-carrier/${selectedBid.carrierPersonalEndpoint}`)
                .then(response => {
                    if (response.data && response.status === 200) {
                        setCarrier(response.data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching carrier data:', error);
                });
        }
    }, [selectedBid]);

    useEffect(() => {
        axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-commercial-truck-loads`)
            .then(response => {
                if (response.data && response.status === 200) {
                    setCommercialTruckLoads(response.data.loads);
                    response.data.loads.forEach(load => {
                        axios.get(`http://localhost:8080/get-bid/${load.commercialLoadID}`)
                            .then(response => {
                                if (response.data && response.status === 200) {
                                    setBid(response.data);
                                }
                            })
                            .catch(error => {
                                console.error('Error fetching bid:', error);
                            });
                    });
                } else {
                    console.error('Error fetching Commercial Truck loads:', response);
                }
            })
            .catch(error => {
                console.error('Error fetching Commercial Truck loads:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/get-all-bids')
            .then(response => {
                setBids(response.data);
            })
            .catch(error => {
                console.error('Error fetching bids:', error);
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
                    // Download the signature
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
        setFormData(load);
        setShowEditForm(true);
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
        setUser(null);
        navigate('/sign-in');
    };

    return (
        <div className="admin-dashboard-wrapper">
            <div className={`admin-side-bar ${isSidebarOpen ? "" : "closed"}`} ref={sidebarRef}>
                <p className="dashboard-title"><FontAwesomeIcon className="navigation-icon" icon={faUser}/>User's
                    dashboard</p>
                <div className="admin-side-bar-navigation">
                    <Link to={`/admin-dashboard/${personalEndpoint}`} className="navigation-button"><FontAwesomeIcon
                        className="navigation-icon" icon={faTruck}/>My Loads</Link>
                    <Link to={`/bids-page/${personalEndpoint}`} className="navigation-button"><FontAwesomeIcon
                        className="navigation-icon" icon={faDollarSign}/>My Bids</Link>
                    <Link to={`/chat/${personalEndpoint}`} className="navigation-button-2"><FontAwesomeIcon
                        className="navigation-icon" icon={faComment}/>Chat with Carrier</Link>
                    <Link to={`/jarvis-chat/${personalEndpoint}/${chatEndpoint}`} className="navigation-button">
                        <FontAwesomeIcon className="navigation-icon" icon={faRobot}/>Jarvis Chat Page
                    </Link>
                </div>
                <div className="admin-side-bar-navigation">
                    <Link to="/admin-dashboard" className="navigation-button-settings"><FontAwesomeIcon
                        className="navigation-icon" icon={faCog}/>Settings</Link>
                    <Link to="/jarvis-chat" className="navigation-button-logout"><FontAwesomeIcon
                        className="navigation-icon" icon={faSignOutAlt}/>Logout</Link>
                </div>
            </div>
            <button className="toggle-button" onClick={toggleSidebar}>
                <FontAwesomeIcon className="fa-bars-icon-times-icon" icon={isSidebarOpen ? faTimes : faBars}/>
            </button>
            <div className="admin-content">
                <div className="admin-content-wrapper">
                    <div className="admin-inner-content-second">
                        <div className="inner-content-second-text">
                            <p className="inner-content-second-text-first">Start Messaging with Carrier!</p>
                            <p className="inner-content-second-text-second">Be careful due scammers</p>
                        </div>
                        <div className="user-details-wrapper">
                            <UserAvatarComponent className="user-avatar"/>
                            <div className="user-details">
                                <p className="user-name">{user ? user.name : 'Loading...'}</p>
                                <p className="user-status">Customer</p>
                            </div>
                            <BellComponent className="bell-icon"/>
                        </div>
                    </div>
                    <div className="messaging-chat-wrapper">
                        <div className="chat-messages">
                            {chatMessages.map((message, index) => (
                                <div className="message-wrapper">
                                    <UserAvatarComponent className="user-message-avatar"/>
                                    <div key={message.id}
                                         className={`message ${message.sender === currentUser ? "currentUser" : "message-customer"}`}>
                                        <div className="message-role-name">
                                            <p className="user-message-name">{user ? user.name : 'S.H Robinson'}</p>
                                            <p className="user-status">Customer</p>
                                        </div>
                                        <p className="message-text">{message.text}</p>
                                        <div className="message-date">
                                            {isNaN(Date.parse(message.date)) ? "Invalid date" : new Intl.DateTimeFormat('en-US', {
                                                dateStyle: 'medium',
                                                timeStyle: 'short'
                                            }).format(new Date(Date.parse(message.date)))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="chat-input-area">
                            <input
                                type="text"
                                className="chat-input"
                                placeholder="Type your message here..."
                                value={inputMessage}
                                onChange={e => setInputMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button
                                className="chat-send-button"
                                onClick={() => {
                                    sendMessage(inputMessage);
                                    setInputMessage("");
                                }}
                            >
                                Send
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CustomerChatPage;
