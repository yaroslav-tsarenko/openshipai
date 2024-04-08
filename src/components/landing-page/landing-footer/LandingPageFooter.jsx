import React from 'react';
import {ReactComponent as OpenshipLogoWhite} from "../../../assets/openship-logo-updated-white.svg";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
const LandingPageFooter = () => {
    return (
        <footer className="landing-page-footer-wrapper">
            <section className="footer-section-upper">
                <div className="footer-section-content">
                    <h3>Company</h3>
                    <a href="#">About Us</a>
                    <a href="#">Why Choose Us</a>
                    <a href="#">Pricing Directs</a>
                    <a href="#">Project Management</a>
                </div>
                <div className="footer-section-content">
                    <h3>Resources</h3>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms And Conditions</a>
                    <a href="#">Blog</a>
                    <a href="#">Contact Us</a>
                </div>
                <div className="footer-section-content">
                    <h3>Product</h3>
                    <a href="#">Project Management</a>
                    <a href="#">Time Tracker</a>
                    <a href="#">Time Schedule</a>
                    <a href="#">Lead Generate</a>
                </div>
                <div className="footer-section-content-newsletter">
                    <OpenshipLogoWhite/>
                    <p>Subscribe for Our Newsletter</p>
                    <div className="footer-input-wrapper">
                        <input type="text" placeholder="Enter your email"/>
                        <button>Subscribe</button>
                    </div>
                    <div className="contact-icons-wrapper">
                        <span className="icon-container">
                        <BsTwitterX  className="footer-icons"/>
                        </span>
                        <span className="icon-container">
                        <FaLinkedinIn        className="footer-icons"/>
                        </span>
                        <span className="icon-container">
                        <FaInstagram className="footer-icons"/>
                        </span>
                        <span className="icon-container">
                        <FaFacebookF  className="footer-icons"/>
                        </span>
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