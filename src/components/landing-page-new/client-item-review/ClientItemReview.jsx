import React from 'react';
import styles from "./ClientItemReview.module.scss";

const ClientItemReview = ({ name, work, description, avatar, reverse }) => {
    return (
        <div className={`${styles.clientItemReviewWrapper} ${reverse ? styles.reverse : ''}`}>
            <div className={styles.clientItemReviewImage}>
                <img src={avatar} alt="Avatar"/>
                <section>
                    <h3>{name}</h3>
                    <p>{work}</p>
                </section>
            </div>
            <p>{description}</p>
        </div>
    );
};

export default ClientItemReview;