import React, {useState} from 'react'
import "./ChoosingRolePage.css";
import {FaBoxes} from "react-icons/fa";
import {FaTruckLoading} from "react-icons/fa";

function ChoosingRolePage() {


    return (
        <div className="sign-in-wrapper-choosing-role">
            <div className="choosing-role-left-side">
                <div className="role-left-side-content">
                    <h2>Let's Get Started</h2>
                    <p>Select the user type that best fits your role</p>
                    <div className="role-buttons-container">
                        <div className="role-button">
                            <section>
                                <h2>I'm Shipper</h2>
                                <p>I have stuff i need to get from A to B</p>
                            </section>
                            <FaBoxes className="role-button-color"/>
                        </div>
                        <div className="role-button">
                            <section>
                                <h2>I'm Carrier</h2>
                                <p>I have empty space in my truck</p>
                            </section>
                            <FaTruckLoading className="role-button-color"/>
                        </div>
                    </div>
                    <button className="get-started-button">Get Started</button>
                </div>
            </div>
            <div className="choosing-role-right-side">
                <section>
                    <h1 className="choosing-role-right-side-title">I'm Shipper</h1>
                    <p className="choosing-role-right-side-description">I need to get my stuff from A to B</p>
                </section>
            </div>
        </div>

    )
}

export default ChoosingRolePage;
