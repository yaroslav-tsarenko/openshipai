import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './FailedPaymentPage.css';

const FailedPaymentPage = () => {
    const navigate = useNavigate()
    const [countdown, setCountdown] = useState(1115);
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 1) {
                    navigate("/customer-deal-chat-conversation");
                    return 0;
                } else {
                    return prevCountdown - 1;
                }
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);
    return (
        <div className="failed-payment-page">
            <div className="animated-text-failed">Payment failed</div>
            <div className="animated-times">
                <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                    <g stroke="currentColor" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round"
                       stroke-linejoin="round">
                        <path className="circle-times"
                              d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"/>
                        <path className="times" d="M8 8 L18 18 M8 18 L18 8"/>
                    </g>
                </svg>
            </div>
            <div className="animated-text-secondary">
                You will be redirecting to your account after: {countdown} sec
            </div>
        </div>
    );
};

export default FailedPaymentPage;