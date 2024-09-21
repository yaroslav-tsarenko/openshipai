import React from 'react';
import Header from "../../components/landing-page-new/header/Header";
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";
import Description from "../../components/landing-page-new/description/Description";

const TermsAndConditions = () => {
    return (
        <>
            <Header/>
            <Description
                title="Terms and Conditions"
                description="Our terms and conditions outline the use of AI in transportation, ensuring transparency, compliance, and ethical practices."
                subDescriptions={[
                    {
                        title: "Transparency",
                        content: "We ensure that all AI-driven processes are transparent, providing clear information on how data is used and decisions are made."
                    },
                    {
                        title: "Compliance",
                        content: "Our AI systems comply with industry regulations and standards, ensuring that all operations are legal and ethical."
                    },
                    {
                        title: "Ethical Practices",
                        content: "We prioritize ethical AI practices, ensuring that our technology benefits all stakeholders and does not cause harm."
                    }
                ]}
            />
            <LandingPageFooter/>
        </>
    );
};

export default TermsAndConditions;