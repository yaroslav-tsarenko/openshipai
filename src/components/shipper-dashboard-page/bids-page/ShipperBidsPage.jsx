import React, {useEffect, useState} from "react";
import '../ShipperDashboard.css';

import {ReactComponent as DefaultUserAvatar} from "../../../assets/images/default-avatar.svg";
import {useParams} from 'react-router-dom';
import {BACKEND_URL} from "../../../constants/constants";
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import LoadContainer from "../../load-container/LoadContainer";
import {Skeleton} from "@mui/material";
import axios from "axios";

const ShipperLoadsPage = () => {

    const {shipperID} = useParams();
    const [shipperInfo, setShipperInfo] = useState(null);
    const [loads, setLoads] = useState([]);
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

        const getUser = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/get-current-user/shipper/${shipperID}`);
                const data = await response.json();

                setShipperInfo(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchLoads = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-all-loads`);
                setLoads(response.data);
            } catch (error) {
                console.error('Error fetching loads:', error);
            }
        };

        fetchLoads();
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
                <div className="shipper-qoutes-dashboard-content-body">
                    <div className="shipper-loads-wrapper-qoutes">
                        {loads.length > 0 ? (
                            loads.map((load, index) => (
                                <div key={index}>
                                    <LoadContainer
                                        loadStatus={load.loadStatus}
                                        loadPrice={load.loadPrice}
                                        loadTitle={load.loadTitle}
                                        loadTrailerType={load.loadTypeOfTrailer}
                                        loadCredentialID={load.loadCredentialID}
                                        loadWeight={load.loadWeight}
                                        loadPickupTime={load.loadPickupDate}
                                        loadDeliveryTime={load.loadPickupDate}
                                        loadType={load.loadType}
                                        shipperID={shipperID}
                                        loadPickupLocation={load.loadPickupLocation}
                                        loadDeliveryLocation={load.loadDeliveryLocation}
                                        loadVehicleModel={load.loadVehicleModel}
                                        loadVehicleYear={load.loadVehicleYear}
                                        loadMilesTrip={load.loadMilesTrip}
                                        loadQoutes={load.loadQoutes}
                                        loadTypeOfPackaging={load.loadTypeOfPackaging}
                                        loadDescription={load.loadDescription}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="load-empty-message">You don't have created any load</p>
                        )}
                    </div>
                    <div className="shipper-loads-qoutes-listing">
                        <div className="listing-header">
                            <section>
                                <h2>Listing</h2>
                                <p>Choose qoute to quicly see carriers listing</p>
                            </section>
                        </div>
                        <section className="carrier-listing-wrapper">
                            <div className="carrier-message-item">
                                <DefaultUserAvatar/>
                                <div className="carrier-message-item-info">
                                    <h3>Carrier Name</h3>
                                    <p>Carrier Message</p>
                                </div>
                            </div>

                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShipperLoadsPage;
