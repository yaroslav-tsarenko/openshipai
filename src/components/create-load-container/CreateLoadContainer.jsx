import React from 'react';
import styles from "./CreateLoadContainer.module.scss";
import { ReactComponent as Step1 } from "../../assets/images/creating-load-status-1.svg";
import { ReactComponent as Step2 } from "../../assets/images/create-load-status-2.svg";
import { ReactComponent as Step3 } from "../../assets/images/create-load-status-3.svg";
import { ReactComponent as Step4 } from "../../assets/images/create-load-status-4.svg";

const CreateLoadContainer = ({ title, subTitle, step, children }) => {
    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1 className={styles.stepIllustration}/>;
            case 2:
                return <Step2 className={styles.stepIllustration}/>;
            case 3:
                return <Step3 className={styles.stepIllustration}/>;
            case 4:
                return <Step4 className={styles.stepIllustration}/>;
            default:
                return null;
        }
    };

    return (
        <div className={styles.createLoadContainerWrapper}>
            <div className={styles.createLoadContainerSection}>
                <h2>{title}</h2>
                <p>{subTitle}</p>
                {renderStep()}
            </div>
            <div className={styles.createLoadContainerContent}>
                {children}
            </div>
        </div>
    );
};

export default CreateLoadContainer;