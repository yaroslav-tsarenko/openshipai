import React, {useEffect, useState, useRef} from "react";
import {ReactComponent as SearchBarIcon} from "../../../assets/search-bar-icon.svg";
import {ReactComponent as UserChatAvatar} from "../../../assets/userAvatar.svg";
import {ReactComponent as SendButtonIcon} from "../../../assets/send-chat-icon.svg";
import {ReactComponent as SendVoiceMessage} from "../../../assets/mic-chat-icon.svg";
import {ReactComponent as UserAvatarComponent} from "../../../assets/userAvatar2.svg";
import "../CarrierDashboard.css";
import {ReactComponent as DefaultUserAvatar} from "../../../assets/default-avatar.svg";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import {ReactComponent as AttachFile} from "../../../assets/skrepka-icon.svg";
import {loadStripe} from '@stripe/stripe-js';
import io from 'socket.io-client';
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import {ClipLoader} from "react-spinners";
import useSound from 'use-sound';
import notificationSound from '../../../assets/sound-effects/message-sent.mp3'; // replace with the path to your sound file
import Alert from "../../floating-window-success/Alert";
import {BACKEND_URL} from "../../../constants/constants";
import {SOCKET_URL} from "../../../constants/constants";
import DriverEntity from "../driver-entity/DriverEntity";
import Button from "../../button/Button";
import styles from "./CarrierChatPage.module.scss";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import {Skeleton} from "@mui/material";
import {FaArrowLeft} from "react-icons/fa6";

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
    const [carrierInfo, setCarrierInfo] = useState(null);
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
    const [isChatVisible, setIsChatVisible] = useState(false);
    const socketRef = useRef();
    const [inputMessage, setInputMessage] = useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState([]);
    const [filePreviewUrl, setFilePreviewUrl] = useState([]);
    const [fileData, setFileData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isApprovalSent, setIsApprovalSent] = useState(false);
    const [showAssignDriverPopup, setShowAssignDriverPopup] = useState(false);
    const [drivers, setDrivers] = useState([]);
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [filePreviews, setFilePreviews] = useState([]);
    const fileInputRefChatFile = useRef(null); // Reference to the hidden file input
    const handleBackToConversations = () => {
        setIsChatVisible(false);
    };

    const toggleAssignDriverPopup = () => {
        setShowAssignDriverPopup(!showAssignDriverPopup);
    };

    useEffect(() => {
        const fetchDrivers = async () => {
            const response = await fetch(`${BACKEND_URL}/get-drivers/${carrierID}`);
            const data = await response.json();
            setDrivers(data);
        };

        const getAvatar = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-carrier-avatar/${carrierID}`);
                if (response.data.carrierAvatar) {
                    setPreviewSavedImage(`${BACKEND_URL}/${response.data.carrierAvatar}`);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        const getUser = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/get-current-user/carrier/${carrierID}`);
                const data = await response.json();
                setCarrierInfo(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        getUser();
        getAvatar();
        fetchDrivers();

    }, [carrierID]);

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
        axios.get(`${BACKEND_URL}/get-all-deal-chat-conversations/${carrierID}`)
            .then(response => {
                setConversations(response.data);
                console.log(response.data + "conversations");
            })
            .catch(error => {
                console.error('Error fetching conversations:', error);
            });
    }, []);

    useEffect(() => {

        socketRef.current = io.connect(`${SOCKET_URL}`);

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
        setIsChatVisible(true);
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


    const sendMessage = async (message) => {
        let fileUrls = [];

        if (selectedFiles.length > 0) {
            fileUrls = await uploadFiles(); // Upload files and get URLs
        }

        const newMessage = {
            text: message,
            date: new Date(),
            sender: 'carrierID',
            files: fileUrls, // Include file URLs
        };

        setInputMessage('');
        setSelectedFiles([]);
        setFilePreviews([]);

        socketRef.current.emit('carrier message', {
            message: newMessage,
            chatID: selectedChatID,
            carrier: 'carrierID'
        });

        setChatMessages((oldMessages) => [...oldMessages, newMessage]);

        axios.post(`${BACKEND_URL}/save-chat-message`, {
            chatID: selectedChatID,
            receiver: 'shipperID',
            sender: 'carrierID',
            text: message,
            date: new Date(),
            files: fileUrls, // Include file URLs
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
        socketRef.current = io.connect(`${SOCKET_URL}`);

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

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);

        const previews = files.map(file => {
            return URL.createObjectURL(file);
        });
        setFilePreviews(previews);
    };

    const uploadFiles = async () => {
        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append('files', file);
        });

        try {
            const response = await axios.post(`${BACKEND_URL}/upload-chat-files`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data.fileUrls; // Get the uploaded file URLs
        } catch (error) {
            console.error('Error uploading files:', error);
            return [];
        }
    };


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
        <div className="shipper-dashboard-wrapper">
            {shipperApproval && (
                <>
                    {play()}
                    <Alert
                         text="Success!" status="success" description="Shipper approved your agreement. Approve shipper's agreement too, to continue next steps"/>
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
            <DashboardSidebar
                DashboardAI={{visible: true, route: `/carrier-dashboard/${carrierID}`}}
                TakeLoad={{visible: true, route: `/carrier-take-loads/${carrierID}`}}
                MyLoads={{visible: true, route: `/carrier-loads/${carrierID}`}}
                DriversAndEquip={{visible: true, route: `/carrier-drivers/${carrierID}`}}
                Payments={{visible: true, route: `/carrier-payments/${carrierID}`}}
                ChatWithShipper={{visible: true, route: `/carrier-chat-conversation/${carrierID}`}}
                Settings={{visible: true, route: `/carrier-settings/${carrierID}`}}
                isMobileSidebarOpen={isMobileSidebarOpen} toggleMobileSidebar={toggleMobileSidebar}
            />
            <div className="shipper-dashboard-content">
                <HeaderDashboard
                    contentTitle={carrierInfo ?
                        <>Welcome back, {carrierInfo.carrierAccountName}!</> :
                        <Skeleton variant="text" width={250}/>}
                    contentSubtitle="Monitor payments, loads, revenues"
                    accountName={carrierInfo ? carrierInfo.carrierAccountName : <Skeleton variant="text" width={60}/>}
                    accountRole={carrierInfo ? carrierInfo.carrierAccountAccountEmail : <Skeleton variant="text" width={40}/>}
                    profileLink={`/shipper-profile/${carrierID}`}
                    bellLink={`/shipper-settings/${carrierID}`}
                    settingsLink={`/shipper-profile/${carrierID}`}
                    avatar={previewSavedImage ? previewSavedImage : DefaultUserAvatar}
                    onBurgerClick={toggleMobileSidebar}
                />
                <div className="chat-content">
                    <div className={`shipper-deal-conversations-sidebar ${isChatVisible ? 'hidden' : ''}`}>
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
                    <div className={`chat-messages-content ${isChatVisible ? 'active' : ''}`}>
                        <button className="go-to-chats-button" onClick={handleBackToConversations}>
                            <FaArrowLeft/>
                        </button>
                        <div className="shipper-chat-header">
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
                                                        backgroundColor: message.sender === 'carrierID' ? '#0084FF' : '#dfdfdf',
                                                        color: message.sender === 'carrierID' ? '#7d7d7d' : '#606060',
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
                                                        <div className={styles.messagesContent}>
                                                            {message.text}
                                                            {message.files && message.files.map((fileUrl, idx) => (
                                                                <img key={idx} src={fileUrl} alt="Attachment" style={{
                                                                    width: '120px',
                                                                    height: '80px',
                                                                    objectFit: 'cover',
                                                                    borderRadius: '10px'
                                                                }}/>
                                                            ))}
                                                        </div>
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
                                            <div className="images-preview-wrapper">
                                                {filePreviews.map((url, index) => (
                                                    <img key={index} className="file-image-preview" src={url}
                                                         alt="Preview"
                                                         style={{
                                                             width: '120px',
                                                             height: '80px',
                                                             borderRadius: '10px'
                                                         }}/>
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

                                                <Button
                                                    variant="attachMaterial"
                                                    onClick={() => fileInputRefChatFile.current.click()} // Trigger file input click
                                                >
                                                    <AttachFile/>
                                                </Button>

                                                <input
                                                    type="file"
                                                    ref={fileInputRefChatFile}
                                                    style={{display: 'none'}}
                                                    onChange={handleFileChange}
                                                    multiple
                                                />

                                                <input
                                                    type="text"
                                                    className="chat-input"
                                                    placeholder="Type your message here..."
                                                    value={inputMessage}
                                                    onChange={e => setInputMessage(e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                />
                                                <Button
                                                    variant="attachMaterial"
                                                >
                                                    <SendVoiceMessage/>
                                                </Button>
                                                <Button
                                                    variant="sendButton"
                                                    onClick={() => {
                                                        sendMessage(inputMessage);
                                                        setInputMessage("");
                                                    }}
                                                >
                                                    <SendButtonIcon/>
                                                </Button>
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

            </div>

        </div>
    );
};

export default CarrierChatPage;
