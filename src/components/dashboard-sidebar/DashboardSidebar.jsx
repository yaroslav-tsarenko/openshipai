import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import "./DashboardSidebar.css";
import {ReactComponent as OpenshipLogo} from "../../assets/openship-ai-logo-updated.svg";
import {ReactComponent as DashboardIcon} from "../../assets/dashboard-icon-grey.svg";
import {ReactComponent as DashboardIconWhite} from "../../assets/dashboard-icon-white.svg";
import {ReactComponent as LoadIcon} from "../../assets/load-icon-grey.svg";
import {ReactComponent as LoadIconWhite} from "../../assets/load-icon-white.svg";
import {ReactComponent as LogoutIcon} from "../../assets/logout-icon-grey.svg";
import {ReactComponent as LogoutIconWhite} from "../../assets/logout-icon-white.svg";
import {ReactComponent as PaymentIcon} from "../../assets/payment-icon-grey.svg";
import {ReactComponent as PaymentIconWhite} from "../../assets/payment-icon-white.svg";
import {ReactComponent as ProfileIcon} from "../../assets/profile-icon-grey.svg";
import {ReactComponent as ProfileIconWhite} from "../../assets/profile-icon-white.svg";
import {ReactComponent as SettingsIcon} from "../../assets/settings-icon-grey.svg";
import {ReactComponent as SettingsIconWhite} from "../../assets/settings-icon-white.svg";
import {ReactComponent as QoutesIcon} from "../../assets/listing-icon-grey.svg";
import {ReactComponent as QoutesIconWhite} from "../../assets/listing-icon-white.svg";
import {ReactComponent as CarrierChatIcon} from "../../assets/chat-icon-grey.svg";
import {ReactComponent as LoadBoxIconWhite} from "../../assets/LoadBoxIconWhite.svg";
import {ReactComponent as TireIcon} from "../../assets/TireIcon.svg";
import {ReactComponent as TireIconWhite} from "../../assets/tire-icon-white.svg";
import {ReactComponent as LoadBoxIcon} from "../../assets/load-box-icon.svg";
import {ReactComponent as CarrierChatIconWhite} from "../../assets/chat-icon-white.svg";
import {ReactComponent as ArrowNav} from "../../assets/arrow-nav.svg";
import {ReactComponent as SearchIcon} from "../../assets/search-icon.svg";
import {ReactComponent as DefaultUserAvatar} from "../../assets/default-avatar.svg";
import {ReactComponent as BellIcon} from "../../assets/bell-icon.svg";
import {ReactComponent as SettingsAccountIcon} from "../../assets/settings-icon.svg";
import {ReactComponent as DirectionIcon} from "../../assets/direction-icon.svg";
import {ReactComponent as CarrierIcon} from "../../assets/trane-logo-carrier.svg";

