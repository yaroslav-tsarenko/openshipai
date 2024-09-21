import React from 'react';
import Header from "../../components/landing-page-new/header/Header";
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";

import americanTruck from "../../assets/american-truck.jpg"
import realTimeTracking from "../../assets/real-time-tracking.jpg"
import logisticsOptimization from "../../assets/logistic-driver.jpg"
import freight from "../../assets/truck-driver.jpg"
import styles from "./BlogPage.module.scss";
import Description from "../../components/landing-page-new/description/Description";

const BlogPage = () => {
    return (
        <>
            <Header/>
            <div className={styles.blogContent}>
                <Description
                    title="The Future of Freight Transportation"
                    description="OpenShipAI is transforming the freight transportation industry with cutting-edge AI technology. Our platform optimizes logistics processes, reduces operational costs, and ensures timely delivery with real-time tracking. Discover how we are revolutionizing the way freight is moved across America."
                    subDescriptions={[
                        {
                            title: "AI-Powered Optimization",
                            content: "AI technology is at the heart of this transformation. By leveraging AI algorithms, OpenShipAI can analyze vast amounts of data to optimize routes, reduce fuel consumption, and minimize delays. This not only improves efficiency but also significantly cuts operational costs."
                        },
                        {
                            title: "Real-Time Tracking",
                            content: "One of the key features of modern freight transportation is real-time tracking. OpenShipAI provides shippers and carriers with real-time visibility into the location and status of their shipments. This transparency ensures timely deliveries and allows for proactive management of any potential issues."
                        },
                        {
                            title: "Cost Reduction",
                            content: "Reducing operational costs is a top priority for any business. OpenShipAI's AI-driven platform helps companies save money by optimizing routes, reducing empty miles, and improving load matching. These efficiencies translate into lower shipping costs and higher profitability."
                        },
                        {
                            title: "Enhanced Customer Experience",
                            content: "In today's competitive market, customer satisfaction is paramount. OpenShipAI's platform enhances the customer experience by providing accurate delivery estimates, real-time updates, and seamless communication between shippers and carriers. This level of service builds trust and loyalty among customers."
                        },
                        {
                            title: "Sustainability",
                            content: "Sustainability is becoming increasingly important in the transportation industry. By optimizing routes and reducing fuel consumption, OpenShipAI contributes to a greener and more sustainable future. This not only benefits the environment but also aligns with the growing demand for eco-friendly business practices."
                        },
                        {
                            title: "Conclusion",
                            content: "The future of freight transportation is bright, with AI and technology playing a pivotal role in shaping the industry. OpenShipAI is at the forefront of this revolution, offering innovative solutions that optimize logistics, reduce costs, and enhance the overall shipping experience. As we move forward, the integration of AI in freight transportation will continue to drive efficiency, sustainability, and customer satisfaction."
                        }
                    ]}
                />
                <div className={styles.mainArticle}>

                    <img
                        src={americanTruck}
                        alt="American Trucks on the Highway"
                    />
                    <p className={styles.articleDescription}>
                        OpenShipAI is transforming the freight transportation industry with cutting-edge AI technology. Our platform
                        optimizes logistics processes, reduces operational costs, and ensures timely delivery with real-time tracking.
                        Discover how we are revolutionizing the way freight is moved across America.
                    </p>
                </div>

                {/* Sub Articles Section */}
                <div className={styles.subArticles}>
                    <div className={styles.subArticle}>
                        <img
                            src={realTimeTracking}
                            alt="Logistics Optimization with AI"
                        />
                        <h2 className={styles.subArticleTitle}>
                            Logistics Optimization
                        </h2>
                        <p className={styles.subArticleDescription}>
                            Learn how AI-driven logistics optimization can help your business streamline operations and reduce overhead costs.
                        </p>
                    </div>

                    <div className={styles.subArticle}>
                        <img
                            src={freight}
                            alt="Real-Time Freight Tracking"
                        />
                        <h2 className={styles.subArticleTitle}>
                            Real-Time Tracking
                        </h2>
                        <p className={styles.subArticleDescription}>
                            Stay updated with our real-time tracking solutions that provide complete visibility into your freight's journey.
                        </p>
                    </div>

                    <div className={styles.subArticle}>
                        <img
                            src={logisticsOptimization}
                            alt="Sustainability in Transportation"
                        />
                        <h2 className={styles.subArticleTitle}>
                            Sustainability in Transportation
                        </h2>
                        <p className={styles.subArticleDescription}>
                            Discover how OpenShipAI is paving the way for greener, more sustainable freight transportation solutions.
                        </p>
                    </div>
                </div>
            </div>
            <LandingPageFooter/>
        </>
    );
};

export default BlogPage;
