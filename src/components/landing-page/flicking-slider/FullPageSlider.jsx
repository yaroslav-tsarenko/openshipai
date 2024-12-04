import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
        </Slider>
    );
};

export default FullPageSlider;