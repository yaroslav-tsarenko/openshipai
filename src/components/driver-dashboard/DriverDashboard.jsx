import React, {useEffect, useState, useRef} from "react";
import './DriverDashboard.css';
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
import {ReactComponent as driverChatIcon} from "../../assets/chat-icon-grey.svg";
import {ReactComponent as LoadBoxIconWhite} from "../../assets/LoadBoxIconWhite.svg";
import {ReactComponent as TireIcon} from "../../assets/TireIcon.svg";
import {ReactComponent as TireIconWhite} from "../../assets/tire-icon-white.svg";
import {ReactComponent as LoadBoxIcon} from "../../assets/load-box-icon.svg";
import {ReactComponent as driverChatIconWhite} from "../../assets/chat-icon-white.svg";
import {ReactComponent as ArrowNav} from "../../assets/arrow-nav.svg";
import {ReactComponent as SearchIcon} from "../../assets/search-icon.svg";
import {ReactComponent as DefaultUserAvatar} from "../../assets/default-avatar.svg";
import {ReactComponent as BellIcon} from "../../assets/bell-icon.svg";
import {ReactComponent as SettingsAccountIcon} from "../../assets/settings-icon.svg";
import {ReactComponent as DirectionIcon} from "../../assets/direction-icon.svg";
import {useParams} from 'react-router-dom';
import {Link} from "react-router-dom";
import MetricCompoent from "../metric-component/MetricCompoent";
import GoogleMapRealTimeTrafficComponent
    from "../driver-dashboard/google-map-real-time-traffic-data/GoogleMapRealTimeTrafficComponent";
import JarvisChatComponent from "../jarvis-chat-page/JarvisChatComponent";
import DashboardSidebar from "../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../header-dashboard/HeaderDashboard";

const DriverDashboard = () => {

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
                <div className="driver-dashboard-content-body">
                    <div className="driver-dashboard-chat-metric">
                        <div className="metrics-container-wrapper">
                            <MetricCompoent text="Service Rating"
                                            description="It’s yours global reputation on service"
                                            percent={75}
                                            color="#FFC107"/>
                            <MetricCompoent text="Success agreement "
                                            description="Average percent of  cooperate with driver"
                                            percent={55}
                                            color="#0061ff"/>
                            <MetricCompoent text="Service Activity"
                                            description="Monitoring, service usability, connections"
                                            percent={86}
                                            color="#009f52"/>

                        </div>
                        <JarvisChatComponent/>
                    </div>
                    <div className="driver-dashboard-side-panel-wrapper">
                        <div className="driver-map-container">
                            <GoogleMapRealTimeTrafficComponent className="driver-info-google-map-container"
                                                               origin="New York" destination="Washington"/>
                        </div>
                        <div className="driver-dashboard-side-panel">
                            <div className="active-load-container">
                                <div className="load-container-status">
                                    <section className="load-status-section">
                                        <div className="load-status-icon"></div>
                                        Booked
                                    </section>
                                    <div className="load-directions">
                                        <DirectionIcon className="load-directions-icon"/>
                                        <div className="origin-destination-container">
                                            <section className="section-origin-destination">
                                                <h3 className="load-directions-title">New York, USA</h3>
                                                <p className="load-directions-description">13:00</p>
                                            </section>
                                            <section className="section-origin-destination">
                                                <h3 className="load-directions-title">Washington, USA</h3>
                                                <p className="load-directions-description">18:00</p>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                                <div className="load-container-info">
                                    <section className="load-info-section">Vehicle Load</section>
                                    <section className="load-info-section">239 mil</section>
                                    <section className="load-info-section">5674-5385-6525-8642</section>
                                </div>
                                <div className="load-container-driver">
                                    <driverIcon className="driver-icon"/>
                                    <button className="chat-driver-button">Chat with Shipper</button>
                                </div>
                            </div>
                            <div className="active-load-container">
                                <div className="load-container-status">
                                    <section className="load-status-section">
                                        <div className="load-status-icon"></div>
                                        Booked
                                    </section>
                                    <div className="load-directions">
                                        <DirectionIcon className="load-directions-icon"/>
                                        <div className="origin-destination-container">
                                            <section className="section-origin-destination">
                                                <h3 className="load-directions-title">New York, USA</h3>
                                                <p className="load-directions-description">13:00</p>
                                            </section>
                                            <section className="section-origin-destination">
                                                <h3 className="load-directions-title">Washington, USA</h3>
                                                <p className="load-directions-description">18:00</p>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                                <div className="load-container-info">
                                    <section className="load-info-section">Vehicle Load</section>
                                    <section className="load-info-section">239 mil</section>
                                    <section className="load-info-section">5674-5385-6525-8642</section>
                                </div>
                                <div className="load-container-driver">
                                    <driverIcon className="driver-icon"/>
                                    <button className="chat-driver-button">Chat with Shipper</button>
                                </div>
                            </div>
                            <div className="active-load-container">
                                <div className="load-container-status">
                                    <section className="load-status-section">
                                        <div className="load-status-icon"></div>
                                        Booked
                                    </section>
                                    <div className="load-directions">
                                        <DirectionIcon className="load-directions-icon"/>
                                        <div className="origin-destination-container">
                                            <section className="section-origin-destination">
                                                <h3 className="load-directions-title">New York, USA</h3>
                                                <p className="load-directions-description">13:00</p>
                                            </section>
                                            <section className="section-origin-destination">
                                                <h3 className="load-directions-title">Washington, USA</h3>
                                                <p className="load-directions-description">18:00</p>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                                <div className="load-container-info">
                                    <section className="load-info-section">Vehicle Load</section>
                                    <section className="load-info-section">239 mil</section>
                                    <section className="load-info-section">5674-5385-6525-8642</section>
                                </div>
                                <div className="load-container-driver">
                                    <driverIcon className="driver-icon"/>
                                    <button className="chat-driver-button">Chat with Shipper</button>
                                </div>
                            </div>
                            <div className="active-load-container">
                                <div className="load-container-status">
                                    <section className="load-status-section">
                                        <div className="load-status-icon"></div>
                                        Booked
                                    </section>
                                    <div className="load-directions">
                                        <DirectionIcon className="load-directions-icon"/>
                                        <div className="origin-destination-container">
                                            <section className="section-origin-destination">
                                                <h3 className="load-directions-title">New York, USA</h3>
                                                <p className="load-directions-description">13:00</p>
                                            </section>
                                            <section className="section-origin-destination">
                                                <h3 className="load-directions-title">Washington, USA</h3>
                                                <p className="load-directions-description">18:00</p>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                                <div className="load-container-info">
                                    <section className="load-info-section">Vehicle Load</section>
                                    <section className="load-info-section">239 mil</section>
                                    <section className="load-info-section">5674-5385-6525-8642</section>
                                </div>
                                <div className="load-container-driver">
                                    <driverIcon className="driver-icon"/>
                                    <button className="chat-driver-button">Chat with Shipper</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverDashboard;