const DashboardSidebar = ({
                              DashboardAI, MyLoads, TakeLoad, AssignedLoad,
                              ChatWithShipper, ChatWithCarrier, DriversAndEquip,
                              MyQoutes, Payments, Settings, Profile
                          }) => {

    const [hoveredButton, setHoveredButton] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="dashboard-sidebar-wrapper">
            <div className={`dashboard-sidebar ${isSidebarOpen ? '' : 'closed'}`}>
                <section className="dashboard-sidebar-main-buttons">
                    <OpenshipLogo width="200"/>
                    {DashboardAI && DashboardAI.visible && (
                        <Link
                            className="dashboard-link-nav-button"
                            to={DashboardAI.route}
                            onMouseEnter={() => setHoveredButton('Dashboard')}
                            onMouseLeave={() => setHoveredButton('')}
                        >
                            {hoveredButton === 'Dashboard' ? <DashboardIconWhite className="dashboard-link-nav-button-icon"/> :
                                <DashboardIcon className="dashboard-link-nav-button-icon"/>}
                            Dashboard AI
                        </Link>
                    )}
                    {TakeLoad && TakeLoad.visible && (
                        <Link
                            className="dashboard-link-nav-button"
                            to={TakeLoad.route}
                            onMouseEnter={() => setHoveredButton('TakeLoad')}
                            onMouseLeave={() => setHoveredButton('')}
                        >
                            {hoveredButton === 'TakeLoad' ? <LoadIconWhite className="dashboard-link-nav-button-icon"/> :
                                <LoadIcon className="dashboard-link-nav-button-icon"/>}
                            Take Load
                        </Link>
                    )}
                    {MyLoads && MyLoads.visible && (
                        <Link
                            className="dashboard-link-nav-button"
                            to={MyLoads.route}
                            onMouseEnter={() => setHoveredButton('Loads')}
                            onMouseLeave={() => setHoveredButton('')}
                        >
                            {hoveredButton === 'Loads' ? <LoadBoxIconWhite className="dashboard-link-nav-button-icon"/> :
                                <LoadBoxIcon className="dashboard-link-nav-button-icon"/>}
                            My Loads
                        </Link>
                    )}

                    {AssignedLoad && AssignedLoad.visible && (
                        <Link
                            className="dashboard-link-nav-button"
                            to={AssignedLoad.route}
                            onMouseEnter={() => setHoveredButton('LoadBoxIcon')}
                            onMouseLeave={() => setHoveredButton('')}
                        >
                            {hoveredButton === 'LoadBoxIcon' ? <LoadBoxIconWhite className="dashboard-link-nav-button-icon"/> :
                                <LoadBoxIcon className="dashboard-link-nav-button-icon"/>}
                            Assigned Loads
                        </Link>
                    )}
                    {ChatWithShipper && ChatWithShipper.visible && (
                        <Link
                            className="dashboard-link-nav-button"
                            to={ChatWithShipper.route}
                            onMouseEnter={() => setHoveredButton('CarrierChat')}
                            onMouseLeave={() => setHoveredButton('')}
                        >
                            {hoveredButton === 'CarrierChat' ?
                                <CarrierChatIconWhite className="dashboard-link-nav-button-icon"/> :
                                <CarrierChatIcon className="dashboard-link-nav-button-icon"/>}
                            Chat with Shipper
                        </Link>
                    )}
                    {ChatWithCarrier && ChatWithCarrier.visible && (
                        <Link
                            className="dashboard-link-nav-button"
                            to={ChatWithCarrier.route}
                            onMouseEnter={() => setHoveredButton('CarrierChat')}
                            onMouseLeave={() => setHoveredButton('')}
                        >
                            {hoveredButton === 'CarrierChat' ?
                                <CarrierChatIconWhite className="dashboard-link-nav-button-icon"/> :
                                <CarrierChatIcon className="dashboard-link-nav-button-icon"/>}
                            Chat with Carrier
                        </Link>
                    )}
                    {DriversAndEquip && DriversAndEquip.visible && (
                        <Link
                            className="dashboard-link-nav-button"
                            to={DriversAndEquip.route}
                            onMouseEnter={() => setHoveredButton('TireIcon')}
                            onMouseLeave={() => setHoveredButton('')}
                        >
                            {hoveredButton === 'TireIcon' ? <TireIconWhite className="dashboard-link-nav-button-icon"/> :
                                <TireIcon className="dashboard-link-nav-button-icon"/>}
                            Drivers & Equip
                        </Link>
                    )}
                    {MyQoutes && MyQoutes.visible && (
                        <Link
                            className="dashboard-link-nav-button"
                            to={MyQoutes.route}
                            onMouseEnter={() => setHoveredButton('Qoutes')}
                            onMouseLeave={() => setHoveredButton('')}
                        >
                            {hoveredButton === 'Qoutes' ? <QoutesIconWhite className="dashboard-link-nav-button-icon"/> :
                                <QoutesIcon className="dashboard-link-nav-button-icon"/>}
                            My Qoutes
                        </Link>
                    )}
                    {Payments && Payments.visible && (
                        <Link
                            className="dashboard-link-nav-button"
                            to={Payments.route}
                            onMouseEnter={() => setHoveredButton('Payments')}
                            onMouseLeave={() => setHoveredButton('')}
                        >
                            {hoveredButton === 'Payments' ? <PaymentIconWhite className="dashboard-link-nav-button-icon"/> :
                                <PaymentIcon className="dashboard-link-nav-button-icon"/>}
                            Payments
                        </Link>
                    )}
                    {Profile && Profile.visible && (
                        <Link
                            className="dashboard-link-nav-button"
                            to={Profile.route}
                            onMouseEnter={() => setHoveredButton('Profile')}
                            onMouseLeave={() => setHoveredButton('')}
                        >
                            {hoveredButton === 'Profile' ? <ProfileIconWhite className="dashboard-link-nav-button-icon"/> :
                                <ProfileIcon className="dashboard-link-nav-button-icon"/>}
                            Profile
                        </Link>
                    )}
                    {Settings && Settings.visible && (
                        <Link
                            className="dashboard-link-nav-button"
                            to={Settings.route}
                            onMouseEnter={() => setHoveredButton('Settings')}
                            onMouseLeave={() => setHoveredButton('')}
                        >
                            {hoveredButton === 'Settings' ? <SettingsIconWhite className="dashboard-link-nav-button-icon"/> :
                                <SettingsIcon className="dashboard-link-nav-button-icon"/>}
                            Settings
                        </Link>
                    )}
                </section>
                <Link
                    className="dashboard-link-nav-button-logout"
                    to={"/sign-in"}
                    onMouseEnter={() => setHoveredButton('Logout')}
                    onMouseLeave={() => setHoveredButton('')}
                >
                    {hoveredButton === 'Logout' ? <LogoutIconWhite className="dashboard-link-nav-button-icon"/> :
                        <LogoutIcon className="dashboard-link-nav-button-icon"/>}
                    Logout
                </Link>
            </div>
            <button className="close-dashboard-side-bar" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <ArrowNav className={`arrow-nav-close-open-side-bar ${isSidebarOpen ? '' : 'rotated'}`}/>
            </button>
        </div>
    );
};

export default DashboardSidebar;