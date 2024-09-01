import React from 'react';
import styles from './Button.module.scss';
import {ReactComponent as FaCamera} from '../../assets/photo-icon-button.svg';
import {ReactComponent as FaFile} from '../../assets/attach-document-icon.svg';

const Button = ({ variant = 'default', buttonText, onClick, children }) => {
    const buttonClass = styles[variant] || styles.default;

    return (
        <button className={buttonClass} onClick={onClick}>
            {variant === 'attach-photo' && <FaCamera className={styles.icon} />}
            {variant === 'attach-file' && <FaFile className={styles.icon} />}
            {buttonText}
            {children}
        </button>
    );
};

export default Button;