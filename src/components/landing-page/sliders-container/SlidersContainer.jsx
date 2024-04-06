import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import TestImage from "../../../assets/image-for-slider.svg";
import EasyShippingImage from "../../../assets/easy-shipping-illustration.svg"
import AiScreens from "../../../assets/ai-screens.svg";
import TransparentPricing from "../../../assets/transparent-pricing.svg";
import AllTimeUpdate from "../../../assets/all-time-update.svg";
const SlidersContainer = () => {
    return (
        <div className="sliders-wrapper">
            <div className="first-slider">
                <h1>Bids Chat</h1>
                <Carousel autoPlay interval={5000} infiniteLoop useKeyboardArrows dynamicHeight showThumbs={false}>
                    <div style={{height: '100vh', width: '100%'}}>
                        <img src={AiScreens} alt="Slide 1" style={{objectFit: 'cover', width: '100%', height: '100%'}}/>
                    </div>
                    <div style={{height: '100vh', width: '100%'}}>
                        <img src={TransparentPricing} alt="Slide 2" style={{objectFit: 'cover', width: '100%', height: '100%'}}/>
                    </div>
                    <div style={{height: '100vh', width: '100%'}}>
                        <img src={EasyShippingImage} alt="Slide 3" style={{objectFit: 'cover', width: '100%', height: '100%'}}/>
                    </div>
                </Carousel>
            </div>
            <div className="second-slider">
                <h1>Intensive Loadboard</h1>
                <Carousel autoPlay interval={5000} infiniteLoop useKeyboardArrows dynamicHeight showThumbs={false}>
                    <div style={{height: '100vh', width: '100%'}}>
                        <img src={AiScreens} alt="Slide 1" style={{objectFit: 'cover', width: '100%', height: '100%'}}/>
                    </div>
                    <div style={{height: '100vh', width: '100%'}}>
                        <img src={TransparentPricing} alt="Slide 2"
                             style={{objectFit: 'cover', width: '100%', height: '100%'}}/>
                    </div>
                    <div style={{height: '100vh', width: '100%'}}>
                        <img src={EasyShippingImage} alt="Slide 3"
                             style={{objectFit: 'cover', width: '100%', height: '100%'}}/>
                    </div>
                </Carousel>
            </div>
        </div>

    );
};

export default SlidersContainer;