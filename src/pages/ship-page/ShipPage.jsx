import React from 'react';
import Header from "../../components/landing-page-new/header/Header";
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";
import Description from "../../components/landing-page-new/description/Description";
import RightIntroductionContainer
    from "../../components/landing-page/landing-right-container/RightIntroductionContainer";
import EasyShippingImage from "../../assets/images/easy-shipping-illustration.svg";
import LeftIntroductionContainer from "../../components/landing-page/landing-left-container/LeftIntroductionContainer";
import TransparentPricing from "../../assets/images/transparent-pricing.svg";

const ShipPage = () => {
    return (
        <>
            <Header/>
            <Description title="Ship"
                         description="Navigate the Future with OpenShipAI – At OpenShipAI, our Ship represents
                          more than just a means of transportation; it embodies our commitment to advancing logistics
                           through innovative AI-driven solutions. With each shipment, we leverage cutting-edge
                           technology to ensure precision, efficiency, and adaptability. Our fleet is ready to navigate
                            the complexities of modern transportation, delivering not just cargo, but also reliability
                            and forward-thinking solutions right to your doorstep. Embark with OpenShipAI, and let us
                            steer your business into the future of logistics."/>
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

export default ShipPage;