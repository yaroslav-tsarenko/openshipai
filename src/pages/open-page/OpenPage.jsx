import React from 'react';
import Header from "../../components/landing-page-new/header/Header";
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";
import Description from "../../components/landing-page-new/description/Description";
import LeftIntroductionContainer from "../../components/landing-page/landing-left-container/LeftIntroductionContainer";
import TransparentPricing from "../../assets/transparent-pricing.svg";
import RightIntroductionContainer
    from "../../components/landing-page/landing-right-container/RightIntroductionContainer";
import EasyShippingImage from "../../assets/easy-shipping-illustration.svg";

const OpenPage = () => {
    return (
        <>
            <Header/>
            <Description title="Open Horizons with OpenShipAI"
                         description="At OpenShipAI, 'Open' isn't
                         just a part of our name—it's our philosophy.
                         We are relentlessly open to new opportunities, constantly embracing innovative features
                         that enhance our services, and forever expanding the horizons of what our technology can
                         achieve in the transportation industry. We are open to you—our valued customers—inviting
                         you to collaborate, suggest, and grow alongside us. In a world that demands trust and
                         transparency, OpenShipAI stands as your reliable partner, committed to not just meeting but
                          exceeding your logistics needs with precision and integrity. Trust in us to open doors to
                          new possibilities, making every logistics challenge a seamless journey. Welcome to OpenShipAI,
                           where we transform open possibilities into your logistical realities."/>
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

export default OpenPage;