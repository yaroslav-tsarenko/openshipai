import React from 'react';
import Header from "../../components/landing-page-new/header/Header";
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";
import Description from "../../components/landing-page-new/description/Description";

const LeadGenerate = () => {
    return (
        <>
            <Header/>
            <Description
                title="Lead Generate"
                description="AI is enhancing lead generation in transportation by identifying potential clients, analyzing market trends, and optimizing marketing strategies."
                subDescriptions={[
                    {
                        title: "Identifying Potential Clients",
                        content: "AI analyzes data to identify potential clients who are most likely to benefit from our transportation services, increasing conversion rates."
                    },
                    {
                        title: "Market Trends Analysis",
                        content: "AI tools analyze market trends to provide insights into customer needs and preferences, allowing for more targeted marketing efforts."
                    },
                    {
                        title: "Optimizing Marketing Strategies",
                        content: "AI optimizes marketing strategies by analyzing campaign performance and suggesting improvements, ensuring maximum ROI."
                    }
                ]}
            />
            <LandingPageFooter/>
        </>
    );
};

export default LeadGenerate;