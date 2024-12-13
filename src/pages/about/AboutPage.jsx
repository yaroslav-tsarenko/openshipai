import React from 'react';
import Header from "../../components/landing-page-new/header/Header";
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";
import Description from "../../components/landing-page-new/description/Description";
import LeftIntroductionContainer from "../../components/landing-page/landing-left-container/LeftIntroductionContainer";
import EasyShippingImage from "../../assets/images/easy-shipping-illustration.svg";
import RightIntroductionContainer
    from "../../components/landing-page/landing-right-container/RightIntroductionContainer";
import TransparentPricing from "../../assets/images/transparent-pricing.svg";

const AboutPage = () => {
    return (
        <>
            <Header/>
            <Description title="About Us"
                         description="OpenShipAI is a pioneering AI transportation company that leverages
                          cutting-edge artificial intelligence technologies to revolutionize the logistics
                          and freight industry. Specializing in both business-to-business (B2B) and business-to-consumer
                          (B2C) segments, OpenShipAI provides comprehensive solutions that streamline the complex processes
                           of managing freight, including less-than-truckload (LTL), full-truckload (FTL), and various vehicle
                            load shipping."/>
            <LeftIntroductionContainer title="Transparent Pricing"
                                       description="Access immediate, transparent quotes from a wide array
                                           of international carriers. openship.ai ensures cost-effective solutions with no hidden fees."
                                       image={TransparentPricing}/>
            <RightIntroductionContainer title="Start easy shipping"
                                       description="Discover simplicity with openship.ai, where seamless global
                                            logistics is at your fingertips.
                                            Start using modern transportation methods today."
                                       image={EasyShippingImage}/>
            <LandingPageFooter/>
        </>
    );
};

export default AboutPage;