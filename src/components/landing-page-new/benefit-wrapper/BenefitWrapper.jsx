import React from 'react';
import styles from "./Benefit.wrapper.module.scss";
import AnimationLabel from "../animation-label/AnimationLabel";
import clickGif from "../../../assets/animated-icons/click.gif";
import likeGif from "../../../assets/animated-icons/like.gif";
import threeFriends from "../../../assets/animated-icons/three-friends.gif";

const words = [
    { text: 'Choose', icon: clickGif, background: 'white' },
    { text: 'Use', icon: threeFriends, background: 'white' },
    { text: 'Prefer', icon: likeGif, background: 'white' },
];

const BenefitWrapper = ({children}) => {
    return (
        <div className={styles.benefitWrapper}>
            <h1>Why you need to <AnimationLabel words={words} /> our AI   </h1>
            <div className={styles.benefitWrapperContent}>
                {children}
            </div>
        </div>
    );
};

export default BenefitWrapper;