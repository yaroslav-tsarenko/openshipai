import React from 'react';
import styles from './BidSubmited.module.scss';
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";
import Header from "../../components/landing-page-new/header/Header";
import {Fade} from "react-awesome-reveal";

const BidSumbited = () => {
    return (
        <>
            <Header/>
            <Fade>
                <div className={styles.container}>
                    <h1>Thank you! Your bid submitted and visible to shipper!
                        <span>
                    You will get notification via your email when shipper accept your bid.
                    </span>
                    </h1>
                </div>
            </Fade>
            <LandingPageFooter/>
        </>
    );
};

export default BidSumbited;