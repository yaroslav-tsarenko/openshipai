import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { ReactComponent as CustomPrevArrow } from "../../../assets/custom-arrow-left.svg";
import { ReactComponent as CustomNextArrow } from "../../../assets/custom-arrow-right.svg";
import "../LandingPage.css"

const ImageSlider = ({ image, image2, image3 }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [image, image2, image3];

    const arrowStyles = {
        position: 'absolute',
        zIndex: 2,
        top: 'calc(50% - 55px)',
        width: 10,
        height: 10,
        cursor: 'pointer',
        background: 'none',
        color: '#fff',
    };

    const goToPrevSlide = () => {
        setCurrentSlide(oldSlide => (oldSlide > 0 ? oldSlide - 1 : images.length - 1));
    };

    const goToNextSlide = () => {
        setCurrentSlide(oldSlide => (oldSlide < images.length - 1 ? oldSlide + 1 : 0));
    };

    return (
        <div className="slider-wrapper">
            <Carousel
                selectedItem={currentSlide}
                autoPlay
                interval={5000}
                infiniteLoop
                showThumbs={false}
                showArrows={false}
            >
                {images.map((img, index) => (
                    <img key={index} src={img} alt="" width={340} height={340}/>
                ))}
            </Carousel>
            <div className="navigation-slider-wrapper">
                    <CustomPrevArrow className="navigation-slides-icon" onClick={goToPrevSlide}/>
                    <CustomNextArrow className="navigation-slides-icon" onClick={goToNextSlide}/>
            </div>
        </div>
    );
};

export default ImageSlider;