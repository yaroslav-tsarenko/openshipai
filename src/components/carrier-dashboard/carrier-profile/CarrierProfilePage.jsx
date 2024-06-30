import React, {useEffect, useState, useRef} from "react";
import '../CarrierDashboard.css';
import {ReactComponent as OpenshipLogo} from "../../../assets/openship-ai-logo-updated.svg";
import {ReactComponent as DashboardIcon} from "../../../assets/dashboard-icon-grey.svg";
import {ReactComponent as DashboardIconWhite} from "../../../assets/dashboard-icon-white.svg";
import {ReactComponent as LoadIcon} from "../../../assets/load-icon-grey.svg";
import {ReactComponent as LoadIconWhite} from "../../../assets/load-icon-white.svg";
import {ReactComponent as LogoutIcon} from "../../../assets/logout-icon-grey.svg";
import {ReactComponent as LogoutIconWhite} from "../../../assets/logout-icon-white.svg";
import {ReactComponent as MoreVertIcon} from "../../../assets/more-verical-icons.svg";
import {ReactComponent as SettingsAccount} from "../../../assets/account-settings-icon.svg";
import {ReactComponent as SettingsAccountWhite} from "../../../assets/account-settings-icon-white.svg";
import {ReactComponent as SettingsPassword} from "../../../assets/lock-icon.svg";
import {ReactComponent as SettingsPasswordWhite} from "../../../assets/lock-icon-white.svg";
import {ReactComponent as SettingsNotifications} from "../../../assets/bell-settings-icon.svg";
import {ReactComponent as SettingsNotificationsWhite} from "../../../assets/bell-settings-icon-white.svg";
import {ReactComponent as SettingsHelp} from "../../../assets/help-settings-icon.svg";
import {ReactComponent as SettingsHelpWhite} from "../../../assets/help-settings-icon-white.svg";
import {ReactComponent as PlusIconBlue} from "../../../assets/plus-blue-icon.svg";
import {ReactComponent as PencilIcon} from "../../../assets/pencil-edit-icon.svg";
import {ReactComponent as IconInfo} from "../../../assets/info-icon.svg";
import {ReactComponent as PaymentIcon} from "../../../assets/payment-icon-grey.svg";
import {ReactComponent as PaymentIconWhite} from "../../../assets/payment-icon-white.svg";
import {ReactComponent as ProfileIcon} from "../../../assets/profile-icon-grey.svg";
import {ReactComponent as ProfileIconWhite} from "../../../assets/profile-icon-white.svg";
import {ReactComponent as SettingsIcon} from "../../../assets/settings-icon-grey.svg";
import {ReactComponent as SettingsIconWhite} from "../../../assets/settings-icon-white.svg";
import {ReactComponent as LoadBoxIconWhite} from "../../../assets/LoadBoxIconWhite.svg";
import {ReactComponent as TireIcon} from "../../../assets/TireIcon.svg";
import {ReactComponent as TireIconWhite} from "../../../assets/tire-icon-white.svg";
import {ReactComponent as LoadBoxIcon} from "../../../assets/load-box-icon.svg";
import {ReactComponent as CarrierChatIcon} from "../../../assets/chat-icon-grey.svg";
import {ReactComponent as CarrierChatIconWhite} from "../../../assets/chat-icon-white.svg";
import {ReactComponent as ArrowNav} from "../../../assets/arrow-nav.svg";
import {ReactComponent as DefaultUserAvatar} from "../../../assets/default-avatar.svg";
import {ReactComponent as BellIcon} from "../../../assets/bell-icon.svg";
import {ReactComponent as SettingsAccountIcon} from "../../../assets/settings-icon.svg";
import {ReactComponent as SearchIcon} from "../../../assets/search-icon.svg";
import Switch from '../../switcher-component/Switch';
import {useParams} from 'react-router-dom';
import {Link} from "react-router-dom";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import axios from "axios";
import {BACKEND_URL} from "../../../constants/constants";
import {Skeleton} from "@mui/material";

