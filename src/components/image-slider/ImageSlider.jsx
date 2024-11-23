import React, { useState } from 'react';
import './ImageSlider.css';
import { ReactComponent as ArrowLeft } from "../../assets/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../assets/arrow-right.svg";

const ImageSlider = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((currentImageIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
    };

    const selectImage = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <div className="slider-content-wrapper">
            <img className="main-image" src={images[currentImageIndex]} alt="main-image" />
            <div className="slider-navigation">
                <button className="slider-nav-button" onClick={prevImage}><ArrowLeft /></button>
                {images.map((image, index) => (
                    <img
                        className="thumbnail"
                        width={55}
                        key={index}
                        src={image}
                        alt="thumbnail"
                        onClick={() => selectImage(index)}
                    />
                ))}
                <button className="slider-nav-button" onClick={nextImage}><ArrowRight /></button>
            </div>
        </div>
    );
};

export default ImageSlider;