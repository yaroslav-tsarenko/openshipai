import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import './OpenShipAIChat.css';
import {FaTimes} from "react-icons/fa";
import {RxHamburgerMenu} from "react-icons/rx";
import {GoPlusCircle} from "react-icons/go";

const OpenShipAIChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatWindowRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSendMessage = async () => {
        if (input.trim()) {
            const userMessage = {role: 'user', content: input};
            setMessages([...messages, userMessage]);
            setInput('');
            setIsTyping(true);

            try {
                const response = await axios.post('http://localhost:7777/api/chat', {
                    message: input,
                });

                const aiMessage = {role: 'assistant', content: response.data.message};
                setMessages((prevMessages) => [...prevMessages, aiMessage]);
            } catch (error) {
                console.error('Error sending message', error);
            } finally {
                setIsTyping(false);
            }
        }
    };

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const toggleSidebar = () => {
        if (!isSidebarOpen) {
            setIsSidebarOpen(true);
        } else {
            // First make it invisible and unclickable
            setIsSidebarOpen(false);
            // Delay width adjustment after it becomes invisible
            setTimeout(() => {
                // Additional logic if needed after closing
            }, 300); // Matches the duration of the visibility and opacity transitions
        }
    };

    return (
        <div className="chat-container-wrapper">

            <div className={`chat-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="chat-sidebar-header">
                    <h3>OpenShip AI Chat</h3>
                    <GoPlusCircle color="#0000FF"/>
                </div>
                <div className="chat-sidebar-content">

                </div>
                <div className="chat-sidebar-footer">
                    <p>High powered AI model. Developed by openship.ai All rights are reserverd</p>
                </div>

            </div>
            <button className="burger-button" onClick={toggleSidebar}>
                {isSidebarOpen ? <FaTimes/> : <RxHamburgerMenu/>}
            </button>
            <div className="chat-container">
                <div className="chat-window" ref={chatWindowRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.role} appear`}>
                            <div className={`avatar ${msg.role}-avatar`}></div>
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
                <div className="input-container">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message"
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default OpenShipAIChat;
