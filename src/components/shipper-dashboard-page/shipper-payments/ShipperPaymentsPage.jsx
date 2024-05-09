import React, {useEffect, useState, useRef} from "react";
import '../ShipperDashboard.css';
import {ReactComponent as OpenshipLogo} from "../../../assets/openship-ai-logo-updated.svg";
import {ReactComponent as DashboardIcon} from "../../../assets/dashboard-icon-grey.svg";
import {ReactComponent as DashboardIconWhite} from "../../../assets/dashboard-icon-white.svg";
import {ReactComponent as LoadIcon} from "../../../assets/load-icon-grey.svg";
import {ReactComponent as LoadIconWhite} from "../../../assets/load-icon-white.svg";
import {ReactComponent as LogoutIcon} from "../../../assets/logout-icon-grey.svg";
import {ReactComponent as LogoutIconWhite} from "../../../assets/logout-icon-white.svg";
import {ReactComponent as PaymentIcon} from "../../../assets/payment-icon-grey.svg";
import {ReactComponent as PaymentIconWhite} from "../../../assets/payment-icon-white.svg";
import {ReactComponent as ProfileIcon} from "../../../assets/profile-icon-grey.svg";
import {ReactComponent as ProfileIconWhite} from "../../../assets/profile-icon-white.svg";
import {ReactComponent as SettingsIcon} from "../../../assets/settings-icon-grey.svg";
import {ReactComponent as SettingsIconWhite} from "../../../assets/settings-icon-white.svg";
import {ReactComponent as QoutesIcon} from "../../../assets/listing-icon-grey.svg";
import {ReactComponent as QoutesIconWhite} from "../../../assets/listing-icon-white.svg";
import {ReactComponent as CarrierChatIcon} from "../../../assets/chat-icon-grey.svg";
import {ReactComponent as CarrierChatIconWhite} from "../../../assets/chat-icon-white.svg";
import {ReactComponent as ArrowNav} from "../../../assets/arrow-nav.svg";
import {ReactComponent as DefaultUserAvatar} from "../../../assets/default-avatar.svg";
import {ReactComponent as BellIcon} from "../../../assets/bell-icon.svg";
import {ReactComponent as SettingsAccountIcon} from "../../../assets/settings-icon.svg";
import {ReactComponent as SearchIcon} from "../../../assets/search-icon.svg";
import {ReactComponent as BlueCard} from "../../../assets/card-blue.svg";
import {ReactComponent as RedCard} from "../../../assets/card-pink.svg";
import {ReactComponent as AddNew} from "../../../assets/add-new-card.svg";
import {ReactComponent as SortIcon} from "../../../assets/sort-icon-blue.svg";
import {ReactComponent as SortIconWhite} from "../../../assets/sort-icon-white.svg";
import {ReactComponent as FilterIcon} from "../../../assets/filter-icon-blue.svg";
import {ReactComponent as FilterIconWhite} from "../../../assets/filter-icon-white.svg";
import {ReactComponent as CreateLoadIcon} from "../../../assets/create-load-icon-plus.svg";
import {ReactComponent as DirectionIcon} from "../../../assets/direction-icon.svg";
import {ReactComponent as CarrierLogo} from "../../../assets/trane-logo-carrier.svg";
import {useParams} from 'react-router-dom';
import {Link} from "react-router-dom";
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";

const ShipperPaymentsPage = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [hoveredButton, setHoveredButton] = useState('');
    const {id} = useParams();
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="shipper-dashboard-wrapper">
            <DashboardSidebar
                DashboardAI={{ visible: true, route: `/shipper-dashboard/${id}` }}
                Settings={{ visible: true, route: `/shipper-settings/${id}` }}
                Profile={{ visible: true, route: `/shipper-profile/${id}` }}
                Payments={{ visible: true, route: `/shipper-payments/${id}` }}
                ChatWithCarrier={{ visible: true, route: `/shipper-chat-conversation/${id}` }}
                MyQoutes={{ visible: true, route: `/shipper-qoutes/${id}` }}
                MyLoads={{ visible: true, route: `/shipper-loads/${id}` }}
            />
            <div className="shipper-dashboard-content">
                <HeaderDashboard
                    contentTitle="Welcome Back, John"
                    contentSubtitle="Your current payments"
                    accountName="John Doe"
                    accountRole="Shipper"
                    profileLink={`/shipper-profile/${id}`}
                    bellLink={`/shipper-settings/${id}`}
                    settingsLink={`/shipper-profile/${id}`}
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
