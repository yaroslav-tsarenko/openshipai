import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import "./DashboardSidebar.css";
import {ReactComponent as OpenshipLogo} from "../../assets/openship-ai-logo-updated.svg";
import OpenshipLogoPng from "../../assets/logo-png.png";
import {LuLayoutDashboard} from "react-icons/lu";
import { PiTruck } from "react-icons/pi";
import { IoChatbubblesOutline } from "react-icons/io5";
import { TbSteeringWheel } from "react-icons/tb";
import { LuWallet2 } from "react-icons/lu";
import { LiaTruckLoadingSolid } from "react-icons/lia";
import { LuSettings } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";
import { MdOutlineAssignment } from "react-icons/md";
import {ReactComponent as ProfileIcon} from "../../assets/profile-icon-grey.svg";
import {ReactComponent as ProfileIconWhite} from "../../assets/profile-icon-white.svg";
import {ReactComponent as QoutesIcon} from "../../assets/listing-icon-grey.svg";
import {ReactComponent as QoutesIconWhite} from "../../assets/listing-icon-white.svg";
import {ReactComponent as LoadBoxIconWhite} from "../../assets/LoadBoxIconWhite.svg";
import {ReactComponent as TireIcon} from "../../assets/TireIcon.svg";
import {ReactComponent as TireIconWhite} from "../../assets/tire-icon-white.svg";
import {ReactComponent as LoadBoxIcon} from "../../assets/load-box-icon.svg";
import useGsapAnimation from "../../hooks/useGsapAnimation";

