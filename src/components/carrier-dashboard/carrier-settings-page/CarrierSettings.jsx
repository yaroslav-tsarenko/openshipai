import React, {useEffect, useState, useRef} from "react";
import '../CarrierDashboard.css';
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
import Switch from '../../switcher-component/Switch';
import {useParams} from 'react-router-dom';
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import {BACKEND_URL} from "../../../constants/constants";
import axios from "axios";

const CarrierSettings = () => {

    const [activeSetting, setActiveSetting] = useState('Account');
    const [carrierInfo, setCarrierInfo] = useState(null);
    const [hoveredButton, setHoveredButton] = useState('');
    const {carrierID} = useParams();
    const fileInputRef = useRef();
    const [isOnAI, setIsOnAI] = useState(false);
    const [isOnCarrier, setIsOnCarrier] = useState(false);
    const [isOnDriver, setIsOnDriver] = useState(false);
    const [isOnUpdates, setIsOnUpdates] = useState(false);
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

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/get-current-user/shipper/${carrierID}`);
                const data = await response.json();
                setCarrierInfo(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getUser();
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
                Profile={{visible: true, route: `/carrier-profile/${carrierID}`}}
                Settings={{visible: true, route: `/carrier-settings/${carrierID}`}}
            />
            <div className="carrier-dashboard-content">
                <HeaderDashboard
                    contentTitle="Сarrier Dashboard"
                    contentSubtitle="By clicking on the qoute you can see the carriers listing"
                    accountName="TRANE"
                    accountRole="Carrier"
                    profileLink={`/carrier-profile/${carrierID}`}
                    bellLink={`/carrier-settings/${carrierID}`}
                    settingsLink={`/carrier-profile/${carrierID}`}
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
                                <h2>Account Info</h2>
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
                                                />
                                                <label htmlFor="firstName" className="google-style-input-label">Carrier
                                                    Name</label>
                                            </div>
                                            <div className="google-input-wrapper">
                                                <input
                                                    type="lastName"
                                                    id="lastName"
                                                    autoComplete="off"
                                                    className="google-style-input"
                                                    required={true}
                                                />
                                                <label htmlFor="lastName" className="google-style-input-label">Carrier
                                                    Last
                                                    Name</label>
                                            </div>
                                            <div className="google-input-wrapper">
                                                <input
                                                    type="lastName"
                                                    id="lastName"
                                                    autoComplete="off"
                                                    className="google-style-input"
                                                    required={true}
                                                />
                                                <label htmlFor="lastName" className="google-style-input-label">Carrier
                                                    Company Name</label>
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
                                                />
                                                <label htmlFor="phoneNumber" className="google-style-input-label">Carrier
                                                    Phone Number</label>
                                            </div>
                                            <div className="google-input-wrapper">
                                                <input
                                                    type="carrierEmail"
                                                    id="carrierEmail"
                                                    autoComplete="off"
                                                    className="google-style-input"
                                                    required={true}
                                                />
                                                <label htmlFor="carrierEmail"
                                                       className="google-style-input-label">Carrier Email</label>
                                            </div>
                                            <div className="google-input-wrapper">
                                                <input
                                                    type="carrierEmail"
                                                    id="carrierEmail"
                                                    autoComplete="off"
                                                    className="google-style-input"
                                                    required={true}
                                                />
                                                <label htmlFor="carrierEmail"
                                                       className="google-style-input-label">Carrier DOT Number</label>
                                            </div>
                                        </section>
                                    </div>
                                    <button className="apply-settings-button">Apply</button>
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
                                    <Switch isOn={isOnCarrier} handleToggle={handleToggleCarrier}
                                            label="Get notifications from Carrier"/>
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
                                        <input
                                            type="text"
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
                                        <input
                                            type="text"
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
                            </>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CarrierSettings;