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
                        title: "1. AI-Powered Solutions",
                        content: "Our AI algorithms optimize every aspect of logistics, delivering faster, more reliable services. Features include:",
                        list: [
                            "Real-time route optimization to ensure the quickest delivery paths.",
                            "Load optimization to maximize vehicle capacity and reduce costs.",
                            "Predictive analytics to forecast demand and manage resources effectively."
                        ]
                    },
                    {
                        title: "2. Cost-Efficiency",
                        content: "With advanced data analytics, we reduce operational costs while maximizing value. Key benefits include:",
                        list: [
                            "Competitive pricing for both shippers and carriers.",
                            "Minimized fuel consumption through optimized routes.",
                            "Reduction in overhead costs by automating manual processes."
                        ]
                    },
                    {
                        title: "3. Real-Time Tracking & Updates",
                        content: "Stay informed with comprehensive tracking tools. Our system offers:",
                        list: [
                            "Automatic notifications on shipment status changes.",
                            "Detailed tracking interfaces accessible 24/7.",
                            "Immediate alerts for any unexpected delays or route changes."
                        ]
                    },
                    {
                        title: "4. Sustainability Commitment",
                        content: "OpenShipAI is committed to green logistics by reducing environmental impact through:",
                        list: [
                            "Optimizing delivery routes to minimize carbon emissions.",
                            "Promoting fuel-efficient driving practices among carriers.",
                            "Utilizing electric and hybrid vehicles in our fleet."
                        ]
                    },
                    {
                        title: "5. Seamless Integration",
                        content: "Our platform integrates effortlessly with existing systems, providing:",
                        list: [
                            "API compatibility for real-time data sharing.",
                            "Customizable dashboards tailored to user needs.",
                            "Support for third-party software and tools."
                        ]
                    },
                    {
                        title: "6. Comprehensive Support",
                        content: "Our support team is available to address your concerns and ensure smooth operations. Highlights include:",
                        list: [
                            "24/7 customer support via chat, email, and phone.",
                            "Dedicated account managers for large-scale operations.",
                            "In-depth knowledge base and troubleshooting guides."
                        ]
                    },
                    {
                        title: "7. Enhanced Security",
                        content: "We prioritize the safety of your data and shipments by implementing robust security measures such as:",
                        list: [
                            "End-to-end encryption for all transactions and communications.",
                            "Advanced authentication protocols to prevent unauthorized access.",
                            "Regular security audits to identify and address potential vulnerabilities."
                        ]
                    },
                    {
                        title: "8. Scalability",
                        content: "OpenShipAI supports businesses of all sizes, offering:",
                        list: [
                            "Flexible solutions that adapt to changing business needs.",
                            "Tools to manage small, medium, and large shipment volumes effectively.",
                            "Seamless expansion capabilities as your business grows."
                        ]
                    },
                    {
                        title: "9. Data-Driven Insights",
                        content: "Leverage actionable insights to improve operations through:",
                        list: [
                            "Detailed analytics on shipping trends and performance.",
                            "Forecasting tools to anticipate demand and optimize resources.",
                            "Customized reports to track KPIs and identify opportunities for improvement."
                        ]
                    },
                    {
                        title: "10. User-Friendly Interface",
                        content: "Our platform is designed with simplicity in mind, offering:",
                        list: [
                            "Intuitive navigation for quick access to key features.",
                            "Mobile-friendly design for on-the-go management.",
                            "Easy onboarding process to get started in minutes."
                        ]
                    }
                ]}
            />
            <LandingPageFooter/>
        </>
    );
};

export default WhyChooseUs;