import React, {useEffect, useState} from "react";
import './ShipperDashboard.css';
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
import Button from "../button/Button";
import SEO from "../seo/SEO";

const ShipperDashboard = () => {
    const [shipperInfo, setShipperInfo] = useState(null);
    const {shipperID} = useParams();
    localStorage.setItem('shipperID',
        shipperID);
    let shipperIDLocalStorage = localStorage.getItem('shipperID');
    const [activeTab, setActiveTab] = useState("Chat");
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const [previewSavedImage, setPreviewSavedImage] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (shipperInfo && shipperInfo.userShipperAvatar) {
            setLoading(true);
            const avatarUrl = `${BACKEND_URL}/${shipperInfo.userShipperAvatar}`;
            console.log(avatarUrl)
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
    }, [shipperID]);

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

        const fetchAvatar = async () => {
            if (shipperInfo && shipperInfo.userShipperAvatar) {
                const avatarUrl = `${BACKEND_URL}/${shipperInfo.userShipperAvatar}`;
                try {
                    await axios.get(avatarUrl);
                    setPreviewSavedImage(avatarUrl);
                } catch (error) {
                    console.error('Image does not exist');
                } finally {
                }
            }
        };

        fetchAvatar();
        getUser();
    }, [shipperInfo, shipperID]);

    return (
        <>
            <SEO
                title="Dashboard - Your account"
                description="Manage and track all your loads efficiently from the Shipper Dashboard. View active loads, update load details, and more."
                keywords="shipper dashboard, my loads, manage loads, track loads, active loads"
            />
            <div className="shipper-dashboard-wrapper">
                <DashboardSidebar
                    DashboardAI={{visible: true, route: `/shipper-dashboard/${shipperID}`}}
                    Settings={{visible: true, route: `/shipper-settings/${shipperID}`}}
                    Payments={{visible: true, route: `/shipper-payments/${shipperID}`}}
                    ChatWithCarrier={{visible: true, route: `/shipper-chat-conversation/${shipperID}`}}
                    MyLoads={{visible: true, route: `/shipper-loads/${shipperID}`}}
                    isMobileSidebarOpen={isMobileSidebarOpen} toggleMobileSidebar={toggleMobileSidebar}
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
                        settingsLink={`/shipper-settings/${shipperID}`}
                        avatar={previewSavedImage ? previewSavedImage : previewSavedImage}
                        onBurgerClick={toggleMobileSidebar}
                    />
                    <div className="dashboard-content-mobile">
                        <div className="dashboard-buttons-mobile">
                            <Button variant={activeTab === "Statistics" ? "default" : "neutral"}
                                    onClick={() => handleTabChange("Statistics")}>Statistics</Button>
                            <Button variant={activeTab === "Chat" ? "default" : "neutral"}
                                    onClick={() => handleTabChange("Chat")}>Chat</Button>
                            <Button variant={activeTab === "Loads" ? "default" : "neutral"}
                                    onClick={() => handleTabChange("Loads")}>Loads</Button>
                        </div>
                        <div className="dashboard-content-mobile-body">
                            {activeTab === "Statistics" && (
                                <div>
                                    <Grid columns="1, 1fr">
                                        <MetricCompoent text="Service Rating"
                                                        description="It’s yours global reputation on service"
                                                        percent={25}
                                                        color="#FFC107"/>
                                        <MetricCompoent text="Success agreement "
                                                        description="Average percent of  cooperate with carrier"
                                                        percent={25}
                                                        color="#0061ff"/>
                                        <MetricCompoent text="Service Activity"
                                                        description="Monitoring, service usability, connections"
                                                        percent={25}
                                                        color="#009f52"/>
                                    </Grid>
                                </div>
                            )}
                            {activeTab === "Chat" && (
                                <div>
                                    <OpenShipAIChat userID={shipperID} userRole="shipper"/>
                                </div>
                            )}
                            {activeTab === "Loads" && (
                                <ActiveLoadsPanel userID={shipperID} userRole="shipper"/>
                            )}
                        </div>
                    </div>
                    <div className="shipper-dashboard-content-body">
                        <div className="dashboard-content">
                            <div className="chat-metric-content">
                                <Grid columns="3, 3fr" >
                                    <MetricCompoent
                                        text="Service Rating"
                                        description="It’s yours global reputation on service"
                                        percent={shipperInfo ? shipperInfo.userShipperServiceActivity : 0}
                                        color="#FFC107"
                                    />
                                    <MetricCompoent
                                        text="Success agreement"
                                        description="Average percent of cooperate with carrier"
                                        percent={shipperInfo ? shipperInfo.userShipperServiceAgreement : 0}
                                        color="#0061ff"
                                    />
                                    <MetricCompoent
                                        text="Service Activity"
                                        description="Monitoring, service usability, connections"
                                        percent={shipperInfo ? shipperInfo.userShipperServiceRating : 0}
                                        color="#009f52"
                                    />
                                </Grid>
                                <OpenShipAIChat userID={shipperID} userRole="shipper"/>
                            </div>
                            <div className="map-content">
                                <ActiveLoadsPanel userID={shipperID} userRole="shipper"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ShipperDashboard;
