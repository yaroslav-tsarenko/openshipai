import React from 'react';
import Header from "../../components/landing-page-new/header/Header";
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";
import Description from "../../components/landing-page-new/description/Description";

const CookiePolicy = () => {
    return (
        <>
            <Header/>
            <Description
                title="Cookie Policy for OpenShipAI"
                description="At OpenShipAI, we prioritize your privacy and ensure transparency in how we use cookies. This Cookie Policy outlines how we use cookies and similar technologies to enhance your experience on our platform."
                subDescriptions={[
                    {
                        title: "Why We Use Cookies",
                        content: "Cookies help us improve user experience by tracking website interactions, personalizing content, and ensuring smooth functionality. We also use cookies to analyze traffic and optimize performance."
                    },
                    {
                        title: "Types of Cookies We Use",
                        content: "We use both session and persistent cookies to improve site navigation, store preferences, and provide targeted advertising. Our cookies ensure that we offer relevant AI-powered logistics solutions to our users."
                    },
                    {
                        title: "Managing Cookies",
                        content: "You can manage or disable cookies through your browser settings at any time. However, please note that some features of our platform may not function properly without cookies."
                    }
                ]}
            />
            <LandingPageFooter/>
        </>
    );
};

export default CookiePolicy;
