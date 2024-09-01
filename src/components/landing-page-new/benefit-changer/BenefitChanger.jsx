import React, { useState, useEffect } from 'react';
import styles from "./BenefitChanger.module.scss";
import { ReactComponent as PlusIcon } from "../../../assets/plus-icon-static.svg";

const BenefitChanger = ({ backgroundColor, label, title, description, img, subDescription, subImage, variant }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [fadeState, setFadeState] = useState('fade-in');

    const handleToggle = () => {
        setFadeState('fade-out');
        setTimeout(() => {
            setIsExpanded(!isExpanded);
            setFadeState('fade-in');
        }, 500);
    };

    return (
        <div
            className={`${styles.benefitChanger} ${variant ? styles[variant] : ''}`}>
            <div className={`${styles.content} ${styles[fadeState]}`}>
                {isExpanded ? (
                    <>
                        <img src={subImage} alt="Sub Image" />
                        <h5>{subDescription}</h5>
                    </>
                ) : (
                    <>
                        <label>{label}</label>
                        <h2>{title}</h2>
                        <p>{description}</p>
                        <img src={img} alt="Image" />
                    </>
                )}
            </div>
            <div className={`${styles.plusIcon} ${isExpanded ? styles.rotated : ''}`} onClick={handleToggle}>
                <PlusIcon />
            </div>
        </div>
    );
};

export default BenefitChanger;
