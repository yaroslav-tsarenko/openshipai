import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './OpenShipAIChat.css';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as FaMic } from "../../assets/mic-icon.svg";
import { ReactComponent as FaSend } from "../../assets/send-icon.svg";
import { ReactComponent as FaPicture } from "../../assets/image-icon.svg";
import { ReactComponent as PlusIcon } from "../../assets/plus-blue-icon.svg";
import { ReactComponent as BarsIcon } from "../../assets/fa-bars-icon.svg";
import { ReactComponent as TimesIcon } from "../../assets/fa-times-icon.svg";
import { ASSISTANT_URL, BACKEND_URL } from "../../constants/constants";
import { ReactComponent as DefaultUserAvatar } from "../../assets/default-avatar.svg";
import { ReactComponent as AIStar } from "../../assets/stars-svg.svg";
import Typewriter from "typewriter-effect";
import Recorder from 'recorder-js';
import {Bars} from "react-loader-spinner";

const OpenShipAIChat = ({ userID, userRole }) => {
    const { shipperID, aiChatID } = useParams();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatWindowRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [shipperInfo, setShipperInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [inputSetByButton, setInputSetByButton] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [randomQuestions, setRandomQuestions] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [chatSessions, setChatSessions] = useState([]);
    const [recording, setRecording] = useState(false);
    const [recorder, setRecorder] = useState(null);
    const [audioURL, setAudioURL] = useState(null);
    const [volumeBars, setVolumeBars] = useState([]);

    function generateChatID() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 32; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const addChatSession = async () => {
        const chatID = generateChatID();
        const userID = shipperID;

        try {
            const response = await axios.post(`${ASSISTANT_URL}/create-ai-chat`, { aiChatID: chatID, userID });
            const nextSessionNumber = chatSessions.length + 1;
            setChatSessions([...chatSessions, { aiChatID: chatID, name: `Chat Session ${nextSessionNumber}`, ...response.data }]);
            navigate(`/shipper-dashboard/${shipperID}/${chatID}`);
        } catch (error) {
            console.error('Error creating AIChat entity', error);
        }
    };

    const handleChatSessionClick = (aiChatID) => {
        navigate(`/shipper-dashboard/${shipperID}/${aiChatID}`);
    };

    const questions = [
        { text: "What's Logistics", value: "What's Logistics" },
        { text: "My profile", value: "My profile" },
        { text: "Carriers and shippers", value: "Carriers and shippers" },
        { text: "Creating a load", value: "Creating a load" },
        { text: "Track a shipment", value: "Track a shipment" },
        { text: "Cost of shipping", value: "Cost of shipping" },
        { text: "Best shipping method", value: "Best shipping method" },
        { text: "Reduce transport cost", value: "Reduce transport cost" },
        { text: "Insurance for cargo", value: "Insurance for cargo" },
        { text: "Customs clearance", value: "Customs clearance" },
        { text: "Packaging for safety", value: "Packaging for safety" },
        { text: "Container sizes", value: "Container sizes" },
        { text: "Prohibited items", value: "Prohibited items" },
        { text: "Calculate weight", value: "Calculate weight" },
        { text: "Vehicle load limits", value: "Vehicle load limits" },
        { text: "Types of carriers", value: "Types of carrier?" },
        { text: "Choosing a carrier", value: "Choosing a carrier" },
        { text: "Shipment tracking", value: "Shipment tracking" },
        { text: "Freight classes", value: "Freight classes" },
        { text: "Load boards", value: "Load boards" }
    ];

    function getRandomQuestions(questions, count) {
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    useEffect(() => {
        setRandomQuestions(getRandomQuestions(questions, 4));
    }, []);

    useEffect(() => {
        if (shipperInfo && shipperInfo.userShipperAvatar) {
            setLoading(true);
            const avatarUrl = `${BACKEND_URL}/${shipperInfo.userShipperAvatar}`;

            axios.get(avatarUrl)
                .then(() => {
                    setPreviewSavedImage(avatarUrl);
                    setLoading(false);
                })
                .catch(() => {
                    console.error('Image does not exist');
                    setLoading(false);
                });
        }
    }, [shipperInfo]);

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
        const fetchAIChats = async () => {
            try {
                const response = await axios.get(`${ASSISTANT_URL}/get-ai-chats/${shipperID}`);
                const sortedChats = response.data.sort((a, b) => {
                    return new Date(a.createdAt) - new Date(b.createdAt);
                });
                const namedChats = sortedChats.map((chat, index) => ({
                    ...chat,
                    aiChatID: chat.aiChatID,
                    name: `Chat Session ${index + 1}`,
                }));
                setChatSessions(namedChats);
            } catch (error) {
                console.error('Error fetching AI Chats', error);
            }
        };

        fetchAIChats();
    }, [shipperID]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${ASSISTANT_URL}/get-messages/${aiChatID}`);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages', error);
            }
        };

        if (aiChatID) {
            fetchMessages();
        }
    }, [aiChatID]);

    const handleSendMessage = async () => {
        if (input.trim() || selectedImage || audioURL) {
            if (!hasStarted) setHasStarted(true);
            const userMessage = { sender: 'user', content: input };
            setMessages([...messages, userMessage]);
            setInput('');
            setIsTyping(true);

            let imageUrl = null;
            let audioUrl = null;
            if (selectedImage) {
                const formData = new FormData();
                formData.append('file', selectedImage);

                try {
                    const uploadResponse = await axios.post(`${ASSISTANT_URL}/api/upload-image`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    imageUrl = uploadResponse.data.imageUrl;
                    userMessage.content = (
                        <div>
                            {userMessage.content} <img src={imageUrl} alt="uploaded" style={{ height: '60px' }} />
                        </div>
                    );
                } catch (error) {
                    console.error('Error uploading image', error);
                }

                setSelectedImage(null);
            }

            if (audioURL) {
                const audioFormData = new FormData();
                audioFormData.append('file', audioURL);

                try {
                    const uploadResponse = await axios.post(`${ASSISTANT_URL}/api/upload-audio`, audioFormData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    audioUrl = uploadResponse.data.audioUrl;
                    userMessage.content = (
                        <div>
                            {userMessage.content} <audio controls src={audioUrl}></audio>
                        </div>
                    );
                } catch (error) {
                    console.error('Error uploading audio', error);
                }

                setAudioURL(null);
            }

            const messageData = { aiChatID: aiChatID, sender: 'user', content: userMessage.content, imageUrl, audioUrl };
            try {
                await axios.post(`${ASSISTANT_URL}/save-message`, messageData);
            } catch (error) {
                console.error('Error saving message', error);
            }

            try {
                const response = await axios.post(`${ASSISTANT_URL}/api/chat`, {
                    message: input,
                    imageUrl,
                    audioUrl
                });

                const aiMessage = { sender: 'assistant', content: response.data.message };
                setMessages((prevMessages) => [...prevMessages, aiMessage]);

                const aiMessageData = { aiChatID: aiChatID, sender: 'assistant', content: response.data.message };
                try {
                    await axios.post(`${ASSISTANT_URL}/save-message`, aiMessageData);
                } catch (error) {
                    console.error('Error saving AI message', error);
                }
            } catch (error) {
                console.error('Error sending message', error);
            } finally {
                setIsTyping(false);
            }
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
            event.preventDefault();
        }
    };

    const handleSetInputValue = (value) => {
        setInput(value);
        setInputSetByButton(true);
    };

    useEffect(() => {
        if (inputSetByButton) {
            handleSendMessage();
            setInputSetByButton(false);
        }
    }, [input, inputSetByButton]);

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(event.target.files[0]);
        }
    };

    const handleMicDown = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const recorder = new Recorder(audioContext, {
                onAnalysed: (data) => {
                    // Ensure data is an array before setting it to volumeBars
                    if (Array.isArray(data)) {
                        setVolumeBars(data);
                    } else {
                        console.error('Expected an array for volumeBars, received:', data);
                        setVolumeBars([]); // Reset to empty array if data is not an array
                    }
                }
            });
            recorder.init(stream);
            recorder.start();
            setRecorder(recorder);
            setRecording(true);
        }
    };

    const handleMicUp = async () => {
        if (recorder) {
            const { blob } = await recorder.stop();
            const audioUrl = URL.createObjectURL(blob);
            setAudioURL(blob);
            setRecorder(null);
            setRecording(false);
            handleSendMessage();
        }
    };

    return (
        <div className="chat-container-wrapper">
            <div className={`chat-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="chat-sidebar-header">
                    <h3>OpenShipAI</h3>
                    <button className="add-chat-button" onClick={addChatSession}>
                        <PlusIcon />
                    </button>
                </div>
                <div className="chat-sidebar-content">
                    {chatSessions.length > 0 ? (
                        chatSessions.map((session, index) => (
                            <div key={index} className="chat-session-container" onClick={() => handleChatSessionClick(session.aiChatID)}>
                                {session.name}
                            </div>
                        ))
                    ) : (
                        <p>Your list of chat history is empty</p>
                    )}
                </div>
                <div className="chat-sidebar-footer">
                    <p>High powered AI model. Developed by openship.ai All rights are reserved</p>
                </div>
            </div>
            <button className="burger-button" onClick={toggleSidebar}>
                {isSidebarOpen ?
                    <button className="times-close-sidebar-button">
                        <TimesIcon />
                    </button>
                    :
                    <button className="bars-open-sidebar-button">
                        <BarsIcon />
                    </button>}
            </button>
            <div className="chat-container">
                {hasStarted ? (
                    <div className="chat-window" ref={chatWindowRef}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.sender} appear`}>
                                <div className={`avatar ${msg.sender}-avatar`}>
                                    {msg.sender === 'user' && shipperInfo?.userShipperAvatar ? (
                                        <img src={previewSavedImage ? previewSavedImage : DefaultUserAvatar} alt="User Avatar" className="user-avatar" />
                                    ) : null}
                                </div>
                                <div className="message-content">
                                    <div className="message-label">{msg.sender === 'user' ? 'You' : 'Openship AI'}</div>
                                    {typeof msg.content === 'string' ? msg.content : msg.content}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="chat-message assistant appear">
                                <div className="avatar assistant-avatar"></div>
                                <div className="message-content typing-indicator">
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="chat-starting-screen">
                        <div className="greeting-wrapper">
                            <h1 className="greeting">Hello, John</h1>
                            <span className="greeting-subtitle">
                                <Typewriter
                                    options={{
                                        strings: ["How can I help you today?"],
                                        autoStart: true,
                                        loop: true,
                                        pauseFor: 4500,
                                    }}
                                />
                            </span>
                        </div>
                        <div className="question-buttons">
                            {randomQuestions.map((question, index) => (
                                <section key={index}>
                                    <button onClick={() => handleSetInputValue(question.value)}>
                                        <AIStar className="stars-chat-icon" /> {question.text}
                                    </button>
                                </section>
                            ))}
                        </div>
                    </div>
                )}
                <div className="input-container-wrapper">
                    {selectedImage && (
                        <div>
                            <img className="image-preview" src={URL.createObjectURL(selectedImage)} alt="Selected"/>
                        </div>
                    )}
                    {recording && (
                        <div className="recording-indicator">
                            <span>
                                <Bars
                                    height="40"
                                    width="40"
                                    color="#015ff8"
                                    ariaLabel="bars-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                   className="bars-loader"
                                />
                            </span>
                            <div className="volume-bars">
                                {volumeBars.map((bar, index) => (
                                    <div key={index} style={{ height: `${bar * 100}%` }} className="volume-bar"></div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="input-container">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Enter prompt here..."
                        />
                        <input
                            type="file"
                            id="file-input"
                            style={{display: 'none'}}
                            onChange={handleImageChange}
                        />
                        <button onClick={() => document.getElementById('file-input').click()}><FaPicture
                            className="ai-chat-input-icons"/></button>
                        <button onMouseDown={handleMicDown} onMouseUp={handleMicUp}><FaMic className="ai-chat-input-icons"/></button>
                        <button onClick={handleSendMessage}><FaSend className="ai-chat-input-icons"/></button>
                    </div>
                </div>
                <p className="info">
                    OpenShip AI may display inaccurate info, including about people, so double-check its response.
                    <a href="">
                        Your privacy & Openship
                    </a>
                </p>
            </div>
        </div>
    );
};

export default OpenShipAIChat;
