import React, {useEffect, useState, useRef} from "react";
import '../DriverDashboard.css';
import {ReactComponent as SettingsAccount} from "../../../assets/account-settings-icon.svg";
import {ReactComponent as SettingsAccountWhite} from "../../../assets/account-settings-icon-white.svg";
import {ReactComponent as SettingsPassword} from "../../../assets/lock-icon.svg";
import {ReactComponent as SettingsPasswordWhite} from "../../../assets/lock-icon-white.svg";
import {ReactComponent as SettingsNotifications} from "../../../assets/bell-settings-icon.svg";
import {ReactComponent as SettingsNotificationsWhite} from "../../../assets/bell-settings-icon-white.svg";
import {ReactComponent as SettingsHelp} from "../../../assets/help-settings-icon.svg";
import {ReactComponent as SettingsHelpWhite} from "../../../assets/help-settings-icon-white.svg";
import {ReactComponent as DefaultUserAvatar} from "../../../assets/default-avatar.svg";
import {ReactComponent as DeleteRedBinIcon} from "../../../assets/delete-account-bin-icon.svg";
import {ReactComponent as PencilIcon} from "../../../assets/pencil-edit-icon.svg";
import {ReactComponent as IconInfo} from "../../../assets/info-icon.svg";
import Switch from '../../switcher-component/Switch';
import {useParams} from 'react-router-dom';
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import {Skeleton} from "@mui/material";
import {BACKEND_URL} from "../../../constants/constants";
import axios from "axios";
import {ClipLoader} from "react-spinners";
import Tooltip from "../../tooltip/Tooltip";

