import React from 'react';
import Header from "../../components/landing-page-new/header/Header";
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";
import Description from "../../components/landing-page-new/description/Description";

const WhyChooseUs = () => {
    return (
        <>
            <Header/>
            <Description
                title="Why Choose OpenShipAI"
                description="OpenShipAI combines cutting-edge AI technology with a commitment to transparency, efficiency, and innovation in logistics. Here’s why we stand out as the leading logistics solution provider."
                subDescriptions={[
                    {
                        title: "AI-Powered Solutions",
                        content: "Our AI algorithms optimize every aspect of logistics, from route planning to delivery, ensuring faster and more reliable service."
                    },
                    {
                        title: "Cost-Efficiency",
                        content: "We use advanced data analytics to minimize costs and maximize value for both shippers and carriers, providing competitive pricing for all parties."
                    },
                    {
                        title: "Real-Time Tracking & Updates",
                        content: "Stay informed with real-time tracking of your shipments. Our system provides automatic status updates, ensuring transparency and peace of mind throughout the shipping process."
                    },
                    {
                        title: "Sustainability Commitment",
                        content: "OpenShipAI is committed to green logistics, leveraging AI to reduce carbon emissions by optimizing routes and minimizing fuel consumption."
                    }
                ]}
            />
            <LandingPageFooter/>
        </>
    );
};

export default WhyChooseUs;
