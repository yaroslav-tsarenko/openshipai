import React, { useEffect, useState, useRef } from "react";
import '../ShipperDashboard.css';
import axios from 'axios';
import { ReactComponent as SettingsAccount } from "../../../assets/account-settings-icon.svg";
import { ReactComponent as SettingsAccountWhite } from "../../../assets/account-settings-icon-white.svg";
import { ReactComponent as SettingsPassword } from "../../../assets/lock-icon.svg";
import { ReactComponent as SettingsPasswordWhite } from "../../../assets/lock-icon-white.svg";
import { ReactComponent as SettingsNotifications } from "../../../assets/bell-settings-icon.svg";
import { ReactComponent as SettingsNotificationsWhite } from "../../../assets/bell-settings-icon-white.svg";
import { ReactComponent as SettingsHelp } from "../../../assets/help-settings-icon.svg";
import { ReactComponent as SettingsHelpWhite } from "../../../assets/help-settings-icon-white.svg";
import { ReactComponent as DefaultUserAvatar } from "../../../assets/default-avatar.svg";
import { ReactComponent as DeleteRedBinIcon } from "../../../assets/delete-account-bin-icon.svg";
import Switch from '../../switcher-component/Switch';
import { useParams } from 'react-router-dom';
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import { Skeleton } from "@mui/material";
import FloatingWindowSuccess from "../../floating-window-success/FloatingWindowSuccess";
import FloatingWindowFailed from "../../floating-window-failed/FloatingWindowFailed";
import { ClipLoader } from "react-spinners";
import {BACKEND_URL} from "../../../constants/constants";

