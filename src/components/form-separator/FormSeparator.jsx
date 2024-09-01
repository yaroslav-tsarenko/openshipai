import React from 'react';
import styles from './FormSeparator.module.scss';

const FormSeparator = ({title, subTitle}) => {
    return (
        <div className={styles.formSeparatorWrapper}>
            <h2>{title}</h2>
            <p>{subTitle}</p>
        </div>
    );
};

export default FormSeparator;