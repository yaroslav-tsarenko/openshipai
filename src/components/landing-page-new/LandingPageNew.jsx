import React from 'react';
import Header from "./header/Header";
import MainHeading from "./main-heading/MainHeading";
import LoadCategory from "./load-category/LoadCategory";
import LoadCategories from "./load-categories-section/LoadCategories";
import vehicleLoadCategory from "../../assets/vehicles-category-image.svg"
import movingLoadCategory from "../../assets/moving-category-image.svg"
import heavyLoadCategory from "../../assets/heavy-construction-category.svg"
import freightLoadCategory from "../../assets/freight-category-image.svg"
import helpMoneyAI from "../../assets/help-money-ai.svg"
import shipper from "../../assets/shipper.svg"
import carrier from "../../assets/carrier.svg"
import broker from "../../assets/broker.svg"
import dispatch from "../../assets/dispatch2.png"
import HowItWorks from "./how-it-works/HowItWorks";
import BenefitWrapper from "./benefit-wrapper/BenefitWrapper";
import BenefitChanger from "./benefit-changer/BenefitChanger";
import UniversalSection from "./universal/UniversalSection";
import Role from "./role-container/Role";
import ClientReviewContent from "./client-review-content/ClientReviewContent";
import ClientItemReview from "./client-item-review/ClientItemReview";
import clientAvatar from "../../assets/avatar-client-1.svg";
import clientAvatar2 from "../../assets/avatar-client-2.svg";
import clientAvatar3 from "../../assets/avatar-client-3.jpg";
import clientAvatar4 from "../../assets/avatar-client-4.jpg";
import sliderPhoto1 from "../../assets/sliderImage1.svg";
import sliderPhoto2 from "../../assets/landing-page-slide-2.svg";
import sliderPhoto3 from "../../assets/landing-page-slide-3.svg";
import LightingFastLogistics from "../../assets/lighting-fast-logistics.svg";
import RoadAnalys from "../../assets/analyse-road-data.svg";
import AutoTransportDesicions from "../../assets/auto-transport-delivery.svg";
import AdaptiveWeatherPlanning from "../../assets/adaptive-weather-planning.svg";
import EasyShippingImage from "../../assets/easy-shipping-illustration.svg"
import AiScreens from "../../assets/ai-screens.svg";
import TransparentPricing from "../../assets/transparent-pricing.svg";
import AllTimeUpdate from "../../assets/all-time-update.svg";
import FullPageSlider from "./full-slider/FullPageSlider";
import LandingPageFooter from "../landing-page/landing-footer/LandingPageFooter";
import FAQSection from "./faq-section/FAQSection";
import FAQItem from "./faq-item/FAQItem";
import GetStartedSection from "./get-started-section/GetStartedSection";

const images = [
    sliderPhoto1,
    sliderPhoto2,
    sliderPhoto3,
    sliderPhoto1,
    sliderPhoto2,
    sliderPhoto3,
    sliderPhoto1,
    sliderPhoto2,
    sliderPhoto3,
    sliderPhoto1,
    sliderPhoto2,
    sliderPhoto3,
];

