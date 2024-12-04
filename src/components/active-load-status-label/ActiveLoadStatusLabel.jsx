import React from 'react';
import styles from './ActiveLoadStatusLabel.module.scss';

const ActiveLoadStatusLabel = ({loadStatus}) => {
    const getStatusClass = (status) => {
        switch (status) {
            case 'Published':
                return styles.published;
            case 'Active':
                return styles.active;
            case 'Completed':
                return styles.completed;
            case 'Booked':
                return styles.booked;
            case 'Delivered':
                return styles.delivered;
            case 'Cancelled':
                return styles.cancelled;
            default:
                return '';
        }
    };

    return (
        <span className={`${styles.loadStatus} ${getStatusClass(loadStatus)}`}>
      {loadStatus}
    </span>
    );
};

export default ActiveLoadStatusLabel;