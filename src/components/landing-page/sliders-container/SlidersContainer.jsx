import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PCVersion from "../../../assets/pc-version.svg";
import MobileVersion from "../../../assets/phone-photo-example.svg";
import ImageSlider from "../image-slider/ImageSlider";
import ServiceSubscribe from "../subscribe-for-service/ServiceSubscribe";

const SlidersContainer = () => {
    return (
        <div className="sliders-wrapper">
            <div className="first-slider-wrapper">
                <h1>User-Friendly Shipper Dashboard</h1>
                <p>Your Gateway to Stress-Free Shipping</p>
                <section className="sliders-container">
                    <ImageSlider image={MobileVersion} image2={MobileVersion} image3={MobileVersion}/>
                    <ImageSlider image={PCVersion} image2={PCVersion} image3={PCVersion}/>
                </section>
            </div>
            <ServiceSubscribe/>
            <div className="second-slider-wrapper">
                <h1>Your Carrier Dashboard</h1>
                <p>Where we simplifying every mile</p>
                <section className="sliders-container">
                    <ImageSlider image={MobileVersion} image2={MobileVersion} image3={MobileVersion}/>
                    <ImageSlider image={PCVersion} image2={PCVersion} image3={PCVersion}/>
                </section>
            </div>
        </div>
    );
};

export default SlidersContainer;

