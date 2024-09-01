import React from 'react';
import {ReactComponent as GreenCheckmark} from "../../../assets/checkmark-green.svg";
import {ReactComponent as TrustedCompanies} from "../../../assets/trusted-companies.svg";
import {ReactComponent as TrustedClients} from "../../../assets/client-trusted.svg";
import styles from './MainHeading.module.scss';
import Button from "../../button/Button";

const MainHeading = () => {
    return (
        <div className={styles.mainHeadingWrapper}>
            <div className={styles.littleBenefits}>
                <section><GreenCheckmark className={styles.checkmark}/><span>Residential & Business</span></section>
                <section><GreenCheckmark className={styles.checkmark}/><span>Ship Anything to Anywhere</span></section>
            </div>
            <h3>Maximize Savings, Reduce Time, Automate Controll</h3>
            <h2>Every Shipment</h2>
            <div className={styles.paragraphWithClients}>
                <p>
                    OpenShipAI is your AI-driven shipping ally, offering intuitive solutions for tracking and managing
                    international shipments with precision and care. Dive in and ship smarter.
                </p>
                <TrustedClients className={styles.trustedClients}/>
            </div>
            <section>
                <Button variant="apply">
                    Become Shipper
                </Button>
                <Button variant="neutral">
                    Become Carrier
                </Button>
            </section>
            <TrustedCompanies/>
        </div>
    );
};

export default MainHeading;