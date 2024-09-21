import React from 'react';
import Header from "../../components/landing-page-new/header/Header";
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";
import Description from "../../components/landing-page-new/description/Description";

const PricingDirects = () => {
    return (
        <>
            <Header/>
            <Description
                title="Pricing Directs"
                description="AI is revolutionizing pricing strategies in transportation by providing dynamic pricing models, cost optimization, and competitive analysis."
                subDescriptions={[
                    {
                        title: "Dynamic Pricing Models",
                        content: "AI enables dynamic pricing models that adjust rates based on demand, supply, and other market factors, ensuring competitive pricing."
                    },
                    {
                        title: "Cost Optimization",
                        content: "AI tools optimize costs by analyzing operational data and identifying areas for cost reduction, improving overall profitability."
                    },
                    {
                        title: "Competitive Analysis",
                        content: "AI provides insights into competitor pricing strategies, allowing for more informed pricing decisions and maintaining market competitiveness."
                    }
                ]}
            />
            <LandingPageFooter/>
        </>
    );
};

export default PricingDirects;