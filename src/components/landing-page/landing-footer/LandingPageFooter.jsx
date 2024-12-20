import React, {useState} from 'react';
import axios from "axios";
import {ReactComponent as OpenshipLogoWhite} from "../../../assets/images/openship-logo-updated-white.svg";
import {BsTwitterX} from "react-icons/bs";
import {FaLinkedinIn} from "react-icons/fa";
import {FaInstagram} from "react-icons/fa";
import {FaFacebookF} from "react-icons/fa";
import {Link} from "react-router-dom";
import {BACKEND_URL} from "../../../constants/constants";
import RotatingLinesLoader from "../../rotating-lines/RotatingLinesLoader";
import Alert from "../../floating-window-success/Alert";

const LandingPageFooter = () => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({show: false, status: '', text: '', description: ''});

    const handleSubscribe = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/subscribe-to-newsletter`, {email});
            console.log(response.data);
            setAlert({
                show: true,
                status: 'success',
                text: 'Success',
                description: 'Contact request submitted successfully!'
            });
        } catch (error) {
            setAlert({show: true, status: 'error', text: 'Error', description: 'Failed to submit contact request.'});
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {alert.show && <Alert status={alert.status} text={alert.text} description={alert.description}/>}
            <footer className="landing-page-footer-wrapper">
                <div className="footer-section-upper">
                    <div className="footer-section-content">
                        <h3>Company</h3>
                        <Link className="footer-section-link" to="/about-page">About Us</Link>
                        <Link className="footer-section-link" to="/why-choose-us">Why Choose Us</Link>
                        <Link className="footer-section-link" to="/pricing-directs">Pricing Directs</Link>
                        <Link className="footer-section-link" to="/project-management">Project Management</Link>
                    </div>
                    <div className="footer-section-content">
                        <h3>Resources</h3>
                        <Link className="footer-section-link" to="/privacy-policy">Privacy Policy</Link>
                        <Link className="footer-section-link" to="/terms-and-conditions">Terms And Conditions</Link>
                        <Link className="footer-section-link" to="/blog-page">Blog</Link>
                        <Link className="footer-section-link" to="/contact-us">Contact Us</Link>
                    </div>
                   {/* <div className="footer-section-content">
                        <h3>Contact us through email</h3>
                        <Link className="footer-section-link" to="mailto:info@openshipai.com">info@openshipai.com</Link>
                        <Link className="footer-section-link" to="mailto:openshipai@gmail.com">openshipai@gmail.com</Link>
                    </div>*/}
                    <div className="footer-section-content">
                        <h3>Product</h3>
                        <Link className="footer-section-link" to="/cookie-policy">Cookie Policy</Link>
                        <Link className="footer-section-link" to="/time-schedule">Time Schedule</Link>
                        <Link className="footer-section-link" to="/lead-generate">Lead Generate</Link>
                    </div>
                    <div className="footer-section-content-newsletter">
                        <OpenshipLogoWhite/>
                        <p>Subscribe for Our Newsletter</p>
                        <div className="footer-input-wrapper">
                            <input
                                type="text"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button onClick={handleSubscribe} disabled={loading}>
                                {loading ? <RotatingLinesLoader title="Processing..."/> : 'Subscribe'}
                            </button>
                        </div>
                        <div className="contact-icons-wrapper">
                            <Link to="https://x.com/openshipai_" className="icon-container">
                                <BsTwitterX className="footer-icons"/>
                            </Link>
                            <Link to="https://www.linkedin.com/company/open-ship-ai/?trk=ppro_cprof" className="icon-container">
                                <FaLinkedinIn className="footer-icons"/>
                            </Link>
                            <Link to="https://www.instagram.com/openshipai_/" className="icon-container">
                                <FaInstagram className="footer-icons"/>
                            </Link>
                            <Link to="https://www.facebook.com/profile.php?id=61558698627638" className="icon-container">
                                <FaFacebookF className="footer-icons"/>
                            </Link>
                        </div>
                    </div>
                </div>
                <section className="footer-section-bottom">
                    <p>All rights are reserved. Copyright 2024</p>
                </section>
            </footer>
        </>
    );
};

export default LandingPageFooter;