import React, {useState} from 'react'
import "./LoginForm.css";
import axios from 'axios';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {GoogleLogin} from '@react-oauth/google';
import Typewriter from "typewriter-effect";
import Alert from "../floating-window-success/Alert";
import {BACKEND_URL} from "../../constants/constants";
import RotatingLinesLoader from "../rotating-lines/RotatingLinesLoader";
import Button from "../button/Button";
import TextInput from "../text-input/TextInput";
import {ReactComponent as LogoBlue} from "../../assets/images/logo-blue.svg"
import useGsapAnimation from "../../hooks/useGsapAnimation";
import SEO from "../seo/SEO";

function LoginForm() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await axios.post(`${BACKEND_URL}/sign-in`, {email, password});
        setIsLoading(false);

        if (response.data.status === 'Success') {
            const {role, id} = response.data;
            if (role === 'carrier') {
                setTimeout(() => {
                    navigate(`/carrier-dashboard/${id}`);
                }, 1000)
            } else if (role === 'shipper') {
                setTimeout(() => {
                    navigate(`/shipper-dashboard/${id}`);
                }, 1000)
            } else if (role === 'driver') {
                setTimeout(() => {
                    navigate(`/driver-dashboard/${id}`);
                }, 1000)
            }
            setMessage({
                status: 'success',
                text: 'Login successful!',
                description: 'Redirecting to your dashboard...'
            });
        } else {
            setMessage({
                status: 'error',
                text: 'Login failed.',
                description: 'User not found or an error occurred. Please try again.'
            });
        }
    };

    const animationRef = useGsapAnimation('fadeIn');

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        const { credential } = credentialResponse;
        try {
            const response = await axios.post(`${BACKEND_URL}/google-login`, { token: credential });

            if (response.status === 200) {
                const { userShipperID } = response.data;
                setMessage({
                    status: 'success',
                    text: 'Login successful!',
                    description: 'Redirecting to your dashboard...'
                });
                setTimeout(() => {
                    navigate(`/shipper-dashboard/${userShipperID}`);
                }, 1500);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMessage({
                    status: 'error',
                    text: 'Login failed.',
                    description: 'Not associated account with this email, sign up with Google on the sign-up page, then continue in the login page to make auth.'
                });
            } else {
                setMessage({
                    status: 'error',
                    text: 'Login failed.',
                    description: 'User not found or an error occurred. Please try again.'
                });
            }
        }
    };

    return (
        <>
            <SEO
                title="Login - OpenShipAI"
                description="Login to OpenShipAI to manage your logistics and shipping operations efficiently."
                keywords="login, OpenShipAI, logistics, shipping, AI"
            />
            {message && <Alert status={message.status} text={message.text} description={message.description}/>}
            <div className="sign-in-wrapper">
                <div className="left-side">
                    <form onSubmit={handleSubmit} className="login-custom-form" ref={animationRef}>
                        <LogoBlue className="logo-blue"/>
                        <h2 className="h2-title-login-form">Welcome Back!</h2>
                        <h3 className="h3-title-login-form">We hope you will be satisfied using our service</h3>
                        <TextInput
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
                        />
                        <TextInput
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                        />
                        <Button variant="default-non-responsive">
                            {isLoading ?
                                <>
                                    <RotatingLinesLoader title="Processing..."/>
                                </>
                                :
                                "Sign In"}
                        </Button>
                        <div className="question-div">
                            <p className="question-p">Dont have account?</p>
                            <Link to="/sign-up" className="sign-in-link">Sign up now</Link>
                        </div>
                        <div className="divider">
                            <span className="line"></span>
                            <span className="text">Or Continue with</span>
                            <span className="line"></span>
                        </div>
                        <div className="login-with-google-button">
                            <GoogleLogin
                                onSuccess={handleGoogleLoginSuccess}
                                onError={() => {
                                    console.log("Login Failed");
                                }}
                            />
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
        </>
    )
}

export default LoginForm;