const DriverSettings = () => {
    const [activeSetting, setActiveSetting] = useState('Account');
    const [hoveredButton, setHoveredButton] = useState('');
    const {driverID} = useParams();
    const [isOnAI, setIsOnAI] = useState(false);
    const [isOndriver, setIsOndriver] = useState(false);
    const [isOnDriver, setIsOnDriver] = useState(false);
    const [isOnUpdates, setIsOnUpdates] = useState(false);
    const [driverInfo, setDriverInfo] = useState(null);
    const fileInputRef = useRef();
    const [driverAvatar, setDriverAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [avatarFromDB, setAvatarFromDB] = useState(null);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const settingsRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [driverFirstNameLastName, setDriverFirstNameLastName] = useState('');
    const [driverLastName, setDriverLastName] = useState('');
    const [driverPhoneNumber, setDriverPhoneNumber] = useState('');
    const [driverEmail, setDriverEmail] = useState('');

    const toggleTooltip = () => {
        setIsTooltipVisible(!isTooltipVisible);
        setTimeout(() => {
            setIsTooltipVisible(false)
        }, 2000);
    };

    const scrollToSettingsRef = () => {
        settingsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }) // For smooth scroll
    }

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

    }, [driverID]);



    const handleApplySettings = async () => {
        setIsLoading(true);
        const updatedData = {
            driverFirstAndLastName: driverFirstNameLastName,
            driverEmail: driverEmail,
            driverPhoneNumber,
        };

        try {
            const response = await axios.put(`${BACKEND_URL}/update-driver/${driverID}`, updatedData);
            if (response.status === 200) {
                setDriverInfo(response.data);
            }
        } catch (error) {
            console.error('Error updating shipper:', error);
        } finally {
            setIsLoading(false);
        }

        if (driverAvatar) {
            const formData = new FormData();
            formData.append('avatar', driverAvatar);

            try {
                const response = await axios.post(`${BACKEND_URL}/upload-driver-avatar/${driverID}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        window.location.reload();
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        setDriverAvatar(file);
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewImage(url);
        }
    };

    const handleAvatarDelete = () => {
        setDriverAvatar(null);
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleToggleAI = () => {
        setIsOnAI(!isOnAI);
    };
    const handleToggledriver = () => {
        setIsOndriver(!isOndriver);
    };
    const handleToggleDriver = () => {
        setIsOnDriver(!isOnDriver);
    };
    const handleToggleUpdates = () => {
        setIsOnUpdates(!isOnUpdates);
    };

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
                <div className="settings-container">
                    <section className="settings-nav">
                        <button
                            onMouseEnter={() => setHoveredButton('SettingsAccount')}
                            onMouseLeave={() => setHoveredButton('')}
                            onClick={() => setActiveSetting('Account')}
                        >
                            {hoveredButton === 'SettingsAccount' ?
                                <SettingsAccountWhite className="link-nav-button-icon"/> :
                                <SettingsAccount className="link-nav-button-icon"/>}
                            Account
                        </button>
                        <button
                            onMouseEnter={() => setHoveredButton('PasswordSettings')}
                            onMouseLeave={() => setHoveredButton('')}
                            onClick={() => setActiveSetting('Password')}
                        >
                            {hoveredButton === 'PasswordSettings' ?
                                <SettingsPasswordWhite className="link-nav-button-icon"/> :
                                <SettingsPassword className="link-nav-button-icon"/>}
                            Password
                        </button>
                        <button
                            onMouseEnter={() => setHoveredButton('NotificationsButton')}
                            onMouseLeave={() => setHoveredButton('')}
                            onClick={() => setActiveSetting('Notifications')}
                        >
                            {hoveredButton === 'NotificationsButton' ?
                                <SettingsNotificationsWhite className="link-nav-button-icon"/> :
                                <SettingsNotifications className="link-nav-button-icon"/>}
                            Notifications
                        </button>
                        <button
                            onMouseEnter={() => setHoveredButton('HelpSettings')}
                            onMouseLeave={() => setHoveredButton('')}
                            onClick={() => setActiveSetting('Help')}
                        >
                            {hoveredButton === 'HelpSettings' ? <SettingsHelpWhite className="link-nav-button-icon"/> :
                                <SettingsHelp className="link-nav-button-icon"/>}
                            Help
                        </button>
                    </section>
                    <section className="settings-content">
                        {activeSetting === 'Account' && (
                            <>
                                <h2>Profile</h2>
                                <div className="profile-content-wrapper">
                                    <div className="shipper-profile-content">
                                        <div className="shipper-info">
                                            {previewSavedImage ? (
                                                <img src={previewSavedImage} className="shipper-profile-avatar"
                                                     alt="User Avatar"/>
                                            ) : (
                                                <DefaultUserAvatar className="shipper-profile-avatar"/>
                                            )}
                                            <section className="shipper-details-wrapper">
                                                <div className="shipper-role-name">
                                                    <h3>
                                                        {
                                                            driverInfo ?
                                                                <>
                                                                    {driverInfo.driverFirstAndLastName}
                                                                </>
                                                                :
                                                                <Skeleton variant="text" width={250}/>}
                                                    </h3>
                                                    <p>
                                                        {driverInfo ?
                                                            <>
                                                                {driverInfo.role}
                                                            </>
                                                            :
                                                            <Skeleton variant="text" width={250}/>}
                                                    </p>
                                                </div>
                                                <div className="shipper-info-details">
                                                    <p>USA, Los Angeles</p>
                                                    <p>
                                                        {
                                                            driverInfo ?
                                                                <>
                                                                    {driverInfo.driverPhoneNumber}
                                                                </>
                                                                :
                                                                <Skeleton variant="text" width={250}/>}
                                                    </p>
                                                    <p>
                                                        {
                                                            driverInfo ?
                                                                <>
                                                                    {driverInfo.driverEmail}
                                                                </>
                                                                :
                                                                <Skeleton variant="text" width={250}/>}
                                                    </p>
                                                </div>
                                            </section>
                                        </div>
                                        <div className="shipper-nav-buttons">
                                            <button
                                                onClick={scrollToSettingsRef}>
                                                <PencilIcon/>
                                            </button>
                                            <button onClick={toggleTooltip}>
                                                <IconInfo/>
                                                <Tooltip isVisible={isTooltipVisible}>
                                                    Here you can change your credentials, then have a look of your
                                                    current profile data
                                                </Tooltip>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="shipper-profile-status">
                                        <p>Currently you don't have active status for your profile🚫</p>
                                    </div>
                                </div>
                                <h2>Account Info</h2>
                                <div className="account-info-details-container">
                                    <div className="avatar-settings" ref={settingsRef}>
                                        {previewImage ? (
                                            <img src={previewImage} className="avatar-user-photo"
                                                 alt="User Avatar"/>
                                        ) : previewSavedImage ? (
                                            <img src={previewSavedImage} className="avatar-user-photo"
                                                 alt="User Avatar"/>
                                        ) : (
                                            <DefaultUserAvatar className="avatar-user-photo"/>
                                        )}
                                        <section className="avatar-settings-wrapper">
                                            <button className="change-avatar" onClick={triggerFileInput}>Change
                                                Avatar
                                            </button>
                                            <button className="shipper-delete-avatar"
                                                    onClick={handleAvatarDelete}>Delete Photo
                                            </button>
                                            <input type="file" ref={fileInputRef} style={{display: 'none'}}
                                                   onChange={handleAvatarChange}/>
                                        </section>
                                    </div>
                                    <div className="account-info-settings">
                                        <section className="account-info-settings-1">
                                            <div className="google-input-wrapper">
                                                <input
                                                    type="driverFirstAndLastName"
                                                    id="driverFirstAndLastName"
                                                    autoComplete="off"
                                                    className="google-style-input"
                                                    required={true}
                                                    onChange={(e) => setDriverFirstNameLastName(e.target.value)}
                                                />
                                                <label htmlFor="driverFirstAndLastName" className="google-style-input-label">
                                                    {driverInfo ?
                                                        <>
                                                            {driverInfo.driverFirstAndLastName}
                                                        </> :
                                                        <Skeleton variant="text" width={50}/>}
                                                </label>
                                            </div>

                                        </section>
                                        <section className="account-info-settings-2">
                                            <div className="google-input-wrapper">
                                                <input
                                                    type="driverPhoneNumber"
                                                    id="driverPhoneNumber"
                                                    autoComplete="off"
                                                    className="google-style-input"
                                                    required={true}
                                                    onChange={(e) => setDriverPhoneNumber(e.target.value)}
                                                />
                                                <label htmlFor="driverPhoneNumber" className="google-style-input-label">
                                                    {driverInfo ?
                                                        <>
                                                            {driverInfo.driverPhoneNumber}
                                                        </> :
                                                        <Skeleton variant="text" width={50}/>}
                                                </label>
                                            </div>
                                            <div className="google-input-wrapper">
                                                <input
                                                    type="driverEmail"
                                                    id="driverEmail"
                                                    autoComplete="off"
                                                    className="google-style-input"
                                                    required={true}
                                                    onChange={(e) => setDriverEmail(e.target.value)}
                                                />
                                                <label htmlFor="driverEmail" className="google-style-input-label">
                                                    {driverInfo ?
                                                        <>
                                                            {driverInfo.driverEmail}
                                                        </> :
                                                        <Skeleton variant="text" width={50}/>}
                                                </label>
                                            </div>
                                        </section>
                                    </div>
                                    <button className="apply-settings-button" onClick={handleApplySettings}>
                                        {isLoading ?
                                            <>
                                                <ClipLoader color="#ffffff" loading={isLoading}
                                                            className="apply-settings-button"
                                                            size={25}/> Applying...
                                            </> :
                                            "Apply"}
                                    </button>
                                </div>
                                <section className="deleting-account-section">
                                    <h2>Delete Account</h2>
                                    <a href="#">I want to permanently delete my account<DeleteRedBinIcon
                                        className="delete-bin-icon"/></a>
                                </section>
                            </>
                        )}
                        {activeSetting === 'Password' && (
                            <>
                                <h2>Password Settings</h2>
                                <p>To change your password, you need to enter your old password, then after this you
                                    need to enter your new password</p>
                                <section className="password-settings-container">
                                    <div className="google-input-wrapper">
                                        <input
                                            type="oldPassword"
                                            id="oldPassword"
                                            autoComplete="off"
                                            className="google-style-input"
                                            required={true}
                                        />
                                        <label htmlFor="oldPassword" className="google-style-input-label">Old
                                            Password</label>
                                    </div>
                                    <div className="google-input-wrapper">
                                        <input
                                            type="newPassword"
                                            id="newPassword"
                                            autoComplete="off"
                                            className="google-style-input"
                                            required={true}
                                        />
                                        <label htmlFor="newPassword"
                                               className="google-style-input-label">New Password</label>
                                    </div>
                                </section>
                                <section className="warning-message-section">
                                    <h3>If you change your password, you will be able to change it again after 7
                                        days</h3>
                                    <button className="apply-settings-button-bottom">Apply</button>
                                </section>
                            </>
                        )}
                        {activeSetting === 'Notifications' && (
                            <>
                                <h2>Notification Settings</h2>
                                <p>Your can in detail change service notification</p>
                                <section className="password-settings-container">
                                    <Switch isOn={isOnAI} handleToggle={handleToggleAI}
                                            label="Get notifications from AI"/>
                                    <Switch isOn={isOndriver} handleToggle={handleToggledriver}
                                            label="Get notifications from driver"/>
                                    <Switch isOn={isOnDriver} handleToggle={handleToggleDriver}
                                            label="Get notifications from Driver"/>
                                    <Switch isOn={isOnUpdates} handleToggle={handleToggleUpdates}
                                            label="Get notifications of updates"/>
                                </section>
                                <section className="warning-message-section">
                                    <h3>After confirmation, the changes take effect immediately</h3>
                                    <button className="apply-settings-button-bottom">Apply</button>
                                </section>
                            </>
                        )}
                        {activeSetting === 'Help' && (
                            <>
                                <h2>Help</h2>
                                <p>For help, you can contact us by email or phone</p>

                                <h2>I have a problem using service</h2>
                                <p>If you have any problem with service fill this form, then send it</p>
                                <section className="password-settings-container">
                                    <div className="google-input-wrapper">
                                        <input
                                            type="userEmail"
                                            id="userEmail"
                                            autoComplete="off"
                                            className="google-style-input"
                                            required={true}
                                        />
                                        <label htmlFor="userEmail" className="google-style-input-label">Email</label>
                                    </div>
                                    <div className="google-input-wrapper">
                                        <textarea
                                            id="newPassword"
                                            autoComplete="off"
                                            className="google-style-input"
                                            required={true}
                                            style={{
                                                height: "150px"
                                            }}
                                        />
                                        <label htmlFor="newPassword"
                                               className="google-style-input-label">Your Problem Description</label>
                                    </div>
                                </section>
                                <button className="apply-settings-button-bottom">Send</button>
                                <h2>I want to give feedback about project</h2>
                                <p>Could us know in details, what satisfied you or what disappoint you</p>
                                <section className="password-settings-container">
                                    <div className="google-input-wrapper">
                                        <input
                                            type="userEmail"
                                            id="userEmail"
                                            autoComplete="off"
                                            className="google-style-input"
                                            required={true}
                                        />
                                        <label htmlFor="userEmail" className="google-style-input-label">Email</label>
                                    </div>
                                    <div className="google-input-wrapper">
                                        <textarea
                                            type="text"
                                            id="newPassword"
                                            autoComplete="off"
                                            className="google-style-input"
                                            required={true}
                                            style={{
                                                minHeight: "50px",
                                                height: "150px"
                                            }}
                                        />
                                        <label htmlFor="newPassword"
                                               className="google-style-input-label">Your Problem Description</label>
                                    </div>
                                </section>
                                <button className="apply-settings-button-bottom">Send</button>
                            </>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DriverSettings;