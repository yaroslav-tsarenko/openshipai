import React from 'react';
import styles from "./FAQSection.module.scss"

const FAQSection = ({children}) => {
    return (
        <div className={styles.faqSectionWrapper}>
            <h1>
                Frequently Asked Question
            </h1>
            <div className={styles.faqSectionContent}>

            </div>
            {children}
        </div>
    );
};

export default FAQSection;