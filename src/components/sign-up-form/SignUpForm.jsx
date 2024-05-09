import React, {useState} from 'react'
import "./SignUpForm.css";
import {Link} from "react-router-dom";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {GoogleLogin} from '@react-oauth/google';
import ReCAPTCHA from "react-google-recaptcha";
import Typewriter from "typewriter-effect";
import FloatingWindowSuccess from "../floating-window-success/FloatingWindowSuccess";
import {CircularProgress} from "@mui/material";

function SignUpForm() {
    const [captchaValue, setCaptchaValue] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        userShipperName: '',
        userShipperSecondName: '',
        userShipperPhoneNumber: '',
        userShipperEmail: '',
        userShipperPassword: '',
        userShipperRole: 'shipper',
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
        axios.post('https://jarvis-ai-logistic-db-server.onrender.com/save-shipper-data', formData)
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
    const handleGoogleLoginSignUpSuccess = (credentialResponse) => {
        const credential = credentialResponse.credential;

        axios.post('https://jarvis-ai-logistic-db-server.onrender.com/google-login', {token: credential})
            .then(response => {
                if (response.data.status === "Success") {
                    const personalEndpoint = response.data.user.personalEndpoint;
                    axios.post('https://jarvis-ai-logistic-db-server.onrender.com/create-chat-session', { userEndpoint: personalEndpoint })
                        .then(response => {
                            if (response.data.status === "Success") {
                                navigate(`/jarvis-chat/${personalEndpoint}/${response.data.chatEndpoint}`);
                            } else {
                                console.error('Error creating chat session:', response.data.message);
                            }
                        })
                        .catch(err => {
                            console.error('Error during chat session creation:', err);
                        });
                } else {
                    console.error('Login failed:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Error during login:', error);
            });
    };
    return (
        <div className="sign-in-wrapper">
            {message && <FloatingWindowSuccess text={message}/>}

            <div className="left-side">
                <form onSubmit={handleSubmit} className="sign-up-custom-form">
                    <h2 className="h2-title-sign-up">Create your account as shipper</h2>
                    <h3 className="h3-title-sign-up">You won't regret it</h3>
                    <div className="registration-block-wrapper">
                        <div className="registration-block">
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="userShipperName"
                                    autoComplete="off"
                                    className="google-style-input"
                                    onChange={handleChange('userShipperName')} value={formData.userShipperName}
                                    required={true}
                                />
                                <label htmlFor="userName" className="google-style-input-label">Name</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="userShipperSecondName"
                                    autoComplete="off"
                                    className="google-style-input"
                                    onChange={handleChange('userShipperSecondName')}
                                    value={formData.userShipperSecondName}
                                    required={true}
                                />
                                <label htmlFor="userSecondName" className="google-style-input-label">Last Name</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="userShipperPhoneNumber"
                                    autoComplete="off"
                                    className="google-style-input"
                                    onChange={handleChange('userShipperPhoneNumber')}
                                    value={formData.userShipperPhoneNumber}
                                    required={true}
                                />
                                <label htmlFor="userPhoneNumber" className="google-style-input-label">Phone
                                    Number</label>
                            </div>
                        </div>
                        <div className="registration-block">
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="userShipperEmail"
                                    autoComplete="off"
                                    className="google-style-input"
                                    onChange={handleChange('userShipperEmail')} value={formData.userShipperEmail}
                                    required={true}
                                />
                                <label htmlFor="userEmail" className="google-style-input-label">Email</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="password"
                                    id="userShipperPassword"
                                    autoComplete="off"
                                    className="google-style-input"
                                    onChange={handleChange('userShipperPassword')} value={formData.userShipperPassword}
                                    required={true}
                                />
                                <label htmlFor="userPassword" className="google-style-input-label">Password</label>
                            </div>
                        </div>
                    </div>
                    <ReCAPTCHA className="recaptcha-checkbox" sitekey="6Lcu-ogpAAAAAEOc-_bYulbAKG6_8lZboQ66BTS0"
                               onChange={handleCaptchaChange}/>
                    <button className="sign-up-button" type="submit">
                        {isLoading ? <CircularProgress size={30}/>
                            : 'Create Account'}
                    </button>
                    <div className="login-with-google-button">
                        <GoogleLogin
                            onSuccess={handleGoogleLoginSignUpSuccess}
                            onError={() => {
                                console.log("Login Failed");
                            }}
                        />
                    </div>
                    <div className="question-div">
                        <p className="question-p">Already have an account?</p>
                        <Link to="/sign-in" className="sign-in-link-sign-up">Sign in now</Link>
                    </div>
                </form>
            </div>
            <div className="sign-up-right-side">
                <section className="choosing-role-section">
                    <h1 className="choosing-role-right-side-title">
                        <Typewriter
                            options={{
                                strings: ["Welcome Shipper"],
                                autoStart: true,
                                loop: true,
                                pauseFor: 4500,
                            }}
                        />
                    </h1>
                    <p className="choosing-role-right-side-description">
                        <Typewriter
                            options={{
                                strings: ["Discover the best way to ship your goods", "We will help you to find the best carrier"],
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
