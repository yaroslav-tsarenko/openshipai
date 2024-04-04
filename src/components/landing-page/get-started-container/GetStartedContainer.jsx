import React from 'react';
import Typewriter from "typewriter-effect";
import "../LandingPage.css";

const GetStartedContainer = () => {
    return (
        <div className="get-started-container">
            <div className="get-started-container-content">
                <h1>Ready to Get Started?</h1>
                <span className="get-started-container-content-text">
                        <Typewriter
                            options={{
                                strings: ["Create an account or talk to one of our experts."],
                                autoStart: true,
                                loop: true,
                                pauseFor: 4500,
                            }}
                        />
                    </span>
                <section className="get-started-buttons">
                    <button className="sign-up-button-get-started">Sign Up For Free</button>
                    <button className="contact-sales-button-get-started">Contact Sales</button>
                </section>
            </div>
        </div>
    );
};

export default GetStartedContainer;