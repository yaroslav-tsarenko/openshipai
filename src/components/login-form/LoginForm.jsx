import React, {useState} from 'react'
import "./LoginForm.css";
import axios from 'axios';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {GoogleLogin} from '@react-oauth/google';
import Typewriter from "typewriter-effect";
import {ClipLoader} from "react-spinners";
import Alert from "../floating-window-success/Alert";
import {BACKEND_URL} from "../../constants/constants";
import RotatingLinesLoader from "../rotating-lines/RotatingLinesLoader";
import Button from "../button/Button";

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
            setMessage({type: 'success', text: 'Login successful'}); // Set message on success
        } else {
            setMessage({type: 'error', text: response.data.message}); // Set message on error
        }
    };

    const handleGoogleLoginSuccess = (credentialResponse) => {

    };

    return (
        <>
            {message && (message.type === 'success' ? <Alert status="success" description="You have succesfully logged in " text={message.text}/> :
                <Alert description="Something went wrong. Try again"  status="error" text={message.text}/>)}
            <div className="sign-in-wrapper">
                <div className="left-side">
                    <form onSubmit={handleSubmit} className="login-custom-form">
                        <h2 className="h2-title-login-form">Welcome Back</h2>
                        <h3 className="h3-title-login-form">We hope you will be satisfied using our service</h3>
                        <div className="google-input-wrapper">
                            <input
                                type="text"
                                id="email"
                                autoComplete="off"
                                className="google-style-input"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="email" className="google-style-input-label">Email</label>
                        </div>
                        <div className="google-input-wrapper">
                            <input
                                type="password"
                                id="password"
                                autoComplete="off"
                                className="google-style-input"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password" className="google-style-input-label">Password</label>
                        </div>
                        <Button variant="default">
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
                <div className="right-side-login">
                    <section className="right-side-login-section">
                        <h1 className="right-side-login-side-title">
                            <Typewriter
                                options={{
                                    strings: ["Welcome"],
                                    autoStart: true,
                                    loop: true,
                                    pauseFor: 4500,
                                }}
                            />
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


