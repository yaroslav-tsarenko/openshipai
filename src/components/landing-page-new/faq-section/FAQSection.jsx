import React, { useState } from 'react';
import styles from "./FAQSection.module.scss";
import { Fade } from "react-awesome-reveal";
import FaqItem from "../faq-item/FAQItem";

const FAQSection = ({ faqItems = [] }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <Fade>
            <div className={styles.faqSectionWrapper}>
                <h1>Frequently Asked Questions</h1>
                <div className={styles.faqSectionContent}>
                    {faqItems.map((item, index) => (
                        <FaqItem
                            key={index}
                            title={item.title}
                            description={item.description}
                            isOpen={openIndex === index}
                            onToggle={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </Fade>
    );
};

export default FAQSection;