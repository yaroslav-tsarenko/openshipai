import React from 'react';
import Header from "../../components/landing-page-new/header/Header";
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";
import Description from "../../components/landing-page-new/description/Description";

const PrivacyPolicy = () => {
    return (
        <>
            <Header/>
            <Description
                title="OpenShipAI Privacy Policy"
                description="At OpenShipAI, we prioritize your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our services."
                subDescriptions={[
                    {
                        title: "Data Collection and Usage",
                        content: "We collect personal information such as your name, email, and shipping details to provide better services. This includes optimizing shipping processes, processing payments, and improving user experience. By using OpenShipAI, you agree to our data collection practices."
                    },
                    {
                        title: "How We Protect Your Data",
                        content: "Your data security is of utmost importance. We use encryption, firewalls, and other industry-standard security measures to ensure your information is protected against unauthorized access, disclosure, and alteration."
                    },
                    {
                        title: "Third-Party Sharing",
                        content: "We may share your information with trusted third-party service providers, including payment processors and logistics partners, strictly for operational purposes. OpenShipAI does not sell or lease your data to third parties for marketing purposes."
                    },
                    {
                        title: "Cookies and Tracking Technologies",
                        content: "We use cookies and similar tracking technologies to personalize your experience, analyze traffic, and ensure smooth functionality of our platform. You can manage cookie preferences through your browser settings."
                    },
                    {
                        title: "Your Data Rights",
                        content: "You have the right to access, update, or delete your personal information at any time. If you wish to exercise these rights, contact our support team. We are committed to complying with all applicable data privacy regulations."
                    },
                    {
                        title: "Changes to This Policy",
                        content: "We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the revised policy on our website. Continued use of our services after any changes implies your consent to the updated policy."
                    }
                ]}
            />
            <LandingPageFooter/>
        </>
    );
};

export default PrivacyPolicy;
