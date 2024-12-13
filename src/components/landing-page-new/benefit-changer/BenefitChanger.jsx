import React, { useState, useEffect } from 'react';
import styles from "./BenefitChanger.module.scss";
import { useNavigate } from 'react-router-dom';
import { ReactComponent as PlusIcon } from "../../../assets/images/plus-icon-static.svg";

const BenefitChanger = ({ backgroundColor, label, title, description, img, subDescription, buttonType, subImage, variant }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [fadeState, setFadeState] = useState('fade-in');

    const navigate = useNavigate();

    const handleToggle = () => {
        setFadeState('fade-out');
        setTimeout(() => {
            setIsExpanded(!isExpanded);
            setFadeState('fade-in');
        }, 500);
    };

    const handleClickToAction = () => {
        navigate('/sign-up');
    };

    return (
        <div
            className={`${styles.benefitChanger} ${variant ? styles[variant] : ''}`}>
            <div className={`${styles.content} ${styles[fadeState]}`}>
                {isExpanded ? (
                    <>
                        <img className={styles.benefitChangerImage} src={subImage} alt="Sub Image" />
                        <h5>{subDescription}</h5>
                    </>
                ) : (
                    <>
                        <label>{label}</label>
                        <h2>{title}</h2>
                        <p>{description}</p>
                        <img className={styles.benefitChangerImage} src={img} alt="Image" />
                    </>
                )}
            </div>
            {buttonType === "click-to-action" ? (
                <button className={styles.clickToAction} onClick={handleClickToAction}>
                    Start For Free
                </button>
            ) : (
                <div className={`${styles.plusIcon} ${isExpanded ? styles.rotated : ''}`} onClick={handleToggle}>
                    <PlusIcon />
                </div>
            )}
        </div>
    );
};

export default BenefitChanger;
