import React from 'react';
import styles from "./GetStartedSection.module.scss";
import Button from "../../button/Button";
import {useState} from 'react';
import axios from "axios";
import TextInput from "../../text-input/TextInput";
import shipperImage from "../../../assets/shipper-booking.png"
import carrierImage from "../../../assets/carrier-truck.svg"
import {BACKEND_URL} from "../../../constants/constants";
import RotatingLinesLoader from "../../rotating-lines/RotatingLinesLoader";
const GetStartedSection = () => {

    const [activeButton, setActiveButton] = useState('shipper');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        repeatPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${BACKEND_URL}/sign-up-shipper-account`, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password
            });

            if (response.data.status === 'Success') {
                setAlert({ status: 'success', text: 'Success', description: 'You have successfully created an account' });
                setTimeout(() => {
                    window.location.href = '/login'; // Redirect to login page
                }, 2000);
            }
        } catch (error) {
            setAlert({ status: 'error', text: 'Error', description: error.response.data.message });
        } finally {
            setLoading(false);
        }
    };

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
                <Button variant={activeButton === 'shipper' ? 'default-non-responsive' : 'neutral-non-responsive'} onClick={handleShipperClick}>
                    Become Shipper
                </Button>
                <Button variant={activeButton === 'carrier' ? 'default-non-responsive' : 'neutral-non-responsive'} onClick={handleCarrierClick}>
                    Become Carrier
                </Button>
            </section>

            <div className={styles.getStartedContentWrapper}>
                {activeButton === 'shipper' ? (
                    <div className={styles.getStartedContent}>
                        <section>
                            <div className={styles.getStartedContentInputs}>
                                <TextInput
                                    placeholder="First Name"
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange('firstName')}
                                />
                                <TextInput
                                    placeholder="Last Name"
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange('lastName')}
                                />
                                <TextInput
                                    placeholder="Email"
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange('email')}
                                />
                                <TextInput
                                    placeholder="Phone"
                                    label="Phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange('phone')}
                                />
                                <TextInput
                                    placeholder="Password"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange('password')}
                                />
                                <TextInput
                                    placeholder="Repeat Password"
                                    label="Repeat Password"
                                    name="repeatPassword"
                                    type="password"
                                    value={formData.repeatPassword}
                                    onChange={handleChange('repeatPassword')}
                                />
                            </div>
                            <Button variant="apply" onClick={handleSubmit}>
                                {loading ? <RotatingLinesLoader title="Processing..."/> : 'Become Shipper'}
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