const LandingPageNew = () => {
    return (
        <>
            <Header/>
            <MainHeading/>
            <LoadCategories>
                <LoadCategory loadLabel="Vehicles & Boats"
                              loadTitle="Cars, Boats, Motorcycles, Rvs, Trailers, Parts"
                              loadImage={vehicleLoadCategory} link="/vehicle-load"/>
                <LoadCategory loadLabel="Moving" loadTitle="Furniture, Appliances" loadImage={movingLoadCategory}
                              link="/moving-load"/>
                <LoadCategory loadLabel="Heavy Equipment" loadTitle="Farm, Сonstruction"
                              loadImage={heavyLoadCategory}
                              link="/construction-load"/>
                <LoadCategory loadLabel="Freight" loadTitle="LTL, FTL" loadImage={freightLoadCategory}
                              link="/freight-load"/>
            </LoadCategories>
            <HowItWorks/>
            <BenefitWrapper>
                <BenefitChanger
                    backgroundColor="#1a73e8"
                    label="EFFICIENCY BOOST"
                    title="AI Optimized Supply Chain"
                    description="Maximize efficiency with AI insights that automatically suggest the best routes."
                    subDescription="AI tracks shipments and vehicle availability in real-time, optimizing routes and reducing idle time, boosting your supply chain's performance."
                    subImage={LightingFastLogistics}
                    img={LightingFastLogistics}
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
            <ClientReviewContent>
                <ClientItemReview name="Paul Mack" work="manager"
                                  description="Since integrating OpenShipAI into our supply chain, we've seen a remarkable improvement in efficiency. The real-time data helps us make smarter decisions, and the automated dispatch feature ensures that our shipments are always on time. Highly recommend!"
                                  avatar={clientAvatar2}/>
                <ClientItemReview name="Jake Rogers" work="Founder"
                                  description="OpenShipAI has been a game-changer for our business. The platform’s ability to compare rates and optimize routes has saved us thousands in shipping costs. Plus, the user-friendly interface makes it incredibly easy to use!"
                                  avatar={clientAvatar4}
                                  reverse="row-reverse"/>
                <ClientItemReview name="Emily Davis" work="Director"
                                  description="We struggled with finding cost-effective shipping solutions until we discovered OpenShipAI. Their AI technology has helped us reduce our shipping expenses while improving overall productivity. The customer support has also been exceptional!"
                                  avatar={clientAvatar3}/>
                <ClientItemReview name="John Smith" work="CEO"
                                  description="OpenShipAI has revolutionized our shipping operations. The AI-driven insights have significantly reduced our costs while optimizing our delivery routes. The automation is seamless, saving us both time and resources. It's truly the future of logistics!"
                                  avatar={clientAvatar}
                                  reverse="row-reverse"/>
            </ClientReviewContent>
            <FullPageSlider
                images={images}
                title="Full Control Over Your Shipments"
                description="Take complete command of your logistics with OpenShipAI. From real-time tracking to seamless communication with carriers, our platform gives you full visibility and control over every stage of your shipment process. Monitor your cargo’s location, manage schedules, and handle any changes with ease, ensuring that your shipments are always on track and on time."/>
            <FAQSection>
                <FAQItem title={"What is OpenShipAI?"} description={"OpenShipAI is an advanced, AI-powered platform that revolutionizes the shipping and logistics industry. It streamlines the process of finding carriers, managing shipments, and optimizing routes, making shipping more efficient and cost-effective for businesses of all sizes."}/>
                <FAQItem title={"How does OpenShipAI benefit my business?"} description={"OpenShipAI leverages artificial intelligence to automate and enhance your shipping operations. Benefits include reduced shipping costs, faster delivery times, improved route optimization, real-time tracking, and seamless communication between shippers and carriers."}/>
                <FAQItem title={"Is OpenShipAI suitable for small businesses?"} description={"Absolutely! OpenShipAI is designed to cater to businesses of all sizes. Small businesses can particularly benefit from our platform by accessing competitive shipping rates, optimizing their logistics processes, and expanding their reach without significant overhead costs."}/>
                <FAQItem title={"What kind of customer support does OpenShipAI provide?"} description={"We offer 24/7 customer support through multiple channels, including live chat, email, and phone. Our dedicated support team is always ready to assist you with any questions or issues you may encounter."}/>
                <FAQItem title={"Is my data secure with OpenShipAI?"} description={"Data security is a top priority for us. OpenShipAI employs advanced encryption and security protocols to protect your sensitive information. We comply with industry standards and regulations to ensure your data is safe."}/>
                <FAQItem title={"How does OpenShipAI's AI optimize shipping routes?"} description={"Our AI algorithms analyze various factors such as distance, traffic patterns, weather conditions, and carrier availability to determine the most efficient shipping routes. This optimization reduces transit times and costs."}/>
                <FAQItem title={"Can I schedule pickups and deliveries through OpenShipAI?"} description={"Yes, you can schedule pickups and deliveries through OpenShipAI. Our platform offers comprehensive logistics management tools that enable you to arrange, track, and manage your shipments seamlessly."}/>
            </FAQSection>
            <GetStartedSection/>
            <LandingPageFooter/>
        </>
    );
};

export default LandingPageNew;