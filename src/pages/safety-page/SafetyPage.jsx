import React from 'react';
import Header from "../../components/landing-page-new/header/Header";
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";
import Description from "../../components/landing-page-new/description/Description";
import IntroductionContainer
    from "../../components/landing-page/landing-right-container/IntroductionContainer";
import FullScreenImage from "../../components/full-screen-image/FullScreenImage";
import {OpenShipImages} from "../../utils/images";
import {Fade} from "react-awesome-reveal";
import BenefitWrapper from "../../components/landing-page-new/benefit-wrapper/BenefitWrapper";
import BenefitChanger from "../../components/landing-page-new/benefit-changer/BenefitChanger";
import AdaptiveWeatherPlanning from "../../assets/images/adaptive-weather-planning.svg";
import AiScreens from "../../assets/images/ai-screens.svg";
import HelpMoneyAI from "../../assets/images/help-money-ai.svg";
import FAQSection from "../../components/landing-page-new/faq-section/FAQSection";
import {faqItems} from "../../utils/faq5";

const SafetyPage = () => {
    return (
        <>
            <Header/>
            <Description
                title="Safety and Compliance"
            description={"At OpenShipAI, safety is our top priority. Our SEYFER system ensures that all transactions and shipments are secure, giving you peace of mind throughout the logistics process. SEYFER employs advanced encryption and security protocols to protect your sensitive information and financial transactions. With real-time monitoring and automated alerts, we can quickly identify and address any potential security threats, ensuring your shipments are safe from start to finish."}
            />
            <Fade>
                <FullScreenImage src={OpenShipImages[2]}/>
            </Fade>
            <BenefitWrapper>
                <BenefitChanger
                    backgroundColor="#e8f0fe"
                    label="AUTOMATED DISPATCH"
                    title="Faster Dispatch with AI"
                    description="AI automates load dispatch to the best carriers based on location and load needs, ensuring faster and more reliable shipping."
                    subDescription="AI continually assesses carriers and drivers for the best match, ensuring quick, efficient dispatch, reducing delays, and improving shipment reliability."
                    subImage={AdaptiveWeatherPlanning}
                    img={AdaptiveWeatherPlanning}
                    variant="light-blue"
                />
                <BenefitChanger
                    backgroundColor="#fff"
                    label="SMART DECISIONS"
                    title="RT Data for Smarter Decisions"
                    description="OpenShipAI delivers real-time data on market trends, vehicle availability, and load capacities."
                    subDescription="AI-powered dashboards provide actionable insights into market conditions, carrier availability, and shipment status, giving you a competitive edge."
                    subImage={HelpMoneyAI}
                    img={HelpMoneyAI}
                    variant="white"
                />
                <BenefitChanger
                    backgroundColor="#174ea6"
                    label="cost savings"
                    title="Save AI Shipping Rates"
                    subDescription="Our AI compares transport options in real-time to find the best shipping rates, cutting costs and optimizing logistics for your business."
                    description="Instantly compare carrier prices with AI-driven algorithms to secure the lowest rates without compromising service quality."
                    subImage={AiScreens}
                    img={AiScreens}
                    variant="dark-blue"
                    buttonType="click-to-action"
                />
                <BenefitChanger
                    backgroundColor="#1a73e8"
                    label="EFFICIENCY BOOST"
                    title="AI Optimized Supply Chain"
                    description="Maximize efficiency with AI insights that automatically suggest the best routes."
                    subDescription="AI tracks shipments and vehicle availability in real-time, optimizing routes and reducing idle time, boosting your supply chain's performance."
                    subImage={OpenShipImages[5]}
                    img={OpenShipImages[5]}
                    variant="blue"
                    buttonType="click-to-action"
                />
            </BenefitWrapper>
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
            <IntroductionContainer title="Start easy shipping"
                                   description="Discover simplicity with openship.ai, where seamless global
                                            logistics is at your fingertips.
                                            Start using modern transportation methods today."
                                   image={OpenShipImages[1]}/>
            <FAQSection faqItems={faqItems} />
            <LandingPageFooter/>
        </>
    );
};

export default SafetyPage;