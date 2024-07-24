import React, {useEffect, useState, useRef} from "react";
import './DriverDashboard.css';
import {ReactComponent as DirectionIcon} from "../../assets/direction-icon.svg";
import {useParams} from 'react-router-dom';
import MetricCompoent from "../metric-component/MetricCompoent";
import GoogleMapRealTimeTrafficComponent
    from "../driver-dashboard/google-map-real-time-traffic-data/GoogleMapRealTimeTrafficComponent";
import {ReactComponent as DefaultUserAvatar} from "../../assets/default-avatar.svg";
import DashboardSidebar from "../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../header-dashboard/HeaderDashboard";
import OpenShipAIChat from "../open-ai-chat/OpenShipAIChat";
import {BACKEND_URL} from "../../constants/constants";
import {Skeleton} from "@mui/material";
import axios from "axios";

const DriverDashboard = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [driverInfo, setDriverInfo] = useState(null);
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const {driverID} = useParams();
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
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
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getDriver();

    },[driverID]);

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

    return (
        <div className="driver-dashboard-wrapper">
            <DashboardSidebar
                DashboardAI={{visible: true, route: `/driver-dashboard/${driverID}`}}
                Settings={{visible: true, route: `/driver-settings/${driverID}`}}
                AssignedLoad={{visible: true, route: `/driver-assigned-loads/${driverID}`}}
            />
            <div className="driver-dashboard-content">
                <HeaderDashboard
                    contentTitle={driverInfo ?
                        <>Welcome back, {driverInfo.driverFirstAndLastName}!</> :
                        <Skeleton variant="text" width={250}/>}
                    contentSubtitle="Monitor payments, loads, revenues"
                    accountName={driverInfo ? driverInfo.driverFirstAndLastName : <Skeleton variant="text" width={60}/>}
                    accountRole={driverInfo ? driverInfo.role : <Skeleton variant="text" width={40}/>}
                    profileLink={`/driver-profile/${driverID}`}
                    bellLink={`/driver-settings/${driverID}`}
                    settingsLink={`/driver-profile/${driverID}`}
                    avatar={previewSavedImage ? previewSavedImage : DefaultUserAvatar}
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
                        <OpenShipAIChat/>
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
