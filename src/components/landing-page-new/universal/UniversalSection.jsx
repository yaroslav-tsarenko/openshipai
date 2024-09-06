import React from 'react';
import styles from "./UniversalSection.module.scss";
import AnimationLabel from "../animation-label/AnimationLabel";
import clickGif from "../../../assets/animated-icons/click.gif";
import threeFriends from "../../../assets/animated-icons/three-friends.gif";
import likeGif from "../../../assets/animated-icons/like.gif";
import {ReactComponent as Truck} from "../../../assets/truck-animation.svg"
import {Fade, Slide} from "react-awesome-reveal";

const words = [
    {text: 'Choose', icon: clickGif, background: 'white'},
    {text: 'Use', icon: threeFriends, background: 'white'},
    {text: 'Prefer', icon: likeGif, background: 'white'},
];

const UniversalSection = ( {children}) => {
    return (
        <div className={styles.universalSectionWrapper}>
            <h1>Universal <AnimationLabel words={words}/></h1>
            <p>OpenshipAI is a platform that connects shippers and carriers.
                Shippers can post their loads and carriers can bid on them.
                Here are the roles you can choose from</p>
            <div className={styles.universalSectionContent}>
                {children}
            </div>
            <Slide>
                <Truck className={styles.truck}/>
            </Slide>
        </div>
    );
};

export default UniversalSection;