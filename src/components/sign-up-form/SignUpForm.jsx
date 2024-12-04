import React, {useState} from 'react'
import "./SignUpForm.css";
import {Link} from "react-router-dom";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {GoogleLogin} from '@react-oauth/google';
import ReCAPTCHA from "react-google-recaptcha";
import Typewriter from "typewriter-effect";
import Alert from "../floating-window-success/Alert";
import {BACKEND_URL} from "../../constants/constants";
import Button from "../button/Button";
import TextInput from "../text-input/TextInput";
import Grid from "../grid-two-columns/Grid";
import {ReactComponent as LogoBlue} from "../../assets/logo-blue.svg"
import useGsapAnimation from "../../hooks/useGsapAnimation";
import RotatingLinesLoader from "../rotating-lines/RotatingLinesLoader";

function SignUpForm() {
    const [captchaValue, setCaptchaValue] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const animationRef = useGsapAnimation('fadeIn');
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        userShipperName: '',
        userShipperSecondName: '',
        userShipperPhoneNumber: '',
        userShipperEmail: '',
        userShipperPassword: '',
        userShipperRole: 'shipper',
        userShipperAvatar: "/uploads/default-avatar.png",
        userShipperServiceRating: 0,
        userShipperServiceAgreement: 0,
        userShipperServiceActivity: 0,
        userShipperID: Math.random().toString(20).substring(2, 20) + Math.random().toString(20).substring(2, 20),
    });
    const handleChange = (input) => (e) => {
        setFormData({...formData, [input]: e.target.value});
    };
    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post(`${BACKEND_URL}/save-shipper-data`, formData)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    setTimeout(() => {
                        setMessage("Shipper Account created successfully!");
                        setIsLoading(false);
                        setTimeout(() => {
                            navigate(`/sign-in`);
                        }, 1500);
                    }, 500);
                }
            })
            .catch(error => {
                console.log('Error:', error);
                setIsLoading(false);
            });
    };

    const handleGoogleLoginSignUpSuccess = async (credentialResponse) => {
        setIsLoading(true);
        const { credential } = credentialResponse;
        try {
            const response = await axios.post(`${BACKEND_URL}/google-sign-up`, { token: credential });

            if (response.status === 200) {
                const { email, name, family_name } = response.data;
                const randomPassword = Math.random().toString(36).slice(-8);
                const userShipperID = Math.random().toString(20).substring(2, 20) + Math.random().toString(20).substring(2, 20);

                const newShipper = {
                    userShipperEmail: email,
                    userShipperPassword: randomPassword,
                    userShipperID: userShipperID,
                    userShipperRole: 'shipper',
                    userShipperName: name,
                    userShipperSecondName: family_name,
                    userShipperAvatar: "/uploads/default-avatar.png",
                    userShipperServiceRating: 0,
                    userShipperServiceAgreement: 0,
                    userShipperServiceActivity: 0,
                };

                await axios.post(`${BACKEND_URL}/save-shipper-data`, newShipper);

                await axios.post(`${BACKEND_URL}/send-email`, {
                    to: email,
                    subject: 'Congratulations!✅ You have successfully created an account! Welcome to our service!',
                    text: `Your auto-generated password with AI is below. If you want to change it, you can always do it in account settings: ${randomPassword}`
                });

                setMessage({
                    status: 'success',
                    text: 'Google Account created successfully!',
                    description: 'Check your email for the password.'
                });
                setTimeout(() => {
                    navigate(`/sign-in`);
                }, 1500);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMessage({
                    status: 'error',
                    text: 'Account already exists.',
                    description: 'Account already exists, go to the sign-in page then login with Google.'
                });
            } else {
                setMessage({
                    status: 'error',
                    text: 'Account already exists.',
                    description: 'Account already exists, go to the sign-in page then login with Google.'
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="sign-in-wrapper">
            {message && <Alert status={message.status} text={message.text} description={message.description}/>}
            <div className="left-side">
                <form onSubmit={handleSubmit} className="sign-up-custom-form">
                    <LogoBlue className="logo-blue-sign-up"/>
                    <h2 className="h2-title-login-form">Welcome Back!</h2>
                    <h3 className="h3-title-login-form">We hope you will be satisfied using our service</h3>
                    <Grid columns="1, 1fr">
                        <TextInput
                            type="text"
                            id="userShipperName"
                            value={formData.userShipperName}
                            onChange={handleChange('userShipperName')}
                            label="Name"
                        />
                        <TextInput
                            type="text"
                            id="userShipperSecondName"
                            value={formData.userShipperSecondName}
                            onChange={handleChange('userShipperSecondName')}
                            label="Last Name"
                        />
                        <TextInput
                            type="text"
                            id="userShipperPhoneNumber"
                            value={formData.userShipperPhoneNumber}
                            onChange={handleChange('userShipperPhoneNumber')}
                            label="Phone Number"
                        />
                        <TextInput
                            type="text"
                            id="userShipperEmail"
                            value={formData.userShipperEmail}
                            onChange={handleChange('userShipperEmail')}
                            label="Email"
                        />
                        <TextInput
                            type="password"
                            id="userShipperPassword"
                            value={formData.userShipperPassword}
                            onChange={handleChange('userShipperPassword')}
                            label="Password"
                        />
                    </Grid>
                    <ReCAPTCHA className="recaptcha-checkbox" sitekey="6Lcu-ogpAAAAAEOc-_bYulbAKG6_8lZboQ66BTS0"
                               onChange={handleCaptchaChange}/>
                    <Button variant="default-non-responsive" className="sign-up-button" type="submit">
                        {isLoading ?
                            <RotatingLinesLoader title="Processing..." /> : 'Create Account'}
                    </Button>
                    <div className="divider">
                        <span className="line"></span>
                        <span className="text">Or Continue with</span>
                        <span className="line"></span>
                    </div>
                    <div className="login-with-google-button">
                        {isLoading ? (
                            <RotatingLinesLoader title="Processing..." />
                        ) : (
                            <GoogleLogin
                                onSuccess={handleGoogleLoginSignUpSuccess}
                                onError={() => {
                                    console.log("Login Failed");
                                }}
                            />
                        )}
                    </div>
                    <div className="question-div">
                        <p className="question-p">Already have an account?</p>
                        <Link to="/sign-in" className="sign-in-link">Sign in now</Link>
                    </div>
                </form>
            </div>
            <div className="right-side-login" ref={animationRef}>
                <section className="right-side-login-section">
                    <h1 className="right-side-login-side-title">
                        WELCOME SHIPPER
                    </h1>
                    <p className="right-side-login-side-description">
                        <Typewriter
                            options={{
                                strings: ["We appreciate see you", "Hope you will be satisfied"],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </p>
                </section>
            </div>
        </div>

    )
}

export default SignUpForm;
