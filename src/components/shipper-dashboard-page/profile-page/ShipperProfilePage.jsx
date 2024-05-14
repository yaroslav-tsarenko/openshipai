import React, {useEffect, useState, useRef} from "react";
import '../ShipperDashboard.css';
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
import {ReactComponent as DeleteRedBinIcon} from "../../../assets/delete-account-bin-icon.svg";
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
import Switch from '../../switcher-component/Switch';
import {useParams} from 'react-router-dom';
import {Link} from "react-router-dom";
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";

const ShipperProfilePage = () => {
    const [activeSetting, setActiveSetting] = useState('Account');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [hoveredButton, setHoveredButton] = useState('');
    const {shipperID} = useParams();
    const [isOnAI, setIsOnAI] = useState(false);
    const [isOnCarrier, setIsOnCarrier] = useState(false);
    const [isOnDriver, setIsOnDriver] = useState(false);
    const [isOnUpdates, setIsOnUpdates] = useState(false);
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
        <div className="shipper-dashboard-wrapper">
            <DashboardSidebar
                DashboardAI={{ visible: true, route: `/shipper-dashboard/${shipperID}` }}
                Settings={{ visible: true, route: `/shipper-settings/${shipperID}` }}
                Profile={{ visible: true, route: `/shipper-profile/${shipperID}` }}
                Payments={{ visible: true, route: `/shipper-payments/${shipperID}` }}
                ChatWithCarrier={{ visible: true, route: `/shipper-chat-conversation/${shipperID}` }}
                MyQoutes={{ visible: true, route: `/shipper-qoutes/${shipperID}` }}
                MyLoads={{ visible: true, route: `/shipper-loads/${shipperID}` }}
            />
            <div className="shipper-dashboard-content">
                <HeaderDashboard
                    contentTitle="Welcome Back, John"
                    contentSubtitle="Monitor payments, loads, revenues"
                    accountName="John Doe"
                    accountRole="Shipper"
                    profileLink={`/shipper-profile/${shipperID}`}
                    bellLink={`/shipper-settings/${shipperID}`}
                    settingsLink={`/shipper-profile/${shipperID}`}
                />
                <div className="shipper-profile-content-wrapper">
                    <div className="profile-content-wrapper">
                        <div className="shipper-profile-content">
                            <div className="shipper-info">
                                <DefaultUserAvatar className="shipper-profile-avatar"/>
                                <section className="shipper-details-wrapper">
                                    <div className="shipper-role-name">
                                        <h3>John Doe</h3>
                                        <p>Shipper</p>
                                    </div>
                                    <div className="shipper-info-details">
                                        <p>USA, Los Angeles</p>
                                        <p>johndoe@gmail.com</p>
                                    </div>
                                </section>
                            </div>
                            <div className="shipper-nav-buttons">
                                <button><PencilIcon/></button>
                                <button><IconInfo/></button>
                            </div>
                        </div>
                        <div className="shipper-profile-status">
                            <p>Currently you don't have active status for your profile🚫</p>
                        </div>
                    </div>
                    <div className="shipper-profile-activity">
                        <section>
                            <div className="section-header">
                                <span>
                                    <h3>Latest Message</h3>
                                    <p>Your recently conversation</p>
                                </span>
                                <PlusIconBlue/>
                            </div>
                            <div className="section-content">
                                <div className="section-item">
                                    <DefaultUserAvatar/>
                                    <div>
                                        <h3>Jake</h3>
                                        <p>Hi John, I'm ready to deliver your load</p>
                                    </div>
                                    <div>
                                        <h3>Seen</h3>
                                        <p>2h ago</p>
                                    </div>
                                </div>
                                <div className="section-item">
                                    <DefaultUserAvatar/>
                                    <div>
                                        <h3>Jake</h3>
                                        <p>Hi John, I'm ready to deliver your load</p>
                                    </div>
                                    <div>
                                        <h3>Seen</h3>
                                        <p>2h ago</p>
                                    </div>
                                </div>
                                <div className="section-item">
                                    <DefaultUserAvatar/>
                                    <div>
                                        <h3>Jake</h3>
                                        <p>Hi John, I'm ready to deliver your load</p>
                                    </div>
                                    <div>
                                        <h3>Seen</h3>
                                        <p>2h ago</p>
                                    </div>
                                </div>
                                <div className="section-item">
                                    <DefaultUserAvatar/>
                                    <div>
                                        <h3>Jake</h3>
                                        <p>Hi John, I'm ready to deliver your load</p>
                                    </div>
                                    <div>
                                        <h3>Seen</h3>
                                        <p>2h ago</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="section-header">
                                <span>
                                    <h3>Friends (35)</h3>
                                    <p>Your all friends</p>
                                </span>
                                <PlusIconBlue/>
                            </div>
                            <div className="section-content">
                                <div className="section-item">
                                    <div className="user-item-info">
                                        <DefaultUserAvatar/>
                                        <div>
                                            <h3>Jake</h3>
                                            <p>Carrier</p>
                                        </div>
                                    </div>
                                    <MoreVertIcon/>
                                </div>
                                <div className="section-item">
                                    <div className="user-item-info">
                                        <DefaultUserAvatar/>
                                        <div>
                                            <h3>Jake</h3>
                                            <p>Carrier</p>
                                        </div>
                                    </div>
                                    <MoreVertIcon/>
                                </div>
                                <div className="section-item">
                                    <div className="user-item-info">
                                        <DefaultUserAvatar/>
                                        <div>
                                            <h3>Jake</h3>
                                            <p>Carrier</p>
                                        </div>
                                    </div>
                                    <MoreVertIcon/>
                                </div>
                                <div className="section-item">
                                    <div className="user-item-info">
                                        <DefaultUserAvatar/>
                                        <div>
                                            <h3>Jake</h3>
                                            <p>Carrier</p>
                                        </div>
                                    </div>
                                    <MoreVertIcon/>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="section-header">
                                <span>
                                    <h3>Recent Activity</h3>
                                    <p>Your activities with loads</p>
                                </span>
                                <PlusIconBlue/>
                            </div>
                            <div className="section-content">
                            <h3>No Activity...</h3>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShipperProfilePage;