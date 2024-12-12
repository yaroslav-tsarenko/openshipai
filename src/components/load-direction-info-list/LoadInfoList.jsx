import React from 'react';
import styles from './LoadInfoList.module.scss';

const LoadInfoList = ({ loadPickupLocation, loadPickupLocationDate, loadDeliveryLocation, loadDeliveryLocationDate }) => {
    const data = [
        { location: loadPickupLocation, date: loadPickupLocationDate },
        { location: loadDeliveryLocation, date: loadDeliveryLocationDate },
    ];

    return (
        <ol className={styles.container}>
            {data.map((item, index) => (
                <li className={styles.column} key={index}>
                    <div className={styles.infoContainer}>
                        <p className={styles.location}>{item.location}</p>
                        <p className={styles.date}>{item.date}</p>
                    </div>
                </li>
            ))}
        </ol>
    );
};

export default LoadInfoList;