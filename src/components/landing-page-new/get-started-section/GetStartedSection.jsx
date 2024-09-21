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
import Alert from "../../floating-window-success/Alert";

const GetStartedSection = () => {

    const [activeButton, setActiveButton] = useState('shipper');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        repeatPassword: ''
    });

    const [carrierForm, setCarrierForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        companyName: '',
        datNumber: '',
        password: '',
        repeatPassword: '',
        carrierUSDotNumber: '',
    });

    const handleChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };

    const handleCarrierChange = (field) => (event) => {
        setCarrierForm({
            ...carrierForm,
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
                setAlert({status: 'success', text: 'Success', description: 'You have successfully created an account'});
                setTimeout(() => {
                    window.location.href = '/sign-in';
                }, 2000);
            }
        } catch (error) {
            setAlert({status: 'error', text: 'Error', description: error.response.data.message});
        } finally {
            setLoading(false);
        }
    };

    const handleCarrierSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/sign-up-carrier-account`, {
                firstName: carrierForm.firstName,
                lastName: carrierForm.lastName,
                email: carrierForm.email,
                phone: carrierForm.phone,
                companyName: carrierForm.companyName,
                datNumber: carrierForm.datNumber,
                password: carrierForm.password,
                carrierUSDotNumber: carrierForm.carrierUSDotNumber,
            });
            if (response.data.status === 'Success') {
                setAlert({
                    status: 'success',
                    text: 'Success!',
                    description: 'You have successfully created an account!',
                });
                setTimeout(() => {
                    window.location.href = '/sign-in';
                }, 2000);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
            setAlert({ status: 'error', text: 'Error', description: errorMessage });
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
        <>
            {alert && (<Alert status={alert.status} text={alert.text} description={alert.description}/>)}
            <div className={styles.getStartedSectionWrapper}>
                <h1>Ready Get Started?</h1>
                <p>Start your journey with us today</p>
                <section>
                    <Button variant={activeButton === 'shipper' ? 'default-non-responsive' : 'neutral-non-responsive'}
                            onClick={handleShipperClick}>
                        Become Shipper
                    </Button>
                    <Button variant={activeButton === 'carrier' ? 'default-non-responsive' : 'neutral-non-responsive'}
                            onClick={handleCarrierClick}>
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
                                    <TextInput
                                        placeholder="First Name"
                                        label="First Name"
                                        value={carrierForm.firstName}
                                        onChange={handleCarrierChange('firstName')}
                                    />
                                    <TextInput
                                        placeholder="Last Name"
                                        label="Last Name"
                                        value={carrierForm.lastName}
                                        onChange={handleCarrierChange('lastName')}
                                    />
                                    <TextInput
                                        placeholder="Email"
                                        label="Email"
                                        value={carrierForm.email}
                                        onChange={handleCarrierChange('email')}
                                    />
                                    <TextInput
                                        placeholder="Phone"
                                        label="Phone"
                                        value={carrierForm.phone}
                                        onChange={handleCarrierChange('phone')}
                                    />
                                    <TextInput
                                        placeholder="Company Name"
                                        label="Company Name"
                                        value={carrierForm.companyName}
                                        onChange={handleCarrierChange('companyName')}
                                    />
                                    <TextInput
                                        placeholder="DAT Number"
                                        label="DAT Number"
                                        value={carrierForm.datNumber}
                                        onChange={handleCarrierChange('datNumber')}
                                    />
                                    <TextInput
                                        placeholder="Carrier USDOT Number"
                                        label="Carrier USDOT Number"
                                        value={carrierForm.carrierUSDotNumber}
                                        onChange={handleCarrierChange('carrierUSDotNumber')}
                                    />
                                    <TextInput
                                        placeholder="Password"
                                        label="Password"
                                        type="password"
                                        value={carrierForm.password}
                                        onChange={handleCarrierChange('password')}
                                    />
                                    <TextInput
                                        placeholder="Repeat Password"
                                        label="Repeat Password"
                                        type="password"
                                        value={carrierForm.repeatPassword}
                                        onChange={handleCarrierChange('repeatPassword')}
                                    />
                                </div>
                                <Button variant="apply" onClick={handleCarrierSubmit}>
                                    {loading ? <RotatingLinesLoader title="Processing..." /> : 'Become Carrier'}
                                </Button>
                            </section>
                            <img src={carrierImage} alt="Carrier Image"/>
                        </div>
                    )}
                </div>
            </div>
        </>

    );
};

export default GetStartedSection;