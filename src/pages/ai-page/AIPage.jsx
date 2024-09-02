import React from 'react';
import Header from "../../components/landing-page-new/header/Header";
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";
import OpenShipAIChat from "../../components/open-ai-chat/OpenShipAIChat";
import styles from "./AIPage.module.scss";
import Description from "../../components/landing-page-new/description/Description";
import {Fade} from "react-awesome-reveal";

const AiPage = () => {
    return (
        <>
            <Header/>
            <Fade>
                <Description title="Our AI"
                             description="OpenShipAI, a trailblazer in the AI transportation sector,
                             uses advanced AI to transform logistics, catering to both B2B and B2C markets.
                             The company excels in optimizing complex freight management tasks across LTL,
                              FTL, and diverse vehicle load shipping, ensuring efficient and streamlined operations."/>

            </Fade>
            <Fade>
                <div className={styles.aiPage}>
                    <OpenShipAIChat/>
                </div>
            </Fade>
            <Fade>
                <LandingPageFooter/>

            </Fade>
        </>
    );
};

export default AiPage;