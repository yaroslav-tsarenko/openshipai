import React, {useEffect, useState, useRef} from "react";
import '../CarrierDashboard.css';
import {ReactComponent as OpenshipLogo} from "../../../assets/openship-ai-logo-updated.svg";
import {ReactComponent as DashboardIcon} from "../../../assets/dashboard-icon-grey.svg";
import {ReactComponent as DashboardIconWhite} from "../../../assets/dashboard-icon-white.svg";
import {ReactComponent as LoadIcon} from "../../../assets/load-icon-grey.svg";
import {ReactComponent as LoadIconWhite} from "../../../assets/load-icon-white.svg";
import {ReactComponent as LogoutIcon} from "../../../assets/logout-icon-grey.svg";
import {ReactComponent as LogoutIconWhite} from "../../../assets/logout-icon-white.svg";
import {ReactComponent as MoreVertIcon} from "../../../assets/more-verical-icons.svg";
import {ReactComponent as SettingsAccount} from "../../../assets/account-settings-icon.svg";
import {ReactComponent as SettingsAccountWhite} from "../../../assets/account-settings-icon-white.svg";
import {ReactComponent as SettingsPassword} from "../../../assets/lock-icon.svg";
import {ReactComponent as SettingsPasswordWhite} from "../../../assets/lock-icon-white.svg";
import {ReactComponent as SettingsNotifications} from "../../../assets/bell-settings-icon.svg";
import {ReactComponent as SettingsNotificationsWhite} from "../../../assets/bell-settings-icon-white.svg";
import {ReactComponent as SettingsHelp} from "../../../assets/help-settings-icon.svg";
import {ReactComponent as SettingsHelpWhite} from "../../../assets/help-settings-icon-white.svg";
import {ReactComponent as PlusIconBlue} from "../../../assets/plus-blue-icon.svg";
import {ReactComponent as PencilIcon} from "../../../assets/pencil-edit-icon.svg";
import {ReactComponent as IconInfo} from "../../../assets/info-icon.svg";
import {ReactComponent as BlueCard} from "../../../assets/card-blue.svg";
import {ReactComponent as RedCard} from "../../../assets/card-pink.svg";
import {ReactComponent as AddNew} from "../../../assets/add-new-card.svg";
import {ReactComponent as SortIcon} from "../../../assets/sort-icon-blue.svg";
import {ReactComponent as PaymentIcon} from "../../../assets/payment-icon-grey.svg";
import {ReactComponent as PaymentIconWhite} from "../../../assets/payment-icon-white.svg";
import {ReactComponent as ProfileIcon} from "../../../assets/profile-icon-grey.svg";
import {ReactComponent as ProfileIconWhite} from "../../../assets/profile-icon-white.svg";
import {ReactComponent as SettingsIcon} from "../../../assets/settings-icon-grey.svg";
import {ReactComponent as SettingsIconWhite} from "../../../assets/settings-icon-white.svg";
import {ReactComponent as LoadBoxIconWhite} from "../../../assets/LoadBoxIconWhite.svg";
import {ReactComponent as TireIcon} from "../../../assets/TireIcon.svg";
import {ReactComponent as TireIconWhite} from "../../../assets/tire-icon-white.svg";
import {ReactComponent as LoadBoxIcon} from "../../../assets/load-box-icon.svg";
import {ReactComponent as CarrierChatIcon} from "../../../assets/chat-icon-grey.svg";
import {ReactComponent as CarrierChatIconWhite} from "../../../assets/chat-icon-white.svg";
import {ReactComponent as ArrowNav} from "../../../assets/arrow-nav.svg";
import {ReactComponent as DefaultUserAvatar} from "../../../assets/default-avatar.svg";
import {ReactComponent as BellIcon} from "../../../assets/bell-icon.svg";
import {ReactComponent as SettingsAccountIcon} from "../../../assets/settings-icon.svg";
import {ReactComponent as SearchIcon} from "../../../assets/search-icon.svg";
import Switch from '../../switcher-component/Switch';
import {useParams} from 'react-router-dom';
import {Link} from "react-router-dom";
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import axios from "axios";
import {BACKEND_URL} from "../../../constants/constants";
import {Skeleton} from "@mui/material";

const CarrierPaymentsPage = () => {

    const [activeSetting, setActiveSetting] = useState('Account');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [hoveredButton, setHoveredButton] = useState('');
    const {carrierID} = useParams();
    const [isOnAI, setIsOnAI] = useState(false);
    const [isOnCarrier, setIsOnCarrier] = useState(false);
    const [isOnDriver, setIsOnDriver] = useState(false);
    const [isOnUpdates, setIsOnUpdates] = useState(false);

    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [carrierInfo, setCarrierInfo] = useState(null);

    useEffect(() => {
        const getAvatar = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-carrier-avatar/${carrierID}`);
                if (response.data.carrierAvatar) {
                    setPreviewSavedImage(`${BACKEND_URL}/${response.data.carrierAvatar}`);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        const getUser = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/get-current-user/carrier/${carrierID}`);
                const data = await response.json();
                setCarrierInfo(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        getUser();
        getAvatar();
    }, [carrierID]);
    const handleToggleAI = () => {
        setIsOnAI(!isOnAI);
    };
    const handleToggleCarrier = () => {
        setIsOnCarrier(!isOnCarrier);
    };
    const handleToggleDriver = () => {
        setIsOnDriver(!isOnDriver);
    };
    const handleToggleUpdates = () => {
        setIsOnUpdates(!isOnUpdates);
    };
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (

        <div className="carrier-dashboard-wrapper">
            <DashboardSidebar
                DashboardAI={{visible: true, route: `/carrier-dashboard/${carrierID}`}}
                TakeLoad={{visible: true, route: `/carrier-take-loads/${carrierID}`}}
                MyLoads={{visible: true, route: `/carrier-loads/${carrierID}`}}
                DriversAndEquip={{visible: true, route: `/carrier-drivers/${carrierID}`}}
                Payments={{visible: true, route: `/carrier-payments/${carrierID}`}}
                ChatWithShipper={{visible: true, route: `/carrier-chat-conversation/${carrierID}`}}
                Profile={{visible: true, route: `/carrier-profile/${carrierID}`}}
                Settings={{visible: true, route: `/carrier-settings/${carrierID}`}}
            />
            <div className="carrier-dashboard-content">
                <HeaderDashboard
                    contentTitle={carrierInfo ?
                        <>Welcome back, {carrierInfo.carrierContactCompanyName}!</> :
                        <Skeleton variant="text" width={250} />}
                    contentSubtitle="Monitor payments, loads, revenues"
                    accountName={carrierInfo ? carrierInfo.carrierContactCompanyName : <Skeleton variant="text" width={60} />}
                    accountRole={carrierInfo ? carrierInfo.role : <Skeleton variant="text" width={40} />}
                    profileLink={`/carrier-profile/${carrierID}`}
                    bellLink={`/carrier-settings/${carrierID}`}
                    settingsLink={`/carrier-profile/${carrierID}`}
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

export default CarrierPaymentsPage;