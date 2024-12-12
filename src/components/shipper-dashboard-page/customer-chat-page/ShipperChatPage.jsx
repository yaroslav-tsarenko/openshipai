import React, {useEffect, useState, useRef} from "react";
import "../ShipperDashboard.css";
import io from 'socket.io-client';
import {ReactComponent as UserAvatarComponent} from "../../../assets/userAvatar2.svg";
import {ReactComponent as SearchBarIcon} from "../../../assets/search-bar-icon.svg";
import {ReactComponent as UserChatAvatar} from "../../../assets/userAvatar.svg";
import {ReactComponent as SendButtonIcon} from "../../../assets/send-chat-icon.svg";
import {ReactComponent as AttachFile} from "../../../assets/skrepka-icon.svg";
import {ReactComponent as SendVoiceMessage} from "../../../assets/mic-chat-icon.svg";
import {useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import styles from "./ShipperChatPage.module.scss";
import {loadStripe} from '@stripe/stripe-js';
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import {ClipLoader} from "react-spinners";
import Alert from "../../floating-window-success/Alert";
import {BACKEND_URL} from "../../../constants/constants";
import {SOCKET_URL} from "../../../constants/constants";
import Button from "../../button/Button";
import {Skeleton} from "@mui/material";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import RotatingLinesLoader from "../../rotating-lines/RotatingLinesLoader";

const ShipperChatPage = () => {
    const [ setIsSidebarOpen] = useState(true);
    const [ setLoadConfirmation] = useState(null);
    const [ setUser] = useState(null);
    const navigate = useNavigate();
    const {shipperID} = useParams();
    const [touchStart] = useState(null);
    const [touchEnd] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const minSwipeDistance = 50;
    const [selectedChatID, setSelectedChatID] = useState(null);
    const [load, setLoad] = useState(null);
    const [ setBids] = useState([]);
    const {chatID} = useParams();
    const [selectedBid] = useState(null);
    const [carrier, setCarrier] = useState(null);
    const [inputMessage, setInputMessage] = useState("");
    const [conversations, setConversations] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const socketRef = useRef();
    const [shipper, setShipper] = useState("");
    const [setSelectedCard] = useState(null);
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [cardData, setCardData] = useState({
        cardNumber: '',
        cardLastNameFirstName: '',
        expirationDate: '',
        cvv: ''
    });
    const [ setDealChatConversations] = useState([]);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [ setShowSuccessContainer] = useState(false);
    const [ setShowBOLContainer] = useState(false);
    const [showSuccessWindow, setShowSuccessWindow] = useState(false);
    const [isApproved, setIsApproved] = useState(false);
    const stripePromise = loadStripe('pk_live_51OpgSNJyJQMrMLmUKYcZUuTAZjBS34yI30KVPevbM974WZd25lNOskkoTqMzt1ZjASYA1NKgcN02ONX469pOjWlR00yn6CSBN3');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [filePreviews, setFilePreviews] = useState([]);
    const fileInputRef = useRef(null); // Reference to the hidden file input
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [shipperInfo, setShipperInfo] = useState(null);

    const handleBackToConversations = () => {
        setIsChatVisible(false);
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/get-current-user/shipper/${shipperID}`);
                const data = await response.json();

                setShipperInfo(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getUser();
    }, [shipperInfo, shipperID]);

    useEffect(() => {
        if (shipperInfo && shipperInfo.userShipperAvatar) {
            const avatarUrl = `${BACKEND_URL}/${shipperInfo.userShipperAvatar}`;
            axios.get(avatarUrl)
                .then(() => {
                    setPreviewSavedImage(avatarUrl);
                })
                .catch(() => {
                    console.error('Image does not exist');
                });
        }
    }, [shipperID]);

    useEffect(() => {
        const getAvatar = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-shipper-avatar/${shipperID}`);
                if (response.data.userShipperAvatar) {
                    setPreviewSavedImage(`${BACKEND_URL}/${response.data.userShipperAvatar}`);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getAvatar();
    }, [shipperID]);

    useEffect(() => {
        setShowSuccessContainer(true);
        setShowBOLContainer(true);
    }, [chatID]);

    useEffect(() => {
        const fetchLoad = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-load-by-chat/${chatID}`);
                setLoad(response.data);
            } catch (error) {
                console.error('Error fetching load:', error);
            }
        };

        fetchLoad();
    }, []);

    useEffect(() => {
        const fetchLoadConfirmation = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-load-confirmation-by-chat/${chatID}`);
                setLoadConfirmation(response.data.loadCarrierConfirmation);
                console.log(response.data.loadCarrierConfirmation);
            } catch (error) {
                console.error('Error fetching load confirmation:', error);
            }
        };

        fetchLoadConfirmation();
    }, [chatID]);

    useEffect(() => {
        const fetchDealChatConversations = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-all-deal-chat-conversations`);
                const allDealChatConversations = response.data;
                const filteredDealChatConversations = allDealChatConversations.filter(conversation => conversation.chatID === chatID);
                setDealChatConversations(filteredDealChatConversations);
            } catch (error) {
                console.error('Error fetching deal chat conversations:', error);
            }
        };
        fetchDealChatConversations();

    }, [chatID]);

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


    useEffect(() => {
        const fetchCarrier = async () => {
            try {
                const dealChatConversationResponse = await axios.get(`${BACKEND_URL}/get-deal-chat-conversation/${chatID}`);
                const dealChatConversation = dealChatConversationResponse.data;

                const carrierResponse = await axios.get(`${BACKEND_URL}/get-carrier/${dealChatConversation.carrierID}`);
                const carrier = carrierResponse.data;

                setCarrier(carrier);
            } catch (error) {
                console.error('Failed to fetch carrier:', error);
            }
        };

        fetchCarrier();
    }, [chatID]);

    useEffect(() => {
    }, [chatID]);
    useEffect(() => {
        socketRef.current = io.connect(`${SOCKET_URL}`);
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
        axios.get(`${BACKEND_URL}/deal-conversation-messages-history/${chatID}`)
            .then(response => {
                setChatMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching chat messages:', error);
            });
    }, [chatID]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/deal-conversation-messages-history/${selectedChatID}`)
            .then(response => {
                setChatMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching chat messages:', error);
            });
    }, [selectedChatID]);

    const sendMessage = async (message) => {
        let fileUrls = [];

        if (selectedFiles.length > 0) {
            fileUrls = await uploadFiles(); // Upload files and get URLs
        }

        const newMessage = {
            text: message,
            date: new Date(),
            sender: 'shipperID',
            files: fileUrls, // Include file URLs
        };

        setInputMessage('');
        setSelectedFiles([]);
        setFilePreviews([]);

        socketRef.current.emit('customer message', {
            message: newMessage,
            chatID: selectedChatID,
            customer: 'shipperID'
        });

        setChatMessages((oldMessages) => [...oldMessages, newMessage]);

        axios.post(`${BACKEND_URL}/save-chat-message`, {
            chatID: selectedChatID,
            receiver: 'carrierID',
            sender: 'shipperID',
            text: message,
            date: new Date(),
            files: fileUrls, // Include file URLs
        })
            .catch(error => {
                console.error('Error saving chat message:', error);
            });
    };


    useEffect(() => {
        axios.get(`${BACKEND_URL}/get-chat-history/${chatID}`)
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
        axios.get(`${BACKEND_URL}/get-all-deal-chat-conversations/${shipperID}`)
            .then(response => {
                setConversations(response.data);
            })
            .catch(error => {
                console.error('Error fetching conversations:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/get-bids-by-user/${shipperID}`)
            .then(response => {
                const bids = response.data;
                setBids(bids);
                console.log(bids);
            })
            .catch(error => {
                console.error('Error fetching bids:', error);
            });
    }, [shipperID]);


    useEffect(() => {
        axios.get(`${BACKEND_URL}/get-user/${shipperID}`)
            .then(response => {
                if (response.data && response.status === 200) {
                    setUser(response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [shipperID]);
    useEffect(() => {
        if (selectedBid && selectedBid.carriershipperID) {
            axios.get(`${BACKEND_URL}/get-carrier/${selectedBid.carriershipperID}`)
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

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);

        const previews = files.map(file => {
            return URL.createObjectURL(file);
        });
        setFilePreviews(previews);
    };


    useEffect(() => {
        const fetchChatMessages = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-chat-messages/${chatID}`);
                setChatMessages(response.data);
                const chatConversationResponse = await axios.get(`${BACKEND_URL}/get-user/${chatID}`);
                const carrierID = chatConversationResponse.data.carrierID;
                const carrierResponse = await axios.get(`${BACKEND_URL}/get-carrier/${carrierID}`);
                setCarrier(carrierResponse.data);
            } catch (error) {
                console.error('Error fetching chat messages:', error);
            }
        };

        fetchChatMessages();
    }, [chatID]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/get-shipper/${shipperID}`)
            .then(response => {
                if (response.data && response.status === 200) {
                    setShipper(response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching shipper data:', error);
            });
    }, [shipperID]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/get-all-bids`)
            .then(response => {
                setBids(response.data);
            })
            .catch(error => {
                console.error('Error fetching bids:', error);
            });
    }, []);

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
        axios.get(`${BACKEND_URL}/user/${shipperID}`)
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

    const handleApprove = async () => {
        setIsApproved(true);
        socketRef.current.emit('shipper approval', {message: 'Shipper approved your agreement'});
    };

    useEffect(() => {
        axios.get(`${BACKEND_URL}/get-deal-conversation-chat/${chatID}`)
            .then(response => {
                if (response.data && response.status === 200) {
                    setCarrier(response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching carrier data:', error);
            });
    }, [chatID]);


    useEffect(() => {
        axios.get(`${BACKEND_URL}/get-all-deal-chat-conversations`)
            .then(response => {
                const sortedConversations = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setConversations(sortedConversations);
                if (sortedConversations.length > 0) {
                    handleChatSelection(sortedConversations[sortedConversations.length - 1].chatID);
                }
            })
            .catch(error => {
                console.error('Error fetching conversations:', error);
            });
    }, []);

    const handleChatSelection = async (chatID) => {
        setIsLoading(true);
        setIsChatVisible(true);
        setSelectedChatID(chatID);
        try {
            const response = await axios.get(`${BACKEND_URL}/get-deal-chat-conversation/${chatID}`);
            if (response.status === 200) {
                console.log(response.data);
                navigate(`/customer-deal-chat-conversation/${shipperID}/${chatID}`);
            } else {
                console.error('Error fetching chat data:', response);
            }
        } catch (error) {
            console.error('Error fetching chat data:', error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        socketRef.current.on('carrier approval', (data) => {
            setShowSuccessWindow(true);
            if (setShowSuccessWindow(true)) {
                window.location.reload();
            }
            if (chatID === selectedChatID) {
                window.location.reload();
            }
            setShowSuccessWindow(true);
        });

        return () => {
            socketRef.current.off('carrier approval');
        };
    }, [selectedChatID]);

    useEffect(() => {
        const fetchSelectedCard = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-selected-card/${shipperID}`);
                const card = response.data.card;
                setCardData({
                    cardNumber: card.cardNumber,
                    cardLastNameFirstName: card.cardLastNameFirstName,
                    expirationDate: card.expirationDate,
                    cvv: card.cvv
                });
                if (response.data.status === 'Success') {
                    setSelectedCard(response.data.card);
                    console.log(cardData);
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error('Error fetching selected card:', error);
            }
        };


        fetchSelectedCard();
    }, [shipperID]);


    const handlePayClick = async () => {
        setIsProcessingPayment(true);
        try {
            console.log('Creating checkout session with data:', {
                amount: load.loadPrice * 1.03,
                loadType: load.loadType,
                description: " (Including taxes and fee)",
                shipperID: shipperID,
                chatID: chatID,
            });

            const response = await axios.post(`${BACKEND_URL}/create-checkout-session-2`, {
                amount: load.loadPrice * 1.03,
                loadType: load.loadType,
                description: " (Including taxes and fee)",
                shipperID: shipperID,
                chatID: chatID,
            });

            const sessionId = response.data.sessionId;
            console.log('Checkout session created:', sessionId);

            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({ sessionId });
            if (error) {
                console.log('Stripe redirect error:', error);
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
        }
        setIsProcessingPayment(false);
    };

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredConversations = conversations.filter(conversation =>
            conversation.chatID.toLowerCase().includes(searchTerm)
        );
        setConversations(filteredConversations);
    };


    return (
        <>
            {showSuccessWindow &&
                <Alert status="success"
                       text="Carrier approved your agreement. Now you need to pay to go through next steps"/>}
            <div className="shipper-dashboard-wrapper">
                <DashboardSidebar
                    DashboardAI={{visible: true, route: `/shipper-dashboard/${shipperID}`}}
                    Settings={{visible: true, route: `/shipper-settings/${shipperID}`}}
                    Payments={{visible: true, route: `/shipper-payments/${shipperID}`}}
                    ChatWithCarrier={{visible: true, route: `/shipper-chat-conversation/${shipperID}`}}
                    MyLoads={{visible: true, route: `/shipper-loads/${shipperID}`}}
                    isMobileSidebarOpen={isMobileSidebarOpen} toggleMobileSidebar={toggleMobileSidebar}
                />
                <div className="shipper-dashboard-content">
                    <HeaderDashboard
                        contentTitle={shipperInfo ?
                            <>Welcome back, {shipperInfo.userShipperName}!</> :
                            <Skeleton variant="text" width={250}/>}
                        contentSubtitle="Monitor payments, loads, revenues"
                        accountName={shipperInfo ? shipperInfo.userShipperName : <Skeleton variant="text" width={60}/>}
                        accountRole={shipperInfo ? shipperInfo.userShipperRole : <Skeleton variant="text" width={40}/>}
                        profileLink={`/shipper-profile/${shipperID}`}
                        bellLink={`/shipper-settings/${shipperID}`}
                        settingsLink={`/shipper-profile/${shipperID}`}
                        avatar={previewSavedImage ? previewSavedImage : previewSavedImage}
                        onBurgerClick={toggleMobileSidebar}
                    />
                    <div className="chat-content">

                        <div className={`shipper-deal-conversations-sidebar ${isChatVisible ? 'hidden' : ''}`}>
                            <div className="chat-conversation-search-bar">
                                <SearchBarIcon width="15"/>
                                <input
                                    type="text"
                                    placeholder="Search chat by load ID..."
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <h3 className="messages-label">Messages</h3>
                            <div className="chat-id-containers-wrapper">
                                {conversations.map((conversation, index) => (
                                    <div key={index} className="chat-id-container"
                                         onClick={() => handleChatSelection(conversation.chatID)}>
                                        <UserChatAvatar className="user-avatar-chat"/>
                                        <div className="chat-details">
                                            <h3>Shipper Name</h3>
                                            <p>{conversation.chatID}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={`chat-messages-content ${isChatVisible ? 'active' : ''}`}>
                         {/*   <button className="go-to-chats-button" onClick={handleBackToConversations}>
                                <FaArrowLeft/>
                            </button>*/}
                            <div className="shipper-chat-header">
                            <div className="shipper-carrier-chat-header">
                                    <span className="status-circle"></span>
                                    <h1 className="chat-user-name">
                                        <Skeleton width={200} height={45}/>
                                    </h1>
                                </div>
                                {load && load.loadCarrierConfirmation === 'Confirmed' ? (
                                    load.loadPaymentStatus === 'Paid' ? (
                                        load.loadDeliveredStatus === 'Delivered' ? (
                                            <h4 className="load-status-delivering">Load Delivered successfully</h4>
                                        ) : (
                                            <button className="waiting-for-approval-button" disabled>
                                                <RotatingLinesLoader title="Carrier assigning driver for load..."/>
                                            </button>
                                        )
                                    ) : (
                                        <button className="pay-button" onClick={handlePayClick}>
                                            {isProcessingPayment ?
                                                <>
                                                    <RotatingLinesLoader title="Processing..."/>
                                                </>
                                                : "Pay"
                                            }
                                        </button>
                                    )
                                ) : !isApproved ? (
                                    <button className="send-bol-button" onClick={handleApprove}>Approve
                                        Agreement</button>
                                ) : (
                                    <button className="waiting-for-approval-button" disabled>
                                        <ClipLoader className="fade-loader" color="#cacaca" loading={true} size={15}/>
                                        Waiting for Carrier's approval
                                    </button>
                                )}
                            </div>
                            {chatID ? (
                                <>
                                    {isLoading ? (
                                        <>
                                        </>
                                    ) : (
                                        <div className="messaging-chat-wrapper">

                                            <div className="chat-messages">
                                                {chatMessages.map((message, index) => (
                                                    <div key={index} style={{
                                                        display: 'flex',
                                                        justifyContent: message.sender === 'shipperID' ? 'flex-end' : 'flex-start'
                                                    }}>
                                                        {message.sender !== 'shipperID' && <UserAvatarComponent/>}
                                                        <div style={{
                                                            backgroundColor: message.sender === 'shipperID' ? '#0084FF' : '#F3F3F3',
                                                            color: message.sender === 'shipperID' ? '#ffffff' : '#707070',
                                                            alignItems: 'start',
                                                            textAlign: 'left',
                                                            fontSize: '1.3rem',
                                                            padding: '10px',
                                                            maxWidth: '200px',
                                                            width: '100%',
                                                            borderRadius: '10px',
                                                            borderTopRightRadius: message.sender === 'shipperID' ? '0' : '10px',
                                                            borderTopLeftRadius: message.sender !== 'shipperID' ? '0' : '10px',
                                                            margin: '10px'
                                                        }}>
                                                            <div className="user-role-name">
                                                                {message.sender === 'carrierID' &&
                                                                    <div style={{
                                                                        display: "flex",
                                                                        justifyContent: "space-between"
                                                                    }}>
                                                                        {carrier ?
                                                                            <p style={{color: "darkgrey"}}>{carrier ? carrier.carrierContactCompanyName :
                                                                                <Skeleton width={55} height={25} />}</p> :
                                                                            <p style={{color: "darkgrey"}}>{carrier ? carrier.carrierContactCompanyName :
                                                                                <Skeleton width={55} height={25}/>}</p>}
                                                                        {message.sender !== 'shipperID' &&
                                                                            <div
                                                                                style={{color: "darkgrey"}}>Carrier</div>}
                                                                    </div>}
                                                            </div>
                                                            <div className="user-role-name">
                                                                {message.sender === 'shipperID' &&
                                                                    <div style={{
                                                                        display: "flex",
                                                                        justifyContent: "space-between"
                                                                    }}>{shipper ?
                                                                        <p style={{color: "#bfbfbf"}}>{shipper.userShipperName}</p> :
                                                                        <p>Loading...</p>}
                                                                        {message.sender === 'shipperID' &&
                                                                            <div
                                                                                style={{color: "#bfbfbf"}}>Shipper</div>}
                                                                    </div>}
                                                            </div>
                                                            <div className={styles.messagesContent}>
                                                                <div
                                                                    style={{color: message.sender === 'carrierID' ? '#616161' : 'inherit'}}>
                                                                    {message.text}
                                                                </div>
                                                                {message.files && message.files.map((fileUrl, idx) => (
                                                                    <img key={idx} src={fileUrl} alt="Attachment"
                                                                         style={{
                                                                             width: '120px',
                                                                             height: '80px',
                                                                             objectFit: 'cover',
                                                                             borderRadius: '10px'
                                                                         }}/>
                                                                ))}
                                                            </div>

                                                            <div style={{
                                                                color: message.sender === 'shipperID' ? 'white' : 'darkgrey',
                                                                alignItems: 'end',
                                                                textAlign: 'end',
                                                            }}
                                                            >{new Date(message.date).toLocaleTimeString([], {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                                hour12: false
                                                            })}</div>
                                                        </div>
                                                        {message.sender === 'shipperID' && <UserAvatarComponent/>}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="chat-input-area-wrapper">
                                                <div className="images-preview-wrapper">
                                                    {filePreviews.map((url, index) => (
                                                        <img key={index} className="file-image-preview" src={url}
                                                             alt="Preview" style={{
                                                            width: '120px',
                                                            height: '80px',
                                                            borderRadius: '10px'
                                                        }}/>
                                                    ))}
                                                </div>

                                                <div className="chat-input-area">
                                                    <Button
                                                        variant="attachMaterial"
                                                        onClick={() => fileInputRef.current.click()} // Trigger file input click
                                                    >
                                                        <AttachFile/>
                                                    </Button>

                                                    <input
                                                        type="text"
                                                        className="chat-input"
                                                        placeholder="Type your message here..."
                                                        value={inputMessage}
                                                        onChange={e => setInputMessage(e.target.value)}
                                                        onKeyDown={handleKeyDown}
                                                    />
                                                    {/*
                                                <AttachCamera className="chat-input-icons"/>
                                                <AttachImage className="chat-input-icons"/>

                                                */}
                                                    <input
                                                        type="file"
                                                        ref={fileInputRef}
                                                        style={{display: 'none'}}
                                                        onChange={handleFileChange}
                                                        multiple
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
                                    <p>Choose chat to start speaking with carrier!👋</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>


            </div>

        </>
    );
};

export default ShipperChatPage;
