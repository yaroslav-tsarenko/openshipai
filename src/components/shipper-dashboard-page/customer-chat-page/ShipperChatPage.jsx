import React, {useEffect, useState, useRef} from "react";
import "../ShipperDashboard.css";
import io from 'socket.io-client';
import {ReactComponent as UserAvatarComponent} from "../../../assets/userAvatar2.svg";
import {LiaTimesSolid} from "react-icons/lia";
import {ReactComponent as SearchBarIcon} from "../../../assets/search-bar-icon.svg";
import {ReactComponent as UserChatAvatar} from "../../../assets/userAvatar.svg";
import {ReactComponent as SendButtonIcon} from "../../../assets/send-chat-icon.svg";
import useSound from 'use-sound';
import notificationSound from '../../../assets/sound-effects/message-sent.mp3';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import {ClipLoader, FadeLoader} from "react-spinners";
import FloatingWindowSuccess from "../../floating-window-success/FloatingWindowSuccess";

const ShipperChatPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [loadConfirmation, setLoadConfirmation] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const {shipperID} = useParams();
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const minSwipeDistance = 50;
    const [selectedChatID, setSelectedChatID] = useState(null);
    const [load, setLoad] = useState(null);
    const [bids, setBids] = useState([]);
    const {chatID} = useParams();
    const [selectedBid, setSelectedBid] = useState(null);
    const [carrier, setCarrier] = useState(null);
    const [inputMessage, setInputMessage] = useState("");
    const [conversations, setConversations] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const socketRef = useRef();
    const [userName, setUserName] = useState("");
    const [shipper, setShipper] = useState("");
    const [play] = useSound(notificationSound);
    const [dealChatConversations, setDealChatConversations] = useState([]);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [showSuccessContainer, setShowSuccessContainer] = useState(false);
    const [showBOLContainer, setShowBOLContainer] = useState(false);
    const [showSuccessWindow, setShowSuccessWindow] = useState(false);
    const [isApproved, setIsApproved] = useState(false);
    const stripePromise = loadStripe('pk_test_51O5Q6UEOdY1hERYnWp8hCCQNdKR8Jiz9ZPRqy1Luk2mxqMaVTDvo6Z0FFWDhjRQc1ELOE95KIUatO2Ve4wCKKqiJ00O0f9R2eo');

    useEffect(() => {
        setShowSuccessContainer(true);
        setShowBOLContainer(true);
    }, [chatID]);

    useEffect(() => {
        const fetchLoad = async () => {
            try {
                const response = await axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-load-by-chat/${chatID}`);
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
                const response = await axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-load-confirmation-by-chat/${chatID}`);
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
    }, [chatID]);
    useEffect(() => {
        socketRef.current = io.connect('https://socket-chat-server-xly7.onrender.com');
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
            sender: 'shipperID',
        };
        socketRef.current.emit('customer message', {
            message: newMessage,
            chatID: selectedChatID,
            customer: 'shipperID'
        });
        setInputMessage('');
        setChatMessages((oldMessages) => [...oldMessages, newMessage]);
        axios.post('https://jarvis-ai-logistic-db-server.onrender.com/save-chat-message', {
            chatID: selectedChatID,
            receiver: 'carrierID',
            sender: 'shipperID',
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
        axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-bids-by-user/${shipperID}`)
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
        axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-user/${shipperID}`)
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
            axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-carrier/${selectedBid.carriershipperID}`)
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
        axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-shipper/${shipperID}`)
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
        axios.get('https://jarvis-ai-logistic-db-server.onrender.com/get-all-bids')
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
                const response = await axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-load-by-chat/${chatID}`);
                setLoad(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching load:', error);
            }
        };

        fetchLoad();
    }, [chatID]);


    useEffect(() => {
        axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/user/${shipperID}`)
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
        socketRef.current.emit('shipper approval', { message: 'Shipper approved your agreement' });
    };

    useEffect(() => {
        axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-deal-conversation-chat/${chatID}`)
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
        axios.get('https://jarvis-ai-logistic-db-server.onrender.com/get-all-deal-chat-conversations')
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
        setSelectedChatID(chatID);
        try {
            const response = await axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-deal-chat-conversation/${chatID}`);
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

    const handlePayClick = async () => {
        setIsProcessingPayment(true);
        try {
            const response = await axios.post('https://jarvis-ai-logistic-db-server.onrender.com/create-checkout-session-2', { amount: load.loadPrice * 1.03, loadType: load.loadType, description: " (Including taxes and fee)", shipperID: shipperID, chatID: chatID  });
            const sessionId = response.data.sessionId;

            const stripe = await stripePromise;
            const {error} = await stripe.redirectToCheckout({sessionId});

            if (error) {
                console.log(error);
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
        }
        setIsProcessingPayment(false);
    };

    return (
        <div className="shipper-dashboard-wrapper">
            <DashboardSidebar
                DashboardAI={{visible: true, route: `/shipper-dashboard/${shipperID}`}}
                Settings={{visible: true, route: `/shipper-settings/${shipperID}`}}
                Profile={{visible: true, route: `/shipper-profile/${shipperID}`}}
                Payments={{visible: true, route: `/shipper-payments/${shipperID}`}}
                ChatWithCarrier={{visible: true, route: `/shipper-chat-conversation/${shipperID}`}}
                MyQoutes={{visible: true, route: `/shipper-qoutes/${shipperID}`}}
                MyLoads={{visible: true, route: `/shipper-loads/${shipperID}`}}
            />
            {showSuccessWindow && <FloatingWindowSuccess text="Carrier approved your agreement. Now you need to pay to go through next steps" />}
            <div className="shipper-deal-conversations-sidebar">
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
                                <h3>Carrier Name</h3>
                                <h4>{conversation.chatID}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="shipper-dashboard-content">
                <div className="shipper-chat-header">
                    <div className="shipper-carrier-chat-header">
                        <span className="status-circle"></span>
                        <h1 className="chat-user-name">{carrier ? carrier.carrierContactCompanyName :
                            <ClipLoader color="#024ecc" loading={true} size={25}/>}</h1>
                    </div>
                    {load && load.loadCarrierConfirmation === 'Confirmed' ? (
                        load.loadPaymentStatus === 'Paid' ? (
                            load.loadDeliveredStatus === 'Delivered' ? (
                                <h4 className="load-status-delivering">Load Delivered successfully</h4>
                            ) : (
                                <button className="waiting-for-approval-button" disabled>
                                    <ClipLoader className="fade-loader" color="#cacaca" loading={true} size={15}/>
                                    Carrier assigning driver for load
                                </button>
                            )
                        ) : (
                            <button className="pay-button" onClick={handlePayClick}>
                                {isProcessingPayment ?
                                    <>
                                        <ClipLoader color="#fffff" loading={true} size={17} className="payment-loader"/>
                                        Pay
                                    </>
                                    : "Pay"
                                }
                            </button>
                        )
                    ) : !isApproved ? (
                        <button className="send-bol-button" onClick={handleApprove}>Approve Agreement</button>
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
                                <ClipLoader color="#024ecc" loading={true} size={40} className="clip-loader-style"/>
                            ) : (

                                <div className="messaging-chat-wrapper">
                                    <div className="warning-container-wrapper">
                                        {showSuccessContainer && (
                                            <div className="success-container">
                                                <div className="success-container-header">
                                                    <h2>Congrats, you have successfully submitted bid</h2>
                                                    <button className="close-warning-container-button"
                                                            onClick={() => setShowSuccessContainer(false)}>
                                                        <LiaTimesSolid/></button>
                                                </div>
                                                <div className="success-container-body">
                                                    <p>You have successfully submitted qoute, now, the rest steps you
                                                        will complete
                                                        with current carrier</p>
                                                </div>
                                            </div>
                                        )}
                                        {showBOLContainer && (
                                            <div className="bol-container">
                                                <div className="bol-container-header">
                                                    <h2>BOL document</h2>
                                                    <button className="close-warning-container-button"
                                                            onClick={() => setShowBOLContainer(false)}><LiaTimesSolid/>
                                                    </button>
                                                </div>
                                                <div className="bol-container-body">
                                                    <p>Cooperation with this carrier requires to sign a provided by
                                                        carrier BOL
                                                        Document, after successful sign you will be able to complete
                                                        next staps

                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

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
                                                                        <ClipLoader color="#024ec9" loading={true}
                                                                                    size={25}/>}</p> :
                                                                    <p style={{color: "darkgrey"}}>{carrier ? carrier.carrierContactCompanyName :
                                                                        <ClipLoader color="#024ec9" loading={true}
                                                                                    size={25}/>}</p>}
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
                                                    {message.text}
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
                                            {/*  <AttachCamera className="chat-input-icons"/>
                                <AttachImage className="chat-input-icons"/>
                                <AttachFile className="chat-input-icons"/>*/}
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
    );
};

export default ShipperChatPage;
