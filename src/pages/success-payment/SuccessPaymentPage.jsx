import React, {useState, useEffect, useRef} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SuccessPaymentPage.css';
import io from 'socket.io-client';
import axios from 'axios';
import {BACKEND_URL} from "../../constants/constants";
import {SOCKET_URL} from "../../constants/constants";

const SuccessPaymentPage = () => {

    const navigate = useNavigate()
    const [countdown, setCountdown] = useState(5);
    const { shipperID } = useParams();
    const { chatID } = useParams();
    const socketRef = useRef();

    useEffect(() => {

        socketRef.current = io.connect(`${SOCKET_URL}`);
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 1) {
                    navigate(`/customer-deal-chat-conversation/${shipperID}`);
                    return 0;
                } else {
                    return prevCountdown - 1;
                }
            });
        }, 1000);



        axios.put(`${BACKEND_URL}/update-load-payment-status/${chatID}`)
            .then(response => {
                console.log(response.data);
                socketRef.current.emit('payment updated', { chatID: chatID });
            })
            .catch(error => {
                console.error('Error updating load payment status:', error);
            });

        return () => {
            clearInterval(timer);
        };
    }, [shipperID, chatID]);

    return (
        <div className="success-payment-page">
            <div className="animated-text">You successfully pay load</div>
            <div className="animated-checkmark">
                <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                    <g stroke="currentColor" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round"
                       stroke-linejoin="round">
                        <path className="circle"
                              d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"/>
                        <path className="tick" d="M6.5 13.5L10 17 l8.808621-8.308621"/>
                    </g>
                </svg>
            </div>
            <div className="animated-text-secondary">
                You will be redirecting to your account after: {countdown} sec
            </div>
        </div>
    );
};

export default SuccessPaymentPage;