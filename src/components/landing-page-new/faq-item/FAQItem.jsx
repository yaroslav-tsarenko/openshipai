import React from 'react';
import {useState} from 'react';
import {ReactComponent as PlusBlue} from "../../../assets/fa-plus-blue.svg";
import {ReactComponent as MinusBlue} from "../../../assets/fa-minus.svg";
import styles from "./FAQItem.module.scss"

const FaqItem = ({title, description}) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.faqItem}>
            <section>
                <h2>{title}</h2>
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <MinusBlue /> : <PlusBlue />}
                </button>
            </section>
            <p>{isOpen ? description : ""}</p>
        </div>
    );
};

export default FaqItem;