import React from 'react';
import styles from './LoadCategories.module.scss';

const LoadCategories = ({children}) => {
    return (
        <div className={styles.loadCategories}>
            {children}
        </div>
    );
};

export default LoadCategories;