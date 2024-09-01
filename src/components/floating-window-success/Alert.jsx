import React, { useEffect, useRef, useState } from 'react';
import styles from './Alert.module.scss';
import { ReactComponent as SuccessIcon } from "../../assets/alert-success-icon.svg";
import { ReactComponent as WarningIcon } from "../../assets/alert-warning-triangle.svg";
import { ReactComponent as InfoIcon } from "../../assets/alert-info-icon.svg";
import { ReactComponent as ErrorIcon } from "../../assets/alert-error-icon.svg";
import { ReactComponent as TimesIcon } from "../../assets/fa-times-icon.svg";

const Alert = ({ status, text, description }) => {
    const ref = useRef(null);
    const [timeoutDuration, setTimeoutDuration] = useState(5000);

    useEffect(() => {
        const timer = setTimeout(() => {
            ref.current.style.animation = 'slide-up 0.5s forwards';
        }, timeoutDuration);

        return () => clearTimeout(timer);
    }, [timeoutDuration]);

    const handleCloseClick = () => {
        setTimeoutDuration(0);
    };

    const getIcon = () => {
        switch (status) {
            case 'success':
                return <SuccessIcon className={styles.alertIcon} />;
            case 'warning':
                return <WarningIcon className={styles.alertIcon} />;
            case 'info':
                return <InfoIcon className={styles.alertIcon} />;
            case 'error':
                return <ErrorIcon className={styles.alertIcon} />;
            default:
                return null;
        }
    };

    const getClassName = () => {
        switch (status) {
            case 'success':
                return `${styles.floatingWindowComponent} ${styles.success}`;
            case 'warning':
                return `${styles.floatingWindowComponent} ${styles.warning}`;
            case 'info':
                return `${styles.floatingWindowComponent} ${styles.info}`;
            case 'error':
                return `${styles.floatingWindowComponent} ${styles.error}`;
            default:
                return styles.floatingWindowComponent;
        }
    };

    return (
        <div ref={ref} className={getClassName()}>
            <div>
                {getIcon()}
                <section>
                    <h3>{text}</h3>
                    <p>{description}</p>
                </section>
            </div>
            <button onClick={handleCloseClick}>
                <TimesIcon/>
            </button>
        </div>
    );
};

export default Alert;