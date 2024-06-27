import React, {useEffect, useState} from "react";
import '../ShipperDashboard.css';
import {ReactComponent as OpenshipLogo} from "../../../assets/openship-ai-logo-updated.svg";
import {ReactComponent as DashboardIcon} from "../../../assets/dashboard-icon-grey.svg";
import {ReactComponent as DashboardIconWhite} from "../../../assets/dashboard-icon-white.svg";
import {ReactComponent as LoadIcon} from "../../../assets/load-icon-grey.svg";
import {ReactComponent as LoadIconWhite} from "../../../assets/load-icon-white.svg";
import {ReactComponent as LogoutIcon} from "../../../assets/logout-icon-grey.svg";
import {ReactComponent as LogoutIconWhite} from "../../../assets/logout-icon-white.svg";
import {ReactComponent as PaymentIcon} from "../../../assets/payment-icon-grey.svg";
import {ReactComponent as PaymentIconWhite} from "../../../assets/payment-icon-white.svg";
import {ReactComponent as ProfileIcon} from "../../../assets/profile-icon-grey.svg";
import {ReactComponent as ProfileIconWhite} from "../../../assets/profile-icon-white.svg";
import {ReactComponent as SettingsIcon} from "../../../assets/settings-icon-grey.svg";
import {ReactComponent as SettingsIconWhite} from "../../../assets/settings-icon-white.svg";
import {ReactComponent as QoutesIcon} from "../../../assets/listing-icon-grey.svg";
import {ReactComponent as QoutesIconWhite} from "../../../assets/listing-icon-white.svg";
import {ReactComponent as CarrierChatIcon} from "../../../assets/chat-icon-grey.svg";
import {ReactComponent as CarrierChatIconWhite} from "../../../assets/chat-icon-white.svg";
import {ReactComponent as ArrowNav} from "../../../assets/arrow-nav.svg";
import {ReactComponent as SearchIcon} from "../../../assets/search-icon.svg";
import {ReactComponent as DefaultUserAvatar} from "../../../assets/default-avatar.svg";
import {ReactComponent as BellIcon} from "../../../assets/bell-icon.svg";
import {ReactComponent as SettingsAccountIcon} from "../../../assets/settings-icon.svg";
import {ReactComponent as SortIcon} from "../../../assets/sort-icon-blue.svg";
import {ReactComponent as SortIconWhite} from "../../../assets/sort-icon-white.svg";
import {ReactComponent as FilterIcon} from "../../../assets/filter-icon-blue.svg";
import {ReactComponent as FilterIconWhite} from "../../../assets/filter-icon-white.svg";
import {ReactComponent as CreateLoadIcon} from "../../../assets/create-load-icon-plus.svg";
import {ReactComponent as DirectionIcon} from "../../../assets/direction-icon.svg";
import {ReactComponent as CarrierLogo} from "../../../assets/trane-logo-carrier.svg";
import {useParams} from 'react-router-dom';
import {Link} from "react-router-dom";
import GoogleMapLoadRealTimeTrafficComponent
    from "../../driver-dashboard/google-map-load-container/GoogleMapLoadRealTimeTrafficComponent";
import GoogleMapContainer from "../../driver-dashboard/google-map-container/GoogleMapContainer";
import GoogleMapShowDirection from "../../google-map-show-direction/GoogleMapShowDirection";
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import LoadContainer from "../../load-container/LoadContainer";
import LoadDetailsComponent from "../../load-details-container/LoadDetailsComponent";
import {Skeleton} from "@mui/material";
import axios from "axios";

