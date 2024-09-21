import React from 'react';
import Header from "../../components/landing-page-new/header/Header";
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";
import Description from "../../components/landing-page-new/description/Description";

const TimeSchedule = () => {
    return (
        <>
            <Header/>
            <Description
                title="Time Schedule"
                description="AI is transforming time scheduling in transportation by providing real-time updates, predictive analytics, and automated scheduling."
                subDescriptions={[
                    {
                        title: "Real-Time Updates",
                        content: "AI systems provide real-time updates on shipment statuses, allowing for dynamic adjustments to schedules and improving overall efficiency."
                    },
                    {
                        title: "Predictive Analytics",
                        content: "By analyzing historical data, AI predicts potential delays and suggests optimal scheduling to avoid bottlenecks and ensure timely deliveries."
                    },
                    {
                        title: "Automated Scheduling",
                        content: "AI automates the scheduling process, reducing manual intervention and errors. This leads to more accurate and reliable schedules."
                    }
                ]}
            />
            <LandingPageFooter/>
        </>
    );
};

export default TimeSchedule;