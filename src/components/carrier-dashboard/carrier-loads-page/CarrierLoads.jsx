import React, {useEffect, useState, useRef} from "react";
import '../CarrierDashboard.css';
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
import {ReactComponent as CarrierChatIcon} from "../../../assets/chat-icon-grey.svg";
import {ReactComponent as LoadBoxIconWhite} from "../../../assets/LoadBoxIconWhite.svg";
import {ReactComponent as TireIcon} from "../../../assets/TireIcon.svg";
import {ReactComponent as TireIconWhite} from "../../../assets/tire-icon-white.svg";
import {ReactComponent as LoadBoxIcon} from "../../../assets/load-box-icon.svg";
import {ReactComponent as CarrierChatIconWhite} from "../../../assets/chat-icon-white.svg";
import {ReactComponent as ArrowNav} from "../../../assets/arrow-nav.svg";
import {ReactComponent as SearchIcon} from "../../../assets/search-icon.svg";
import {ReactComponent as DefaultUserAvatar} from "../../../assets/default-avatar.svg";
import {ReactComponent as BellIcon} from "../../../assets/bell-icon.svg";
import {ReactComponent as SettingsAccountIcon} from "../../../assets/settings-icon.svg";
import {ReactComponent as BidArrowIcon} from "../../../assets/bid-arrow-icon.svg";
import {ReactComponent as DirectionIconNumbers} from "../../../assets/directions-number-icons.svg";
import {useParams} from 'react-router-dom';
import {Link} from "react-router-dom";
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import LoadContainerBid from "../../load-container-bid/LoadContainerBid";
import axios from "axios";
import {BACKEND_URL} from "../../../constants/constants";
import {Skeleton} from "@mui/material";

const CarrierLoads = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [hoveredButton, setHoveredButton] = useState('');
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };
    const {carrierID} = useParams();
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

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
                isMobileSidebarOpen={isMobileSidebarOpen} toggleMobileSidebar={toggleMobileSidebar}
            />
            <div className="shipper-dashboard-content">
                <HeaderDashboard
                    contentTitle={carrierInfo ?
                        <>Welcome back, {carrierInfo.carrierContactCompanyName}!</> :
                        <Skeleton variant="text" width={250} />}
                    contentSubtitle="Monitor payments, loads, revenues"
                    accountName={carrierInfo ? carrierInfo.carrierContactCompanyName : <Skeleton variant="text" width={60} />}
                    accountRole={carrierInfo ? carrierInfo.role : <Skeleton variant="text" width={40} />}
                    bellLink={`/carrier-settings/${carrierID}`}
                    settingsLink={`/carrier-profile/${carrierID}`}
                    avatar={previewSavedImage ? previewSavedImage : DefaultUserAvatar}
                    onBurgerClick={toggleMobileSidebar}
                />
                <div className="carrier-dashboard-content-body">
                    <div className="taken-loads-container">
                        <LoadContainerBid
                            loadPrice="1060$"
                            loadTitle="Moving"
                            loadPickUpLocation="Oregon, USA"
                            loadPickUpDate="4 May - 11:00"
                            loadDeliveryLocation="Los Angeles, USA"
                            loadDeliveryDate="6 March - 15:00"
                            loadType="Moving"
                            loadWeight="500 lb"
                            loadDistance="1290 mil"
                            loadQoutes="12"
                        />
                        <LoadContainerBid
                            loadPrice="560$"
                            loadTitle="Car Load"
                            loadPickUpLocation="New York, USA"
                            loadPickUpDate="4 March - 13:00"
                            loadDeliveryLocation="Los Angeles, USA"
                            loadDeliveryDate="4 March - 13:00"
                            loadType="Vehicle"
                            loadWeight="1300 lb"
                            loadDistance="230 mil"
                            loadQoutes="No"
                        />
                        <LoadContainerBid
                            loadPrice="1560$"
                            loadTitle="Construction"
                            loadPickUpLocation="New York, USA"
                            loadPickUpDate="4 March - 13:00"
                            loadDeliveryLocation="Los Angeles, USA"
                            loadDeliveryDate="1 March - 15:00"
                            loadType="Heavy"
                            loadWeight="2300 lb"
                            loadDistance="290 mil"
                            loadQoutes="35"
                        />
                        <LoadContainerBid
                            loadPrice="560$"
                            loadTitle="Car Load"
                            loadPickUpLocation="New York, USA"
                            loadPickUpDate="4 March - 13:00"
                            loadDeliveryLocation="Los Angeles, USA"
                            loadDeliveryDate="4 March - 13:00"
                            loadType="Vehicle"
                            loadWeight="1300 lb"
                            loadDistance="230 mil"
                            loadQoutes="35"
                        />
                        <LoadContainerBid
                            loadPrice="1560$"
                            loadTitle="Construction"
                            loadPickUpLocation="New York, USA"
                            loadPickUpDate="4 March - 13:00"
                            loadDeliveryLocation="Los Angeles, USA"
                            loadDeliveryDate="1 March - 15:00"
                            loadType="Heavy"
                            loadWeight="2300 lb"
                            loadDistance="290 mil"
                            loadQoutes="35"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarrierLoads;
