import React from 'react';
import styles from './InfoItem.module.scss';

const InfoItem = ({label, children, color}) => {
    return (
        <div id="info-tem" className={styles.infoItem}>
            <label htmlFor="info-tem" className={styles.labelInfoItem}>{label}</label>
            <p className={`${styles.infoItemText} ${styles[color]}`}>
                {children ? children : 'Empty'}
            </p>
        </div>
    );
};

export default InfoItem;