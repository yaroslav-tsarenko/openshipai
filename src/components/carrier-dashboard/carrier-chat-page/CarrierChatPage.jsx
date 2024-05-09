import React, {useEffect, useState, useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ReactComponent as OpenshipLogo} from "../../../assets/openship-ai-logo-updated.svg";
import {ReactComponent as DashboardIcon} from "../../../assets/dashboard-icon-grey.svg";
import {ReactComponent as DashboardIconWhite} from "../../../assets/dashboard-icon-white.svg";
import {ReactComponent as LoadIcon} from "../../../assets/load-icon-grey.svg";
import {ReactComponent as LoadIconWhite} from "../../../assets/load-icon-white.svg";
import {ReactComponent as LogoutIcon} from "../../../assets/logout-icon-grey.svg";
import {ReactComponent as LogoutIconWhite} from "../../../assets/logout-icon-white.svg";
import {ReactComponent as SearchBarIcon} from "../../../assets/search-bar-icon.svg";
import {ReactComponent as UserChatAvatar} from "../../../assets/chat-user-icon.svg";
import {ReactComponent as SendButtonIcon} from "../../../assets/send-chat-icon.svg";
import {ReactComponent as AttachCamera} from "../../../assets/attach-camera-button.svg";
import {ReactComponent as AttachImage} from "../../../assets/attach-image-button.svg";
import {ReactComponent as AttachFile} from "../../../assets/attach-file-button.svg";
import {ReactComponent as SettingsNotificationsWhite} from "../../../assets/bell-settings-icon-white.svg";
import {ReactComponent as SettingsHelp} from "../../../assets/help-settings-icon.svg";
import {ReactComponent as SettingsHelpWhite} from "../../../assets/help-settings-icon-white.svg";
import {ReactComponent as PlusIconBlue} from "../../../assets/plus-blue-icon.svg";
import {ReactComponent as PencilIcon} from "../../../assets/pencil-edit-icon.svg";
import {ReactComponent as IconInfo} from "../../../assets/info-icon.svg";
import {ReactComponent as BlueCard} from "../../../assets/card-blue.svg";
import {ReactComponent as RedCard} from "../../../assets/card-pink.svg";
import {ReactComponent as AddNew} from "../../../assets/add-new-card.svg";
import {ReactComponent as SortIcon} from "../../../assets/sort-icon-blue.svg";
import {ReactComponent as PaymentIcon} from "../../../assets/payment-icon-grey.svg";
import {ReactComponent as PaymentIconWhite} from "../../../assets/payment-icon-white.svg";
import {ReactComponent as ProfileIcon} from "../../../assets/profile-icon-grey.svg";
import {ReactComponent as ProfileIconWhite} from "../../../assets/profile-icon-white.svg";
import {ReactComponent as SettingsIcon} from "../../../assets/settings-icon-grey.svg";
import {ReactComponent as SettingsIconWhite} from "../../../assets/settings-icon-white.svg";
import {ReactComponent as LoadBoxIconWhite} from "../../../assets/LoadBoxIconWhite.svg";
import {ReactComponent as TireIcon} from "../../../assets/TireIcon.svg";
import {ReactComponent as TireIconWhite} from "../../../assets/tire-icon-white.svg";
import {ReactComponent as LoadBoxIcon} from "../../../assets/load-box-icon.svg";
import {ReactComponent as CarrierChatIcon} from "../../../assets/chat-icon-grey.svg";
import {ReactComponent as CarrierChatIconWhite} from "../../../assets/chat-icon-white.svg";
import {ReactComponent as ArrowNav} from "../../../assets/arrow-nav.svg";
import {ReactComponent as DefaultUserAvatar} from "../../../assets/default-avatar.svg";
import {ReactComponent as BellIcon} from "../../../assets/bell-icon.svg";
import {ReactComponent as SettingsAccountIcon} from "../../../assets/settings-icon.svg";
import {ReactComponent as SearchIcon} from "../../../assets/search-icon.svg";
import {faBars, faTimes, faSignOutAlt, faCog, faTruck, faRobot, faUser} from "@fortawesome/free-solid-svg-icons";
import {ReactComponent as UserAvatarComponent} from "../../../assets/userAvatar2.svg";
import {ReactComponent as BellComponent} from "../../../assets/bell.svg";
import "../CarrierDashboard.css";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import io from 'socket.io-client';
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
const CarrierChatPage = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [hoveredButton, setHoveredButton] = useState('');
    const [chatEndpoint, setChatEndpoint] = useState(null);
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
    const [selectedChatID, setSelectedChatID] = useState(null);
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
    const [conversations, setConversations] = useState([]);
    const [isBidApplied, setIsBidApplied] = useState(false);
    const [bids, setBids] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedBid, setSelectedBid] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [carrier, setCarrier] = useState(null);
    const {carrierID} = useParams();
    const { chatID } = useParams();
    const [isChatButtonDisabled, setIsChatButtonDisabled] = useState(true);
    const socketRef = useRef();
    const [currentUser, setCurrentUser] = useState(null);
    const [inputMessage, setInputMessage] = useState("");
    const [sendBOLDocument, setSendBOLDocument] = useState(false);
    useEffect(() => {
        axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-user/${chatID}`)
            .then(response => {
                if (response.data && response.status === 200) {
                    setUser(response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [chatID]);
    useEffect(() => {
        if (selectedBid && selectedBid.carrierID) {
            axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-carrier/${selectedBid.carrierID}`)
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
                        axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-bid/${load.commercialLoadID}`)
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
        axios.get('https://jarvis-ai-logistic-db-server.onrender.com/get-all-deal-chat-conversations')
            .then(response => {
                setConversations(response.data);
            })
            .catch(error => {
                console.error('Error fetching conversations:', error);
            });
    }, []);
    useEffect(() => {
        axios.get('https://jarvis-ai-logistic-db-server.onrender.com/get-all-bids')
            .then(response => {
                setBids(response.data);
            })
            .catch(error => {
                console.error('Error fetching bids:', error);
            });
    }, []);
    useEffect(() => {
        socketRef.current = io.connect('https://socket-chat-server.onrender.com');

        socketRef.current.on('customer message', (data) => {
            if (data.chatID === selectedChatID) {
                setChatMessages((oldMessages) => [...oldMessages, data.message]); // Add the received message to the chatMessages state
            }
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [selectedChatID]);
    const handleChatSelection = async (chatID) => {
        setSelectedChatID(chatID);

        try {
            const response = await axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-deal-chat-conversation/${chatID}`);

            if (response.status === 200) {
                console.log(response.data);
                navigate(`/carrier-deal-chat-conversation/${carrierID}/${chatID}`);
            } else {
                console.error('Error fetching chat data:', response);
            }
        } catch (error) {
            console.error('Error fetching chat data:', error);
        }
    };

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
        axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-deal-chat-conversation/${chatID}`)
            .then(response => {
                if (response.data && response.status === 200) {
                    axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-user/${response.data.personalEndpoint}`)
                        .then(userResponse => {
                            if (userResponse.data && userResponse.status === 200) {
                                setUser(userResponse.data);
                            }
                        })
                        .catch(userError => {
                            console.error('Error fetching user data:', userError);
                        });
                }
            })
            .catch(error => {
                console.error('Error fetching chat conversation:', error);
            });
    }, [chatID]);
    useEffect(() => {
        axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/deal-conversation-messages-history/${selectedChatID}`)
            .then(response => {
                setChatMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching chat messages:', error);
            });
    }, [selectedChatID]);

    const sendMessage = (message) => {
        const newMessage = {
            text: message,
            date: new Date(),
            sender: 'carrierID',
        };
        socketRef.current.emit('carrier message', { message: newMessage, chatID: selectedChatID, carrier: 'carrierID' });
        setInputMessage('');
        setChatMessages((oldMessages) => [...oldMessages, newMessage]);
        axios.post('https://jarvis-ai-logistic-db-server.onrender.com/save-chat-message', {
            chatID: selectedChatID,
            receiver: 'personalEndpoint',
            sender: 'carrierID',
            text: message,
            date: new Date()
        })
            .catch(error => {
                console.error('Error saving chat message:', error);
            });
    };

    useEffect(() => {
        axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-chat-history/${chatID}`)
            .then(response => {
                setChatMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching chat messages:', error);
            });
    }, [chatID]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents the default action to be taken
            sendMessage(inputMessage);
            setInputMessage(''); // Clears the input field
        }
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
        <div className="carrier-dashboard-wrapper">
            <DashboardSidebar
                DashboardAI={{visible: true, route: `/carrier-dashboard/${carrierID}`}}
                TakeLoad={{visible: true, route: `/carrier-take-loads/${carrierID}`}}
                MyLoads={{visible: true, route: `/carrier-loads/${carrierID}`}}
                DriversAndEquip={{visible: true, route: `/carrier-drivers/${carrierID}`}}
                Payments={{visible: true, route: `/carrier-payments/${carrierID}`}}
                ChatWithShipper={{visible: true, route: `/carrier-chat-conversation/${carrierID}`}}
                Profile={{visible: true, route: `/carrier-profile/${carrierID}`}}
                Settings={{visible: true, route: `/carrier-settings/${carrierID}`}}
            />
            <div className="carrier-deal-conversations-sidebar">
                <div className="chat-conversation-search-bar">
                    <SearchBarIcon width="15"/>
                    <input type="text" placeholder="Search chat by load ID..."/>
                </div>
                {conversations.map((conversation, index) => (
                    <div key={index} className="chat-id-container"
                         onClick={() => handleChatSelection(conversation.chatID)}>
                        <UserChatAvatar/>
                        <div className="chat-details">
                            <h3>Carrier Name</h3>
                            <h4>{conversation.chatID}</h4>
                        </div>
                    </div>
                ))}
            </div>
            <div className="carrier-dashboard-content">
                <div className="carrier-chat-header">
                    <div className="shipper-carrier-chat-header">
                        <span className="status-circle"></span>
                        <h1>Jack Daniels</h1>
                    </div>
                    <h1>5426-3562-5625-7754</h1>
                </div>
                {chatID ? (
                    <div className="messaging-chat-wrapper">
                        <div className="chat-messages">
                            {chatMessages.map((message, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    justifyContent: message.sender === 'carrierID' ? 'flex-end' : 'flex-start'
                                }}>
                                    {message.sender !== 'carrierID' && <UserAvatarComponent/>}
                                    <div style={{
                                        backgroundColor: message.sender === 'carrierID' ? '#0084FF' : '#F3F3F3',
                                        color: message.sender === 'carrierID' ? '#f3f3f3' : '#606060',
                                        alignItems: 'start',
                                        textAlign: 'left',
                                        fontSize: '1.3rem',
                                        padding: '10px',
                                        borderRadius: '10px',
                                        margin: '10px'
                                    }}>
                                        <div className="user-role-name">
                                            {message.sender === 'personalEndpoint' &&
                                                <div className="user-carrier-name">{user ? <p>{user.name}</p> :
                                                    <p>Loading...</p>}</div>}
                                            {message.sender !== 'carrierID' &&
                                                <div className="user-carrier-role">Customer</div>}
                                        </div>
                                        <div className="user-role-name">
                                            {message.sender === 'carrierID' &&
                                                <div style={{
                                                    color: message.sender === 'carrierID' ? '#d3d3d3' : '#f3f3f3',
                                                }}>{carrier.companyName}</div>}
                                            {message.sender === 'carrierID' &&
                                                <div className="user-carrier-role">Carrier</div>}
                                        </div>
                                        {message.text}
                                        <div style={{
                                            color: message.sender === 'carrierID' ? 'white' : 'darkgrey',
                                            alignItems: 'end',
                                            textAlign: 'right',
                                        }}
                                        >{new Date(message.date).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false
                                        })}</div>
                                    </div>
                                    {message.sender === 'carrierID' && <UserAvatarComponent/>}
                                </div>
                            ))}
                        </div>
                        <div className="chat-input-area-wrapper">
                            <button className="send-bol-button">Send BOL</button>
                            <div className="chat-input-area">
                                <input
                                    type="text"
                                    className="chat-input"
                                    placeholder="Type your message here..."
                                    value={inputMessage}
                                    onChange={e => setInputMessage(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <AttachCamera className="chat-input-icons"/>
                                <AttachImage className="chat-input-icons"/>
                                <AttachFile className="chat-input-icons"/>
                            </div>
                            <button
                                className="chat-send-button"
                                onClick={() => {
                                    sendMessage(inputMessage);
                                    setInputMessage("");
                                }}
                            >
                                <SendButtonIcon width="30"/>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="choose-chat-conversation">
                        <p>Choose chat to start speaking with customer!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarrierChatPage;
