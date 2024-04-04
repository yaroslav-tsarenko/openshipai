import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarryingBoxes from "../../../assets/carrying-boxes.mp4";
import DeliveryBoxes from "../../../assets/moving-delviery.mp4";
import SteeringWheel from "../../../assets/steering-wheel.mp4";
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
               <VideoComponent  video={CarryingBoxes}/>
                <VideoComponent  video={DeliveryBoxes}/>
                <VideoComponent  video={SteeringWheel}/>
        </Slider>
    );
};

export default FullPageSlider;