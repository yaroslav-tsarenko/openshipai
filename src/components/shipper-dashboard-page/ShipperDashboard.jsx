import React, {useEffect, useState, useRef} from "react";
import './ShipperDashboard.css';
import {ReactComponent as DefaultUserAvatar} from "../../assets/default-avatar.svg";
import {useParams} from 'react-router-dom';
import MetricCompoent from "../metric-component/MetricCompoent";
import HeaderDashboard from "../header-dashboard/HeaderDashboard";
import DashboardSidebar from "../dashboard-sidebar/DashboardSidebar";
import ActiveLoadsPanel from "../shipper-active-loads-panel/ActiveLoadsPanel";
import {Skeleton} from "@mui/material";
import axios from "axios";
import {BACKEND_URL} from "../../constants/constants";
import OpenShipAIChat from "../open-ai-chat/OpenShipAIChat";
import Grid from "../grid-two-columns/Grid";

const ShipperDashboard = () => {
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
                Payments={{visible: true, route: `/shipper-payments/${shipperID}`}}
                ChatWithCarrier={{visible: true, route: `/shipper-chat-conversation/${shipperID}`}}
                MyLoads={{visible: true, route: `/shipper-loads/${shipperID}`}}
            />
            <div className="shipper-dashboard-content">
                <HeaderDashboard
                    contentTitle={shipperInfo ?
                        <>Welcome back, {shipperInfo.userShipperName}!</> :
                        <Skeleton variant="text" width={250}/>}
                    contentSubtitle="Monitor payments, loads, revenues"
                    accountName={shipperInfo ? shipperInfo.userShipperName : <Skeleton variant="text" width={60}/>}
                    accountRole={shipperInfo ? shipperInfo.userShipperRole : <Skeleton variant="text" width={40}/>}
                    profileLink={`/shipper-profile/${shipperID}`}
                    bellLink={`/shipper-settings/${shipperID}`}
                    settingsLink={`/shipper-profile/${shipperID}`}
                    avatar={previewSavedImage ? previewSavedImage : DefaultUserAvatar}
                />
                <div className="shipper-dashboard-content-body">
                    <div className="dashboard-content">
                        <div className="chat-metric-content">
                            <Grid columns="3, 3fr">
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
                            </Grid>
                            <OpenShipAIChat userID={shipperID} userRole="shipper"/>
                        </div>
                        <div className="map-content">
                            <ActiveLoadsPanel shipperID={shipperID}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShipperDashboard;
