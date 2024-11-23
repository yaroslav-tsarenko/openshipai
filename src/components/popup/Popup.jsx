import React from 'react';
import styles from './Popup.module.scss';

const Popup = ({ title, onClose, children, footerText, abilityToClose }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <div className={styles.header}>
                    <h2>{title}</h2>
                    {!abilityToClose && (
                        <button className={styles.closeButton} onClick={onClose}>Close</button>
                    )}
                </div>
                <div className={styles.content}>
                    {children}
                </div>
                <hr/>
                <div className={styles.footer}>
                    <p>{footerText}</p>
                </div>
            </div>
        </div>
    );
};

export default Popup;