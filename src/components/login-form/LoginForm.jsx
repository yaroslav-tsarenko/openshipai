import React, {useState} from 'react'
import "./LoginForm.css";
import axios from 'axios';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {GoogleLogin} from '@react-oauth/google';
import Typewriter from "typewriter-effect";


function LoginForm() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('https://jarvis-ai-logistic-db-server.onrender.com/sign-in', { email, password });
        if (response.data.status === 'Success') {
            const { role, id } = response.data;
            if (role === 'carrier') {
                navigate(`/carrier-dashboard/${id}`);
            } else if (role === 'shipper') {
                navigate(`/shipper-dashboard/${id}`);
            } else if (role === 'driver') {
                navigate(`/driver-dashboard/${id}`);
            }
        } else {
            console.error(response.data.message);
        }
    };

    const handleGoogleLoginSuccess = (credentialResponse) => {

    };

    return (
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
                    <button type="submit" className="sign-in-button">Sign In</button>
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
    )
}

export default LoginForm;


