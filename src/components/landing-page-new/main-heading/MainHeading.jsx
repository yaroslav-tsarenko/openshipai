import React from 'react';
import { ReactComponent as GreenCheckmark } from "../../../assets/images/checkmark-green.svg";
import styles from './MainHeading.module.scss';
import Button from "../../button/Button";
import { useNavigate } from "react-router-dom";
import ClientTrusted from "../../../assets/images/client-trusted.svg";
import TrustedCompanies from "../../../assets/images/trusted-companies.png";

const MainHeading = ({ checkmarkTexts, h3, h2, p }) => {
    const navigate = useNavigate();

    const handleNavigateShipper = () => {
        navigate("/sign-up-shipper");
    }

    const handleNavigateCarrier = () => {
        navigate("/sign-up-carrier");
    }

    return (
        <div className={styles.mainHeadingWrapper}>
            <div className={styles.littleBenefits}>
                {checkmarkTexts.map((text, index) => (
                    <section key={index}>
                        <GreenCheckmark className={styles.checkmark} />
                        <span>{text}</span>
                    </section>
                ))}
            </div>
            <h3>{h3}</h3>
            <h2>{h2}</h2>
            <div className={styles.paragraphWithClients}>
                <p>{p}</p>
                <img src={ClientTrusted} className={styles.trustedClients} alt="trusted clients" height={250} />
            </div>
            <section>
                <Button variant="apply-non-responsive" onClick={handleNavigateShipper}>
                    Become Shipper
                </Button>
                <Button variant="neutral-non-responsive" onClick={handleNavigateCarrier}>
                    Become Carrier
                </Button>
            </section>
            <img src={TrustedCompanies} alt="Trusted Companies" className={styles.trustedCompanies} height={70} />
        </div>
    );
};

export default MainHeading;