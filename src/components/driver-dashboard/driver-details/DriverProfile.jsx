import React, {useEffect, useState, useRef} from "react";
import '../DriverDashboard.css';
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
import {ReactComponent as MoreVertIcon} from "../../../assets/more-verical-icons.svg";
import {ReactComponent as PlusIconBlue} from "../../../assets/plus-blue-icon.svg";
import {ReactComponent as IconInfo} from "../../../assets/info-icon.svg";
import {ReactComponent as PencilIcon} from "../../../assets/pencil-edit-icon.svg";
import {ReactComponent as LoadBoxIconWhite} from "../../../assets/LoadBoxIconWhite.svg";
import {ReactComponent as TireIcon} from "../../../assets/TireIcon.svg";
import {ReactComponent as TireIconWhite} from "../../../assets/tire-icon-white.svg";
import {ReactComponent as LoadBoxIcon} from "../../../assets/load-box-icon.svg";
import {ReactComponent as driverChatIconWhite} from "../../../assets/chat-icon-white.svg";
import {ReactComponent as ArrowNav} from "../../../assets/arrow-nav.svg";
import {ReactComponent as SearchIcon} from "../../../assets/search-icon.svg";
import {ReactComponent as DefaultUserAvatar} from "../../../assets/default-avatar.svg";
import {ReactComponent as BellIcon} from "../../../assets/bell-icon.svg";
import {ReactComponent as SettingsAccountIcon} from "../../../assets/settings-icon.svg";
import {ReactComponent as DirectionIcon} from "../../../assets/direction-icon.svg";
import {ReactComponent as driverIcon} from "../../../assets/trane-logo-carrier.svg";
import {useParams} from 'react-router-dom';
import {Link} from "react-router-dom";
import MetricCompoent from "../../metric-component/MetricCompoent";
import GoogleMapRealTimeTrafficComponent
    from "../../driver-dashboard/google-map-real-time-traffic-data/GoogleMapRealTimeTrafficComponent";
import JarvisChatComponent from "../../jarvis-chat-page/JarvisChatComponent";
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";

const DriverProfile = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [hoveredButton, setHoveredButton] = useState('');
    const {driverID} = useParams();
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="driver-dashboard-wrapper">
            <DashboardSidebar
                DashboardAI={{visible: true, route: `/driver-dashboard/${driverID}`}}
                Settings={{visible: true, route: `/driver-settings/${driverID}`}}
                AssignedLoad={{visible: true, route: `/driver-assigned-loads/${driverID}`}}
                Profile={{visible: true, route: `/driver-profile/${driverID}`}}
            />
            <div className="driver-dashboard-content">
                <HeaderDashboard
                    contentTitle="Driver Dashboard"
                    contentSubtitle="Welcome to your dashboard"
                    accountName="Jack Daniels"
                    accountRole="Driver"
                    profileLink={`/driver-profile/${driverID}`}
                    bellLink={`/driver-settings/${driverID}`}
                    settingsLink={`/driver-profile/${driverID}`}
                />
                <div className="carrier-dashboard-content">
                    <div className="carrier-profile-content-wrapper">
                        <div className="profile-content-wrapper">
                            <div className="carrier-profile-content">
                                <div className="carrier-info">
                                    <DefaultUserAvatar className="carrier-profile-avatar"/>
                                    <section className="carrier-details-wrapper">
                                        <div className="carrier-role-name">
                                            <h3>John Doe</h3>
                                            <p>Driver</p>
                                        </div>
                                        <div className="carrier-info-details">
                                            <p>USA, Los Angeles</p>
                                            <p>johndoe@gmail.com</p>
                                        </div>
                                    </section>
                                </div>
                                <div className="carrier-nav-buttons">
                                    <button><PencilIcon/></button>
                                    <button><IconInfo/></button>
                                </div>
                            </div>
                            <div className="carrier-profile-status">
                                <p>Currently you don't have active status for your profile🚫</p>
                            </div>
                        </div>
                        <div className="carrier-profile-activity">
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
        </div>
    );
};

export default DriverProfile;
