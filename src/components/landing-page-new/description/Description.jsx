import React from 'react';
import styles from "./Description.module.scss";

const Description = ({ title, description, subDescriptions }) => {
    return (
        <div className={styles.descriptionWrapper}>
            <h1>{title}</h1>
            <p>{description}</p>
            {subDescriptions && subDescriptions.map((sub, index) => (
                <div key={index} className={styles.subDescription}>
                    <h2>{sub.title}</h2>
                    <p>{sub.content}</p>
                </div>
            ))}
        </div>
    );
};

export default Description;