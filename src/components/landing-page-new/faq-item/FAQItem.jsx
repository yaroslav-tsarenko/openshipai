import React, { useState, useRef, useEffect } from 'react';
import { ReactComponent as PlusBlue } from "../../../assets/fa-plus-blue.svg";
import { ReactComponent as MinusBlue } from "../../../assets/fa-minus.svg";
import styles from "./FAQItem.module.scss";

const FaqItem = ({ title, description }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(isOpen ? contentRef.current.scrollHeight : 0);
        }
    }, [isOpen, contentRef]);

    return (
        <div className={styles.faqItem}>
            <section>
                <h2>{title}</h2>
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <MinusBlue /> : <PlusBlue />}
                </button>
            </section>
            <div
                ref={contentRef}
                style={{
                    maxHeight: `${height}px`,
                    overflow: 'hidden',
                    transition: 'max-height 0.5s ease-in-out' // smooth transition for height change
                }}
            >
                <p>{description}</p>
            </div>
        </div>
    );
};

export default FaqItem;
