import React, {useEffect, useState, useRef} from "react";
import '../ShipperDashboard.css';
import axios from 'axios';
import {ReactComponent as SettingsAccount} from "../../../assets/images/person-settings.svg";
import {ReactComponent as SettingsPassword} from "../../../assets/images/lock-settings.svg";
import {ReactComponent as SettingsNotifications} from "../../../assets/images/notification-person.svg";
import {ReactComponent as SettingsHelp} from "../../../assets/images/help-settings.svg";
import {ReactComponent as DefaultUserAvatar} from "../../../assets/images/default-avatar.svg";
import {ReactComponent as DeleteRedBinIcon} from "../../../assets/images/delete-account-bin-icon.svg";
import {ReactComponent as PencilIcon} from "../../../assets/images/pencil-edit-icon.svg";
import {ReactComponent as IconInfo} from "../../../assets/images/info-icon.svg";
import Switch from '../../switcher-component/Switch';
import {useNavigate, useParams} from 'react-router-dom';
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import {Skeleton} from "@mui/material";
import Alert from "../../floating-window-success/Alert";
import FloatingWindowFailed from "../../floating-window-failed/FloatingWindowFailed";
import {BACKEND_URL} from "../../../constants/constants";
import Tooltip from "../../tooltip/Tooltip";
import Grid from "../../grid-two-columns/Grid";
import TextInput from "../../text-input/TextInput";
import Popup from "../../popup/Popup";
import Button from "../../button/Button";
import RotatingLinesLoader from "../../rotating-lines/RotatingLinesLoader";
import useGsapAnimation from "../../../hooks/useGsapAnimation";

