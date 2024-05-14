import React, {useEffect, useState, useRef} from "react";
import "../ShipperDashboard.css";
import io from 'socket.io-client';
import {ReactComponent as UserAvatarComponent} from "../../../assets/userAvatar2.svg";
import {ReactComponent as OpenshipLogo} from "../../../assets/openship-ai-logo-updated.svg";
import {ReactComponent as DashboardIcon} from "../../../assets/dashboard-icon-grey.svg";
import {ReactComponent as DashboardIconWhite} from "../../../assets/dashboard-icon-white.svg";
import {ReactComponent as LoadIcon} from "../../../assets/load-icon-grey.svg";
import {ReactComponent as LoadIconWhite} from "../../../assets/load-icon-white.svg";
import {ReactComponent as LogoutIcon} from "../../../assets/logout-icon-grey.svg";
import {ReactComponent as LogoutIconWhite} from "../../../assets/logout-icon-white.svg";
import {ReactComponent as PaymentIcon} from "../../../assets/payment-icon-grey.svg";
import {ReactComponent as PaymentIconWhite} from "../../../assets/payment-icon-white.svg";
import {ReactComponent as ProfileIcon} from "../../../assets/profile-icon-grey.svg";
import {ReactComponent as ProfileIconWhite} from "../../../assets/profile-icon-white.svg";
import {ReactComponent as SettingsIcon} from "../../../assets/settings-icon-grey.svg";
import {ReactComponent as SettingsIconWhite} from "../../../assets/settings-icon-white.svg";
import {ReactComponent as QoutesIcon} from "../../../assets/listing-icon-grey.svg";
import {ReactComponent as QoutesIconWhite} from "../../../assets/listing-icon-white.svg";
import {ReactComponent as CarrierChatIcon} from "../../../assets/chat-icon-grey.svg";
import {ReactComponent as CarrierChatIconWhite} from "../../../assets/chat-icon-white.svg";
import {ReactComponent as ArrowNav} from "../../../assets/arrow-nav.svg";
import {ReactComponent as SearchBarIcon} from "../../../assets/search-bar-icon.svg";
import {ReactComponent as UserChatAvatar} from "../../../assets/chat-user-icon.svg";
import {ReactComponent as SendButtonIcon} from "../../../assets/send-chat-icon.svg";
import {ReactComponent as AttachCamera} from "../../../assets/attach-camera-button.svg";
import {ReactComponent as AttachImage} from "../../../assets/attach-image-button.svg";
import {ReactComponent as AttachFile} from "../../../assets/attach-file-button.svg";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";

