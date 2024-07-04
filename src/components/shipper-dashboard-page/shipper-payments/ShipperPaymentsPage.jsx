import React, {useEffect, useState, useRef} from "react";
import '../ShipperDashboard.css';
import {ReactComponent as DefaultUserAvatar} from "../../../assets/default-avatar.svg";
import {ReactComponent as BlueCard} from "../../../assets/card-blue.svg";
import {ReactComponent as RedCard} from "../../../assets/card-pink.svg";
import {ReactComponent as AddNew} from "../../../assets/add-new-card.svg";
import {ReactComponent as SortIcon} from "../../../assets/sort-icon-blue.svg";
import {useParams} from 'react-router-dom';
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import {Skeleton} from "@mui/material";
import axios from "axios";
import {BACKEND_URL} from "../../../constants/constants";

const ShipperPaymentsPage = () => {

    const {shipperID} = useParams();
    const address = process.env.REACT_APP_API_BASE_URL;
    const [shipperInfo, setShipperInfo] = useState(null);

    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (shipperInfo && shipperInfo.userShipperAvatar) {
            setLoading(true);
            const avatarUrl = `${BACKEND_URL}/${shipperInfo.userShipperAvatar}`;

            axios.get(avatarUrl)
                .then(() => {
                    setPreviewSavedImage(avatarUrl);
                    setLoading(false);
                })
                .catch(() => {
                    console.error('Image does not exist');
                    setLoading(false);
                });
        }
    }, [shipperInfo]);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/get-current-user/shipper/${shipperID}`);
                const data = await response.json();

                setShipperInfo(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getUser();
    }, [shipperInfo, shipperID]);

    return (
        <div className="shipper-dashboard-wrapper">
            <DashboardSidebar
                DashboardAI={{visible: true, route: `/shipper-dashboard/${shipperID}`}}
                Settings={{visible: true, route: `/shipper-settings/${shipperID}`}}
                Payments={{visible: true, route: `/shipper-payments/${shipperID}`}}
                ChatWithCarrier={{visible: true, route: `/shipper-chat-conversation/${shipperID}`}}
                MyLoads={{visible: true, route: `/shipper-loads/${shipperID}`}}
            />
            <div className="shipper-dashboard-content">
                <HeaderDashboard
                    contentTitle={shipperInfo ?
                        <>Welcome back, {shipperInfo.userShipperName}!</> :
                        <Skeleton variant="text" width={250} />}
                    contentSubtitle="Monitor payments, loads, revenues"
                    accountName={shipperInfo ? shipperInfo.userShipperName : <Skeleton variant="text" width={60} />}
                    accountRole={shipperInfo ? shipperInfo.userShipperRole : <Skeleton variant="text" width={40} />}
                    profileLink={`/shipper-profile/${shipperID}`}
                    bellLink={`/shipper-settings/${shipperID}`}
                    settingsLink={`/shipper-profile/${shipperID}`}
                    avatar={previewSavedImage ? previewSavedImage : DefaultUserAvatar}
                />
                <div className="payments-wrapper">
                    <div className="payment-selection-header">
                        <h3 className="payment-selection-title">Select Payment Method</h3>
                        <section className="select-payment-method">
                            <button className="payment-method-button">Credit Card</button>
                            <button className="payment-method-button">PayPal</button>
                            <button className="payment-method-button">QR</button>
                            <button className="payment-method-button">Other</button>
                        </section>
                    </div>
                    <div className="payment-method-content">
                        <section className="user-card-container">
                            <RedCard className="card-icon"/>
                            <BlueCard className="card-icon"/>
                            <AddNew className="card-icon"/>
                        </section>
                        <section className="transaction-history">
                            <div className="transaction-history-header">
                                <h3>Transaction History</h3>
                                <button><SortIcon/> Sort</button>
                            </div>
                            <div className="transaction-history-item">
                                <DefaultUserAvatar/>
                                <section>
                                    <h4>You</h4>
                                    <p>Payment to Carrier</p>
                                </section>
                                <section>
                                    <h4>Mar 6, 2024</h4>
                                    <p>3:12:23 am</p>
                                </section>
                                <h4>-200$</h4>
                            </div>
                            <div className="transaction-history-item">
                                <DefaultUserAvatar/>
                                <section>
                                    <h4>You</h4>
                                    <p>Payment to Carrier</p>
                                </section>
                                <section>
                                    <h4>Mar 6, 2024</h4>
                                    <p>3:12:23 am</p>
                                </section>
                                <h4>-200$</h4>
                            </div>
                            <div className="transaction-history-item">
                                <DefaultUserAvatar/>
                                <section>
                                    <h4>You</h4>
                                    <p>Payment to Carrier</p>
                                </section>
                                <section>
                                    <h4>Mar 6, 2024</h4>
                                    <p>3:12:23 am</p>
                                </section>
                                <h4>-200$</h4>
                            </div>
                            <div className="transaction-history-item">
                                <DefaultUserAvatar/>
                                <section>
                                    <h4>You</h4>
                                    <p>Payment to Carrier</p>
                                </section>
                                <section>
                                    <h4>Mar 6, 2024</h4>
                                    <p>3:12:23 am</p>
                                </section>
                                <h4>-200$</h4>
                            </div>
                            <div className="transaction-history-item">
                                <DefaultUserAvatar/>
                                <section>
                                    <h4>You</h4>
                                    <p>Payment to Carrier</p>
                                </section>
                                <section>
                                    <h4>Mar 6, 2024</h4>
                                    <p>3:12:23 am</p>
                                </section>
                                <h4>-200$</h4>
                            </div>
                            <div className="transaction-history-item">
                                <DefaultUserAvatar/>
                                <section>
                                    <h4>You</h4>
                                    <p>Payment to Carrier</p>
                                </section>
                                <section>
                                    <h4>Mar 6, 2024</h4>
                                    <p>3:12:23 am</p>
                                </section>
                                <h4>-200$</h4>
                            </div>
                        </section>
                        <section className="card-settings">
                            <div className="selected-card">
                                <h2>Selected Card</h2>
                                <RedCard className="card-icon"/>
                            </div>
                            <div className="card-settings-content">
                                <a href="#">Pin Code Settings</a>
                                <a href="#">Cashback</a>
                                <a href="#">Settings Limits</a>
                                <a href="#">Block card</a>
                            </div>
                            <button>Delete card</button>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShipperPaymentsPage;
