import React, { useEffect, useState } from 'react';
import styles from "./AnimationLabel.module.scss";

const AnimationLabel = ({ words }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimating(true);
            setTimeout(() => {
                setAnimating(false);
                setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
            }, 800); // Total animation duration (matches CSS transition)
        }, 3000);

        return () => clearInterval(interval);
    }, [words]);

    return (
        <div
            className={`${styles.label} ${animating ? styles.animating : ''}`}
            style={{ background: words[currentIndex].background }}
        >
            <div className={styles.wordContainer}>
                <div className={`${styles.icon} ${animating ? styles.iconSlideDown : ''}`}>
                    <img src={words[currentIndex].icon} alt="icon" className={styles.gif} />
                </div>
                <span className={`${styles.word} ${animating ? styles.textSlideUp : ''}`}>
                    {words[currentIndex].text}
                </span>
            </div>
        </div>
    );
};

export default AnimationLabel;
