import React, {useEffect, useState} from "react";
import './CarrierDashboard.css';
import {ReactComponent as DefaultUserAvatar} from "../../assets/images/default-avatar.svg";
import {useParams} from 'react-router-dom';
import MetricCompoent from "../metric-component/MetricCompoent";
import DashboardSidebar from "../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../header-dashboard/HeaderDashboard";
import axios from "axios";
import {BACKEND_URL} from "../../constants/constants";
import {Skeleton} from "@mui/material";
import OpenShipAIChat from "../open-ai-chat/OpenShipAIChat";
import ActiveLoadsPanel from "../shipper-active-loads-panel/ActiveLoadsPanel";
import Grid from "../grid-two-columns/Grid";
import Button from "../button/Button";

const CarrierDashboard = () => {

    const {carrierID} = useParams();
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [carrierInfo, setCarrierInfo] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("Chat");
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

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

    return (
        <div className="shipper-dashboard-wrapper">
            <DashboardSidebar
                DashboardAI={{visible: true, route: `/carrier-dashboard/${carrierID}`}}
                TakeLoad={{visible: true, route: `/carrier-take-loads/${carrierID}`}}
                MyLoads={{visible: true, route: `/carrier-loads/${carrierID}`}}
                DriversAndEquip={{visible: true, route: `/carrier-drivers/${carrierID}`}}
                Payments={{visible: true, route: `/carrier-payments/${carrierID}`}}
                ChatWithShipper={{visible: true, route: `/carrier-chat-conversation/${carrierID}`}}
                Settings={{visible: true, route: `/carrier-settings/${carrierID}`}}
                isSidebarOpen={isSidebarOpen}
                type="carrier"
                userID={carrierID}
                isMobileSidebarOpen={isMobileSidebarOpen}
                toggleMobileSidebar={toggleMobileSidebar}
            />
            <div className="shipper-dashboard-content">
                <HeaderDashboard
                    contentTitle={carrierInfo ?
                        <>Welcome back, {carrierInfo.carrierContactCompanyName}!</> :
                        <Skeleton variant="text" width={250}/>}
                    contentSubtitle="Monitor payments, loads, revenues"
                    accountName={carrierInfo ? carrierInfo.carrierContactCompanyName :
                        <Skeleton variant="text" width={60}/>}
                    accountRole={carrierInfo ? carrierInfo.role : <Skeleton variant="text" width={40}/>}
                    bellLink={`/carrier-settings/${carrierID}`}
                    settingsLink={`/carrier-profile/${carrierID}`}
                    avatar={previewSavedImage ? previewSavedImage : DefaultUserAvatar}
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
                            </div>
                        )}
                        {activeTab === "Chat" && (
                            <div>
                                <OpenShipAIChat userID={carrierID} userRole="carrier"/>
                            </div>
                        )}
                        {activeTab === "Loads" && (
                            <ActiveLoadsPanel userID={carrierID} userRole="carrier"/>
                        )}
                    </div>
                </div>
                <div className="shipper-dashboard-content-body">
                    <div className="dashboard-content">
                        <div className="chat-metric-content">
                            <Grid columns="3, 3fr">
                                <MetricCompoent text="Service Rating"
                                                description="It’s yours global reputation on service"
                                                percent={75}
                                                color="#FFC107"/>
                                <MetricCompoent text="Success agreement "
                                                description="Average percent of  cooperate with shipper"
                                                percent={55}
                                                color="#0061ff"/>
                                <MetricCompoent text="Service Activity"
                                                description="Monitoring, service usability, connections"
                                                percent={86}
                                                color="#009f52"/>
                            </Grid>
                            <OpenShipAIChat userID={carrierID} userRole="carrier"/>
                        </div>
                        <div className="map-content">
                            <ActiveLoadsPanel userID={carrierID} userRole="carrier" type="carrier"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarrierDashboard;
