import React, {useEffect, useState, useRef} from "react";
import '../DriverDashboard.css';
import {ReactComponent as DefaultUserAvatar} from "../../../assets/default-avatar.svg";
import {useParams} from 'react-router-dom';
import axios from "axios";
import {BACKEND_URL} from "../../../constants/constants";
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import AssignedLoadContainer from "../../assigned-load-container/AssignedLoadContainer";
import {Skeleton} from "@mui/material";

const DriverAssignedLoads = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [driverInfo, setDriverInfo] = useState(null);
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const {driverID} = useParams();
    const [driver, setDriver] = useState(null);
    const [loads, setLoads] = useState([]);
    const [loading, setLoading] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

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

    useEffect(() => {
        const fetchDriver = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-driver/${driverID}`);
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
                const response = await axios.get(`${BACKEND_URL}/get-all-loads`);
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
                <div className="driver-dashboard-content">
                    <div className="driver-dashboard-content-body">
                        <div className="loads-containers-block">
                            {assignedLoads.length > 0 ? (
                                assignedLoads.map(load => (
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
                                ))
                            ) : (
                                <p className="driver-assigned-load-message">Carrier didn't assign loads for you</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverAssignedLoads;
