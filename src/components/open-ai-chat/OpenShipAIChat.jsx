import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './OpenShipAIChat.css';
import { useParams } from 'react-router-dom';
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

const OpenShipAIChat = ({ userID, userRole }) => {
    const { shipperID } = useParams();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatWindowRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [shipperInfo, setShipperInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [inputSetByButton, setInputSetByButton] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [randomQuestions, setRandomQuestions] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

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

    const handleSendMessage = async () => {
        if (input.trim() || selectedImage) {
            if (!hasStarted) setHasStarted(true); // Change state to start chat
            const userMessage = { role: 'user', content: input };
            setMessages([...messages, userMessage]);
            setInput('');
            setIsTyping(true);

            if (selectedImage) {
                const formData = new FormData();
                formData.append('file', selectedImage);

                try {
                    const uploadResponse = await axios.post(`${ASSISTANT_URL}/api/upload-image`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    userMessage.content = `${userMessage.content} (Image: ${uploadResponse.data.imageUrl})`;
                } catch (error) {
                    console.error('Error uploading image', error);
                }

                setSelectedImage(null);
            }

            try {
                const response = await axios.post(`${ASSISTANT_URL}/api/chat`, {
                    message: input,
                    imageUrl: selectedImage ? selectedImage.name : null
                });

                const aiMessage = { role: 'assistant', content: response.data.message };
                setMessages((prevMessages) => [...prevMessages, aiMessage]);
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
            event.preventDefault(); // Prevent the default action to avoid form submission or newline in textarea
        }
    };

    const handleSetInputValue = (value) => {
        setInput(value);
        setInputSetByButton(true); // Indicate that the input was set by a button click
    };

    useEffect(() => {
        if (inputSetByButton) {
            handleSendMessage();
            setInputSetByButton(false); // Reset the flag after sending the message
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

    return (
        <div className="chat-container-wrapper">
            <div className={`chat-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="chat-sidebar-header">
                    <h3>OpenShipAI</h3>
                    <button className="add-chat-button">
                        <PlusIcon />
                    </button>
                </div>
                <div className="chat-sidebar-content">
                    <p>
                        Current your list of chat history is empty
                    </p>
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
                            <div key={index} className={`chat-message ${msg.role} appear`}>
                                <div className={`avatar ${msg.role}-avatar`}>
                                    {msg.role === 'user' && shipperInfo?.userShipperAvatar ? (
                                        <img src={previewSavedImage ? previewSavedImage : DefaultUserAvatar} alt="User Avatar" className="user-avatar" />
                                    ) : null}
                                </div>
                                <div className="message-content">
                                    <div className="message-label">{msg.role === 'user' ? 'You' : 'Openship AI'}</div>
                                    {msg.content}
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
                <div className="input-container">
                    {selectedImage && (
                        <div className="image-preview">
                            <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ height: '50px' }} />
                        </div>
                    )}
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
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                    <button onClick={() => document.getElementById('file-input').click()}><FaPicture className="ai-chat-input-icons" /></button>
                    <button onClick={handleSendMessage}><FaMic className="ai-chat-input-icons" /></button>
                    <button onClick={handleSendMessage}><FaSend className="ai-chat-input-icons" /></button>
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