const ShipperLoadsPage = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [hoveredButton, setHoveredButton] = useState('');
    const {shipperID} = useParams();
    const [shipperInfo, setShipperInfo] = useState(null);

    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (shipperInfo && shipperInfo.userShipperAvatar) {
            setLoading(true);
            const avatarUrl = `http://localhost:8080/${shipperInfo.userShipperAvatar}`;

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
                const response = await fetch(`http://localhost:8080/get-current-user/shipper/${shipperID}`);
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
                DashboardAI={{ visible: true, route: `/shipper-dashboard/${shipperID}` }}
                Settings={{ visible: true, route: `/shipper-settings/${shipperID}` }}
                Profile={{ visible: true, route: `/shipper-profile/${shipperID}` }}
                Payments={{ visible: true, route: `/shipper-payments/${shipperID}` }}
                ChatWithCarrier={{ visible: true, route: `/shipper-chat-conversation/${shipperID}` }}
                MyQoutes={{ visible: true, route: `/shipper-qoutes/${shipperID}` }}
                MyLoads={{ visible: true, route: `/shipper-loads/${shipperID}` }}
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
                <div className="shipper-qoutes-dashboard-content-body">
                    <div className="shipper-loads-wrapper-qoutes">
                        <LoadContainer/>
                        <LoadContainer/>
                        <LoadContainer/>
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
                            <div className="carrier-message-item">
                                <DefaultUserAvatar/>
                                <div className="carrier-message-item-info">
                                    <h3>Carrier Name</h3>
                                    <p>Carrier Message</p>
                                </div>
                            </div>
                            <div className="carrier-message-item">
                                <DefaultUserAvatar/>
                                <div className="carrier-message-item-info">
                                    <h3>Carrier Name</h3>
                                    <p>Carrier Message</p>
                                </div>
                            </div>
                            <div className="carrier-message-item">
                                <DefaultUserAvatar/>
                                <div className="carrier-message-item-info">
                                    <h3>Carrier Name</h3>
                                    <p>Carrier Message</p>
                                </div>
                            </div>
                            <div className="carrier-message-item">
                                <DefaultUserAvatar/>
                                <div className="carrier-message-item-info">
                                    <h3>Carrier Name</h3>
                                    <p>Carrier Message</p>
                                </div>
                            </div>
                            <div className="carrier-message-item">
                                <DefaultUserAvatar/>
                                <div className="carrier-message-item-info">
                                    <h3>Carrier Name</h3>
                                    <p>Carrier Message</p>
                                </div>
                            </div>
                            <div className="carrier-message-item">
                                <DefaultUserAvatar/>
                                <div className="carrier-message-item-info">
                                    <h3>Carrier Name</h3>
                                    <p>Carrier Message</p>
                                </div>
                            </div>
                            <div className="carrier-message-item">
                                <DefaultUserAvatar/>
                                <div className="carrier-message-item-info">
                                    <h3>Carrier Name</h3>
                                    <p>Carrier Message</p>
                                </div>
                            </div>
                            <div className="carrier-message-item">
                                <DefaultUserAvatar/>
                                <div className="carrier-message-item-info">
                                    <h3>Carrier Name</h3>
                                    <p>Carrier Message</p>
                                </div>
                            </div>
                            <div className="carrier-message-item">
                                <DefaultUserAvatar/>
                                <div className="carrier-message-item-info">
                                    <h3>Carrier Name</h3>
                                    <p>Carrier Message</p>
                                </div>
                            </div>
                            <div className="carrier-message-item">
                                <DefaultUserAvatar/>
                                <div className="carrier-message-item-info">
                                    <h3>Carrier Name</h3>
                                    <p>Carrier Message</p>
                                </div>
                            </div>
                            <div className="carrier-message-item">
                                <DefaultUserAvatar/>
                                <div className="carrier-message-item-info">
                                    <h3>Carrier Name</h3>
                                    <p>Carrier Message</p>
                                </div>
                            </div>
                            <div className="carrier-message-item">
                                <DefaultUserAvatar/>
                                <div className="carrier-message-item-info">
                                    <h3>Carrier Name</h3>
                                    <p>Carrier Message</p>
                                </div>
                            </div>
                            <div className="carrier-message-item">
                                <DefaultUserAvatar/>
                                <div className="carrier-message-item-info">
                                    <h3>Carrier Name</h3>
                                    <p>Carrier Message</p>
                                </div>
                            </div>
                            <div className="carrier-message-item">
                                <DefaultUserAvatar/>
                                <div className="carrier-message-item-info">
                                    <h3>Carrier Name</h3>
                                    <p>Carrier Message</p>
                                </div>
                            </div>
                            <div className="carrier-message-item">
                                <DefaultUserAvatar/>
                                <div className="carrier-message-item-info">
                                    <h3>Carrier Name</h3>
                                    <p>Carrier Message</p>
                                </div>
                            </div>
                            <div className="carrier-message-item">
                                <DefaultUserAvatar/>
                                <div className="carrier-message-item-info">
                                    <h3>Carrier Name</h3>
                                    <p>Carrier Message</p>
                                </div>
                            </div>
                            <div className="carrier-message-item">
                                <DefaultUserAvatar/>
                                <div className="carrier-message-item-info">
                                    <h3>Carrier Name</h3>
                                    <p>Carrier Message</p>
                                </div>
                            </div>
                            <div className="carrier-message-item">
                                <DefaultUserAvatar/>
                                <div className="carrier-message-item-info">
                                    <h3>Carrier Name</h3>
                                    <p>Carrier Message</p>
                                </div>
                            </div>
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
                <LoadDetailsComponent/>
            </div>
        </div>
    );
};

export default ShipperLoadsPage;
