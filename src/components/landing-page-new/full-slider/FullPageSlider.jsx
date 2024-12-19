import React, { useState, useEffect } from 'react';
import styles from "./FullPageSlider.module.scss";
import { ReactComponent as ArrowLeft } from "../../../assets/images/nav-slider-arrow.svg";
import { ReactComponent as ArrowRight } from "../../../assets/images/nav-slider-button-right.svg";

const FullPageSlider = ({ title, description, images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) {
            handleNext();
        }

        if (touchStart - touchEnd < -50) {
            handlePrev();
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.fullPageSliderWrapper}>
            <h1>{title}</h1>
            <p>{description}</p>
            <div
                className={styles.sliderImages}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
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