const ShipperChatPage = () => {
    const [hoveredButton, setHoveredButton] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const {shipperID} = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
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
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLoad, setSelectedLoad] = useState(null);
    const [selectedChatID, setSelectedChatID] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [formData, setFormData] = useState(null);
    const dropdownRef = useRef(null);
    const [bid, setBid] = useState(null);
    const [bids, setBids] = useState([]);
    const {chatID} = useParams();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedBid, setSelectedBid] = useState(null);
    const [carrier, setCarrier] = useState(null);
    const [inputMessage, setInputMessage] = useState("");
    const [conversations, setConversations] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const socketRef = useRef();
    const [userName, setUserName] = useState("");
    const [loadID, setLoadID] = useState(null);
    const [dealChatConversations, setDealChatConversations] = useState([]);
    const [confirmedLoad, setConfirmedLoad] = useState(null);
    const [conversationLoadID, setConversationLoadID] = useState(null);
    const [showBOLContainer, setShowBOLContainer] = useState(false); //test

    useEffect(() => {
        axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-confirmed-load/${conversationLoadID}`)
            .then(response => {
                setConfirmedLoad(response.data);
            })
            .catch(error => {
                console.error('Error fetching confirmed load:', error);
            });
    }, [loadID]);

    useEffect(() => {
        const fetchDealChatConversations = async () => {
            try {
                const response = await axios.get('https://jarvis-ai-logistic-db-server.onrender.com/get-all-deal-chat-conversations');
                const allDealChatConversations = response.data;
                const filteredDealChatConversations = allDealChatConversations.filter(conversation => conversation.chatID === chatID);
                setDealChatConversations(filteredDealChatConversations);
            } catch (error) {
                console.error('Error fetching deal chat conversations:', error);
            }
        };
        fetchDealChatConversations();

    }, [chatID]);
    useEffect(() => {
        const fetchLoadID = async () => {
            try {
                const response = await axios.get(`/get-load-id/${chatID}`);
                setLoadID(response.data.loadID);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLoadID();
    }, [chatID]);
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
        socketRef.current = io.connect('https://socket-chat-server.onrender.com');

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
        axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/deal-conversation-messages-history/${chatID}`)
            .then(response => {
                setChatMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching chat messages:', error);
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
            sender: 'personalEndpoint',
        };
        socketRef.current.emit('customer message', {
            message: newMessage,
            chatID: selectedChatID,
            customer: 'personalEndpoint'
        });
        setInputMessage('');
        setChatMessages((oldMessages) => [...oldMessages, newMessage]);
        axios.post('https://jarvis-ai-logistic-db-server.onrender.com/save-chat-message', {
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
            event.preventDefault();
            sendMessage(inputMessage);
            setInputMessage('');
        }
    };

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
        axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-bids-by-user/${personalEndpoint}`)
            .then(response => {
                const bids = response.data;
                setBids(bids);
                console.log(bids);
            })
            .catch(error => {
                console.error('Error fetching bids:', error);
            });
    }, [personalEndpoint]);


    useEffect(() => {
        axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-user/${personalEndpoint}`)
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
            axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-carrier/${selectedBid.carrierPersonalEndpoint}`)
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
                const response = await axios.get(`/get-chat-messages/${chatID}`);
                setChatMessages(response.data);
                const chatConversationResponse = await axios.get(`/get-user/${chatID}`);
                const carrierID = chatConversationResponse.data.carrierID;
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
        axios.get('https://jarvis-ai-logistic-db-server.onrender.com/get-all-bids')
            .then(response => {
                setBids(response.data);
            })
            .catch(error => {
                console.error('Error fetching bids:', error);
            });
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
    useEffect(() => {
        const fetchCommercialLoadID = async () => {
            try {
                const response = await axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-confirmed-load-by-commercial-load-id/${chatID}`);
                console.log("Confirmed load: ");
                console.log(response.data);
            } catch (error) {
                console.error('Failed to fetch commercialLoadID:', error);
            }
        };

        fetchCommercialLoadID();
    }, [chatID]);
    useEffect(() => {
        axios.get('https://jarvis-ai-logistic-db-server.onrender.com/get-heavy-equipment-loads')
            .then(response => {
                if (response.data && response.status === 200) {
                    setHeavyEquipmentLoads(response.data.loads);
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
            const response = await axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-deal-chat-conversation/${chatID}`);
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

    return (
        <div className="shipper-dashboard-wrapper">
            <DashboardSidebar
                DashboardAI={{ visible: true, route: `/shipper-dashboard/${shipperID}` }}
                Settings={{ visible: true, route: `/shipper-settings/${shipperID}` }}
                Profile={{ visible: true, route: `/shipper-profile/${shipperID}` }}
                Payments={{ visible: true, route: `/shipper-payments/${shipperID}` }}
                ChatWithCarrier={{ visible: true, route: `/shipper-chat-conversation/${shipperID}` }}
                MyQoutes={{ visible: true, route: `/shipper-qoutes/${shipperID}` }}
                MyLoads={{ visible: true, route: `/shipper-loads/${shipperID}` }}
            />
            <div className="shipper-deal-conversations-sidebar">
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
            <div className="shipper-dashboard-content">
                <div className="shipper-chat-header">
                    <div className="shipper-carrier-chat-header">
                        <span className="status-circle"></span>
                        <h1>S.H. Robinson</h1>
                    </div>
                    <h1>5426-3562-5625-7754</h1>
                </div>
                {chatID ? (
                    <div className="messaging-chat-wrapper">
                        <div className="chat-messages">
                            {chatMessages.map((message, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    justifyContent: message.sender === 'personalEndpoint' ? 'flex-end' : 'flex-start'
                                }}>
                                    {message.sender !== 'personalEndpoint' && <UserAvatarComponent/>}
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
                                                <div>{carrier ? <p>{carrier.companyName}</p> :
                                                    <p className="p-user-carrier-name">S.H Robinson</p>}</div>}
                                            {message.sender !== 'personalEndpoint' &&
                                                <div className="user-carrier-role">Carrier</div>}
                                        </div>
                                        <div className="user-role-name">
                                            {message.sender === 'personalEndpoint' &&
                                                <div className="user-customer-name">{user ? <p>{user.name}</p> :
                                                    <p>Loading...</p>}</div>}
                                            {message.sender === 'personalEndpoint' &&
                                                <div className="user-customer-role">Customer</div>}
                                        </div>
                                        {showBOLContainer ? <div>Your BOL document container here</div> : message.text}
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
                        <div className="chat-input-area-wrapper">
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
                        <p>Choose chat to start speaking with carrier!👋</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShipperChatPage;
