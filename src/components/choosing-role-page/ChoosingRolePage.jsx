import React, {useState, useEffect} from 'react'
import "./ChoosingRolePage.css";
import {Link} from "react-router-dom";
import {
    ReactComponent as BoxIcon
} from "../../assets/boxes-vector.svg";
import {
    ReactComponent as TruckIcon
} from "../../assets/truck-vector.svg";
import Typewriter from 'typewriter-effect';
import CustomCheckBox from "../custom-checkbox/CustomCheckBox";

function ChoosingRolePage() {
    return (
        <div className="sign-in-wrapper-choosing-role">
            <div className="choosing-role-left-side">
                <div className="role-left-side-content">
                    <h2>Let's Get Started</h2>
                    <p>Select the user type that best fits your role</p>
                    <div className="role-buttons-container">
                        <Link to={"/sign-up-shipper"} className="role-button">
                            <section>
                                <h2>I'm Shipper</h2>
                                <p>I have stuff i need to get from A to B</p>
                            </section>
                            <BoxIcon className="choosing-role-icon"/>
                        </Link>
                        <Link to={"/sign-up-carrier"} className="role-button">
                            <section>
                                <h2>I'm Carrier</h2>
                                <p>I have empty space in my truck</p>
                            </section>
                            <TruckIcon className="choosing-role-icon"/>
                        </Link>
                    </div>
                    <div className="policy-agreement-container">
                        <CustomCheckBox/>
                        <p className="policy-agreement-container-p">I agree to the <Link to={"/"}>Terms of Service</Link> and <Link to={"/"}>Privacy
                            Policy</Link></p>
                    </div>

                    <button className="get-started-button">Get Started</button>
                    <h4 className="question-p-sign-up">Already have an account? <Link className="question-p-sign-in"
                                                                                      to={"/sign-in"}>Sign In</Link>
                    </h4>
                </div>
            </div>
            <div className="choosing-role-right-side">
                <section className="choosing-role-section">
                    <h1 className="choosing-role-right-side-title">
                        <Typewriter
                            options={{
                                strings: ["I'm Shipper", "I'm Carrier"],
                                autoStart: true,
                                loop: true,
                                pauseFor: 4500,
                            }}
                        />
                    </h1>
                    <p className="choosing-role-right-side-description">
                        <Typewriter
                            options={{
                                strings: ["I have stuff i need to get from A to B", "I have empty space in my truck"],
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

export default ChoosingRolePage;
