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
import {ReactComponent as UserChatAvatar} from "../../../assets/userAvatar.svg";
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
import {ClipLoader} from "react-spinners";
import useSound from 'use-sound';
import notificationSound from '../../../assets/sound-effects/message-sent.mp3'; // replace with the path to your sound file
import FloatingWindowSuccess from "../../floating-window-success/FloatingWindowSuccess";
import {BACKEND_URL} from "../../../constants/constants";
import DriverEntity from "../driver-entity/DriverEntity";

const CarrierChatPage = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [play] = useSound(notificationSound);
    const [motoEquipmentLoads, setMotoEquipmentLoads] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isAssignSuccess, setIsAssignSuccess] = useState(false);
    const [isAssignFailed, setIsAssignFailed] = useState(false);
    const [isAssignLoading, setIsAssignLoading] = useState(false);
    const [boatLoads, setBoatLoads] = useState([]); // Add this line
    const [constructionEquipmentLoads, setConstructionEquipmentLoads] = useState([]); // Add this line
    const [heavyEquipmentLoads, setHeavyEquipmentLoads] = useState([]); // Add this line
    const [data, setData] = useState([]);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const minSwipeDistance = 50;
    const [selectedChatID, setSelectedChatID] = useState(null);
    const stripePromise = loadStripe('pk_test_51O5Q6UEOdY1hERYnWp8hCCQNdKR8Jiz9ZPRqy1Luk2mxqMaVTDvo6Z0FFWDhjRQc1ELOE95KIUatO2Ve4wCKKqiJ00O0f9R2eo');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLoad, setSelectedLoad] = useState(null);
    const [load, setLoad] = useState(null);
    const [formData, setFormData] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const sigCanvas = useRef({});
    const [selectedDropdown, setSelectedDropdown] = useState(null);
    const [chatData, setChatData] = useState(null);
    const [bid, setBid] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [bids, setBids] = useState([]);
    const [shipperApproval, setShipperApproval] = useState(false);
    const fileInputRef = useRef();
    const [selectedBid, setSelectedBid] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [carrier, setCarrier] = useState(null);
    const {carrierID} = useParams();
    const {chatID} = useParams();
    const [shipper, setShipper] = useState(null);
    const socketRef = useRef();
    const [inputMessage, setInputMessage] = useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState([]);
    const [filePreviewUrl, setFilePreviewUrl] = useState([]);
    const [fileData, setFileData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isApprovalSent, setIsApprovalSent] = useState(false);
    const [showAssignDriverPopup, setShowAssignDriverPopup] = useState(false);
    const [drivers, setDrivers] = useState([]);

    const toggleAssignDriverPopup = () => {
        setShowAssignDriverPopup(!showAssignDriverPopup);
    };

    const handleFileChangeForButton = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 5) {
            alert('You can only select up to 5 files.');
            return;
        }
        const fileUrls = files.map(file => URL.createObjectURL(file));
        setFilePreviewUrl(prevFileUrls => [...prevFileUrls, ...fileUrls]);
    };

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-all-drivers`); // Replace with your API endpoint
                setDrivers(response.data);
            } catch (error) {
                console.error('Error fetching drivers:', error);
            }
        };

        fetchDrivers();
    }, []);


    useEffect(() => {
        const fetchChatData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-deal-conversation-chat/${chatID}`);
                setChatData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching chat data:', error);
            }
        };

        fetchChatData();
    }, [chatID])


    useEffect(() => {
        axios.get(`${BACKEND_URL}/get-deal-chat-conversation/${chatID}`)
            .then(response => {
                if (response.data && response.status === 200) {
                    axios.get(`${BACKEND_URL}/get-shipper/${response.data.shipperID}`)
                        .then(shipperResponse => {
                            if (shipperResponse.data && shipperResponse.status === 200) {
                                setShipper(shipperResponse.data);
                            }
                        })
                        .catch(shipperError => {
                            console.error('Error fetching shipper data:', shipperError);
                        });
                }
            })
            .catch(error => {
                console.error('Error fetching chat conversation:', error);
            });
    }, [chatID]);

    useEffect(() => {
        if (selectedBid && selectedBid.carrierID) {
            axios.get(`${BACKEND_URL}/get-carrier/${selectedBid.carrierID}`)
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
        const fetchLoad = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-load-by-chat/${chatID}`);
                setLoad(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching load:', error);
            }
        };

        fetchLoad();
    }, [chatID]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/get-all-deal-chat-conversations`)
            .then(response => {
                setConversations(response.data);
            })
            .catch(error => {
                console.error('Error fetching conversations:', error);
            });
    }, []);

    useEffect(() => {

        socketRef.current = io.connect('https://socket-chat-server-xly7.onrender.com');

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
            const response = await axios.get(`${BACKEND_URL}/get-deal-chat-conversation/${chatID}`);

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
        axios.get(`${BACKEND_URL}/get-carrier/${carrierID}`)
            .then(response => {
                if (response.data && response.status === 200) {
                    setCarrier(response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching carrier data:', error);
            });
    }, [carrierID]);


    const sendMessage = (message) => {
        const newMessage = {
            text: message,
            date: new Date(),
            sender: 'carrierID',
            file: fileData,
        };
        setImagePreviewUrl([]);
        setFilePreviewUrl([]);
        socketRef.current.emit('carrier message', {message: newMessage, chatID: selectedChatID, carrier: 'carrierID'});
        setInputMessage('');
        setChatMessages((oldMessages) => [...oldMessages, newMessage]);
        axios.post(`${BACKEND_URL}/save-chat-message`, {
            chatID: selectedChatID,
            receiver: 'shipperID',
            sender: 'carrierID',
            text: message,
            date: new Date()
        })
            .catch(error => {
                console.error('Error saving chat message:', error);
            });


    };

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${BACKEND_URL}/get-chat-history/${chatID}`)
            .then(response => {
                setChatMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching chat messages:', error);
            });
        setIsLoading(false);
    }, [chatID]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents the default action to be taken
            sendMessage(inputMessage);
            setInputMessage(''); // Clears the input field
        }
    };


    const handlePay = async (amount) => {
        const response = await axios.post(`${BACKEND_URL}/create-checkout-session`, {amount});
        const sessionId = response.data.sessionId;

        const stripe = await stripePromise;
        const {error} = await stripe.redirectToCheckout({sessionId});

        if (error) {
            console.log(error);
        }
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
        axios.get(`${BACKEND_URL}/all-user-loads`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/get-heavy-equipment-loads`)
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
        axios.get(`${BACKEND_URL}/get-construction-equipment-loads`)
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
        axios.get(`${BACKEND_URL}/get-boat-loads`)
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
        axios.get(`${BACKEND_URL}/get-carrier/${carrierID}`)
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
        axios.get(`${BACKEND_URL}/get-moto-equipment-loads`)
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

    const handleCarrierApprove = async () => {
        setIsApprovalSent(true);
        try {
            const response = await axios.put(`${BACKEND_URL}/confirm-load/${chatID}`);
            if (response.status === 200) {
                console.log(response.data.message);
                socketRef.current.emit('carrier approval', {chatID: selectedChatID});
            } else {
                console.error('Error confirming load:', response);
            }
        } catch (error) {
            console.error('Error confirming load:', error);
        }
        window.location.reload();
    };

    useEffect(() => {
        socketRef.current = io.connect('https://socket-chat-server-xly7.onrender.com');

        socketRef.current.on('payment updated', (data) => {
            if (data.chatID === chatID) {
                window.location.reload();
            }
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [chatID]);

    useEffect(() => {
        socketRef.current.on('shipper approval', (data) => {
            setShipperApproval(true);
        });

        return () => {
            socketRef.current.off('shipper approval');
        };
    }, []);

    const handleAssignLoad = async (driver, loadID) => {
        setIsAssignLoading(true);
        try {
            const response = await axios.put(`${BACKEND_URL}/assign-load/${driver.driverID}`, { loadID });
            if (response.status === 200) {
                console.log('Load assigned successfully');
                isAssignSuccess(true);
            } else {
                console.error('Error assigning load:', response);
            }
        } catch (error) {
            console.error('Error assigning load:', error);
        }
        setIsAssignLoading(false);
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
            {shipperApproval && (
                <>
                    {play()}
                    <FloatingWindowSuccess
                        text="Shipper approved your agreement. Approve shipper's agreement too, to continue next steps"/>
                </>
            )}

            {showAssignDriverPopup &&
                <div className="assign-driver-popup-overlay">
                    <div className="assign-driver-popup">
                        <div className="assign-driver-popup-header">
                            <h1>Assign Driver for load: {load.loadCredentialID}</h1>
                            <button className="close-button" onClick={toggleAssignDriverPopup}>Close</button>
                        </div>
                        <div className="assign-driver-popup-content">
                            {drivers.filter(driver => driver.driverCreatedByCarrierID === carrierID).map((driver, index) => (
                                <DriverEntity
                                    key={index}
                                    driverFirstAndLastName={driver.driverFirstAndLastName}
                                    driverEmail={driver.driverEmail}
                                    driverID={driver.driverID}
                                    loadID={load.loadCredentialID}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            }
            <div className="carrier-deal-conversations-sidebar">
                <div className="chat-conversation-search-bar">
                    <SearchBarIcon width="15"/>
                    <input type="text" placeholder="Search chat by load ID..."/>
                </div>
                <div className="chat-id-containers-wrapper">
                    {conversations.map((conversation, index) => (
                        <div key={index} className="chat-id-container"
                             onClick={() => handleChatSelection(conversation.chatID)}>
                            <UserChatAvatar className="user-avatar-chat"/>
                            <div className="chat-details">
                                <h3>Shipper Name</h3>
                                <h4>{conversation.chatID}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="carrier-dashboard-content">
                <div className="carrier-chat-header">
                    <div className="shipper-carrier-chat-header">
                        <span className="status-circle"></span>
                        <h1 className="chat-user-name">{shipper ? shipper.userShipperName :
                            <ClipLoader color="#024ecc" loading={true} size={25}/>}</h1>
                    </div>
                    {load && load.loadCarrierConfirmation === 'Confirmed' ? (
                        load.loadPaymentStatus === 'Paid' ? (
                            <button className="send-bol-button" onClick={toggleAssignDriverPopup}>
                                Assign Driver
                            </button>
                        ) : (
                            <button className="waiting-for-approval-button" disabled>
                                <ClipLoader className="fade-loader" color="#cacaca" loading={true} size={15}/>
                                Waiting for Shipper's payment
                            </button>
                        )
                    ) : (
                        <button className="send-bol-button" onClick={handleCarrierApprove}>
                            Approve Agreement
                        </button>
                    )}
                </div>

                {chatID ? (
                    <>
                        {isLoading ? (
                            <ClipLoader color="#024ecc" loading={true} size={40} className="clip-loader-style"/>
                        ) : (
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
                                                maxWidth: '200px',
                                                width: '100%',
                                                borderRadius: '10px',
                                                margin: '10px'
                                            }}>
                                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                    {message.sender === 'shipperID' &&
                                                        <div>
                                                            {shipper ?
                                                                <p style={{color: '#a9a9a9'}}>{shipper.userShipperName}</p> :
                                                                <ClipLoader color="#024ecc" loading={true}
                                                                            size={25}/>
                                                            }
                                                        </div>}
                                                    {message.sender !== 'carrierID' &&
                                                        <div style={{color: '#a9a9a9'}}>Customer</div>}
                                                </div>
                                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                    {message.sender === 'carrierID' &&
                                                        <div
                                                            style={{color: message.sender === 'carrierID' ? '#d3d3d3' : '#f3f3f3',}}>
                                                            {carrier ? carrier.carrierContactCompanyName :
                                                                <ClipLoader color="#024ecc" loading={true}
                                                                            size={25}/>}
                                                        </div>}
                                                    {message.sender === 'carrierID' &&
                                                        <div
                                                            style={{color: message.sender === 'carrierID' ? '#d3d3d3' : '#f3f3f3',}}>
                                                            Carrier
                                                        </div>}
                                                </div>
                                                {message.text}
                                                {message.file && <img src={message.file} alt="File"/>}
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
                                    <div className="chat-input-area-wrapper">
                                        <div className="images-preview-wrapper">
                                            {imagePreviewUrl && imagePreviewUrl.map((url, index) => (
                                                <img key={index} className="file-image-preview" src={url}
                                                     alt="Preview"/>
                                            ))}
                                            {filePreviewUrl.map((url, index) => (
                                                <img key={index} className="file-image-preview" src={url}
                                                     alt="Preview"/>
                                            ))}
                                        </div>
                                        <div className="chat-input-area">
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                style={{display: 'none'}}
                                                onChange={handleFileChangeForButton}
                                                multiple
                                            />
                                            <button className="send-bol-button"
                                                    onClick={() => fileInputRef.current.click()}>Send BOL
                                            </button>
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
                                </div>
                            </div>
                        )
                        }
                    </>

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
