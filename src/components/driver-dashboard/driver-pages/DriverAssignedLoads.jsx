import React, {useEffect, useState, useRef} from "react";
import '../DriverDashboard.css';

import {useParams} from 'react-router-dom';
import axios from "axios";
import {BACKEND_URL} from "../../../constants/constants";
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
