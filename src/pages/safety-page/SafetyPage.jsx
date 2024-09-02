import React from 'react';
import Header from "../../components/landing-page-new/header/Header";
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";
import Description from "../../components/landing-page-new/description/Description";
import RightIntroductionContainer
    from "../../components/landing-page/landing-right-container/RightIntroductionContainer";
import EasyShippingImage from "../../assets/easy-shipping-illustration.svg";
import LeftIntroductionContainer from "../../components/landing-page/landing-left-container/LeftIntroductionContainer";
import TransparentPricing from "../../assets/transparent-pricing.svg";

const SafetyPage = () => {
    return (
        <>
            <Header/>
            <Description title="Safety"
                         description="Securing Every Mile with OpenShipAI – Safety is paramount in the intricate
                         world of logistics. At OpenShipAI, we prioritize the security of your cargo and the safety
                         of the entire supply chain process. Our advanced AI systems monitor and manage every aspect
                         of transport operations, ensuring that every shipment is not only timely but also secure.
                          From predictive analytics reducing road mishaps to rigorous compliance with global safety
                           standards, your peace of mind is our top priority. Trust OpenShipAI to safeguard your
                           interests and your inventory, mile after mile."/>
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

export default SafetyPage;