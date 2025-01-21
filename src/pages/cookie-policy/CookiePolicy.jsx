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
                description="At OpenShipAI, we prioritize your privacy and ensure transparency in how we use cookies. This Cookie Policy outlines how we use cookies and similar technologies to enhance your experience on our platform. By continuing to use our site, you consent to the use of cookies as described in this policy."
                subDescriptions={[
                    {
                        title: "1. Why We Use Cookies",
                        content: "Cookies are an essential part of our platform, allowing us to deliver a personalized and efficient user experience. Here are the primary reasons we use cookies:",
                        list: [
                            "To track website interactions and analyze user behavior for improving platform functionality.",
                            "To personalize content and recommend relevant services based on user preferences.",
                            "To enhance navigation and ensure a seamless user experience.",
                            "To analyze traffic and identify areas for optimization to improve performance.",
                            "To provide secure authentication and prevent unauthorized access.",
                            "To deliver targeted advertising that aligns with user interests."
                        ]
                    },
                    {
                        title: "2. Types of Cookies We Use",
                        content: "OpenShipAI uses a variety of cookies to achieve the above objectives. These include:",
                        list: [
                            "Session Cookies: Temporary cookies that are erased when you close your browser. They are used to maintain your session and enable secure navigation.",
                            "Persistent Cookies: Long-lasting cookies stored on your device to remember your preferences and enhance future visits.",
                            "Analytics Cookies: Used to track and analyze site performance, providing insights into user behavior and trends.",
                            "Advertising Cookies: Deployed to serve relevant advertisements based on your interactions and preferences.",
                            "Functional Cookies: Help store your preferences, such as language settings and login details, ensuring a consistent experience."
                        ]
                    },
                    {
                        title: "3. Third-Party Cookies",
                        content: "In addition to our cookies, we use trusted third-party services that may place cookies on your device. These include:",
                        list: [
                            "Analytics providers like Google Analytics to track user behavior and website performance.",
                            "Advertising networks to serve personalized ads based on your preferences.",
                            "Social media platforms to enable sharing and engagement directly from our site."
                        ]
                    },
                    {
                        title: "4. Managing Cookies",
                        content: "You have control over how cookies are used on your device. Here’s how you can manage them:",
                        list: [
                            "Most browsers allow you to accept, reject, or delete cookies through their settings.",
                            "You can set preferences to block certain types of cookies or receive alerts before a cookie is placed.",
                            "Keep in mind that disabling cookies may affect the functionality of our platform and limit certain features."
                        ]
                    },
                    {
                        title: "5. Data Collected Through Cookies",
                        content: "Cookies may collect the following types of data:",
                        list: [
                            "IP addresses and location data for personalized services.",
                            "Browser type and device information to ensure compatibility.",
                            "Pages visited, time spent on the platform, and interaction data for analytics."
                        ]
                    },
                    {
                        title: "6. Cookie Consent",
                        content: "By using OpenShipAI’s platform, you consent to our use of cookies as outlined in this policy. You can withdraw your consent at any time by adjusting your browser settings."
                    },
                    {
                        title: "7. Updates to This Cookie Policy",
                        content: "OpenShipAI may update this Cookie Policy periodically to reflect changes in practices or legal requirements. Key updates will be communicated through:",
                        list: [
                            "Notifications on our website.",
                            "Email alerts to registered users.",
                            "Revisions to the effective date at the top of this policy."
                        ]
                    },
                    {
                        title: "8. Contact Us",
                        content: "For questions or concerns regarding our Cookie Policy, please reach out to us via:",
                        list: [
                            "Email: cookies@openshipai.com",
                            "Address: 123 Logistics Lane, Innovation City, USA",
                            "Support Portal: Visit our Help Center for additional assistance."
                        ]
                    }
                ]}
            />
            <LandingPageFooter/>
        </>
    );
};

export default CookiePolicy;