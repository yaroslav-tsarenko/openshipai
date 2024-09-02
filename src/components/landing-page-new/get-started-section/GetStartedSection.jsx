import React from 'react';
import styles from "./GetStartedSection.module.scss";
import Button from "../../button/Button";
import {useState} from 'react';
import TextInput from "../../text-input/TextInput";
import shipperImage from "../../../assets/shipper-booking.png"
import carrierImage from "../../../assets/carrier-truck.svg"

const GetStartedSection = () => {

    const [activeButton, setActiveButton] = useState('shipper');

    const handleShipperClick = () => {
        setActiveButton('shipper');
    };

    const handleCarrierClick = () => {
        setActiveButton('carrier');
    };

    return (
        <div className={styles.getStartedSectionWrapper}>
            <h1>Ready Get Started?</h1>
            <p>Start your journey with us today</p>
            <section>
                <Button variant={activeButton === 'shipper' ? 'default' : 'neutral'} onClick={handleShipperClick}>
                    Become Shipper
                </Button>
                <Button variant={activeButton === 'carrier' ? 'default' : 'neutral'} onClick={handleCarrierClick}>
                    Become Carrier
                </Button>
            </section>

            <div className={styles.getStartedContentWrapper}>
                {activeButton === 'shipper' ? (
                    <div className={styles.getStartedContent}>
                        <section>
                            <div className={styles.getStartedContentInputs}>
                                <TextInput placeholder="First Name"
                                           label={"First Name"}
                                />
                                <TextInput placeholder="Last Name"
                                           label={"Last Name"}
                                />
                                <TextInput placeholder="Email"
                                           label="Email"
                                />
                                <TextInput placeholder="Phone"
                                           label="Phone"
                                />
                                <TextInput placeholder="Come up Password"
                                           label="Come up Password"
                                />
                                <TextInput placeholder="Repeat Password"
                                           label="Repeat Password"
                                />
                            </div>
                            <Button variant="apply">
                                Become Shipper
                            </Button>
                        </section>
                        <img src={shipperImage} alt="Shipper Image"/>
                    </div>
                ) : (
                    <div className={styles.getStartedContent}>
                        <section>
                            <div className={styles.getStartedContentInputs}>
                                <TextInput placeholder="First Name"
                                           label={"First Name"}
                                />
                                <TextInput placeholder="Last Name"
                                           label={"Last Name"}
                                />
                                <TextInput placeholder="Email"
                                           label="Email"
                                />
                                <TextInput placeholder="Phone"
                                           label="Phone"
                                />
                                <TextInput placeholder="Company Name"
                                           label="Company Name"
                                />
                                <TextInput placeholder="DAT Number"
                                           label="DAT Number"
                                />
                                <TextInput placeholder="DAT Number"
                                           label="DAT Number"
                                />
                                <TextInput placeholder="Come up Password"
                                           label="Come up Password"
                                />
                                <TextInput placeholder="Repeat Password"
                                           label="Repeat Password"
                                />
                            </div>
                            <Button variant="apply">
                                Become Carrier
                            </Button>
                        </section>
                        <img src={carrierImage} alt="Carrier Image"/>

                    </div>
                )}
            </div>
        </div>
    );
};

export default GetStartedSection;