import React from 'react';
import "./LandingPage.css"
import LandingPageFooter from "./landing-footer/LandingPageFooter";
import LandingHeader from "./landing-header/LandingHeader";
import LeftIntroductionContainer from "./landing-left-container/LeftIntroductionContainer";
import EasyShippingImage from "../../assets/easy-shipping-illustration.svg"
import AiScreens from "../../assets/ai-screens.svg";
import TransparentPricing from "../../assets/transparent-pricing.svg";
import AllTimeUpdate from "../../assets/all-time-update.svg";
import RightIntroductionContainer from "./landing-right-container/RightIntroductionContainer";
import {Fade} from "react-awesome-reveal";
import FullPageSlider from "./flicking-slider/FullPageSlider";
import GetStartedContainer from "./get-started-container/GetStartedContainer";
import AdvantagesContainer from "./advantages-container/AdvantagesContainer";
import CardIntroduction from "./card-introduction/CardIntroduction";
import LoadTypes from "./load-types/LoadTypes";
import ServiceSubscribe from "./subscribe-for-service/ServiceSubscribe";
import RolesContainer from "./roles-container/RolesContainer";
import MainBenefits from "./main-benefits/MainBenefits";
import SlidersContainer from "./sliders-container/SlidersContainer";
import HowItWorks from "./howitworks-container/HowItWorks";

const LandingPage = () => {

    return (
        <>
            <LandingHeader/>
            <Fade>
                <FullPageSlider/>
            </Fade>
            <Fade>
                <MainBenefits/>
            </Fade>
            <Fade>
                <CardIntroduction/>
            </Fade>
            <Fade>
                <SlidersContainer/>
            </Fade>
            <Fade>
                <LeftIntroductionContainer title="Start easy shipping"
                                           description="Discover simplicity with openship.ai, where seamless global
                                            logistics is at your fingertips.
                                            Start using modern transportation methods today."
                                           image={EasyShippingImage}/>
            </Fade>
            <Fade>
                <RightIntroductionContainer title="Streamlined Logistics"
                                            description="openship.ai is your
                                            AI-driven shipping ally,
                                            offering intuitive solutions for tracking and managing
                                            international shipments with precision and care. Dive in and ship smarter."
                                            image={AiScreens}/>
            </Fade>
            <Fade>
                <LeftIntroductionContainer title="Transparent Pricing"
                                           description="Access immediate, transparent quotes from a wide array
                                           of international carriers. openship.ai ensures cost-effective solutions with no hidden fees."
                                           image={TransparentPricing}/>
            </Fade>
            <Fade>
                <RightIntroductionContainer title="24/7 Support & Advanced Tracking"
                                            description="Experience round-the-clock support and real-time tracking.
                                            Our AI-driven platform keeps you informed of your cargo's status and anticipates delays."
                                            image={AllTimeUpdate}/>
            </Fade>
            <Fade>
                <RolesContainer/>
            </Fade>
            <Fade>
                <AdvantagesContainer/>
            </Fade>
            <Fade>
                <GetStartedContainer/>
            </Fade>
            <Fade>
                <LandingPageFooter/>
            </Fade>
        </>
    );
};

export default LandingPage;