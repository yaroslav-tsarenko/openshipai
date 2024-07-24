import React, {useEffect, useState, useRef} from "react";
import './CarrierDashboard.css';
import {ReactComponent as DefaultUserAvatar} from "../../assets/default-avatar.svg";
import {ReactComponent as DirectionIcon} from "../../assets/direction-icon.svg";
import {ReactComponent as CarrierIcon} from "../../assets/trane-logo-carrier.svg";
import {useParams} from 'react-router-dom';
import MetricCompoent from "../metric-component/MetricCompoent";
import GoogleMapRealTimeTrafficComponent
    from "../driver-dashboard/google-map-real-time-traffic-data/GoogleMapRealTimeTrafficComponent";
import DashboardSidebar from "../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../header-dashboard/HeaderDashboard";
import axios from "axios";
import {BACKEND_URL} from "../../constants/constants";
import {Skeleton} from "@mui/material";
import OpenShipAIChat from "../open-ai-chat/OpenShipAIChat";

const CarrierDashboard = () => {

    const {carrierID} = useParams();
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [carrierInfo, setCarrierInfo] = useState(null);

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
        <div className="carrier-dashboard-wrapper">
            <DashboardSidebar
                DashboardAI={{visible: true, route: `/carrier-dashboard/${carrierID}`}}
                TakeLoad={{visible: true, route: `/carrier-take-loads/${carrierID}`}}
                MyLoads={{visible: true, route: `/carrier-loads/${carrierID}`}}
                DriversAndEquip={{visible: true, route: `/carrier-drivers/${carrierID}`}}
                Payments={{visible: true, route: `/carrier-payments/${carrierID}`}}
                ChatWithShipper={{visible: true, route: `/carrier-chat-conversation/${carrierID}`}}
                Settings={{visible: true, route: `/carrier-settings/${carrierID}`}}
            />
            <div className="carrier-dashboard-content">
                <HeaderDashboard
                    contentTitle={carrierInfo ?
                        <>Welcome back, {carrierInfo.carrierContactCompanyName}!</> :
                        <Skeleton variant="text" width={250} />}
                    contentSubtitle="Monitor payments, loads, revenues"
                    accountName={carrierInfo ? carrierInfo.carrierContactCompanyName : <Skeleton variant="text" width={60} />}
                    accountRole={carrierInfo ? carrierInfo.role : <Skeleton variant="text" width={40} />}
                    profileLink={`/carrier-profile/${carrierID}`}
                    bellLink={`/carrier-settings/${carrierID}`}
                    settingsLink={`/carrier-profile/${carrierID}`}
                    avatar={previewSavedImage ? previewSavedImage : DefaultUserAvatar}
                />
                <div className="carrier-dashboard-content-body">
                    <div className="carrier-dashboard-chat-metric">
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
                        <OpenShipAIChat/>
                    </div>
                    <div className="carrier-dashboard-side-panel-wrapper">
                        <div className="carrier-map-container">
                            <GoogleMapRealTimeTrafficComponent className="carrier-info-google-map-container"
                                                               origin="New York" destination="Washington"/>
                        </div>
                        <div className="carrier-dashboard-side-panel">
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
                                <div className="load-container-carrier">
                                    <CarrierIcon className="carrier-icon"/>
                                    <button className="chat-carrier-button">Chat with Shipper</button>
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
                                <div className="load-container-carrier">
                                    <CarrierIcon className="carrier-icon"/>
                                    <button className="chat-carrier-button">Chat with Shipper</button>
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
                                <div className="load-container-carrier">
                                    <CarrierIcon className="carrier-icon"/>
                                    <button className="chat-carrier-button">Chat with Shipper</button>
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
                                <div className="load-container-carrier">
                                    <CarrierIcon className="carrier-icon"/>
                                    <button className="chat-carrier-button">Chat with Shipper</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarrierDashboard;