const ShipperSettings = () => {
    const [activeSetting, setActiveSetting] = useState('Account');
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const {shipperID} = useParams();
    const [shipperInfo, setShipperInfo] = useState(null);
    const [isOnAI, setIsOnAI] = useState(shipperInfo?.userShipperNotificationFromAI ?? false);
    const [isOnCarrier, setIsOnCarrier] = useState(shipperInfo?.userShipperNotificationFromCarrier ?? false);
    const [isOnDriver, setIsOnDriver] = useState(shipperInfo?.userShipperNotificationFromDriver ?? false);
    const [isOnUpdates, setIsOnUpdates] = useState(shipperInfo?.userShipperNotificationOfUpdates ?? false);
    const [shipperAvatar, setShipperAvatar] = useState(null);
    const fileInputRef = useRef();
    const navigate = useNavigate();
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [shipperEmail, setShipperEmail] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [ setLoading] = useState(false);
    const [avatarFromDB] = useState(null);
    const [email, setEmail] = useState(shipperInfo ? shipperInfo.userShipperEmail : '');
    const [description, setDescription] = useState('');
    const settingsRef = useRef();
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [alert, setAlert] = useState(false);
    const [alertData, setAlertData] = useState({status: '', text: '', description: ''});
    const [problemDescription, setProblemDescription] = useState('');
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const settingsNavAnimation = useGsapAnimation("slideDown");
    const settingsContentAnimation = useGsapAnimation("slideLeft");
    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    const handleSubmitSupportQoutes = async () => {
        setIsLoading(true);
        try {
            await axios.post(`${BACKEND_URL}/submit-help-quote/${shipperID}`, {email, description, shipperID});
            setAlertData({status: 'success', text: 'Success!', description: "Quote sent successfully!"});
            setAlert(true);
            setTimeout(() => setAlert(false), 5000);
        } catch (error) {
            console.error('Error submitting feedback:', error);
            setAlertData({status: 'error', text: 'Error!', description: "Error sending quote. Try again"});
            setAlert(true);
            setTimeout(() => setAlert(false), 5000);
        } finally {
            setIsLoading(false);
        }
    };


    const handleButtonClick = (setting) => {
        setActiveSetting(setting);
    };


    const handleSubmitFeedback = async () => {
        setIsLoadingFeedback(true);
        try {
            await axios.post(`${BACKEND_URL}/submit-feedback/${shipperID}`, {email, description, shipperID});
            setAlertData({status: 'success', text: 'Success!', description: "Message sent successfully!"});
            setAlert(true);
            setTimeout(() => setAlert(false), 5000);
        } catch (error) {
            console.error('Error submitting feedback:', error);
            setAlertData({status: 'error', text: 'Error!', description: "Error sending message. Try again"});
            setAlert(true);
            setTimeout(() => setAlert(false), 5000);
        } finally {
            setIsLoadingFeedback(false);
        }
    };


    const handleChangePassword = async () => {
        setIsLoading(true);
        if (oldPassword !== shipperInfo.userShipperPassword) {
            setIsLoading(false);
            setAlertData({status: 'warning', text: 'Warning!', description: "Passwords didn't match"});
            setAlert(true);
            setTimeout(() => setAlert(false), 5000);
            return;
        }

        try {
            const response = await axios.put(`${BACKEND_URL}/update-user-password/shipper/${shipperInfo.userShipperID}`, {newPassword});
            if (response.status === 200) {
                setAlertData({status: 'success', text: 'Success!', description: "Password updated successfully"});
                setAlert(true);
                setTimeout(() => setAlert(false), 5000);
            }
        } catch (error) {
            setAlertData({status: 'error', text: 'Error', description: "Error updating password. Try again"});
            setAlert(true);
            setTimeout(() => setAlert(false), 5000);
        }
        setIsLoading(false);
    };

    const handleDeleteAccount = async () => {
        const expectedValue = `acc delete ${shipperInfo.userShipperEmail}`;
        if (confirmDelete !== expectedValue) {
            setAlertData({status: 'warning', text: 'Warning!', description: "Value didn't equal"});
            setAlert(true);
            setTimeout(() => setAlert(false), 5000);
            return;
        }

        try {
            await axios.delete(`${BACKEND_URL}/delete-account/shipper/${shipperID}`);
            setAlertData({
                status: 'success',
                text: 'Success!',
                description: "Account deleted, you will be redirected to the sign in after 3 sec"
            });
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
                navigate("/sign-in");
            }, 3000);
        } catch (error) {
            setAlertData({status: 'error', text: 'Error!', description: "Error deleting account. Try again"});
            setAlert(true);
            setTimeout(() => setAlert(false), 5000);
        }
    };


    const handleDeleteClick = () => {
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    const scrollToSettingsRef = () => {
        settingsRef.current.scrollIntoView({behavior: 'smooth', block: 'start'}) // For smooth scroll
    }

    const toggleTooltip = () => {
        setIsTooltipVisible(!isTooltipVisible);
        setTimeout(() => {
            setIsTooltipVisible(false)
        }, 2000);
    };

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
                const response = await axios.post(`${BACKEND_URL}/upload-shipper-avatar/${shipperID}`, formData, {
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
        const getAvatar = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-shipper-avatar/${shipperID}`);
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

    const handleUpdateNotificationsSettings = async () => {
        setIsLoading(true);
        try {
            const response = await axios.put(`${BACKEND_URL}/update-shipper-notifications/${shipperID}`, {
                userShipperNotificationFromDriver: isOnDriver,
                userShipperNotificationFromCarrier: isOnCarrier,
                userShipperNotificationFromAI: isOnAI,
                userShipperNotificationOfUpdates: isOnUpdates,
            });
            console.log(response);
            if (response.status === 200) {
                console.log('Notification settings updated successfully');
                setAlertData({
                    status: 'success',
                    text: 'Success',
                    description: 'Notification settings updated successfully'
                });
                setAlert(true);
                setTimeout(() => setAlert(false), 5000);
            }
        } catch (error) {
            console.error('Error updating notification settings:', error);
            setAlertData({status: 'error', text: 'Error', description: 'Failed to update notification settings'});
            setAlert(true);
            setTimeout(() => setAlert(false), 5000);
        } finally {
            setIsLoading(false);
        }
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


    return (
        <>
            {alert && <Alert status={alertData.status} text={alertData.text} description={alertData.description}/>}
            {isPopupVisible && (
                <Popup title="Confirm Deletion" onClose={handleClosePopup}
                       footerText="After deleting you are not be able to return your account">
                    <p className="delete-popup-text">All data in account such as loads, personal data, statuses,
                        progress will be deleted permanently</p>
                    <h4 className="delete-account-popup-title">Type <span>acc delete {shipperInfo.userShipperEmail}</span> to
                        confirm deleting</h4>
                    <TextInput
                        type="text"
                        id="confirmDelete"
                        label="Type here"
                        value={confirmDelete}
                        onChange={(e) => setConfirmDelete(e.target.value)}
                    />
                    <Grid columns="2, 2fr">
                        <Button variant="neutral" onClick={handleClosePopup}>
                            Cancel
                        </Button>
                        <Button variant="delete" onClick={handleDeleteAccount}>
                            Delete Account
                        </Button>
                    </Grid>
                </Popup>
            )}
            {status === 'Success' && <Alert text="New changes applied"/>}
            {status === 'Error' && <FloatingWindowFailed text="Something went wrong. Try again"/>}
            <div className="shipper-dashboard-wrapper">
                <DashboardSidebar
                    DashboardAI={{visible: true, route: `/shipper-dashboard/${shipperID}`}}
                    Settings={{visible: true, route: `/shipper-settings/${shipperID}`}}
                    Payments={{visible: true, route: `/shipper-payments/${shipperID}`}}
                    ChatWithCarrier={{visible: true, route: `/shipper-chat-conversation/${shipperID}`}}
                    MyLoads={{visible: true, route: `/shipper-loads/${shipperID}`}}
                    isMobileSidebarOpen={isMobileSidebarOpen} toggleMobileSidebar={toggleMobileSidebar}
                />
                <div className="shipper-dashboard-content-settings">
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
                        avatar={previewSavedImage ? previewSavedImage : previewSavedImage}
                        onBurgerClick={toggleMobileSidebar}
                    />
                    <div className="settings-container">
                        <section className="settings-nav-mobile">
                            <Button variant={activeSetting === 'Account' ? 'default' : 'neutral'}
                                    onClick={() => handleButtonClick('Account')}>Account</Button>
                            <Button variant={activeSetting === 'Password' ? 'default' : 'neutral'}
                                    onClick={() => handleButtonClick('Password')}>Password</Button>
                            <Button variant={activeSetting === 'Notifications' ? 'default' : 'neutral'}
                                    onClick={() => handleButtonClick('Notifications')}>Notifications</Button>
                            <Button variant={activeSetting === 'Help' ? 'default' : 'neutral'}
                                    onClick={() => handleButtonClick('Help')}>Help</Button>
                        </section>
                        <section className="settings-nav" ref={settingsNavAnimation}>
                            <button
                                onClick={() => setActiveSetting('Account')}
                            >
                                <SettingsAccount className="link-nav-button-icon"/>
                                Account
                            </button>
                            <button
                                onClick={() => setActiveSetting('Password')}
                            >
                                <SettingsPassword className="link-nav-button-icon"/>
                                Password
                            </button>
                            <button
                                onClick={() => setActiveSetting('Notifications')}
                            >
                                <SettingsNotifications className="link-nav-button-icon"/>
                                Notifications
                            </button>
                            <button
                                onClick={() => setActiveSetting('Help')}
                            >
                                <SettingsHelp className="link-nav-button-icon"/>
                                Help
                            </button>
                        </section>
                        <section className="settings-content" ref={settingsContentAnimation}>
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
                                                                shipperInfo ?
                                                                    <>
                                                                        {shipperInfo.userShipperName}
                                                                    </>
                                                                    :
                                                                    <Skeleton variant="text" width={250}/>}
                                                        </h3>
                                                        <p>
                                                            {shipperInfo ?
                                                                <>
                                                                    {shipperInfo.userShipperRole}
                                                                </>
                                                                :
                                                                <Skeleton variant="text" width={250}/>}
                                                        </p>
                                                    </div>
                                                    <div className="shipper-info-details">
                                                        <p>USA, Los Angeles</p>
                                                        <p>
                                                            {
                                                                shipperInfo ?
                                                                    <>
                                                                        {shipperInfo.userShipperPhoneNumber}
                                                                    </>
                                                                    :
                                                                    <Skeleton variant="text" width={250}/>}
                                                        </p>
                                                        <p>
                                                            {
                                                                shipperInfo ?
                                                                    <>
                                                                        {shipperInfo.userShipperEmail}
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
                                    <div>
                                        {avatarFromDB && <img src={avatarFromDB} alt="Shipper Avatar"/>}
                                    </div>
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
                                            <Grid columns="2, 2fr">
                                                <TextInput
                                                    type="text"
                                                    id="firstName"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    label={shipperInfo ? shipperInfo.userShipperName :
                                                        <Skeleton variant="text" width={50}/>}
                                                />
                                                <TextInput
                                                    type="text"
                                                    id="lastName"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    label={shipperInfo ? shipperInfo.userShipperSecondName :
                                                        <Skeleton variant="text" width={50}/>}
                                                />
                                                <TextInput
                                                    type="text"
                                                    id="phoneNumber"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    label={shipperInfo ? shipperInfo.userShipperPhoneNumber :
                                                        <Skeleton variant="text" width={50}/>}
                                                />
                                                <TextInput
                                                    type="text"
                                                    id="shipperEmail"
                                                    value={shipperEmail}
                                                    onChange={(e) => setShipperEmail(e.target.value)}
                                                    label={shipperInfo ? shipperInfo.userShipperEmail :
                                                        <Skeleton variant="text" width={50}/>}
                                                />
                                            </Grid>
                                        </div>
                                        <Button onClick={handleApplySettings} variant="apply">
                                            {isLoading ?
                                                <>
                                                    <RotatingLinesLoader title="Processing..."/>

                                                </> :
                                                "Apply"

                                            }
                                        </Button>
                                    </div>
                                    <section className="deleting-account-section">
                                        <h2>Delete Account</h2>
                                        <a href="/" onClick={handleDeleteClick}>
                                            I want to permanently delete my account
                                            <DeleteRedBinIcon className="delete-bin-icon"/>
                                        </a>
                                    </section>
                                </>
                            )}
                            {activeSetting === 'Password' && (
                                <>
                                    <h2>Password Settings</h2>
                                    <h5 className="changing-password-text">To change your password, you need to enter
                                        your old password, then after this you
                                        need to enter your new password</h5>
                                    <div className="password-fields">
                                        <Grid columns="1, 1fr">
                                            <TextInput
                                                type="password"
                                                id="oldPassword"
                                                autoComplete="off"
                                                className="google-style-input"
                                                label="Old Password"
                                                value={oldPassword}
                                                onChange={(e) => setOldPassword(e.target.value)}
                                            />
                                            <TextInput
                                                type="password"
                                                id="newPassword"
                                                autoComplete="off"
                                                className="google-style-input"
                                                label="New Password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                        </Grid>

                                    </div>
                                    <section className="warning-message-section">
                                        <h3>If you change your password, you will be able to change it again after 7
                                            days</h3>
                                        <Button onClick={handleChangePassword} variant="apply">
                                            {isLoading ?
                                                <>
                                                    <RotatingLinesLoader title="Processing..."/>

                                                </> :
                                                "Apply"

                                            }
                                        </Button>
                                    </section>
                                </>
                            )}
                            {activeSetting === 'Notifications' && (
                                <>
                                    <h2>Notification Settings</h2>
                                    <p>Your can in detail change service notification</p>
                                    <section className="password-settings-container">
                                        <Grid columns="1, 1fr">
                                            <Switch isOn={isOnAI} handleToggle={handleToggleAI}
                                                    label="Get notifications from AI"/>
                                            <Switch isOn={isOnCarrier} handleToggle={handleToggleCarrier}
                                                    label="Get notifications from Carrier"/>
                                            <Switch isOn={isOnDriver} handleToggle={handleToggleDriver}
                                                    label="Get notifications from Driver"/>
                                            <Switch isOn={isOnUpdates} handleToggle={handleToggleUpdates}
                                                    label="Get notifications of updates"/>
                                        </Grid>

                                    </section>
                                    <section className="warning-message-section">
                                        <h3>After confirmation, the changes take effect immediately</h3>
                                        <Button onClick={handleUpdateNotificationsSettings} variant="apply">
                                            {isLoading ?
                                                <>
                                                    <RotatingLinesLoader title="Processing..."/>
                                                </> :
                                                "Apply"}
                                        </Button>
                                    </section>
                                </>
                            )}
                            {activeSetting === 'Help' && (
                                <>
                                    <h2>Help</h2>
                                    <p>For help, you can contact us by email or phone</p>
                                    <h2>I have a problem using service</h2>
                                    <h5 className="changing-password-text">If you have any problem with service fill
                                        this form, then send it</h5>
                                    <Grid columns="1, 1fr">
                                        <TextInput
                                            type="text"
                                            id="userEmail"
                                            value={shipperInfo ? shipperInfo.userShipperEmail : ''}
                                            label="Email"
                                            readOnly
                                        />
                                        <TextInput
                                            type="textarea"
                                            id="problemDescription"
                                            label="Your Problem Description"
                                            style={{height: "150px"}}
                                            value={problemDescription}
                                            onChange={(e) => setProblemDescription(e.target.value)}
                                        />
                                        <Button variant="apply" onClick={handleSubmitSupportQoutes}>
                                            {isLoading ? <RotatingLinesLoader title="Processing..."/> : "Send"}
                                        </Button>
                                    </Grid>

                                    <h2>I want to give feedback about project</h2>
                                    <h5 className="changing-password-text">Could us know in details, what satisfied you
                                        or what disappoint you</h5>
                                    <Grid columns="1, 1fr">
                                        <TextInput
                                            type="text"
                                            id="userEmail"
                                            value={shipperInfo.userShipperEmail}
                                            onChange={(e) => setEmail(e.target.value)}
                                            label="Email"
                                        />
                                        <TextInput
                                            type="textarea"
                                            id="problemDescription"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            label="Your Feedback here"
                                            style={{height: "150px"}}
                                        />
                                        <Button variant="apply" onClick={handleSubmitFeedback}>
                                            {isLoadingFeedback ? <RotatingLinesLoader title="Processing..."/> : "Send"}
                                        </Button>
                                    </Grid>
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
