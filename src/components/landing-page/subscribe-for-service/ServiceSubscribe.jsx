import React, { useState } from 'react';
import axios from 'axios';

const ServiceSubscribe = () => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/subscribe-user', { email, phoneNumber, name });
            alert('You have subscribed successfully');
        } catch (error) {
            alert('An error occurred while subscribing');
        }
    };

    return (
        <div className="subscribe-container-wrapper">
            <div className="subscribe-container">
                <h2>Subscribe for our service</h2>
                <p>Subscribe for our service and get the latest updates and offers</p>
                <form className="subscribe-input-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="text" placeholder="Phone number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                    <input type="text" className="your-name-input" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                    <button type="submit">Subscribe</button>
                </form>
            </div>
        </div>
    );
};

export default ServiceSubscribe;