import React from 'react';
import styles from "./ClientReviewContent.module.scss";

const ClientReviewContent = ({children}) => {
    return (
        <div className={styles.clientReviewContent}>
            <h1>What Out Clients Say</h1>
            <div className={styles.clientReviews}>
                {children}
            </div>
        </div>
    );
};

export default ClientReviewContent;