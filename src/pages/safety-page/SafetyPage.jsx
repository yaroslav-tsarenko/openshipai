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
            <Description
                title="Safety and Compliance"
                description="At OpenShipAI, safety is our top priority. Our SEYFER system ensures that all transactions and shipments are secure, giving you peace of mind throughout the logistics process. SEYFER employs advanced encryption and security protocols to protect your sensitive information and financial transactions. With real-time monitoring and automated alerts, we can quickly identify and address any potential security threats, ensuring your shipments are safe from start to finish."
                subDescriptions={[
                    {
                        title: "Compliance with FMCSA Regulations",
                        content: "We adhere to the strict guidelines set by the Federal Motor Carrier Safety Administration (FMCSA) to ensure the highest standards of safety and compliance. All our carriers are fully licensed and meet or exceed FMCSA requirements, including regular safety audits and inspections. By partnering with carriers who comply with FMCSA regulations, we ensure that your goods are transported by professionals committed to safety and reliability."
                    },
                    {
                        title: "Comprehensive Insurance Coverage",
                        content: "OpenShipAI takes the worry out of shipping by providing comprehensive insurance coverage for all shipments. We work with top-rated insurance providers to offer coverage that protects your cargo against loss, damage, and theft. Our insurance policies are tailored to meet the specific needs of each shipment, ensuring that you have the right level of protection. In the unlikely event of an incident, our dedicated support team will assist you in navigating the claims process quickly and efficiently."
                    },
                    {
                        title: "Licensed and Insured Carriers",
                        content: "Every carrier in our network is thoroughly vetted to ensure they are fully licensed and insured. This rigorous selection process includes verifying carrier credentials, reviewing safety records, and assessing overall performance. By working only with carriers who meet our strict criteria, we guarantee that your shipments are handled by reliable and professional operators. Our commitment to using licensed and insured carriers not only enhances safety but also fosters trust and confidence in our services."
                    },
                    {
                        title: "Ongoing Safety Training and Education",
                        content: "To maintain the highest standards of safety, we provide ongoing training and education for our carriers. This includes regular updates on industry best practices, safety protocols, and regulatory changes. By staying informed and prepared, our carriers can deliver superior service while minimizing risks. Our focus on continuous improvement ensures that safety remains a core value in every aspect of our operations."
                    },
                    {
                        title: "Peace of Mind with OpenShipAI",
                        content: "At OpenShipAI, we understand the importance of trust and security in the logistics industry. Our comprehensive approach to safety—through SEYFER, compliance with FMCSA regulations, comprehensive insurance, and stringent carrier vetting—ensures that your shipments are in good hands. With 24/7 support and real-time tracking, you can monitor your cargo’s journey and rest assured that it is being handled with the utmost care and professionalism."
                    }
                ]}
            />
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