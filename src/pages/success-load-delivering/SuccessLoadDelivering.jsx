import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SuccessLoadDelivering.css';


const SuccessLoadDelivering = () => {

    const navigate = useNavigate()
    const [countdown, setCountdown] = useState(5);
    const { driverID } = useParams();
    const { loadID } = useParams();

    useEffect(() => {
        if (countdown > 0) {
            const timerId = setInterval(() => {
                setCountdown(countdown - 1);
            }, 1000);

            return () => clearInterval(timerId);
        } else {
            navigate(`/driver-dashboard/${driverID}`);
        }
    }, [countdown, navigate]);

    return (
        <div className="success-payment-page">
            <div className="animated-text">You successfully delivered load</div>
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

export default SuccessLoadDelivering;