const CarrierProfilePage = () => {
    const [activeSetting, setActiveSetting] = useState('Account');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [hoveredButton, setHoveredButton] = useState('');
    const {carrierID} = useParams();
    const [isOnAI, setIsOnAI] = useState(false);
    const [isOnCarrier, setIsOnCarrier] = useState(false);
    const [isOnDriver, setIsOnDriver] = useState(false);
    const [isOnUpdates, setIsOnUpdates] = useState(false);
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

    const handleToggleAI = () => {
        setIsOnAI(!isOnAI);
    };
    const handleToggleCarrier = () => {
        setIsOnCarrier(!isOnCarrier);
    };
    const handleToggleDriver = () => {
        setIsOnDriver(!isOnDriver);
    };
    const handleToggleUpdates = () => {
        setIsOnUpdates(!isOnUpdates);
    };
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (

        <div className="carrier-dashboard-wrapper">
            <DashboardSidebar
                DashboardAI={{visible: true, route: `/carrier-dashboard/${carrierID}`}}
                TakeLoad={{visible: true, route: `/carrier-take-loads/${carrierID}`}}
                MyLoads={{visible: true, route: `/carrier-loads/${carrierID}`}}
                DriversAndEquip={{visible: true, route: `/carrier-drivers/${carrierID}`}}
                Payments={{visible: true, route: `/carrier-payments/${carrierID}`}}
                ChatWithShipper={{visible: true, route: `/carrier-chat-conversation/${carrierID}`}}
                Profile={{visible: true, route: `/carrier-profile/${carrierID}`}}
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
                <div className="carrier-profile-content-wrapper">
                    <div className="profile-content-wrapper">
                        <div className="carrier-profile-content">
                            <div className="carrier-info">
                                {previewSavedImage ? (
                                    <img src={previewSavedImage} className="carrier-profile-avatar" alt="User Avatar"/>
                                ) : (
                                    <DefaultUserAvatar className="carrier-profile-avatar"/>
                                )}
                                <section className="carrier-details-wrapper">
                                    <div className="carrier-role-name">
                                        <h3>
                                            {
                                                carrierInfo ?
                                                    <>
                                                        {carrierInfo.carrierAccountName}
                                                    </>
                                                    :
                                                    <Skeleton variant="text" width={250} />
                                            }
                                            {
                                                carrierInfo ?
                                                    <>
                                                        {carrierInfo.carrierAccountLastName}
                                                    </>
                                                    :
                                                    <Skeleton variant="text" width={250} />
                                            }
                                        </h3>
                                        <p>
                                            {
                                                carrierInfo ?
                                                    <>
                                                        {carrierInfo.role}
                                                    </>
                                                    :
                                                    <Skeleton variant="text" width={250} />
                                            }
                                        </p>
                                    </div>
                                    <div className="carrier-info-details">
                                        <p>USA, Los Angeles</p>
                                        <p>
                                            {
                                                carrierInfo ?
                                                    <>
                                                        {carrierInfo.carrierAccountAccountEmail}
                                                    </>
                                                    :
                                                    <Skeleton variant="text" width={250} />
                                            }
                                        </p>
                                    </div>
                                </section>
                            </div>
                            <div className="carrier-nav-buttons">
                                <button><PencilIcon/></button>
                                <button><IconInfo/></button>
                            </div>
                        </div>
                        <div className="carrier-profile-status">
                            <p>Currently you don't have active status for your profile🚫</p>
                        </div>
                    </div>
                    <div className="carrier-profile-activity">
                        <section>
                            <div className="section-header">
                                <span>
                                    <h3>Latest Message</h3>
                                    <p>Your recently conversation</p>
                                </span>
                                <PlusIconBlue/>
                            </div>
                            <div className="section-content">
                                <div className="section-item">
                                    <DefaultUserAvatar/>
                                    <div>
                                        <h3>Jake</h3>
                                        <p>Hi John, I'm ready to deliver your load</p>
                                    </div>
                                    <div>
                                        <h3>Seen</h3>
                                        <p>2h ago</p>
                                    </div>
                                </div>
                                <div className="section-item">
                                    <DefaultUserAvatar/>
                                    <div>
                                        <h3>Jake</h3>
                                        <p>Hi John, I'm ready to deliver your load</p>
                                    </div>
                                    <div>
                                        <h3>Seen</h3>
                                        <p>2h ago</p>
                                    </div>
                                </div>
                                <div className="section-item">
                                    <DefaultUserAvatar/>
                                    <div>
                                        <h3>Jake</h3>
                                        <p>Hi John, I'm ready to deliver your load</p>
                                    </div>
                                    <div>
                                        <h3>Seen</h3>
                                        <p>2h ago</p>
                                    </div>
                                </div>
                                <div className="section-item">
                                    <DefaultUserAvatar/>
                                    <div>
                                        <h3>Jake</h3>
                                        <p>Hi John, I'm ready to deliver your load</p>
                                    </div>
                                    <div>
                                        <h3>Seen</h3>
                                        <p>2h ago</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="section-header">
                                <span>
                                    <h3>Friends (35)</h3>
                                    <p>Your all friends</p>
                                </span>
                                <PlusIconBlue/>
                            </div>
                            <div className="section-content">
                                <div className="section-item">
                                    <div className="user-item-info">
                                        <DefaultUserAvatar/>
                                        <div>
                                            <h3>Jake</h3>
                                            <p>Carrier</p>
                                        </div>
                                    </div>
                                    <MoreVertIcon/>
                                </div>
                                <div className="section-item">
                                    <div className="user-item-info">
                                        <DefaultUserAvatar/>
                                        <div>
                                            <h3>Jake</h3>
                                            <p>Carrier</p>
                                        </div>
                                    </div>
                                    <MoreVertIcon/>
                                </div>
                                <div className="section-item">
                                    <div className="user-item-info">
                                        <DefaultUserAvatar/>
                                        <div>
                                            <h3>Jake</h3>
                                            <p>Carrier</p>
                                        </div>
                                    </div>
                                    <MoreVertIcon/>
                                </div>
                                <div className="section-item">
                                    <div className="user-item-info">
                                        <DefaultUserAvatar/>
                                        <div>
                                            <h3>Jake</h3>
                                            <p>Carrier</p>
                                        </div>
                                    </div>
                                    <MoreVertIcon/>
                                </div>
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
                                <h3>No Activity...</h3>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarrierProfilePage;