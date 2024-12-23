import React from 'react';
import { ReactComponent as RightArrowIcon } from "../../../assets/images/vector-right-arrow.svg";
import styles from './IntroductionContainer.module.scss';
import { useNavigate } from "react-router-dom";
import Button from "../../button/Button";
import {Fade} from "react-awesome-reveal";

const IntroductionContainer = ({ title, description, image, reverse }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/sign-up");
    };

    return (
        <Fade>
            <div className={`${styles.rightLandingIntroductionContainer} ${reverse ? styles.reverse : ''}`}>
                <img src={image} alt={title} className={styles.landingImage}/>
                <div className={styles.landingIntroductionContent}>
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <Button variant="default-non-responsive" onClick={handleNavigate}>
                        Get Started <RightArrowIcon className={styles.rightArrow}/>
                    </Button>
                </div>
            </div>
        </Fade>

    );
};

export default IntroductionContainer;