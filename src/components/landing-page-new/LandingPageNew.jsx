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
import sliderPhoto1 from "../../assets/sliderImage1.svg";
import FullPageSlider from "./full-slider/FullPageSlider";
import LandingPageFooter from "../landing-page/landing-footer/LandingPageFooter";
import FAQSection from "./faq-section/FAQSection";
import FAQItem from "./faq-item/FAQItem";
import GetStartedSection from "./get-started-section/GetStartedSection";

const images = [
    sliderPhoto1,
    sliderPhoto1,
    sliderPhoto1,
    sliderPhoto1,
    sliderPhoto1,
    sliderPhoto1,
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
                    label="cost savings"
                    title="Save Money with AI"
                    description="Our AI technology helps you save money by providing the best shipping rates."
                    subDescription="Our AI technology helps you save money by providing the best shipping rates."
                    subImage={helpMoneyAI}

                    img={helpMoneyAI}
                    variant="blue"
                />
                <BenefitChanger
                    backgroundColor="#fff"
                    label="cost savings"
                    title="Save Money with AI"
                    description="Our AI technology helps you save money by providing the best shipping rates."
                    subDescription="Our AI technology helps you save money by providing the best shipping rates."
                    subImage={helpMoneyAI}
                    img={helpMoneyAI}
                    variant="white"
                />
                <BenefitChanger
                    backgroundColor="#e8f0fe"
                    label="cost savings"
                    title="Save Money with AI"
                    subDescription="Our AI technology helps you save money by providing the best shipping rates."
                    subImage={helpMoneyAI}
                    img={helpMoneyAI}
                    variant="light-blue"
                />
                <BenefitChanger
                    backgroundColor="#174ea6"
                    label="cost savings"
                    title="Save Money with AI"
                    subDescription="Our AI technology helps you save money by providing the best shipping rates."
                    subImage={helpMoneyAI}
                    img={helpMoneyAI}
                    variant="dark-blue"
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
                    label="cost savings"
                    title="Save Money with AI"
                    description="Our AI technology helps you save money by providing the best shipping rates."
                    subDescription="Our AI technology helps you save money by providing the best shipping rates."
                    subImage={helpMoneyAI}
                    img={helpMoneyAI}
                    variant="blue"
                />
                <BenefitChanger
                    backgroundColor="#fff"
                    label="cost savings"
                    title="Save Money with AI"
                    description="Our AI technology helps you save money by providing the best shipping rates."
                    subDescription="Our AI technology helps you save money by providing the best shipping rates."
                    subImage={helpMoneyAI}
                    img={helpMoneyAI}
                    variant="white"
                />
                <BenefitChanger
                    backgroundColor="#e8f0fe"
                    label="cost savings"
                    title="Save Money with AI"
                    subDescription="Our AI technology helps you save money by providing the best shipping rates."
                    subImage={helpMoneyAI}
                    img={helpMoneyAI}
                    variant="light-blue"
                />
                <BenefitChanger
                    backgroundColor="#174ea6"
                    label="cost savings"
                    title="Save Money with AI"
                    subDescription="Our AI technology helps you save money by providing the best shipping rates."
                    subImage={helpMoneyAI}
                    img={helpMoneyAI}
                    variant="dark-blue"
                />
            </BenefitWrapper>
            <ClientReviewContent>
                <ClientItemReview name="John Doe" work="CEO"
                                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                   Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                                  avatar={clientAvatar2}/>
                <ClientItemReview name="John Doe" work="CEO"
                                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                   Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                                  avatar={clientAvatar}
                                  reverse="row-reverse"/>
                <ClientItemReview name="John Doe" work="CEO"
                                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                                  avatar={clientAvatar2}/>
                <ClientItemReview name="John Doe" work="CEO"
                                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                                  avatar={clientAvatar}
                                  reverse="row-reverse"/>
            </ClientReviewContent>
            <FullPageSlider
                images={images}
                title="Full Control Over Your Shipments"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                   Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/>
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