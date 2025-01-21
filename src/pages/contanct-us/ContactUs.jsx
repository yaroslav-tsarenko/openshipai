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
import Description from "../../components/landing-page-new/description/Description";

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
            <Description
                title="Contact Us"
                description="We’re here to help. At OpenShipAI, we value communication and aim to provide excellent support for all your inquiries, feedback, and concerns. Reach out to us through any of the methods below."
                subDescriptions={[
                    {
                        title: "1. Customer Support",
                        content: "Our dedicated customer support team is available to assist you with any challenges or questions. You can contact us via:",
                        list: [
                            "Email: support@openshipai.com for general queries and troubleshooting.",
                            "Phone: +1-800-555-TRANSPORT for immediate assistance during business hours.",
                            "Live Chat: Available on our website for quick support and answers."
                        ]
                    },
                    {
                        title: "2. Business Inquiries",
                        content: "For partnerships, collaborations, or business-related discussions, please connect with us through:",
                        list: [
                            "Email: partnerships@openshipai.com for proposals and strategic collaborations.",
                            "Phone: +1-800-555-BIZDEV for direct communication with our business team.",
                            "Contact Form: Submit your detailed inquiry through the 'Business Contact' section on our website."
                        ]
                    },
                    {
                        title: "3. Technical Support",
                        content: "If you encounter any technical issues with our platform, our tech support team is ready to help. Contact us using the following methods:",
                        list: [
                            "Email: info@openshipai.com for in-depth troubleshooting assistance and openshipai@gmail.com.",
                            "Support Portal: Access our comprehensive guides and FAQs for self-service solutions.",
                            "Error Reporting: Use the 'Report an Issue' feature on our platform to log technical problems directly."
                        ]
                    },
                    {
                        title: "4. Feedback and Suggestions",
                        content: "Your feedback is invaluable to us. Help us improve by sharing your suggestions or reporting concerns via:",
                        list: [
                            "Feedback Form: Available on our website for easy submissions.",
                            "Email: feedback@openshipai.com to share detailed ideas and improvements.",
                            "User Surveys: Participate in periodic surveys to help us enhance your experience."
                        ]
                    },
                    {
                        title: "5. Office Locations",
                        content: "Visit or mail us at our office locations. We’d be happy to assist in person:",
                        list: [
                            "Main Office: 123 Logistics Lane, Innovation City, USA.",
                            "Branch Office: 456 Transit Blvd, Logistics Hub, USA.",
                            "International Office: 789 Global Freight Road, Worldwide City, UK."
                        ]
                    },
                    {
                        title: "6. Social Media Channels",
                        content: "Connect with us on social media for updates, announcements, and support. Follow us on:",
                        list: [
                            "LinkedIn: OpenShipAI for professional news and insights.",
                            "Twitter: @OpenShipAI for real-time updates and customer interaction.",
                            "Facebook: OpenShipAI for community discussions and support."
                        ]
                    },
                    {
                        title: "7. Availability",
                        content: "Our support team is available during the following hours:",
                        list: [
                            "Monday to Friday: 9:00 AM to 6:00 PM (EST).",
                            "Saturday: 10:00 AM to 4:00 PM (EST).",
                            "Closed on Sundays and major holidays."
                        ]
                    }
                ]}
            />
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