import React from 'react';
import styles from "./LoadStatus.module.scss"
import { ReactComponent as ProgressBar1 } from "../../assets/images/progress-bar-1-step.svg";
import { ReactComponent as ProgressBar2 } from "../../assets/images/progress-bar-2-step.svg";
import { ReactComponent as ProgressBar3 } from "../../assets/images/progress-bar-3-step.svg";
import { ReactComponent as ProgressBar4 } from "../../assets/images/progress-bar-4-step.svg";
import { ReactComponent as ProgressBar5 } from "../../assets/images/progress-bar-5-step.svg";
import { ReactComponent as ProgressBar6 } from "../../assets/images/progress-bar-6-step.svg";
import { ReactComponent as ProgressBar7 } from "../../assets/images/progress-bar-7-step.svg";

const LoadStatus = ({ status }) => {
    const getProgressBar = () => {
        switch (status) {
            case 'Active':
                return <ProgressBar2 />;
            case 'Booked':
                return <ProgressBar3 />;
            case 'Dispatched':
                return <ProgressBar4 />;
            case 'Picked Up':
                return <ProgressBar5 />;
            case 'Delivered':
                return <ProgressBar6 />;
            case 'Completed':
                return <ProgressBar7 />;
            default:
                return <ProgressBar1 />;
        }
    };

    return (
        <div className={styles.loadStatus}>
            {getProgressBar()}
        </div>
    );
};

export default LoadStatus;