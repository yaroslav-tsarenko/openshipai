import React from 'react';
import Header from "../../components/landing-page-new/header/Header";
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";
import Description from "../../components/landing-page-new/description/Description";
import RightIntroductionContainer
    from "../../components/landing-page/landing-right-container/RightIntroductionContainer";
import EasyShippingImage from "../../assets/easy-shipping-illustration.svg";
import LeftIntroductionContainer from "../../components/landing-page/landing-left-container/LeftIntroductionContainer";
import TransparentPricing from "../../assets/transparent-pricing.svg";

const PartnersPage = () => {
    return (
        <>
            <Header/>
            <Description title="Partners"
                         description="Stronger Together with OpenShipAI – Partnerships are the cornerstone of our
                         business model at OpenShipAI. We believe in the power of collaboration to drive innovation
                         and excellence in logistics. Our network of partners includes industry leaders, technology
                          innovators, and logistical experts, all working together to provide unparalleled service.
                           With OpenShipAI, partnership means shared goals, mutual growth, and a commitment to achieving
                            the extraordinary. Join us as we build the future of logistics through collaborative
                             success."/>
            <RightIntroductionContainer title="Start easy shipping"
                                        description="Discover simplicity with openship.ai, where seamless global
                                            logistics is at your fingertips.
                                            Start using modern transportation methods today."
                                        image={EasyShippingImage}/>
            <LeftIntroductionContainer title="Transparent Pricing"
                                       description="Access immediate, transparent quotes from a wide array
                                           of international carriers. openship.ai ensures cost-effective solutions with no hidden fees."
                                       image={TransparentPricing}/>
            <LandingPageFooter/>
        </>
    );
};

export default PartnersPage;