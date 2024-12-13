import React, { useState, useEffect } from "react";
import './DriverDashboard.css';
import { useParams } from 'react-router-dom';
import MetricCompoent from "../metric-component/MetricCompoent";
import { ReactComponent as DefaultUserAvatar } from "../../assets/images/default-avatar.svg";
import DashboardSidebar from "../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../header-dashboard/HeaderDashboard";
import OpenShipAIChat from "../open-ai-chat/OpenShipAIChat";
import { BACKEND_URL } from "../../constants/constants";
import { Skeleton } from "@mui/material";
import axios from "axios";
import Grid from "../grid-two-columns/Grid";
import ActiveLoadsPanel from "../shipper-active-loads-panel/ActiveLoadsPanel";
import Button from "../button/Button";
import TextInput from "../text-input/TextInput";
import Popup from "../popup/Popup";

const DriverDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const { driverID } = useParams();
    const [driverInfo, setDriverInfo] = useState(null);
    const [loads, setLoads] = useState([]);
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [activeTab, setActiveTab] = useState("Statistics");
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        driverLicenceClass: '',
        driverTruck: '',
        driverInsurance: ''
    });

    useEffect(() => {
        const getCurrentPosition = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        try {
                            await axios.put(`${BACKEND_URL}/update-driver-location/${driverID}`, {
                                latitude,
                                longitude
                            });
                            console.log('Driver location updated');
                        } catch (error) {
                            console.error('Error updating driver location:', error);
                        }
                    },
                    (error) => {
                        console.error('Error getting current position:', error);
                    },
                    { enableHighAccuracy: true }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        getCurrentPosition();

        const intervalId = setInterval(getCurrentPosition, 60000); // Update every 60 seconds

        return () => clearInterval(intervalId);
    }, [driverID]);

    const handleClick = (load) => {
        setOrigin(load.loadPickupLocation);
        setDestination(load.loadDeliveryLocation);
    };

    useEffect(() => {
        const fetchLoads = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-all-loads`);
                setLoads(response.data);
            } catch (error) {
                console.error('Error fetching loads:', error);
            }
        };

        fetchLoads();
    }, []);

    const assignedLoads = loads.filter(load => load.loadAssignedDriverID === driverID);

    useEffect(() => {
        const getDriver = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/get-driver/${driverID}`);
                const data = await response.json();
                setDriverInfo(data);
                console.log(data)
                if (data.driverLicenceClass || data.driverTruck || data.driverInsurance) {
                    setShowPopup(false);
                } else {
                    setShowPopup(true);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getDriver();

    }, [driverID]);

    useEffect(() => {
        const getAvatar = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-driver-avatar/${driverID}`);
                if (response.data.driverAvatar) {
                    setPreviewSavedImage(`${BACKEND_URL}/${response.data.driverAvatar}`);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getAvatar();
    }, [driverID]);

    useEffect(() => {
        if (driverInfo && driverInfo.driverAvatar) {
            setLoading(true);
            const avatarUrl = `${BACKEND_URL}/${driverInfo.driverAvatar}`;
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
    }, [driverInfo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`${BACKEND_URL}/update-driver-info/${driverID}`, formData);
            setShowPopup(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            {/*{showPopup && (*/}
            {/*    <Popup title="Complete information" abilityToClose={true} footerText="Before using or account, you need to completed you data, to satisfy our service!">*/}
            {/*        <Grid columns="1, 1fr">*/}
            {/*            <TextInput*/}
            {/*                type="text"*/}
            {/*                id="driverLicenceClass"*/}
            {/*                value={formData.driverLicenceClass}*/}
            {/*                onChange={handleChange}*/}
            {/*                label="Driver Licence Class"*/}
            {/*            />*/}
            {/*            <TextInput*/}
            {/*                type="text"*/}
            {/*                id="driverTruck"*/}
            {/*                value={formData.driverTruck}*/}
            {/*                onChange={handleChange}*/}
            {/*                label="Driver Truck"*/}
            {/*            />*/}
            {/*            <TextInput*/}
            {/*                type="date"*/}
            {/*                id="driverInsurance"*/}
            {/*                value={formData.driverInsurance}*/}
            {/*                onChange={handleChange}*/}
            {/*                label="Driver Insurance Valid To"*/}
            {/*            />*/}
            {/*            <Button variant="apply-non-responsive" onClick={handleSubmit}>Submit</Button>*/}
            {/*        </Grid>*/}
            {/*    </Popup>*/}
            {/*)}*/}
            <div className="shipper-dashboard-wrapper">
                <DashboardSidebar
                    DashboardAI={{ visible: true, route: `/driver-dashboard/${driverID}` }}
                    Settings={{ visible: true, route: `/driver-settings/${driverID}` }}
                    AssignedLoad={{ visible: true, route: `/driver-assigned-loads/${driverID}` }}
                    isMobileSidebarOpen={isMobileSidebarOpen} toggleMobileSidebar={toggleMobileSidebar}
                />
                <div className="shipper-dashboard-content">
                    <HeaderDashboard
                        contentTitle={driverInfo ? <>Welcome back, {driverInfo.driverFirstAndLastName}!</> :
                            <Skeleton variant="text" width={250}/>}
                        contentSubtitle="Monitor payments, loads, revenues"
                        accountName={driverInfo ? driverInfo.driverFirstAndLastName :
                            <Skeleton variant="text" width={60}/>}
                        accountRole={driverInfo ? driverInfo.role : <Skeleton variant="text" width={40}/>}
                        profileLink={`/driver-profile/${driverID}`}
                        bellLink={`/driver-settings/${driverID}`}
                        settingsLink={`/driver-profile/${driverID}`}
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
                                    <OpenShipAIChat userID={driverID} userRole="shipper"/>
                                </div>
                            )}
                            {activeTab === "Loads" && (
                                    <ActiveLoadsPanel userRole="driver" userID={driverID}/>
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
                                                    description="Average percent of  cooperate with carrier"
                                                    percent={55}
                                                    color="#0061ff"/>
                                    <MetricCompoent text="Service Activity"
                                                    description="Monitoring, service usability, connections"
                                                    percent={86}
                                                    color="#009f52"/>
                                </Grid>
                                <OpenShipAIChat userID={driverID} userRole="driver"/>
                            </div>
                            <div className="map-content">
                                <ActiveLoadsPanel userID={driverID} userRole="driver"/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default DriverDashboard;