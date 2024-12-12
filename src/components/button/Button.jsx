import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
import { ReactComponent as FaCamera } from '../../assets/photo-icon-button.svg';
import { ReactComponent as FaFile } from '../../assets/attach-document-icon.svg';

const Button = ({ variant = 'default', buttonText, onClick, children, disabled = false, to }) => {
    const buttonClass = `${styles[variant] || styles.default} ${disabled ? styles.disabled : ''}`;

    if (to) {
        return (
            <Link to={to} className={buttonClass}>
                {buttonText}
                {children}
            </Link>
        );
    }

    return (
        <button className={buttonClass} onClick={onClick} disabled={disabled}>
            {variant === 'attach-photo' && <FaCamera className={styles.icon} />}
            {variant === 'attach-file' && <FaFile className={styles.icon} />}
            {buttonText}
            {children}
        </button>
    );
};

export default Button;