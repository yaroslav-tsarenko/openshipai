import React, {useEffect, useState, useRef} from "react";
import './ShipperDashboard.css';
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
import {ReactComponent as CarrierChatIconWhite} from "../../assets/chat-icon-white.svg";
import {ReactComponent as ArrowNav} from "../../assets/arrow-nav.svg";
import {ReactComponent as SearchIcon} from "../../assets/search-icon.svg";
import {ReactComponent as DefaultUserAvatar} from "../../assets/default-avatar.svg";
import {ReactComponent as BellIcon} from "../../assets/bell-icon.svg";
import {ReactComponent as SettingsAccountIcon} from "../../assets/settings-icon.svg";

import {useParams} from 'react-router-dom';
import {Link} from "react-router-dom";
import MetricCompoent from "../metric-component/MetricCompoent";
import GoogleMapRealTimeTrafficComponent
    from "../driver-dashboard/google-map-real-time-traffic-data/GoogleMapRealTimeTrafficComponent";
import JarvisChatComponent from "../jarvis-chat-page/JarvisChatComponent";
import HeaderDashboard from "../header-dashboard/HeaderDashboard";
import DashboardSidebar from "../dashboard-sidebar/DashboardSidebar";
import ShipperActiveLoadsPanel from "../shipper-active-loads-panel/ShipperActiveLoadsPanel";
import {Skeleton} from "@mui/material";
import axios from "axios";
import {BACKEND_URL} from "../../constants/constants";

const ShipperDashboard = () => {
    const address = process.env.REACT_APP_API_BASE_URL;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [hoveredButton, setHoveredButton] = useState('');
    const [shipperInfo, setShipperInfo] = useState(null);
    const {shipperID} = useParams();
    localStorage.setItem('shipperID',
        shipperID);
    let item = localStorage.getItem('shipperID');
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
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
                Profile={{visible: true, route: `/shipper-profile/${shipperID}`}}
                Payments={{visible: true, route: `/shipper-payments/${shipperID}`}}
                ChatWithCarrier={{visible: true, route: `/shipper-chat-conversation/${shipperID}`}}
                MyQoutes={{visible: true, route: `/shipper-qoutes/${shipperID}`}}
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
                <div className="shipper-dashboard-content-body">
                    <div className="shipper-dashboard-chat-metric">
                        <div className="metrics-container-wrapper">
                            <MetricCompoent text="Service Rating"
                                            description="It’s yours global reputation on service"
                                            percent={75}
                                            color="#FFC107"/>
                            <MetricCompoent text="Success agreement "
                                            description="Average percent of  cooperate with carrier"
                                            percent={55}
                                            color="#0061ff"/>
                            <MetricCompoent text="Service Activity"
                                            description="Monitoring, service usability, connections"
                                            percent={86}
                                            color="#009f52"/>

                        </div>
                        <JarvisChatComponent/>
                    </div>
                    <ShipperActiveLoadsPanel shipperID={shipperID}/>
                </div>
            </div>
        </div>
    );
};

export default ShipperDashboard;
