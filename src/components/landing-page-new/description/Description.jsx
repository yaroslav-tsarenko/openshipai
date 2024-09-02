import React from 'react';
import styles from "./Description.module.scss";

const Description = ({title, description}) => {
    return (
        <div className={styles.descriptionWrapper}>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
};

export default Description;