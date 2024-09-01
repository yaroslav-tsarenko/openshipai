import React, { useState, useEffect } from 'react';
import styles from "./FullPageSlider.module.scss";
import { ReactComponent as ArrowLeft } from "../../../assets/nav-slider-arrow.svg";
import { ReactComponent as ArrowRight } from "../../../assets/nav-slider-button-right.svg";

const FullPageSlider = ({title, description, images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 555000); // Change image every 3 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.fullPageSliderWrapper}>
            <h1>{title}</h1>
            <p>{description}</p>
            <div className={styles.sliderImages}>
                <div className={styles.sliderImageContainer} style={{ transform: `translateX(-${currentIndex * 50}%)` }}>
                    {images.map((image, index) => (
                        <img key={index} src={image} alt={`slider ${index}`} className={styles.sliderImage} />
                    ))}
                </div>
            </div>
            <nav className={styles.pageSliderNav}>
                <button onClick={handlePrev}>
                    <ArrowLeft />
                </button>
                <button onClick={handleNext}>
                    <ArrowRight />
                </button>
            </nav>
        </div>
    );
};

export default FullPageSlider;