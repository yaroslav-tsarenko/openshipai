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
import {ReactComponent as driverChatIcon} from "../../../assets/chat-icon-grey.svg";
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
import {ReactComponent as BidArrowIcon} from "../../../assets/bid-arrow-icon.svg";
import {ReactComponent as DirectionIconNumbers} from "../../../assets/directions-number-icons.svg";
import {useParams} from 'react-router-dom';
import axios from "axios";
import {Link} from "react-router-dom";
import MetricCompoent from "../../metric-component/MetricCompoent";
import GoogleMapRealTimeTrafficComponent
    from "../../driver-dashboard/google-map-real-time-traffic-data/GoogleMapRealTimeTrafficComponent";
import JarvisChatComponent from "../../jarvis-chat-page/JarvisChatComponent";
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import AssignedLoadContainer from "../../assigned-load-container/AssignedLoadContainer";

const DriverAssignedLoads = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [hoveredButton, setHoveredButton] = useState('');
    const {driverID} = useParams();
    const [driver, setDriver] = useState(null);
    const [loads, setLoads] = useState([]);


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    useEffect(() => {
        const fetchDriver = async () => {
            try {
                const response = await axios.get(`https://jarvis-ai-logistic-db-server.onrender.com/get-driver/${driverID}`);
                setDriver(response.data);
            } catch (error) {
                console.error('Error fetching driver:', error);
            }
        };

        fetchDriver();
    }, [driverID]);


    useEffect(() => {
        const fetchLoads = async () => {
            try {
                const response = await axios.get('https://jarvis-ai-logistic-db-server.onrender.com/get-all-loads');
                setLoads(response.data);
            } catch (error) {
                console.error('Error fetching loads:', error);
            }
        };

        fetchLoads();
    }, []);

    const assignedLoads = loads.filter(load => load.loadAssignedDriverID === driverID);

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
                <div className="driver-dashboard-content">
                    <div className="driver-dashboard-content-body">
                        <div className="loads-containers-block">
                            {assignedLoads.map(load => (
                                <AssignedLoadContainer
                                    key={load.loadID}
                                    loadTitle={load.loadTitle}
                                    loadWeight={load.loadWeight}
                                    loadType={load.loadType}
                                    driverID={driverID}
                                    loadTrip={load.loadMilesTrip}
                                    loadCredentialID={load.loadCredentialID}
                                    loadPickupLocation={load.loadPickupLocation}
                                    loadPickupLocationDate={load.loadPickupDate}
                                    loadDeliveryLocation={load.loadDeliveryLocation}
                                    loadDeliveryLocationDate={load.loadDeliveryDate}

                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverAssignedLoads;
