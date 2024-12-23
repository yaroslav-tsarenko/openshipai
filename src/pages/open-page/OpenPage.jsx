import React from 'react';
import Header from "../../components/landing-page-new/header/Header";
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";
import Description from "../../components/landing-page-new/description/Description";
import FullScreenImage from "../../components/full-screen-image/FullScreenImage";
import {Fade} from "react-awesome-reveal";
import {OpenShipImages} from "../../utils/images";
import IntroductionContainer from "../../components/landing-page/landing-right-container/IntroductionContainer";
import BenefitWrapper from "../../components/landing-page-new/benefit-wrapper/BenefitWrapper";
import BenefitChanger from "../../components/landing-page-new/benefit-changer/BenefitChanger";
import HelpMoneyAI from "../../assets/images/help-money-ai.svg";
import AdaptiveWeatherPlanning from "../../assets/images/adaptive-weather-planning.svg";
import AiScreens from "../../assets/images/ai-screens.svg";
import {faqItems} from "../../utils/faq2"
import FAQSection from "../../components/landing-page-new/faq-section/FAQSection";
import AutoTransportDesicions from "../../assets/images/auto-transport-delivery.svg";
import TransparentPricing from "../../assets/images/transparent-pricing.svg";
import EasyShippingImage from "../../assets/images/easy-shipping-illustration.svg";
import AllTimeUpdate from "../../assets/images/all-time-update.svg";

