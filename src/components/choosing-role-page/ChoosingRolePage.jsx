import React from 'react';
import styles from './ChoosingRolePage.module.scss';
import customerImage from '../../assets/images/view-beautiful-caucasian-female-writing-cardboard-box-surrounded-with-boxes.jpg';
import carrierImage from '../../assets/images/courier-with-delivery-cardboard-box-by-car.jpg';
import Typewriter from "typewriter-effect";
import {Link} from "react-router-dom";

const ChoosingRolePage = () => {
    return (
        <div className={styles.choosingRoleContainer}>
            <div className={styles.chooseYourSideText}>Choose your side</div>
            <div className={styles.imageBlocks}>
                <div
                    className={styles.imageBlock}
                    style={{ backgroundImage: `url(${customerImage})` }}>
                    <div className={styles.blackout}>
                        <h2 className={styles.roleText}>Shipper</h2>
                        <Typewriter
                            options={{
                                strings: [
                                    "We appreciate see you",
                                    "Hope you will be satisfied",
                                    "Create and manage loads",
                                    "Track shipments in real-time",
                                    "Communicate with carriers"
                                ],
                                autoStart: true,
                                loop: true,
                            }}/>
                        <Link to={"/sign-up-shipper"} className={styles.chooseRoleLink}>
                            Become Shipper
                        </Link>
                    </div>
                </div>
                <div
                    className={styles.imageBlock}
                    style={{ backgroundImage: `url(${carrierImage})` }}
                >
                    <div className={styles.blackout}>
                        <h2 className={styles.roleText}>Carrier</h2>
                        <Typewriter
                            options={{
                                strings: [
                                    "Manage Loads, Deliver Loads, Get Paid, Make your Business Simple",
                                    "Optimize your routes, Save time, Increase efficiency",
                                    "Track your deliveries, Ensure timely arrivals",
                                    "Communicate with clients, Build strong relationships",
                                    "Expand your business, Reach new markets",
                                    "Ensure safety, Maintain compliance",
                                    "Get real-time updates, Stay informed",
                                    "Maximize your profits, Minimize your costs"
                                ],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                        <Link to={"/sign-up-carrier"} className={styles.chooseRoleLink}>
                            Become Carrier
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChoosingRolePage;