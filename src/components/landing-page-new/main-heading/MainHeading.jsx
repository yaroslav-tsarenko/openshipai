import React from 'react';
import {ReactComponent as GreenCheckmark} from "../../../assets/images/checkmark-green.svg";
import {ReactComponent as TrustedCompanies} from "../../../assets/images/trusted-companies.svg";
import {ReactComponent as TrustedClients} from "../../../assets/images/client-trusted.svg";
import styles from './MainHeading.module.scss';
import Button from "../../button/Button";
import {useNavigate} from "react-router-dom";

const MainHeading = ({ref}) => {


    const navigate = useNavigate();

    const handleNavigateShipper = () => {
        navigate("/sign-up-shipper");
    }

    const handleNavigateCarrier = () => {
        navigate("/sign-up-carrier");
    }


    return (
        <div className={styles.mainHeadingWrapper} ref={ref}>
            <div className={styles.littleBenefits}>
                <section><GreenCheckmark className={styles.checkmark}/><span>Residential & Business</span></section>
                <section><GreenCheckmark className={styles.checkmark}/><span>Ship Anything to Anywhere</span></section>
            </div>
            <h3>Maximize Savings, Reduce Time, Automate Control</h3>
            <h2>Every Shipment</h2>
            <div className={styles.paragraphWithClients}>
                <p>
                    OpenShipAI your AI-driven shipping ally, offering intuitive solutions for tracking and managing
                    international shipments with precision and care. Dive in and ship smarter.
                </p>
                <TrustedClients className={styles.trustedClients}/>
            </div>
            <section>
                <Button variant="apply-non-responsive" onClick={handleNavigateShipper}>
                    Become Shipper
                </Button>
                <Button variant="neutral-non-responsive" onClick={handleNavigateCarrier}>
                    Become Carrier
                </Button>
            </section>
            <TrustedCompanies/>
        </div>
    );
};

export default MainHeading;