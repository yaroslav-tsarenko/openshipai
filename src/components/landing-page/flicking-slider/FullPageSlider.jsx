import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShipperFeedback from "../../../assets/shipper-video-feedback.mp4";
import CarrierFeedback from "../../../assets/carrier-video-feedback.mp4";
import VideoComponent from "../video-component/VideoComponent";

const FullPageSlider = () => {
    const settings = {
        infinite: true,
        speed: 3000,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        cssEase: 'linear'
    };

    return (
        <Slider {...settings}>
               <VideoComponent  firstVideo={ShipperFeedback} secondVideo={CarrierFeedback}/>
        </Slider>
    );
};

export default FullPageSlider;