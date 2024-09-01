import React from 'react';
import {ReactComponent as OpenshipLogoWhite} from "../../../assets/openship-logo-updated-white.svg";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import {Link} from "react-router-dom";

const LandingPageFooter = () => {
    return (
        <footer className="landing-page-footer-wrapper">
            <section className="footer-section-upper">
                <div className="footer-section-content">
                    <h3>Company</h3>
                    <Link className="footer-section-link" to="#">About Us</Link>
                    <Link className="footer-section-link" to="#">Why Choose Us</Link>
                    <Link className="footer-section-link" to="#">Pricing Directs</Link>
                    <Link className="footer-section-link" to="#">Project Management</Link>
                </div>
                <div className="footer-section-content">
                    <h3>Resources</h3>
                    <Link className="footer-section-link" to="#">Privacy Policy</Link>
                    <Link className="footer-section-link" to="#">Terms And Conditions</Link>
                    <Link className="footer-section-link" to="#">Blog</Link>
                    <Link className="footer-section-link" to="#">Contact Us</Link>
                </div>
                <div className="footer-section-content">
                    <h3>Product</h3>
                    <Link  className="footer-section-link" to="#">Project Management</Link>
                    <Link  className="footer-section-link" to="#">Time Tracker</Link>
                    <Link  className="footer-section-link" to="#">Time Schedule</Link>
                    <Link  className="footer-section-link" to="#">Lead Generate</Link>
                </div>
                <div className="footer-section-content-newsletter">
                    <OpenshipLogoWhite/>
                    <p>Subscribe for Our Newsletter</p>
                    <div className="footer-input-wrapper">
                        <input type="text" placeholder="Enter your email"/>
                        <button>Subscribe</button>
                    </div>
                    <div className="contact-icons-wrapper">
                        <button className="icon-container">
                        <BsTwitterX  className="footer-icons"/>
                        </button>
                        <button className="icon-container">
                        <FaLinkedinIn        className="footer-icons"/>
                        </button>
                        <button className="icon-container">
                        <FaInstagram className="footer-icons"/>
                        </button>
                        <button className="icon-container">
                        <FaFacebookF  className="footer-icons"/>
                        </button>
                    </div>
                </div>
            </section>
            <section className="footer-section-bottom">
                <p>All rights are reserved. Copyright 2024</p>
            </section>
        </footer>
    );
};

export default LandingPageFooter;