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
    const [selectedChatID, setSelectedChatID] = useState(null);
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
    const {chatID} = useParams();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedBid, setSelectedBid] = useState(null);
    const [carrier, setCarrier] = useState(null);
    const [isChatButtonDisabled, setIsChatButtonDisabled] = useState(true);
    const [inputMessage, setInputMessage] = useState("");
    const [conversations, setConversations] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const socketRef = useRef();
    const [userName, setUserName] = useState(""); // State variable to store the user's name
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`/get-user/${chatID}`);
            setUserName(response.data.name);
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    };

    useEffect(() => {
        const fetchCarrier = async () => {
            try {
                const dealChatConversationResponse = await axios.get(`/get-deal-chat-conversation/${chatID}`);
                const dealChatConversation = dealChatConversationResponse.data;

                const carrierResponse = await axios.get(`/get-carrier/${dealChatConversation.carrierID}`);
                const carrier = carrierResponse.data;

                setCarrier(carrier);
            } catch (error) {
                console.error('Failed to fetch carrier:', error);
            }
        };

        fetchCarrier();
    }, [chatID]);
    useEffect(() => {
        fetchUserData();
    }, [chatID]);
    useEffect(() => {
        socketRef.current = io.connect('http://localhost:8083');

        socketRef.current.on('carrier message', (data) => {
            if (data.chatID === selectedChatID) {
                setChatMessages((oldMessages) => [...oldMessages, data.message]);
            }
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [selectedChatID]);

    useEffect(() => {
        axios.get(`http://localhost:8080/deal-conversation-messages-history/${chatID}`)
            .then(response => {
                setChatMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching chat messages:', error);
            });
    }, [chatID]);

    useEffect(() => {
        axios.get(`http://localhost:8080/deal-conversation-messages-history/${selectedChatID}`)
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
            sender: 'personalEndpoint',
        };
        socketRef.current.emit('customer message', { message: newMessage, chatID: selectedChatID, customer: 'personalEndpoint' });
        setInputMessage('');
        setChatMessages((oldMessages) => [...oldMessages, newMessage]);
        axios.post('http://localhost:8080/save-chat-message', {
            chatID: selectedChatID,
            receiver: 'carrierID',
            sender: 'personalEndpoint',
            text: message,
            date: new Date()
        })
            .catch(error => {
                console.error('Error saving chat message:', error);
            });
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/get-chat-history/${chatID}`)
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
    useEffect(() => {
        axios.get('http://localhost:8080/get-all-deal-chat-conversations')
            .then(response => {
                setConversations(response.data);
            })
            .catch(error => {
                console.error('Error fetching conversations:', error);
            });
    }, []);
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
        axios.get(`http://localhost:8080/get-user/${personalEndpoint}`)
            .then(response => {
                if (response.data && response.status === 200) {
                    setUser(response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [personalEndpoint]);
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
        const fetchChatMessages = async () => {
            try {
                // Fetch the chat messages
                const response = await axios.get(`/get-chat-messages/${chatID}`);
                setChatMessages(response.data);

                // Fetch the chat conversation to get the carrierID
                const chatConversationResponse = await axios.get(`/get-user/${chatID}`);
                const carrierID = chatConversationResponse.data.carrierID;

                // Fetch the carrier using the carrierID
                const carrierResponse = await axios.get(`/get-carrier/${carrierID}`);
                setCarrier(carrierResponse.data);
            } catch (error) {
                console.error('Error fetching chat messages:', error);
            }
        };

        fetchChatMessages();
    }, [chatID]);

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

    const handleChatSelection = async (chatID) => {
        setSelectedChatID(chatID);
        try {
            const response = await axios.get(`http://localhost:8080/get-deal-chat-conversation/${chatID}`);
            if (response.status === 200) {
                console.log(response.data);
                navigate(`/customer-deal-chat-conversation/${personalEndpoint}/${chatID}`);
            } else {
                console.error('Error fetching chat data:', response);
            }
        } catch (error) {
            console.error('Error fetching chat data:', error);
        }
    };
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
            <div className="deal-conversations-sidebar">
                <h3>Your active Deals</h3>
                {conversations.map((conversation, index) => (
                    <div key={index} className="chat-id-container" onClick={() => handleChatSelection(conversation.chatID)}>
                        <h5>Deal Conversation ID:</h5>
                        <h4>{conversation.chatID}</h4>
                        <h6 className="chat-id-number">{conversation.chatID}</h6>
                    </div>
                ))}
            </div>
            <button className="toggle-button" onClick={toggleSidebar}>
                <FontAwesomeIcon className="fa-bars-icon-times-icon" icon={isSidebarOpen ? faTimes : faBars}/>
            </button>

            <div className="customer-chat-content">
                <div className="customer-chat-admin-inner-content-second">
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
                {chatID ? (
                    <div className="messaging-chat-wrapper">
                        <div className="chat-messages">
                            {chatMessages.map((message, index) => (
                                <div key={index} style={{ display: 'flex', justifyContent: message.sender === 'personalEndpoint' ? 'flex-end' : 'flex-start' }}>
                                    {message.sender !== 'personalEndpoint' && <UserAvatarComponent />}
                                    <div style={{
                                        backgroundColor: message.sender === 'personalEndpoint' ? '#0084FF' : '#F3F3F3',
                                        color: message.sender === 'personalEndpoint' ? '#f3f3f3' : '#707070',
                                        alignItems: 'start',
                                        textAlign: 'left',
                                        fontSize: '1.3rem',
                                        padding: '10px',
                                        borderRadius: '10px',
                                        margin: '10px'
                                    }}>
                                        <div className="user-role-name">
                                            {message.sender === 'carrierID' &&
                                                <div >{carrier ? <p>{carrier.companyName}</p> : <p className="p-user-carrier-name">S.H Robinson</p>}</div>}
                                            {message.sender !== 'personalEndpoint' &&
                                                <div className="user-carrier-role">Carrier</div>}
                                        </div>
                                        <div className="user-role-name">
                                            {message.sender === 'personalEndpoint' &&
                                                <div className="user-customer-name">{user ? <p>{user.name}</p> : <p>Loading...</p>}</div>}
                                            {message.sender === 'personalEndpoint' &&
                                                <div className="user-customer-role">Customer</div>}
                                        </div>

                                        {message.text}
                                        <div style={{
                                            color: message.sender === 'personalEndpoint' ? 'white' : 'darkgrey',
                                            alignItems: 'end',
                                            textAlign: 'end',
                                        }}
                                        >{new Date(message.date).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false
                                        })}</div>
                                    </div>
                                    {message.sender === 'personalEndpoint' && <UserAvatarComponent/>}
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
                ) : (
                    <div className="choose-chat-conversation">
                        <p>Choose chat to start speaking with carrier!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerChatPage;
