import React, {useEffect, useState, useRef} from "react";
import {ReactComponent as SearchBarIcon} from "../../../assets/images/search-bar-icon.svg";
import {ReactComponent as UserChatAvatar} from "../../../assets/images/userAvatar.svg";
import {ReactComponent as SendButtonIcon} from "../../../assets/images/send-chat-icon.svg";
import {ReactComponent as SendVoiceMessage} from "../../../assets/images/mic-chat-icon.svg";
import {ReactComponent as UserAvatarComponent} from "../../../assets/images/userAvatar2.svg";
import "../CarrierDashboard.css";
import {ReactComponent as DefaultUserAvatar} from "../../../assets/images/default-avatar.svg";
import {useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import {ReactComponent as AttachFile} from "../../../assets/images/skrepka-icon.svg";
import {loadStripe} from '@stripe/stripe-js';
import io from 'socket.io-client';
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import {ClipLoader} from "react-spinners";
import useSound from 'use-sound';
import notificationSound from '../../../assets/sound-effects/message-sent.mp3';
import Alert from "../../floating-window-success/Alert";
import {BACKEND_URL} from "../../../constants/constants";
import {SOCKET_URL} from "../../../constants/constants";
import DriverEntity from "../driver-entity/DriverEntity";
import Button from "../../button/Button";
import styles from "./CarrierChatPage.module.scss";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import {Skeleton} from "@mui/material";
import RotatingLinesLoader from "../../rotating-lines/RotatingLinesLoader";
import {FaArrowLeft} from "react-icons/fa";
import Popup from "../../popup/Popup";

const CarrierChatPage = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const [play] = useSound(notificationSound);
    const [shipperName, setShipperName] = useState(null);
    const [data, setData] = useState([]);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const minSwipeDistance = 50;
    const [selectedChatID, setSelectedChatID] = useState(null);
    const stripePromise = loadStripe('pk_test_51O5Q6UEOdY1hERYnWp8hCCQNdKR8Jiz9ZPRqy1Luk2mxqMaVTDvo6Z0FFWDhjRQc1ELOE95KIUatO2Ve4wCKKqiJ00O0f9R2eo');
    const [carrierInfo, setCarrierInfo] = useState(null);
    const [load, setLoad] = useState(null);
    const [formData, setFormData] = useState(null);
    const [chatData, setChatData] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [shipperApproval, setShipperApproval] = useState(false);
    const fileInputRef = useRef();
    const [selectedBid, setSelectedBid] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [carrier, setCarrier] = useState(null);
    const {carrierID} = useParams();
    const {chatID} = useParams();
    const [shipper, setShipper] = useState(null);
    const [isChatVisible, setChatVisible] = useState(false);
    const socketRef = useRef();
    const [inputMessage, setInputMessage] = useState("");
    const [filePreviewUrl, setFilePreviewUrl] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isApprovalSent, setIsApprovalSent] = useState(false);
    const [showAssignDriverPopup, setShowAssignDriverPopup] = useState(false);
    const [drivers, setDrivers] = useState([]);
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const handleFileChangeForButton = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 5) {
            alert('You can only select up to 5 files.');
            return;
        }
        const fileUrls = files.map(file => URL.createObjectURL(file));
        setFilePreviewUrl(prevFileUrls => [...prevFileUrls, ...fileUrls]);
    };
    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [filePreviews, setFilePreviews] = useState([]);
    const fileInputRefChatFile = useRef(null); // Reference to the hidden file input
    const toggleAssignDriverPopup = () => {
        setShowAssignDriverPopup(!showAssignDriverPopup);
    };
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
    };
    const handleChatSelection = async (chatID) => {
        setChatVisible(true);
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
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents the default action to be taken
            sendMessage(inputMessage);
            setInputMessage(''); // Clears the input field
        }
    };
    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/get-drivers/${carrierID}`);
                const data = await response.json();
                setDrivers(data);
            } catch (error) {
                console.error('Error fetching drivers:', error);
            }
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

        const fetchChatData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-deal-conversation-chat/${chatID}`);
                setChatData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching chat data:', error);
            }
        };

        const fetchShipperData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-deal-chat-conversation/${chatID}`);
                if (response.data && response.status === 200) {
                    const shipperResponse = await axios.get(`${BACKEND_URL}/get-shipper/${response.data.shipperID}`);
                    if (shipperResponse.data && shipperResponse.status === 200) {
                        setShipper(shipperResponse.data);
                        console.log(shipper)
                        setShipperName(shipperResponse.data.userShipperName);
                    }
                }
            } catch (error) {
                console.error('Error fetching shipper data:', error);
            }
        };

        const fetchCarrierData = async (carrierID) => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-carrier/${carrierID}`);
                if (response.data && response.status === 200) {
                    setCarrier(response.data);
                }
            } catch (error) {
                console.error('Error fetching carrier data:', error);
            }
        };

        const fetchLoad = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-load-by-chat/${chatID}`);
                setLoad(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching load:', error);
            }
        };

        const fetchConversations = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-all-deal-chat-conversations/${carrierID}`);
                setConversations(response.data);
                console.log(response.data + "conversations");
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        };

        const fetchChatHistory = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${BACKEND_URL}/get-chat-history/${chatID}`);
                setChatMessages(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching chat messages:', error);
                setIsLoading(false);
            }
        };

        const fetchAllUserLoads = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/all-user-loads`);
                setData(response.data);
            } catch (error) {
                console.error('There was an error!', error);
            }
        };

        const setupSocketListeners = () => {
            socketRef.current = io.connect(`${SOCKET_URL}`);

            socketRef.current.on('customer message', (data) => {
                if (data.chatID === selectedChatID) {
                    setChatMessages((oldMessages) => [...oldMessages, data.message]);
                }
            });

            socketRef.current.on('payment updated', (data) => {
                if (data.chatID === chatID) {
                }
            });

            socketRef.current.on('shipper approval', (data) => {
                setShipperApproval(true);
            });

            return () => {
                socketRef.current.disconnect();
            };
        };

        const handleSwipe = () => {
            if (!touchStart || !touchEnd) return;
            const distance = touchStart - touchEnd;
            const isLeftSwipe = distance > minSwipeDistance;
            const isRightSwipe = distance < -minSwipeDistance;
            if (isLeftSwipe) {
                setIsSidebarOpen(false);
            } else if (isRightSwipe) {
                setIsSidebarOpen(true);
            }
        };

        fetchDrivers();
        getAvatar();
        getUser();
        fetchChatData();
        fetchShipperData();
        fetchCarrierData(carrierID);
        fetchLoad();
        fetchConversations();
        fetchChatHistory();
        fetchAllUserLoads();
        setupSocketListeners();
        handleSwipe();

    }, [carrierID, chatID, selectedBid, selectedChatID, touchStart, touchEnd]);

    const toggleChatVisibility = () => {
        setChatVisible(!isChatVisible);
    };

    return (
        <div className="shipper-dashboard-wrapper">
            {shipperApproval && (
                <>
                    {play()}
                    <Alert
                        text="Success!" status="success"
                        description="Shipper approved your agreement. Approve shipper's agreement too, to continue next steps"/>
                </>
            )}
            {showAssignDriverPopup &&
                <Popup title={`Assign driver for load: ${load.loadCredentialID}`} onClose={toggleAssignDriverPopup}>
                        <div className="assign-driver-popup-content">
                            {drivers.filter(driver => driver.driverCreatedByCarrierID === carrierID).length > 0 ? (
                                drivers.filter(driver => driver.driverCreatedByCarrierID === carrierID).map((driver, index) => (
                                    <DriverEntity
                                        key={index}
                                        driverFirstAndLastName={driver.driverFirstAndLastName}
                                        driverEmail={driver.driverEmail}
                                        driverID={driver.driverID}
                                        loadID={load.loadCredentialID}
                                    />
                                ))
                            ) : (
                                <p>Currently you didn't add any drivers</p>
                            )}
                        </div>
                </Popup>
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
                    accountRole={carrierInfo ? carrierInfo.role : <Skeleton variant="text" width={40}/>}
                    profileLink={`/shipper-profile/${carrierID}`}
                    bellLink={`/shipper-settings/${carrierID}`}
                    settingsLink={`/shipper-profile/${carrierID}`}
                    avatar={previewSavedImage ? previewSavedImage : DefaultUserAvatar}
                    onBurgerClick={toggleMobileSidebar}
                />
                <div className="chat-content">
                    <div className={`shipper-deal-conversations-sidebar ${isChatVisible ? 'hidden' : ''}`}>
                        <h2 className="messages-title">Messages</h2>
                        <div className="chat-conversation-search-bar">
                            <SearchBarIcon width="15"/>
                            <input type="text" placeholder="Search chat by load ID..."/>
                        </div>
                        <div className="chat-id-containers-wrapper">
                            {conversations.length === 0 ? (
                                <p className="chat-message-warning">Shipper firstly need to approve your bid, then here
                                    will appear chat with him</p>
                            ) : (
                                conversations.map((conversation, index) => (
                                    <div key={index} className="chat-id-container"
                                         onClick={() => handleChatSelection(conversation.chatID)}>
                                        <UserChatAvatar className="user-avatar-chat"/>
                                        <div className="chat-details">
                                            <h3 className="chat-user-name">{shipperName ? shipperName :
                                                <Skeleton width="150"/>}</h3>
                                            <h4>{conversation.chatID}</h4>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    <div className={`chat-messages-content ${isChatVisible ? 'active' : ''}`}>
                        <div className="shipper-chat-header">
                            <div className="shipper-carrier-chat-header">
                                <Button variant="rounded" onClick={toggleChatVisibility}>
                                    <FaArrowLeft />
                                </Button>
                                <h1 className="chat-user-name">{shipper ? shipper.userShipperName :
                                    <Skeleton width="150"/>}</h1>
                            </div>
                            {load && load.loadCarrierConfirmation === 'Confirmed' ? (
                                load.loadPaymentStatus === 'Paid' ? (
                                    <Button variant="apply-non-responsive" onClick={toggleAssignDriverPopup}>
                                        Assign Driver
                                    </Button>
                                ) : (
                                    <Button variant="wait" disabled>
                                        <RotatingLinesLoader title="Waiting for shipper payment..."/>
                                    </Button>
                                )
                            ) : (
                                <Button variant="apply-non-responsive" onClick={handleCarrierApprove}>
                                    Approve Agreement
                                </Button>
                            )}
                        </div>

                        {chatID ? (
                            <>
                                {isLoading ? (
                                    <Skeleton width={100} height={50}/>
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
                                                        backgroundColor: message.sender === 'carrierID' ? '#2527ea' : '#dfdfdf',
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
                                                                        <Skeleton width={50} height={30}/>
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
                                                                    style={{color: message.sender === 'carrierID' ? '#d3d3d3' : '#232323',}}>
                                                                    Carrier
                                                                </div>}
                                                        </div>
                                                        <div className={styles.messagesContent}
                                                             style={{color: message.sender === 'shipperID' ? 'darkgrey' : ''}}>
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
                                                <div className="chat-input-area-content">
                                                    <input
                                                        type="file"
                                                        ref={fileInputRef}
                                                        style={{display: 'none'}}
                                                        onChange={handleFileChangeForButton}
                                                        multiple
                                                    />
                                                    <Button variant="square-non-responsive"
                                                            onClick={() => fileInputRef.current.click()}>Send BOL
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

                                                </div>
                                                <div className="send-message-wrapper">
                                                    <Button
                                                        variant="attachMaterial"
                                                        onClick={() => fileInputRefChatFile.current.click()} // Trigger file input click
                                                    >
                                                        <AttachFile/>
                                                    </Button>
                                                    <Button
                                                        variant="attachMaterial"
                                                    >
                                                        <SendVoiceMessage/>
                                                    </Button><Button
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
                                    </div>
                                )
                                }
                            </>
                        ) : (
                            <p className="text-message-warning">Choose chat to start speaking with customer!</p>
                        )}
                    </div>
                </div>

            </div>

        </div>
    );
};

export default CarrierChatPage;