const ShipperSettings = () => {
    const [activeSetting, setActiveSetting] = useState('Account');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [hoveredButton, setHoveredButton] = useState('');
    const { shipperID } = useParams();
    const [isOnAI, setIsOnAI] = useState(false);
    const [isOnCarrier, setIsOnCarrier] = useState(false);
    const [isOnDriver, setIsOnDriver] = useState(false);
    const [isOnUpdates, setIsOnUpdates] = useState(false);
    const [shipperInfo, setShipperInfo] = useState(null);
    const [shipperAvatar, setShipperAvatar] = useState(null);
    const fileInputRef = useRef();
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [shipperEmail, setShipperEmail] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [avatarFromDB, setAvatarFromDB] = useState(null);

    const handleApplySettings = async () => {
        setIsLoading(true);
        const updatedData = {
            name: firstName,
            secondName: lastName,
            phoneNumber,
            email: shipperEmail,
        };

        try {
            const response = await axios.put(`${BACKEND_URL}/update-shipper/${shipperID}`, updatedData);
            if (response.status === 200) {
                setShipperInfo(response.data);
            }
        } catch (error) {
            console.error('Error updating shipper:', error);
        } finally {
            setIsLoading(false);
        }

        if (shipperAvatar) {
            const formData = new FormData();
            formData.append('avatar', shipperAvatar);

            try {
                const response = await axios.post(`${BACKEND_URL}/upload-avatar/${shipperID}`, formData, {
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

    useEffect(() => {
        if (shipperInfo && shipperInfo.userShipperAvatar) {
            setLoading(true); // Start loading
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
        const getAvatar = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-avatar/${shipperID}`);
                if (response.data.userShipperAvatar) {
                    setPreviewSavedImage(`${BACKEND_URL}/${response.data.userShipperAvatar}`);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getAvatar();
    }, [shipperID]);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        setShipperAvatar(file);
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewImage(url);
        }
    };

    const handleAvatarDelete = () => {
        setShipperAvatar(null);
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

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
    }, [shipperID]);

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



    return (
        <>
            {status === 'Success' && <FloatingWindowSuccess text="New changes applied" />}
            {status === 'Error' && <FloatingWindowFailed text="Something went wrong. Try again" />}
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
                    <div className="settings-container">
                        <section className="settings-nav">
                            <button
                                onMouseEnter={() => setHoveredButton('SettingsAccount')}
                                onMouseLeave={() => setHoveredButton('')}
                                onClick={() => setActiveSetting('Account')}
                            >
                                {hoveredButton === 'SettingsAccount' ?
                                    <SettingsAccountWhite className="link-nav-button-icon" /> :
                                    <SettingsAccount className="link-nav-button-icon" />}
                                Account
                            </button>
                            <button
                                onMouseEnter={() => setHoveredButton('PasswordSettings')}
                                onMouseLeave={() => setHoveredButton('')}
                                onClick={() => setActiveSetting('Password')}
                            >
                                {hoveredButton === 'PasswordSettings' ?
                                    <SettingsPasswordWhite className="link-nav-button-icon" /> :
                                    <SettingsPassword className="link-nav-button-icon" />}
                                Password
                            </button>
                            <button
                                onMouseEnter={() => setHoveredButton('NotificationsButton')}
                                onMouseLeave={() => setHoveredButton('')}
                                onClick={() => setActiveSetting('Notifications')}
                            >
                                {hoveredButton === 'NotificationsButton' ?
                                    <SettingsNotificationsWhite className="link-nav-button-icon" /> :
                                    <SettingsNotifications className="link-nav-button-icon" />}
                                Notifications
                            </button>
                            <button
                                onMouseEnter={() => setHoveredButton('HelpSettings')}
                                onMouseLeave={() => setHoveredButton('')}
                                onClick={() => setActiveSetting('Help')}
                            >
                                {hoveredButton === 'HelpSettings' ?
                                    <SettingsHelpWhite className="link-nav-button-icon" /> :
                                    <SettingsHelp className="link-nav-button-icon" />}
                                Help
                            </button>
                        </section>
                        <section className="settings-content">
                            {activeSetting === 'Account' && (
                                <>
                                    <h2>Account Info</h2>
                                    <div>
                                        {avatarFromDB && <img src={avatarFromDB} alt="Shipper Avatar" />}
                                    </div>
                                    <div className="account-info-details-container">
                                        <div className="avatar-settings">
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
                                                        type="firstName"
                                                        id="firstName"
                                                        autoComplete="off"
                                                        className="google-style-input"
                                                        required={true}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                    />
                                                    <label htmlFor="firstName" className="google-style-input-label">
                                                        {shipperInfo ?
                                                            <>
                                                                {shipperInfo.userShipperName}
                                                            </> :
                                                            <Skeleton variant="text" width={50}/>}
                                                    </label>
                                                </div>
                                                <div className="google-input-wrapper">
                                                    <input
                                                        type="lastName"
                                                        id="lastName"
                                                        autoComplete="off"
                                                        className="google-style-input"
                                                        required={true}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                    />
                                                    <label htmlFor="lastName" className="google-style-input-label">
                                                        {shipperInfo ?
                                                            <>
                                                                {shipperInfo.userShipperSecondName}
                                                            </> :
                                                            <Skeleton variant="text" width={50}/>}
                                                    </label>
                                                </div>
                                            </section>
                                            <section className="account-info-settings-2">
                                                <div className="google-input-wrapper">
                                                    <input
                                                        type="phoneNumber"
                                                        id="phoneNumber"
                                                        autoComplete="off"
                                                        className="google-style-input"
                                                        required={true}
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                    />
                                                    <label htmlFor="phoneNumber" className="google-style-input-label">
                                                        {shipperInfo ?
                                                            <>
                                                                {shipperInfo.userShipperPhoneNumber}
                                                            </> :
                                                            <Skeleton variant="text" width={50}/>}
                                                    </label>
                                                </div>
                                                <div className="google-input-wrapper">
                                                    <input
                                                        type="shipperEmail"
                                                        id="shipperEmail"
                                                        autoComplete="off"
                                                        className="google-style-input"
                                                        required={true}
                                                        onChange={(e) => setShipperEmail(e.target.value)}
                                                    />
                                                    <label htmlFor="shipperEmail" className="google-style-input-label">
                                                        {shipperInfo ?
                                                            <>
                                                                {shipperInfo.userShipperEmail}
                                                            </> :
                                                            <Skeleton variant="text" width={50}/>}
                                                    </label>
                                                </div>
                                            </section>
                                        </div>
                                        <button onClick={handleApplySettings} className="apply-settings-button">
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
                                    <p>To change your password, you need to enter your old password, then after this you need to enter your new password</p>
                                    <section className="password-settings-container">
                                        <div className="google-input-wrapper">
                                            <input
                                                type="oldPassword"
                                                id="oldPassword"
                                                autoComplete="off"
                                                className="google-style-input"
                                                required={true}
                                            />
                                            <label htmlFor="oldPassword" className="google-style-input-label">Old Password</label>
                                        </div>
                                        <div className="google-input-wrapper">
                                            <input
                                                type="newPassword"
                                                id="newPassword"
                                                autoComplete="off"
                                                className="google-style-input"
                                                required={true}
                                            />
                                            <label htmlFor="newPassword" className="google-style-input-label">New Password</label>
                                        </div>
                                    </section>
                                    <section className="warning-message-section">
                                        <h3>If you change your password, you will be able to change it again after 7 days</h3>
                                        <button className="apply-settings-button-bottom">Apply</button>
                                    </section>
                                </>
                            )}
                            {activeSetting === 'Notifications' && (
                                <>
                                    <h2>Notification Settings</h2>
                                    <p>Your can in detail change service notification</p>
                                    <section className="password-settings-container">
                                        <Switch isOn={isOnAI} handleToggle={handleToggleAI} label="Get notifications from AI" />
                                        <Switch isOn={isOnCarrier} handleToggle={handleToggleCarrier} label="Get notifications from Carrier" />
                                        <Switch isOn={isOnDriver} handleToggle={handleToggleDriver} label="Get notifications from Driver" />
                                        <Switch isOn={isOnUpdates} handleToggle={handleToggleUpdates} label="Get notifications of updates" />
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
                                                value={shipperInfo ? shipperInfo.userShipperEmail : ''}
                                            />
                                            <label htmlFor="userEmail" className="google-style-input-label">Email</label>
                                        </div>
                                        <div className="google-input-wrapper">
                                            <input
                                                type="text"
                                                id="problemDescription"
                                                autoComplete="off"
                                                className="google-style-input"
                                                required={true}
                                                style={{ height: "150px" }}
                                            />
                                            <label htmlFor="problemDescription" className="google-style-input-label">Your Problem Description</label>
                                        </div>
                                    </section>
                                    <button className="apply-settings-button-bottom">Send</button>
                                    <h2>I want to give feedback about project</h2>
                                    <p>Could us know in details, what satisfied you or what disappoint you</p>
                                    <section className="password-settings-container">
                                        <div className="google-input-wrapper">
                                            <input
                                                type="userEmail"
                                                id="feedbackEmail"
                                                autoComplete="off"
                                                className="google-style-input"
                                                required={true}
                                                value={shipperInfo ? shipperInfo.userShipperEmail : ''}
                                            />
                                            <label htmlFor="feedbackEmail" className="google-style-input-label">Email</label>
                                        </div>
                                        <div className="google-input-wrapper">
                                            <input
                                                type="text"
                                                id="feedbackDescription"
                                                autoComplete="off"
                                                className="google-style-input"
                                                required={true}
                                                style={{ height: "150px" }}
                                            />
                                            <label htmlFor="feedbackDescription" className="google-style-input-label">Your Feedback Description</label>
                                        </div>
                                    </section>
                                    <button className="apply-settings-button-bottom">Send</button>
                                </>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShipperSettings;
