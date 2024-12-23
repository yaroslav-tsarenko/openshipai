import React from 'react';
import Header from "../../components/landing-page-new/header/Header";
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";
import Description from "../../components/landing-page-new/description/Description";
import MainHeading from "../../components/landing-page-new/main-heading/MainHeading";
import BenefitChanger from "../../components/landing-page-new/benefit-changer/BenefitChanger";
import RoadAnalys from "../../assets/images/analyse-road-data.svg";
import AdaptiveWeatherPlanning from "../../assets/images/adaptive-weather-planning.svg";
import AiScreens from "../../assets/images/ai-screens.svg";
import BenefitWrapper from "../../components/landing-page-new/benefit-wrapper/BenefitWrapper";
import Role from "../../components/landing-page-new/role-container/Role";
import shipper from "../../assets/images/shipper.svg";
import carrier from "../../assets/images/carrier.svg";
import broker from "../../assets/images/broker.svg";
import dispatch from "../../assets/images/dispatch2.png";
import UniversalSection from "../../components/landing-page-new/universal/UniversalSection";
import {OpenShipImages} from "../../utils/images";
import {faqItems} from "../../utils/faq2";
import FAQSection from "../../components/landing-page-new/faq-section/FAQSection";


const PartnersPage = () => {
    const checkmarkTexts = [
        "Trusted by Carriers",
        "Seamless Integration"
    ];
    const h3 = "Enhance Efficiency, Maximize Profits, Ensure Compliance";
    const h2 = "Partner with OpenShipAI";
    const p = "OpenShipAI offers a comprehensive dispatch service for carriers, leveraging advanced AI technology to optimize load matching, reduce deadhead miles, and increase profitability. Join us and transform your shipping operations.";
    return (
        <>
            <Header/>
            <MainHeading
                checkmarkTexts={checkmarkTexts}
                h3={h3}
                h2={h2}
                p={p}
            />
            <Description
                title="Partners"
                description="At OpenShipAI, we offer a streamlined dispatch service for carriers at a competitive rate of just 5.5%. This service is designed to maximize your efficiency and profitability by leveraging our advanced AI technology and extensive network. With our dispatch service, you benefit from optimized load matching, reduced deadhead miles, and increased load acceptance rates. Our intuitive platform simplifies the process of finding and securing loads, allowing you to focus on what you do best—delivering exceptional service."
                subDescriptions={[
                    {
                        title: "Why OpenShipAI is the Best Solution for Carriers",
                        content: "Advanced AI Technology: Our AI-driven platform uses machine learning algorithms to match carriers with the most suitable loads, ensuring high efficiency and maximizing earnings. By analyzing historical data and real-time market conditions, we provide you with the best opportunities available. Comprehensive Support: We offer 24/7 support to assist you with any issues or questions. Our dedicated team is always available to help you navigate our platform, manage shipments, and optimize your operations. Real-Time Tracking and Transparency: Our platform provides real-time tracking and status updates, giving you full visibility of your shipments. This transparency helps build trust with shippers and enhances your reputation as a reliable carrier. Competitive Rates and Flexible Payments: Our competitive dispatch rate of 5.5% ensures you get the best value for your money. We also offer flexible payment options, including quick pay and factoring services, to help you maintain a steady cash flow."
                    },
                    {
                        title: "Legal and Insurance Safety Requirements",
                        content: "OpenShipAI is committed to maintaining the highest standards of safety and compliance. All our carriers must meet strict legal and insurance requirements to join our network: FMCSA Compliance: Every carrier must comply with the Federal Motor Carrier Safety Administration (FMCSA) regulations. This includes maintaining up-to-date operating authority, safety ratings, and compliance with Hours of Service (HOS) regulations. Comprehensive Insurance Coverage: Carriers must have active insurance policies that meet or exceed industry standards. This includes liability insurance, cargo insurance, and any additional coverage required for specific types of freight. Our platform verifies insurance details to ensure every load is protected. Vetted and Verified Carriers: We conduct thorough background checks and safety audits on all carriers in our network. This vetting process includes reviewing safety records, insurance policies, and compliance with regulatory requirements. Only carriers that meet our stringent criteria are allowed to operate under OpenShipAI."
                    },
                    {
                        title: "Enhancing Your Operations with OpenShipAI",
                        content: "Partnering with OpenShipAI means you benefit from our industry-leading technology, comprehensive support, and commitment to safety and compliance. Our platform is designed to enhance your operations, reduce administrative burdens, and increase profitability. Here’s how we do it: Optimized Load Matching: Our AI algorithms analyze multiple data points to match you with the best loads, reducing empty miles and increasing your load acceptance rate. Efficient Route Planning: With our route optimization tools, you can plan the most efficient paths, saving time and fuel costs. This not only improves your bottom line but also contributes to a more sustainable operation. Seamless Communication: Our platform facilitates seamless communication between carriers and shippers, ensuring that all parties are informed and updated throughout the shipping process. Access to a Large Network: As part of the OpenShipAI network, you gain access to a vast pool of shippers and freight opportunities. This extensive network ensures that you always have access to the best loads available."
                    },
                    {
                        title: "Join OpenShipAI Today",
                        content: "If you’re a carrier looking for a reliable, efficient, and profitable solution, look no further than OpenShipAI. Our 5.5% dispatch service, advanced technology, and unwavering commitment to safety and compliance make us the best choice for your logistics needs. Join us today and experience the benefits of partnering with an industry leader."
                    }
                ]}
            />
            <BenefitWrapper>
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
                <BenefitChanger
                    backgroundColor="#fff"
                    label="SMART DECISIONS"
                    title="RT Data for Smarter Decisions"
                    description="OpenShipAI delivers real-time data on market trends, vehicle availability, and load capacities."
                    subDescription="AI-powered dashboards provide actionable insights into market conditions, carrier availability, and shipment status, giving you a competitive edge."
                    subImage={RoadAnalys}
                    img={RoadAnalys}
                    variant="white"
                />
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
            </BenefitWrapper>
            <UniversalSection>
                <Role title="Shipper" description="Shippers can post their loads and carriers can bid on them."
                      role="shipper" image={shipper}/>
                <Role title="Carrier"
                      description="Carriers can browse available loads and place bids to transport them." role="carrier"
                      image={carrier}/>
                <Role title="Broker"
                      description="Brokers facilitate the connection between shippers and carriers, ensuring smooth transactions."
                      role="broker" image={broker}/>
                <Role title="Dispatch"
                      description="Dispatchers coordinate the logistics and ensure timely delivery of loads."
                      role="dispatch" image={dispatch}/>
            </UniversalSection>
            <FAQSection faqItems={faqItems} />
            <Description
                title="Partnership"
                description="At OpenShipAI, we provide an efficient dispatch service for carriers at a competitive rate of just 5.5%. This service is designed to enhance your efficiency and profitability by utilizing our advanced AI technology and extensive network. With our dispatch service, you benefit from optimized load matching, reduced empty miles, and increased load acceptance rates. Our user-friendly platform simplifies the process of finding and securing loads, allowing you to focus on delivering exceptional service."
                subDescriptions={[
                    {
                        title: "Why OpenShipAI is the Ideal Solution for Carriers",
                        content: "Cutting-Edge AI Technology: Our AI-powered platform uses machine learning algorithms to match carriers with the most suitable loads, ensuring high efficiency and maximizing earnings. By analyzing historical data and real-time market conditions, we provide you with the best opportunities available. Comprehensive Support: We offer 24/7 support to assist you with any issues or questions. Our dedicated team is always available to help you navigate our platform, manage shipments, and optimize your operations. Real-Time Tracking and Transparency: Our platform provides real-time tracking and status updates, giving you full visibility of your shipments. This transparency helps build trust with shippers and enhances your reputation as a reliable carrier. Competitive Rates and Flexible Payments: Our competitive dispatch rate of 5.5% ensures you get the best value for your money. We also offer flexible payment options, including quick pay and factoring services, to help you maintain a steady cash flow."
                    },
                    {
                        title: "Legal and Insurance Compliance",
                        content: "OpenShipAI is committed to maintaining the highest standards of safety and compliance. All our carriers must meet strict legal and insurance requirements to join our network: FMCSA Compliance: Every carrier must comply with the Federal Motor Carrier Safety Administration (FMCSA) regulations. This includes maintaining up-to-date operating authority, safety ratings, and compliance with Hours of Service (HOS) regulations. Comprehensive Insurance Coverage: Carriers must have active insurance policies that meet or exceed industry standards. This includes liability insurance, cargo insurance, and any additional coverage required for specific types of freight. Our platform verifies insurance details to ensure every load is protected. Vetted and Verified Carriers: We conduct thorough background checks and safety audits on all carriers in our network. This vetting process includes reviewing safety records, insurance policies, and compliance with regulatory requirements. Only carriers that meet our stringent criteria are allowed to operate under OpenShipAI."
                    },
                    {
                        title: "Improving Your Operations with OpenShipAI",
                        content: "Partnering with OpenShipAI means you benefit from our industry-leading technology, comprehensive support, and commitment to safety and compliance. Our platform is designed to enhance your operations, reduce administrative burdens, and increase profitability. Here’s how we do it: Optimized Load Matching: Our AI algorithms analyze multiple data points to match you with the best loads, reducing empty miles and increasing your load acceptance rate. Efficient Route Planning: With our route optimization tools, you can plan the most efficient paths, saving time and fuel costs. This not only improves your bottom line but also contributes to a more sustainable operation. Seamless Communication: Our platform facilitates seamless communication between carriers and shippers, ensuring that all parties are informed and updated throughout the shipping process. Access to a Large Network: As part of the OpenShipAI network, you gain access to a vast pool of shippers and freight opportunities. This extensive network ensures that you always have access to the best loads available."
                    },
                    {
                        title: "Join OpenShipAI Today",
                        content: "If you’re a carrier looking for a reliable, efficient, and profitable solution, look no further than OpenShipAI. Our 5.5% dispatch service, advanced technology, and unwavering commitment to safety and compliance make us the best choice for your logistics needs. Join us today and experience the benefits of partnering with an industry leader."
                    },
                    {
                        title: "Partner Advantages",
                        content: "As an OpenShipAI partner, you gain access to exclusive benefits that enhance your operations and profitability. Our platform offers advanced analytics, real-time market insights, and dedicated support to help you stay ahead of the competition. Partner with us and leverage our technology to drive your business forward."
                    }
                ]}
            />
            <LandingPageFooter/>
        </>
    );
};

export default PartnersPage;