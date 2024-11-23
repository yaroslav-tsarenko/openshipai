import React from 'react';
import styles from './FlexContainer.module.scss';

const FlexContainer = ({children, title}) => {
    return (
        <div className={styles.flexContainer}>
            <h4 className={styles.flexContainerTitle}>{title}</h4>
            <div className={styles.flexContainerContent}>
                {children}
            </div>
        </div>
    );
};

export default FlexContainer;