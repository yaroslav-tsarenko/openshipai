import React from 'react';
import Header from "../../components/landing-page-new/header/Header";
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";
import Description from "../../components/landing-page-new/description/Description";

const PrivacyPolicy = () => {
    return (
        <>
            <Header/>
            <Description
                title="Privacy Policy"
                description="At OpenShipAI, your privacy is a top priority. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our services. OpenShipAI is committed to creating a secure and transparent environment for all users, ensuring that your data remains safe and is handled responsibly."
                subDescriptions={[
                    {
                        title: "1. Data Collection and Usage",
                        content: "We collect and use your information to enhance our services. The data collected enables OpenShipAI to provide seamless logistics solutions and optimize your experience. Specifically, this includes:",
                        list: [
                            "Personal information such as name, email address, and contact details. This information is essential for account setup, communication, and personalized service.",
                            "Shipping details for processing and optimizing logistics, allowing us to match you with reliable carriers and ensure timely deliveries.",
                            "Payment details for transaction processing, ensuring secure and efficient payment handling.",
                            "Usage data to improve platform functionality and user experience, including analytics to understand user behavior and platform engagement."
                        ]
                    },
                    {
                        title: "2. Data Protection Measures",
                        content: "We take the security of your data seriously and implement robust measures to ensure it remains protected. OpenShipAI utilizes cutting-edge technology and industry standards to safeguard your personal information. Our security measures include:",
                        list: [
                            "End-to-end encryption to secure data during transfer and prevent interception by unauthorized parties.",
                            "Regular security audits and vulnerability assessments to identify and address potential risks proactively.",
                            "Strict access controls to protect against unauthorized access to sensitive information.",
                            "Data storage on secure servers with multiple layers of protection, including firewalls and intrusion detection systems."
                        ]
                    },
                    {
                        title: "3. Third-Party Sharing",
                        content: "We may share your information with trusted third parties only when necessary to provide our services. These third parties are contractually obligated to protect your data and use it solely for operational purposes. Examples of third-party sharing include:",
                        list: [
                            "Payment processors for secure transactions and fraud prevention.",
                            "Logistics partners for shipment tracking, delivery updates, and carrier matching.",
                            "Regulatory authorities when required by law to comply with legal obligations."
                        ]
                    },
                    {
                        title: "4. Cookies and Tracking Technologies",
                        content: "OpenShipAI uses cookies and tracking tools to provide a personalized and efficient user experience. These technologies help us understand user behavior, optimize platform performance, and deliver tailored content. Our cookie usage includes:",
                        list: [
                            "Session cookies to maintain your login session and ensure smooth navigation.",
                            "Analytics cookies to understand usage patterns and improve platform functionality.",
                            "Preference cookies to remember your settings and provide a consistent experience.",
                            "Advertising cookies to deliver relevant promotions and track campaign effectiveness."
                        ]
                    },
                    {
                        title: "5. Your Data Rights",
                        content: "You have control over your personal data and can exercise your rights at any time. OpenShipAI is committed to ensuring transparency and compliance with data privacy regulations. Your rights include:",
                        list: [
                            "Accessing your personal information to understand what data we hold about you.",
                            "Requesting corrections to inaccurate or incomplete information.",
                            "Deleting your data, subject to legal obligations and retention requirements.",
                            "Withdrawing consent for specific data processing activities where applicable."
                        ]
                    },
                    {
                        title: "6. Legal Compliance and Data Retention",
                        content: "OpenShipAI complies with all applicable data privacy laws and regulations. This includes ensuring that your data is stored securely and retained only for as long as necessary to fulfill our obligations. Key points include:",
                        list: [
                            "Adhering to GDPR, CCPA, and other regional data protection standards.",
                            "Retaining data for operational purposes, legal requirements, or dispute resolution.",
                            "Deleting or anonymizing data after it is no longer needed."
                        ]
                    },
                    {
                        title: "7. Children’s Privacy",
                        content: "OpenShipAI does not knowingly collect or process personal information from children under the age of 13. If you believe we have inadvertently collected such data, please contact us immediately."
                    },
                    {
                        title: "8. Updates to This Policy",
                        content: "OpenShipAI may revise this Privacy Policy periodically to reflect changes in our services or legal requirements. Significant updates will be communicated clearly through:",
                        list: [
                            "Email notifications to registered users.",
                            "Prominent notices on our website to inform all visitors.",
                            "Updated effective dates included in this policy document."
                        ]
                    },
                    {
                        title: "9. Contact Us",
                        content: "If you have questions, concerns, or requests regarding this Privacy Policy, OpenShipAI is here to help. Please reach out to us through the following channels:",
                        list: [
                            "Email: privacy@openshipai.com",
                            "Address: 123 Logistics Lane, Innovation City, USA",
                            "Support portal: Visit our Help Center for quick assistance."
                        ]
                    },
                    {
                        title: "10. More Information",
                        content: "For additional information about our data handling practices, please refer to:",
                        list: [
                            "OpenShipAI Terms of Service, which outline general usage policies.",
                            "Our Cookie Policy for detailed information on tracking technologies.",
                            "FAQs on our website for common questions and answers about your privacy."
                        ]
                    }
                ]}
            />
            <LandingPageFooter/>
        </>
    );
};

export default PrivacyPolicy;