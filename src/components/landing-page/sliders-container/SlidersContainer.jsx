import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MobileVersion1 from "../../../assets/images/shipper-mobile-version.svg";
import MobileVersion2 from "../../../assets/images/shipper-mobile-version-2.svg";
import MobileVersion3 from "../../../assets/images/shipper-mobile-version-3.svg";
import ShipperPCVersion from "../../../assets/images/shipper-dashboard-pc.svg";
import ShipperPCVersion2 from "../../../assets/images/shipper-dashboard-pc-2.svg";
import ShipperPCVersion3 from "../../../assets/images/shipper-dashboard-pc-3.svg";
import CarrierMobileVersion from "../../../assets/images/carrier-mobile-version-1.svg";
import CarrierMobileVersion1 from "../../../assets/images/carrier-mobile-version-2.svg";
import CarrierMobileVersion3 from "../../../assets/images/carrier-mobile-version-3.svg";
import CarrierPCVersion from "../../../assets/images/carrier-dashboard-pc-4.svg";
import CarrierPCVersion2 from "../../../assets/images/carrier-dashboard-pc-2.svg";
import CarrierPCVersion3 from "../../../assets/images/carrier-dashboard-pc-3.svg";
import ImageSlider from "../image-slider/ImageSlider";
import ServiceSubscribe from "../subscribe-for-service/ServiceSubscribe";

const SlidersContainer = () => {
    return (
        <div className="sliders-wrapper">
            <div className="first-slider-wrapper">
                <h1>User-Friendly Shipper Dashboard</h1>
                <p>Your Gateway to Stress-Free Shipping</p>
                <section className="sliders-container">
                    <ImageSlider image={MobileVersion1} image2={MobileVersion2} image3={MobileVersion3}/>
                    <ImageSlider image={ShipperPCVersion} image2={ShipperPCVersion2} image3={ShipperPCVersion3}/>
                </section>
            </div>
            <ServiceSubscribe/>
            <div className="second-slider-wrapper">
                <h1>Your Carrier Dashboard</h1>
                <p>Where we simplifying every mile</p>
                <section className="sliders-container">
                    <ImageSlider image={CarrierMobileVersion} image2={CarrierMobileVersion1} image3={CarrierMobileVersion3}/>
                    <ImageSlider image={CarrierPCVersion} image2={CarrierPCVersion2} image3={CarrierPCVersion3}/>
                </section>
            </div>
        </div>
    );
};

export default SlidersContainer;