const DashboardSidebar = ({
                              DashboardAI, MyLoads, TakeLoad, AssignedLoad,
                              ChatWithShipper, ChatWithCarrier, DriversAndEquip,
                              MyQoutes, Payments, Settings, Profile, isMobileSidebarOpen, toggleMobileSidebar
                          }) => {
    const [hoveredButton, setHoveredButton] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isClosing, setIsClosing] = useState(false);
    const animation = useGsapAnimation('smoothTransition');
    const handleCloseSidebar = () => {
        setIsClosing(true);
        setTimeout(() => {
            toggleMobileSidebar();
            setIsClosing(false);
        }, 300);
    };

    return (
        <>
            <div className="dashboard-sidebar-wrapper" ref={animation}>
                <div className={`dashboard-sidebar ${isSidebarOpen ? '' : 'closed'}`}>
                    <section className="dashboard-sidebar-main-buttons">
                        <OpenshipLogo className="dashboard-logo"/>
                        {DashboardAI && DashboardAI.visible && (
                            <Link
                                className="dashboard-link-nav-button"
                                to={DashboardAI.route}>
                                <LuLayoutDashboard className="dashboard-link-nav-button-icon"/> Dashboard AI
                            </Link>
                        )}
                        {TakeLoad && TakeLoad.visible && (
                            <Link
                                className="dashboard-link-nav-button"
                                to={TakeLoad.route}
                            >
                                <PiTruck  className="dashboard-link-nav-button-icon"/> Take Load
                            </Link>
                        )}
                        {MyLoads && MyLoads.visible && (
                            <Link
                                className="dashboard-link-nav-button"
                                to={MyLoads.route}
                            >
                                    <LiaTruckLoadingSolid className="dashboard-link-nav-button-icon"/> My Loads
                            </Link>
                        )}
                        {AssignedLoad && AssignedLoad.visible && (
                            <Link
                                className="dashboard-link-nav-button"
                                to={AssignedLoad.route}>
                                <MdOutlineAssignment className="dashboard-link-nav-button-icon"/> Assigned Loads
                            </Link>
                        )}
                        {ChatWithShipper && ChatWithShipper.visible && (
                            <Link
                                className="dashboard-link-nav-button"
                                to={ChatWithShipper.route}>
                                    <IoChatbubblesOutline className="dashboard-link-nav-button-icon"/> Chat with Shipper
                            </Link>
                        )}
                        {ChatWithCarrier && ChatWithCarrier.visible && (
                            <Link
                                className="dashboard-link-nav-button"
                                to={ChatWithCarrier.route}
                            >
                                    <IoChatbubblesOutline className="dashboard-link-nav-button-icon"/>
                                Chat with Carrier
                            </Link>
                        )}
                        {DriversAndEquip && DriversAndEquip.visible && (
                            <Link
                                className="dashboard-link-nav-button"
                                to={DriversAndEquip.route}
                            >
                                    <TbSteeringWheel className="dashboard-link-nav-button-icon"/>
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
                                {hoveredButton === 'Qoutes' ?
                                    <QoutesIconWhite className="dashboard-link-nav-button-icon"/> :
                                    <QoutesIcon className="dashboard-link-nav-button-icon"/>}
                                My Qoutes
                            </Link>
                        )}
                        {Payments && Payments.visible && (
                            <Link
                                className="dashboard-link-nav-button"
                                to={Payments.route}
                            >
                                    <LuWallet2 className="dashboard-link-nav-button-icon"/>
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
                                {hoveredButton === 'Profile' ?
                                    <ProfileIconWhite className="dashboard-link-nav-button-icon"/> :
                                    <ProfileIcon className="dashboard-link-nav-button-icon"/>}
                                Profile
                            </Link>
                        )}
                        {Settings && Settings.visible && (
                            <Link
                                className="dashboard-link-nav-button"
                                to={Settings.route}
                            >
                                    <LuSettings className="dashboard-link-nav-button-icon"/>
                                Settings
                            </Link>
                        )}
                    </section>
                    <Link
                        className="dashboard-link-nav-button"
                        to={"/sign-in"}
                    >
                            <TbLogout className="dashboard-link-nav-button-icon"/>
                        Logout
                    </Link>
                </div>
            </div>

            {isMobileSidebarOpen && (
                <div className={`mobile-sidebar-overlay ${isMobileSidebarOpen ? '' : 'hidden'}`}
                     onClick={handleCloseSidebar}>
                    <div className={`mobile-sidebar ${isClosing ? 'closing' : ''}`}
                         onClick={(e) => e.stopPropagation()}>
                        <div className="dashboard-sidebar-main-buttons">
                            <img src={OpenshipLogoPng} alt="Logo" className="dashboard-logo"/>
                            {DashboardAI && DashboardAI.visible && (
                                <Link
                                    className="dashboard-link-nav-button"
                                    to={DashboardAI.route}
                                >
                                        <LuLayoutDashboard className="dashboard-link-nav-button-icon"/> Dashboard AI
                                </Link>
                            )}
                            {TakeLoad && TakeLoad.visible && (
                                <Link
                                    className="dashboard-link-nav-button"
                                    to={TakeLoad.route}
                                >
                                    <PiTruck  className="dashboard-link-nav-button-icon"/> Take Load
                                </Link>
                            )}
                            {MyLoads && MyLoads.visible && (
                                <Link
                                    className="dashboard-link-nav-button"
                                    to={MyLoads.route}
                                >
                                    <LiaTruckLoadingSolid className="dashboard-link-nav-button-icon"/> My Loads
                                </Link>
                            )}
                            {AssignedLoad && AssignedLoad.visible && (
                                <Link
                                    className="dashboard-link-nav-button"
                                    to={AssignedLoad.route}>
                                    <MdOutlineAssignment className="dashboard-link-nav-button-icon"/> Assigned Loads
                                </Link>
                            )}
                            {ChatWithShipper && ChatWithShipper.visible && (
                                <Link
                                    className="dashboard-link-nav-button"
                                    to={ChatWithShipper.route}>
                                    <IoChatbubblesOutline className="dashboard-link-nav-button-icon"/>
                                    Chat with Shipper
                                </Link>
                            )}
                            {ChatWithCarrier && ChatWithCarrier.visible && (
                                <Link
                                    className="dashboard-link-nav-button"
                                    to={ChatWithCarrier.route}
                                >
                                    <IoChatbubblesOutline className="dashboard-link-nav-button-icon"/>
                                    Chat with Carrier
                                </Link>
                            )}
                            {DriversAndEquip && DriversAndEquip.visible && (
                                <Link
                                    className="dashboard-link-nav-button"
                                    to={DriversAndEquip.route}
                                >
                                    <TbSteeringWheel className="dashboard-link-nav-button-icon"/>
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
                                    {hoveredButton === 'Qoutes' ?
                                        <QoutesIconWhite className="dashboard-link-nav-button-icon"/> :
                                        <QoutesIcon className="dashboard-link-nav-button-icon"/>}
                                    My Qoutes
                                </Link>
                            )}
                            {Payments && Payments.visible && (
                                <Link
                                    className="dashboard-link-nav-button"
                                    to={Payments.route}
                                >
                                    <LuWallet2 className="dashboard-link-nav-button-icon"/>
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
                                    {hoveredButton === 'Profile' ?
                                        <ProfileIconWhite className="dashboard-link-nav-button-icon"/> :
                                        <ProfileIcon className="dashboard-link-nav-button-icon"/>}
                                    Profile
                                </Link>
                            )}
                            {Settings && Settings.visible && (
                                <Link
                                    className="dashboard-link-nav-button"
                                    to={Settings.route}
                                >
                                    <LuSettings className="dashboard-link-nav-button-icon"/>
                                    Settings
                                </Link>
                            )}
                        </div>
                        <Link
                            className="dashboard-link-nav-button"
                            to={"/sign-in"}
                        >
                                <TbLogout className="dashboard-link-nav-button-icon"/>
                            Logout
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default DashboardSidebar;