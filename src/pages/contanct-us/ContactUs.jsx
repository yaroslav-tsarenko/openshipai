import React, {useState} from 'react';
import axios from 'axios';
import TextInput from "../../components/text-input/TextInput";
import RotatingLinesLoader from "../../components/rotating-lines/RotatingLinesLoader";
import LandingPageFooter from "../../components/landing-page/landing-footer/LandingPageFooter";
import styles from './ContactUs.module.scss';
import Header from "../../components/landing-page-new/header/Header";
import Alert from "../../components/floating-window-success/Alert";
import Button from "../../components/button/Button";
import Grid from "../../components/grid-two-columns/Grid";
import {BACKEND_URL} from "../../constants/constants";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({show: false, status: '', text: '', description: ''});

    const handleChange = (fieldName) => (e) => {
        const { value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [fieldName]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/submit-contact-request`, formData);
            console.log(response.data)
                setAlert({
                    show: true,
                    status: 'success',
                    text: 'Success',
                    description: 'Contact request submitted successfully!'
                });
        } catch (error) {
            setAlert({show: true, status: 'error', text: 'Error', description: 'Failed to submit contact request.'});
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header/>
            <div className={styles.contactUsFormWrapper}>
                <h1>Contact Us</h1>
                {alert.show && <Alert status={alert.status} text={alert.text} description={alert.description}/>}
                <div className={styles.contactUsFormContent}>
                    <Grid columns="2, 2fr">
                        <TextInput
                            name="name"
                            label="Name"
                            value={formData.name}
                            onChange={handleChange("name")}
                            required/>
                        <TextInput
                            name="lastName"
                            label="Last Name"
                            value={formData.lastName}
                            onChange={handleChange("lastName")}
                            required/>
                    </Grid>
                    <Grid columns="2, 2fr">
                        <TextInput
                            type="email"
                            name="email"
                            label="Email"
                            value={formData.email}
                            onChange={handleChange("email")}
                            required/>
                        <TextInput
                            type="phone-number"
                            name="phoneNumber"
                            label="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange("phoneNumber")}
                            required/>
                    </Grid>
                    <TextInput
                        id={'description'}
                        type="textarea"
                        label="Personal Description"
                        style={{height: '170px', maxHeight: '200px'}}
                        value={formData.description}
                        onChange={handleChange("description")}/>
                    <Button variant="default-non-responsive" onClick={handleSubmit} disabled={loading}>
                        {loading ? <RotatingLinesLoader title="Processing..."/> : 'Contact Us'}
                    </Button>
                </div>
            </div>
            <LandingPageFooter/>
        </>

    );
};

export default ContactUs;