import React, { useState } from 'react';
import Modal from 'react-modal';
import {ReactComponent as FaTimesIcon} from "../../../assets/fa-times-icon.svg";
import '../LandingPage.css';

const VideoComponent = ({firstVideo, secondVideo}) => {
    const [isShipperModalOpen, setIsShipperModalOpen] = useState(false);
    const [isCarrierModalOpen, setIsCarrierModalOpen] = useState(false);
    const [carrierformData, setCarrierFormData] = useState({
        email: '',
        name: '',
        phoneNumber: '',
        company: ''
    });
    const [shipperFormData, setShipperFormData] = useState({
        email: '',
        name: '',
        phoneNumber: '',
    });
    const handleCarrierInputChange = (event) => {
        setCarrierFormData({
            ...carrierformData,
            [event.target.id]: event.target.value
        });
    };
    const handleShipperInputChange = (event) => {
        setShipperFormData({
            ...shipperFormData,
            [event.target.id]: event.target.value
        });
    };
    const handleSubscribeCarrier = async () => {
        try {
            const response = await fetch('http://localhost:8080/subscribe-carrier', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(carrierformData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleSubscribeShipper = async () => {
        try {
            const response = await fetch('http://localhost:8080/subscribe-shipper', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(shipperFormData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const openShipperModal = () => {
        setIsShipperModalOpen(true);
    }

    const closeShipperModal = () => {
        setIsShipperModalOpen(false);
    }

    const openCarrierModal = () => {
        setIsCarrierModalOpen(true);
    }

    const closeCarrierModal = () => {
        setIsCarrierModalOpen(false);
    }

    return (
        <div className='video-main'>
            <div className="video-overlay"></div>
            <video src={firstVideo} autoPlay loop muted/>
            <video src={secondVideo} autoPlay loop muted/>
            <div className="video-content">
                <h1>openshipai</h1>
                <p>Your Gateway to Global Shipping Empowered by AI</p>
                <section className="main-slider-button-wrapper">
                    <button className="become-shipper-button" onClick={openShipperModal}>Become Shipper</button>
                    <button className="become-carrier-button" onClick={openCarrierModal}>Become Carrier</button>
                </section>
            </div>

            <Modal
                isOpen={isShipperModalOpen}
                onRequestClose={closeShipperModal}
                contentLabel="Shipper Modal"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)', // This will create a dark overlay
                        display: 'flex',
                        alignItems: 'center', // These two lines will center the modal vertically
                        justifyContent: 'center', // This line will center the modal horizontally
                    },
                    content: {
                        position: 'relative', // This line is needed to override the default 'absolute' positioning
                        width: '750px',
                        height: '750px',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '30px', // This line will add a border radius to the modal
                    },
                }}
            >
                <button onClick={closeShipperModal}><FaTimesIcon/></button>
                <h1 className="pre-production-title">Project pre-production subsribing</h1>
                <p className="pre-production-subtitle">Our project current in development, subscribe to get first all
                    news about project, and be the one of the best carrier in the world</p>
                <div className="google-input-wrapper">
                    <input
                        type="text"
                        id="email"
                        autoComplete="off"
                        className="google-style-input"
                        required
                        value={shipperFormData.email}
                        onChange={handleShipperInputChange}
                    />
                    <label htmlFor="email" className="google-style-input-label">Your Email</label>
                </div>
                <div className="google-input-wrapper">
                    <input
                        type="text"
                        id="name"
                        autoComplete="off"
                        className="google-style-input"
                        required
                        value={shipperFormData.name}
                        onChange={handleShipperInputChange}
                    />
                    <label htmlFor="name" className="google-style-input-label">Your Name</label>
                </div>
                <div className="google-input-wrapper">
                    <input
                        type="text"
                        id="phoneNumber"
                        autoComplete="off"
                        className="google-style-input"
                        required
                        value={shipperFormData.phoneNumber}
                        onChange={handleShipperInputChange}
                    />
                    <label htmlFor="phoneNumber" className="google-style-input-label">Your Phone Number</label>
                </div>
                <button className="subscribe-carrier-shipper-button" onClick={handleSubscribeShipper}>Subscribe</button>
            </Modal>

            <Modal
                isOpen={isCarrierModalOpen}
                onRequestClose={closeCarrierModal}
                contentLabel="Carrier Modal"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)', // This will create a dark overlay
                        display: 'flex',
                        alignItems: 'center', // These two lines will center the modal vertically
                        justifyContent: 'center', // This line will center the modal horizontally
                    },
                    content: {
                        position: 'relative', // This line is needed to override the default 'absolute' positioning
                        width: '750px',
                        height: '750px',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '30px', // This line will add a border radius to the modal
                    },
                }}
            >
                <button onClick={closeCarrierModal}><FaTimesIcon/></button>
                <h1 className="pre-production-title">Project pre-production subsribing</h1>
                <p className="pre-production-subtitle">Our project current in development, subscribe to get first all
                    news about project, and be the one of the best carrier in the world</p>
                <div className="google-input-wrapper">
                    <input
                        type="text"
                        id="email"
                        autoComplete="off"
                        className="google-style-input"
                        required
                        value={carrierformData.email}
                        onChange={handleCarrierInputChange}
                    />
                    <label htmlFor="email" className="google-style-input-label">Your Email</label>
                </div>
                <div className="google-input-wrapper">
                    <input
                        type="text"
                        id="name"
                        autoComplete="off"
                        className="google-style-input"
                        required
                        value={carrierformData.name}
                        onChange={handleCarrierInputChange}
                    />
                    <label htmlFor="name" className="google-style-input-label">Your Name</label>
                </div>
                <div className="google-input-wrapper">
                    <input
                        type="text"
                        id="phoneNumber"
                        autoComplete="off"
                        className="google-style-input"
                        required
                        value={carrierformData.phoneNumber}
                        onChange={handleCarrierInputChange}
                    />
                    <label htmlFor="phoneNumber" className="google-style-input-label">Your Phone Number</label>
                </div>
                <div className="google-input-wrapper">
                    <input
                        type="text"
                        id="company"
                        autoComplete="off"
                        className="google-style-input"
                        required
                        value={carrierformData.company}
                        onChange={handleCarrierInputChange}
                    />
                    <label htmlFor="company" className="google-style-input-label">Your Company (Optional)</label>
                </div>
                <button className="subscribe-carrier-shipper-button" onClick={handleSubscribeCarrier}>Subscribe</button>
            </Modal>
        </div>
    )
}

export default VideoComponent