const OpenPage = () => {
    return (
        <>
            <Header/>
            <Fade>
                <FullScreenImage src={OpenShipImages[9]}/>
            </Fade>
            <Description
                title="Transforming Logistics with AI: OpenShipAI's Vision"
                description="OpenShipAI is revolutionizing the logistics industry by harnessing the transformative power of artificial intelligence (AI). Our mission is to redefine how businesses manage freight, streamline operations, and optimize shipping processes. With a vision of creating a seamless, efficient, and transparent logistics ecosystem, OpenShipAI empowers shippers, carriers, and businesses to achieve unparalleled operational excellence. Through advanced AI algorithms, we enable precise route optimization, real-time shipment tracking, and data-driven decision-making, reducing costs and enhancing productivity. By fostering innovation, sustainability, and trust, OpenShipAI is setting the standard for the future of smart logistics."
                subDescriptions={[
                    {
                        title: "Core Values of OpenShipAI:",
                        list: [
                            "Innovation: Pioneering New AI Technologies\n" +
                            "OpenShipAI is at the forefront of technological advancements in the logistics industry. By integrating cutting-edge artificial intelligence solutions, we are redefining how businesses manage freight and optimize their supply chains. Our innovative AI-driven tools include real-time shipment tracking, predictive analytics for demand forecasting, and automated route planning, all designed to minimize delays and maximize efficiency. With continuous research and development, OpenShipAI leads the way in creating future-ready logistics solutions that drive progress and set new industry standards.\n" +
                            "\n",
                            "Transparency: Building Trust with Clear Operations\n" +
                            "Transparency is the cornerstone of OpenShipAI’s operations. Our platform provides shippers and carriers with real-time updates, detailed analytics, and comprehensive shipment tracking to ensure complete visibility throughout the logistics process. By offering clear and accurate data, we empower businesses to make informed decisions, enhance customer trust, and foster long-term partnerships. OpenShipAI’s commitment to transparent practices eliminates hidden fees, minimizes risks, and ensures accountability at every step of the supply chain.",
                            "Efficiency: Streamlining Logistics Processes\n" +
                            "Efficiency is essential for staying competitive in today’s fast-paced logistics environment. OpenShipAI leverages AI-powered tools to streamline logistics workflows, from automated freight matching to intelligent warehouse management. Our solutions reduce manual effort, optimize resource allocation, and cut down operational costs, enabling businesses to achieve faster deliveries and improved productivity. By simplifying complex logistics processes, OpenShipAI helps companies focus on growth and customer satisfaction while staying ahead of the competition.",
                            "Sustainability: Reducing Environmental Impact\n" +
                            "OpenShipAI is committed to promoting green logistics by adopting sustainable practices and technologies. Our AI systems optimize routes to reduce fuel consumption and lower carbon emissions, contributing to a cleaner and greener environment. Additionally, we encourage eco-friendly packaging and collaborate with partners who share our vision of sustainability. By integrating energy-efficient operations and minimizing waste, OpenShipAI helps businesses achieve their sustainability goals while supporting global efforts to combat climate change.",
                            "Customer Focus: Prioritizing Client Needs\n" +
                            "At OpenShipAI, our clients are at the heart of everything we do. We tailor our logistics solutions to meet the unique needs of businesses, ensuring exceptional service and support. Our 24/7 customer service team is always available to address queries and provide assistance, ensuring a seamless experience. By prioritizing customer satisfaction, OpenShipAI builds strong relationships and delivers unparalleled value. From small businesses to large enterprises, our platform is designed to cater to diverse logistics requirements, ensuring every client’s success."
                        ]
                    },
                ]}
            />
            <IntroductionContainer title={"Start Shipping with OpenShipAI"}
                                      description={"Experience the future of logistics with OpenShipAI, where AI-driven solutions transform shipping operations and optimize supply chain management. Join us in shaping the future of smart logistics."}
                                      image={OpenShipImages[1]}
                                      reverse={true}/>
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
                    subImage={HelpMoneyAI}
                    img={HelpMoneyAI}
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
            <Description
                title="Redefining Logistics with AI: OpenShipAI's Perspective"
                description="OpenShipAI is reshaping the logistics landscape by utilizing the innovative capabilities of artificial intelligence (AI). Our goal is to revolutionize how companies handle freight, enhance operational efficiency, and optimize their shipping workflows. OpenShipAI strives to build a connected, efficient, and transparent logistics network, empowering shippers, carriers, and businesses to achieve superior performance. Leveraging advanced AI models, we ensure accurate route planning, live shipment tracking, and informed decision-making, which lower costs and improve productivity. By embracing innovation, eco-friendly practices, and trust, OpenShipAI paves the way for smarter logistics solutions."
                subDescriptions={[
                    {
                        title: "Key Principles of OpenShipAI:",
                        list: [
                            "Innovation: Leading the Charge with AI Advancements\n" +
                            "OpenShipAI spearheads technological progress in logistics by integrating advanced AI solutions. Our platform redefines freight management and supply chain optimization, offering innovative tools like live shipment tracking, predictive analytics for forecasting demand, and automated route optimization. Through continuous R&D, OpenShipAI creates next-gen logistics solutions that set new benchmarks for the industry.\n",

                            "Transparency: Cultivating Confidence with Clarity\n" +
                            "Clarity and openness define OpenShipAI’s approach. Our system provides shippers and carriers with real-time data, in-depth analytics, and complete shipment tracking for unparalleled visibility. By delivering precise information, we help businesses make smarter decisions, build customer confidence, and foster lasting partnerships. Our transparent operations eliminate unexpected costs, reduce risks, and maintain accountability throughout the supply chain.\n",

                            "Efficiency: Enhancing Workflow Optimization\n" +
                            "Efficiency is critical in today’s dynamic logistics world. OpenShipAI employs AI-driven tools to simplify logistics processes, from automated freight coordination to smart warehouse management. Our solutions decrease manual workload, optimize resource use, and lower operational expenses, ensuring quicker deliveries and higher productivity. By addressing logistical complexities, OpenShipAI empowers companies to focus on growth and client satisfaction, staying ahead in a competitive market.\n",

                            "Sustainability: Championing Green Logistics\n" +
                            "OpenShipAI prioritizes sustainability by implementing eco-friendly strategies and technologies. Our AI optimizes routes to cut fuel usage and reduce carbon emissions, contributing to a healthier environment. We promote the adoption of sustainable packaging and collaborate with like-minded partners to foster green logistics. By integrating energy-efficient practices and minimizing waste, OpenShipAI supports global sustainability efforts and helps businesses meet their eco-goals.\n",

                            "Customer Focus: Delivering Tailored Solutions\n" +
                            "At OpenShipAI, our clients are central to our mission. We design logistics solutions to fit the distinct needs of every business, ensuring exceptional service and dedicated support. Our 24/7 support team is available to address concerns and provide assistance for a seamless experience. By putting customer satisfaction first, OpenShipAI fosters long-term relationships and delivers outstanding value. Our platform caters to the diverse logistics needs of businesses, from startups to large enterprises, guaranteeing their success."
                        ]
                    },
                ]}
            />
            <IntroductionContainer title={"Begin Your Journey with OpenShipAI"}
                                   description={"Discover the next generation of logistics with OpenShipAI. Our AI-powered solutions revolutionize shipping operations and enhance supply chain management. Be a part of the future of intelligent logistics."}
                                   image={OpenShipImages[6]}
                                   reverse={false}/>
            <BenefitWrapper>
                <BenefitChanger
                    backgroundColor="#1a73e8"
                    label="Effortless Cost Management"
                    title="Slash Shipping Costs with AI"
                    description="OpenShipAI’s advanced AI helps you effortlessly lower your shipping expenses."
                    subDescription="Real-time algorithms work behind the scenes, comparing multiple options to secure the best rates while maintaining delivery speed and service quality."
                    subImage={AutoTransportDesicions}
                    img={AutoTransportDesicions}
                    variant="light-blue"
                    buttonType="click-to-action"
                />
                <BenefitChanger
                    backgroundColor="#fff"
                    label="Seamless Operational Efficiency"
                    title="Boost Your Supply Chain with AI"
                    description="Our AI streamlines every aspect of logistics, automating processes and optimizing routes."
                    subDescription="By analyzing traffic, carrier availability, and demand fluctuations, AI ensures minimal downtime and resource wastage, keeping your operations running smoothly."
                    subImage={TransparentPricing}
                    img={TransparentPricing}
                    variant="dark-blue"
                />
                <BenefitChanger
                    backgroundColor="#e8f0fe"
                    label="Actionable Data at Your Fingertips"
                    title="Leverage Data-Driven Decisions"
                    description="Make smarter logistics decisions with real-time data and AI-driven insights."
                    subDescription="Our data-rich platform keeps you informed with comprehensive analytics on fleet performance, market conditions, and shipping demands, all in one dashboard."
                    subImage={EasyShippingImage}
                    img={EasyShippingImage}
                    variant="blue"
                />
                <BenefitChanger
                    backgroundColor="#174ea6"
                    label="Automated Load Management"
                    title="AI Dispatching Solutions"
                    description="Harness AI for automated dispatching, assigning loads to the best carriers based on proximity."
                    subDescription="Automatically assign shipments to carriers with optimized matching that reduces delays, boosts reliability, and increases the speed of load assignments."
                    subImage={AllTimeUpdate}
                    img={AllTimeUpdate}
                    variant="white"
                    buttonType="click-to-action"
                />
            </BenefitWrapper>
            <FAQSection faqItems={faqItems} />
            <LandingPageFooter/>
        </>
    );
};

export default OpenPage;