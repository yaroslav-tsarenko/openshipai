import React from 'react';
import Header from "../../components/landing-page-new/header/Header";
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";
import Description from "../../components/landing-page-new/description/Description";
import IntroductionContainer
    from "../../components/landing-page/landing-right-container/IntroductionContainer";
import EasyShippingImage from "../../assets/images/easy-shipping-illustration.svg";
import TransparentPricing from "../../assets/images/transparent-pricing.svg";
import FullScreenImage from "../../components/full-screen-image/FullScreenImage";
import {OpenShipImages} from "../../utils/images";
import {Fade} from "react-awesome-reveal";
import AdvantagesContainer from "../../components/landing-page/advantages-container/AdvantagesContainer";
import {faqItems} from "../../utils/faq3";
import FAQSection from "../../components/landing-page-new/faq-section/FAQSection";

const ShipPage = () => {
    return (
        <>
            <Header/>
            <Fade>
                <FullScreenImage src={OpenShipImages[8]}/>
            </Fade>
            <Description
                title="Why Shipping with OpenShipAI is the Best Choice"
                description="OpenShipAI takes shipping to the next level by combining state-of-the-art AI technology with a commitment to transparency, reliability, and cost-effectiveness. Our platform ensures seamless shipping operations for businesses of all sizes.
                Artificial Intelligence is transforming the logistics industry. Discover how AI enhances the efficiency and sustainability of shipping."
                subDescriptions={[
                    {
                        title: "Optimized Shipping for Every Need",
                        content: "AI enables smarter decision-making, automates time-consuming processes, and ensures sustainable practices in shipping operations. " +
                            "Our shipping solutions are designed to meet the diverse requirements of modern businesses:",
                        list: [
                            "Real-time tracking for complete shipment visibility.",
                            "AI-driven route optimization for faster deliveries.",
                            "Scalable solutions for small businesses and enterprises alike.",
                            "Reduces fuel consumption through optimized routes.",
                            "Automates warehouse operations for faster order fulfillment."
                        ],
                    },
                    {
                        title: "Commitment to Sustainability",
                        content: "At OpenShipAI, we prioritize sustainability in our shipping processes to minimize environmental impact:",
                        list: [
                            "Green logistics solutions powered by AI.",
                            "Reduced carbon footprint with optimized routes.",
                            "Commitment to eco-friendly packaging and practices."
                        ],
                    },
                ]}
            />

            <IntroductionContainer title="Start easy shipping"
                                   description="Discover simplicity with openship.ai, where seamless global
                                            logistics is at your fingertips.
                                            Start using modern transportation methods today."
                                   image={EasyShippingImage}
                                   reverse={true}/>
            <Description
                title="Why Shipping with OpenShipAI is the Ultimate Choice"
                description="OpenShipAI revolutionizes shipping by integrating cutting-edge AI technology with a strong commitment to transparency, reliability, and cost-effectiveness. Our platform ensures seamless and efficient shipping operations for businesses of all sizes."
                subDescriptions={[
                    {
                        title: "Optimized Shipping Solutions for Every Business Need",
                        content: "Our advanced shipping solutions are meticulously designed to meet the diverse requirements of modern businesses, ensuring efficiency and reliability:",
                        list: [
                            "Real-time tracking for complete shipment visibility, providing up-to-the-minute updates on your cargo's location and status.",
                            "AI-driven route optimization for faster deliveries, reducing transit times and enhancing customer satisfaction.",
                            "Scalable solutions for small businesses and large enterprises alike, offering flexibility and adaptability to your growing needs."
                        ],
                    },
                    {
                        title: "Cost-Effective and Transparent Pricing",
                        content: "OpenShipAI provides competitive and transparent pricing, eliminating hidden costs to maximize your shipping budget and ensure financial efficiency:",
                        list: { ordered: true, items: [
                                "Clear pricing structure tailored to your specific needs, providing detailed cost breakdowns and avoiding unexpected charges.",
                                "Flexible plans for varying shipment volumes, accommodating both high and low shipping demands with ease.",
                                "Advanced analytics to optimize cost-efficiency, leveraging data insights to reduce expenses and improve operational performance."
                            ]},
                    },
                    {
                        title: "Commitment to Sustainability",
                        content: "At OpenShipAI, we prioritize sustainability in our shipping processes to minimize environmental impact and promote eco-friendly practices:",
                        list: [
                            "Green logistics solutions powered by AI, enhancing efficiency while reducing carbon emissions and resource consumption.",
                            "Reduced carbon footprint with optimized routes, ensuring minimal environmental impact through intelligent route planning.",
                            "Commitment to eco-friendly packaging and practices, supporting sustainable materials and reducing waste in the supply chain."
                        ],
                    },
                ]}
            />
            <IntroductionContainer title="Transparent Pricing"
                                   description="Access immediate, transparent quotes from a wide array
                                           of international carriers. openship.ai ensures cost-effective solutions with no hidden fees."
                                   image={TransparentPricing}
                                   reverse={false}/>
            <Description
                title="Why Shipping with OpenShipAI is the Best Choice"
                description="OpenShipAI takes shipping to the next level by combining state-of-the-art AI technology with a commitment to transparency, reliability, and cost-effectiveness. Our platform ensures seamless shipping operations for businesses of all sizes."
                subDescriptions={[
                    {
                        title: "Optimized Shipping for Every Need",
                        content: "Our shipping solutions are designed to meet the diverse requirements of modern businesses:",
                        list: [
                            "Real-time tracking for complete shipment visibility.",
                            "AI-driven route optimization for faster deliveries.",
                            "Scalable solutions for small businesses and enterprises alike."
                        ],
                    },
                    {
                        title: "Cost-Effective and Transparent Pricing",
                        content: "OpenShipAI offers competitive and transparent pricing, eliminating hidden costs to maximize your shipping budget:",
                        list: { ordered: true, items: [
                                "Clear pricing structure tailored to your needs.",
                                "Flexible plans for varying shipment volumes.",
                                "Advanced analytics to optimize cost-efficiency."
                            ]},
                    },
                    {
                        title: "Commitment to Sustainability",
                        content: "At OpenShipAI, we prioritize sustainability in our shipping processes to minimize environmental impact:",
                        list: [
                            "Green logistics solutions powered by AI.",
                            "Reduced carbon footprint with optimized routes.",
                            "Commitment to eco-friendly packaging and practices."
                        ],
                    },
                ]}
            />
            <IntroductionContainer title="Start easy shipping"
                                   description="Discover simplicity with openship.ai, where seamless global
                                            logistics is at your fingertips.
                                            Start using modern transportation methods today."
                                   image={OpenShipImages[4]}
                                   reverse={false}/>
            <AdvantagesContainer/>
            <FAQSection faqItems={faqItems} />
            <LandingPageFooter/>
        </>
    );
};

export default ShipPage;