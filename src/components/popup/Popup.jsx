import React from 'react';
import styles from './Popup.module.scss';
import Button from "../button/Button";

const Popup = ({ title, onClose, children, footerText, abilityToClose }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <div className={styles.header}>
                    <h2>{title}</h2>
                    {!abilityToClose && (
                        <Button variant="close" onClick={onClose}>Close</Button>
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