import React from 'react';
import Header from "../../components/landing-page-new/header/Header";
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";
import styles from "./BlogPage.module.scss";

const BlogPage = () => {
    return (
        <>
            <Header/>
            <div className={styles.blogContent}>
                {/* Main Article Section */}
                <div className={styles.mainArticle}>
                    <h1 className={styles.articleTitle}>
                        The Future of Freight Transportation with OpenShipAI
                    </h1>
                    <img
                        src="https://via.placeholder.com/800x400?text=American+Trucks"
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
                            src="https://via.placeholder.com/400x200?text=Logistics+Optimization"
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
                            src="https://via.placeholder.com/400x200?text=Real-Time+Tracking"
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
                            src="https://via.placeholder.com/400x200?text=Sustainability+in+Transport"
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
