import React from 'react';
import Header from "../../components/landing-page-new/header/Header";
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";
import OpenShipAIChat from "../../components/open-ai-chat/OpenShipAIChat";
import styles from "./AIPage.module.scss";
import Description from "../../components/landing-page-new/description/Description";
import {Fade} from "react-awesome-reveal";
import FullScreenImage from "../../components/full-screen-image/FullScreenImage";
import {OpenShipImages} from "../../utils/images";
import FAQSection from "../../components/landing-page-new/faq-section/FAQSection";
import {faqItems} from "../../utils/faq4";
import IntroductionContainer from "../../components/landing-page/landing-right-container/IntroductionContainer";
import EasyShippingImage from "../../assets/images/easy-shipping-illustration.svg";
import BenefitWrapper from "../../components/landing-page-new/benefit-wrapper/BenefitWrapper";
import BenefitChanger from "../../components/landing-page-new/benefit-changer/BenefitChanger";
import HelpMoneyAI from "../../assets/images/help-money-ai.svg";
import AdaptiveWeatherPlanning from "../../assets/images/adaptive-weather-planning.svg";
import AiScreens from "../../assets/images/ai-screens.svg";

const AiPage = () => {
    return (
        <>
            <Header/>
            <Fade>
                <FullScreenImage src={OpenShipImages[6]}/>
            </Fade>
            <Description
                title="AI Revolutionizing Logistics"
                description="Experience the future of logistics with our AI-powered platform. OpenShipAI optimizes shipping routes, reduces operational costs, and enhances delivery speed using cutting-edge artificial intelligence. Book a free demo today to see how our innovative solutions can streamline your supply chain, improve efficiency, and give your business a competitive edge in the ever-evolving logistics landscape."
            />
            <Description
                title="Here is Free Demo"
            />
            <Fade>
                <div className={styles.aiPage}>
                    <OpenShipAIChat restricted={true}/>
                </div>
            </Fade>
                <Description
                    title="AI Transforming the World"
                    description="Artificial Intelligence (AI) is revolutionizing industries globally, driving unprecedented efficiency, accuracy, and innovation. From healthcare to finance, AI is reshaping how we live and work, fostering growth and creating new opportunities. OpenShipAI is leveraging this transformative power to redefine logistics, making it smarter, faster, and more transparent. By integrating advanced machine learning algorithms, our AI solutions optimize route planning, automate warehousing operations, and predict demand fluctuations with precision. This not only enhances productivity but also significantly reduces operational costs, contributing to a sustainable and scalable logistics ecosystem."
                    subDescriptions={[
                        {
                            title: "AI in Logistics: Enhancing Efficiency and Reliability",
                            content: "In the logistics industry, where time and accuracy are critical, AI brings a level of precision and efficiency that was previously unattainable. AI-driven analytics provide deep insights into supply chain dynamics, enabling businesses to anticipate disruptions and adapt proactively. Our AI technology continuously learns and improves, ensuring that our logistics solutions remain cutting-edge and highly effective. By utilizing predictive analytics, we can forecast demand, manage inventory more efficiently, and optimize delivery routes to reduce delays and costs. This level of optimization leads to improved service quality and customer satisfaction, making logistics operations more reliable and efficient."
                        },
                        {
                            title: "Real-Time Tracking and Automation",
                            content: "OpenShipAI’s AI-driven platform offers real-time tracking and automation, providing our clients with up-to-the-minute information about their shipments. This transparency allows businesses to monitor their goods' progress, manage exceptions, and make informed decisions quickly. Automation of routine tasks such as documentation, invoicing, and communication reduces the administrative burden on businesses, freeing up valuable resources to focus on core activities. Our AI technology also enhances security by monitoring shipments for potential risks and anomalies, ensuring that goods are transported safely and securely."
                        },
                        {
                            title: "Sustainability and Scalability through AI",
                            content: "Our commitment to sustainability is reinforced by our use of AI to minimize environmental impact. By optimizing routes and reducing fuel consumption, we help decrease the carbon footprint associated with logistics. AI also enables more efficient use of resources, reducing waste and promoting sustainable practices across the supply chain. Scalability is another significant advantage of AI; as your business grows, our AI solutions can adapt to increasing volumes and complexity without compromising efficiency. This scalability ensures that our logistics services can support your business's growth and evolving needs."
                        },
                        {
                            title: "Driving Innovation in Logistics with AI",
                            content: "At OpenShipAI, we are dedicated to driving innovation in logistics through the power of AI. Our continuous investment in research and development ensures that we stay ahead of industry trends and technological advancements. We collaborate with leading experts and institutions to refine our algorithms and develop new solutions that address emerging challenges in the logistics sector. Our innovative spirit is reflected in our commitment to providing our clients with the most advanced and effective logistics solutions available."
                        },
                        {
                            title: "Shaping the Future of Logistics",
                            content: "As we continue to innovate, OpenShipAI is committed to driving the future of logistics with AI at its core. Our vision is to create a more efficient, transparent, and sustainable logistics industry where businesses can thrive, and customers receive unparalleled service. By harnessing the power of AI, we are setting new standards for logistics operations, ensuring that our clients can navigate the complexities of global supply chains with confidence and ease. Join us on this journey and experience the transformative power of AI in logistics."
                        }
                    ]}
                />
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
            </BenefitWrapper>
            <Description
                title="AI Help in Logistics"
                description="AI helping in logistics by providing real-time insights, automating processes, and optimizing routes. OpenShipAI's AI-powered platform is designed to meet the diverse needs of modern businesses, offering scalable solutions for enterprises and small businesses alike. Our AI technology reduces fuel consumption, automates warehouse operations, and optimizes routes for faster deliveries. Experience the future of logistics with OpenShipAI."
            />
            <IntroductionContainer title="AI-Powered Logistics"
                                   description="AI is transforming the logistics industry, optimizing routes, reducing costs, and enhancing delivery speed. Experience the future of shipping with OpenShipAI."
                                   image={OpenShipImages[7]}
                                   reverse={true}/>
            <FAQSection faqItems={faqItems} />
            <Fade>
                <LandingPageFooter/>
            </Fade>
        </>
    );
};

export default AiPage;