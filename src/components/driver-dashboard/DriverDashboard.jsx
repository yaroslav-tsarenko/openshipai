import React, {useEffect, useState, useRef} from "react";
import './DriverDashboard.css';
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
import ActiveAssignedLoadContainer from "../active-assigned-load-container/ActiveAssignedLoadContainer";

const DriverDashboard = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [driverInfo, setDriverInfo] = useState(null);
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const {driverID} = useParams();
    const [loads, setLoads] = useState([]);
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        driverLicenceClass: '',
        driverTruck: '',
        driverInsurance: ''
    });


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
                if (!data.driverLicenceClass || !data.driverTruck || !data.driverInsurance) {
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
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`${BACKEND_URL}/update-driver-info/${driverID}`, formData);
            setShowPopup(false);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            {showPopup && (
                <div className="driver-data-popup-overlay">
                    <div className="driver-popup">
                        <h3>Complete Your Profile</h3>
                        <div className="google-input-wrapper">
                            <input
                                type="text"
                                name="driverLicenceClass"
                                value={formData.driverLicenceClass}
                                onChange={handleChange}
                                className="google-style-input"
                                required
                            />
                            <label className="google-style-input-label">Driver Licence Class</label>
                        </div>
                        <div className="google-input-wrapper">
                            <input
                                type="text"
                                name="driverTruck"
                                value={formData.driverTruck}
                                onChange={handleChange}
                                className="google-style-input"
                                required
                            />
                            <label className="google-style-input-label">Driver Truck</label>
                        </div>
                        <div className="google-input-wrapper">
                            <input
                                type="date"
                                name="driverInsurance"
                                value={formData.driverInsurance}
                                onChange={handleChange}
                                className="google-style-input"
                                required
                            />
                            <label className="google-style-input-label">Driver Insurance Valid To</label>
                        </div>
                        <p>Before using or account, you need to completed you data, to satisfy our service!</p>
                        <button className="submit-bid-button" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            )}
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
                        accountName={driverInfo ? driverInfo.driverFirstAndLastName :
                            <Skeleton variant="text" width={60}/>}
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
                                                                   origin={origin} destination={destination}/>
                            </div>
                            <div className="driver-dashboard-side-panel">

                                {assignedLoads.length > 0 ? (
                                    assignedLoads.map(load => (
                                        <div onClick={() => handleClick(load)}>
                                            <ActiveAssignedLoadContainer
                                                key={load.loadID}
                                                loadType={load.loadType}
                                                driverID={driverID}
                                                origin={load.loadPickupLocation}
                                                destination={load.loadDeliveryLocation}
                                                originTime={load.loadPickupDate}
                                                destinationTime={load.loadDeliveryDate}
                                                status={load.loadStatus}
                                                distance={load.loadMilesTrip}
                                                loadID={load.loadCredentialID}
                                            />
                                        </div>

                                    ))
                                ) : (
                                    <p className="driver-assigned-load-message">Carrier didn't assign loads for you</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default DriverDashboard;
