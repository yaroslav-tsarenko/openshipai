import React, {useEffect, useState} from "react";
import '../ShipperDashboard.css';
import {useParams} from "react-router-dom";
import {ReactComponent as PlusIconBlue} from "../../../assets/images/plus-blue-icon.svg";
import {ReactComponent as PencilIcon} from "../../../assets/images/pencil-edit-icon.svg";
import {ReactComponent as IconInfo} from "../../../assets/images/info-icon.svg";
import {ReactComponent as DefaultUserAvatar} from "../../../assets/images/default-avatar.svg";
import {BACKEND_URL} from "../../../constants/constants";
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import {Skeleton} from "@mui/material";
import axios from "axios";

const ShipperProfilePage = () => {
    const {shipperID} = useParams();
    const [shipperInfo, setShipperInfo] = useState(null);

    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [isLoading, setLoading] = useState(false);

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
                        <Skeleton variant="text" width={250} />}
                    contentSubtitle="Monitor payments, loads, revenues"
                    accountName={shipperInfo ? shipperInfo.userShipperName : <Skeleton variant="text" width={60} />}
                    accountRole={shipperInfo ? shipperInfo.userShipperRole : <Skeleton variant="text" width={40} />}
                    profileLink={`/shipper-profile/${shipperID}`}
                    bellLink={`/shipper-settings/${shipperID}`}
                    settingsLink={`/shipper-profile/${shipperID}`}
                    avatar={previewSavedImage ? previewSavedImage : DefaultUserAvatar}
                />
                <div className="shipper-profile-content-wrapper">
                    <div className="profile-content-wrapper">
                        <div className="shipper-profile-content">
                            <div className="shipper-info">
                                {previewSavedImage ? (
                                    <img src={previewSavedImage} className="shipper-profile-avatar" alt="User Avatar" />
                                ) : (
                                    <DefaultUserAvatar className="shipper-profile-avatar"/>
                                )}
                                <section className="shipper-details-wrapper">
                                    <div className="shipper-role-name">
                                        <h3>
                                            {
                                            shipperInfo ?
                                            <>
                                                {shipperInfo.userShipperName}
                                            </>
                                            :
                                            <Skeleton variant="text" width={250} />}
                                        </h3>
                                        <p>
                                            {shipperInfo ?
                                                    <>
                                                        {shipperInfo.userShipperRole}
                                                    </>
                                                    :
                                                    <Skeleton variant="text" width={250} />}
                                        </p>
                                    </div>
                                    <div className="shipper-info-details">
                                        <p>USA, Los Angeles</p>
                                        <p>
                                            {
                                                shipperInfo ?
                                                    <>
                                                        {shipperInfo.userShipperEmail}
                                                    </>
                                                    :
                                                    <Skeleton variant="text" width={250} />}
                                        </p>
                                    </div>
                                </section>
                            </div>
                            <div className="shipper-nav-buttons">
                                <button><PencilIcon/></button>
                                <button><IconInfo/></button>
                            </div>
                        </div>
                        <div className="shipper-profile-status">
                            <p>Currently you don't have active status for your profile🚫</p>
                        </div>
                    </div>
                    <div className="shipper-profile-activity">
                        <section>
                            <div className="section-header">
                                <span>
                                    <h3>Latest Message</h3>
                                    <p>Your recently conversation</p>
                                </span>
                                <PlusIconBlue/>
                            </div>
                            <div className="section-content">
                                {/*<div className="section-item">
                                    <DefaultUserAvatar/>
                                    <div>
                                        <h3>Jake</h3>
                                        <p>Hi John, I'm ready to deliver your load</p>
                                    </div>
                                    <div>
                                        <h3>Seen</h3>
                                        <p>2h ago</p>
                                    </div>
                                </div>*/}
                                <h3>No messages...</h3>
                            </div>
                        </section>
                        <section>
                            <div className="section-header">
                                <span>
                                    <h3>Friends</h3>
                                    <p>Your all friends</p>
                                </span>
                                <PlusIconBlue/>
                            </div>
                            <div className="section-content">
                                {/* <div className="section-item">
                                    <div className="user-item-info">
                                        <DefaultUserAvatar/>
                                        <div>
                                            <h3>Jake</h3>
                                            <p>Carrier</p>
                                        </div>
                                    </div>
                                    <MoreVertIcon/>
                                </div>*/}
                                <h3>Currently in development...</h3>
                            </div>
                        </section>
                        <section>
                            <div className="section-header">
                                <span>
                                    <h3>Recent Activity</h3>
                                    <p>Your activities with loads</p>
                                </span>
                                <PlusIconBlue/>
                            </div>
                            <div className="section-content">
                                <h3>Currently in development...</h3>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShipperProfilePage;