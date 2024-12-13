import React, {useEffect, useState, useRef} from "react";
import '../DriverDashboard.css';
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
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import {Skeleton} from "@mui/material";
import {BACKEND_URL} from "../../../constants/constants";
import axios from "axios";
import {ClipLoader} from "react-spinners";
import Tooltip from "../../tooltip/Tooltip";
import Alert from "../../floating-window-success/Alert";
import Popup from "../../popup/Popup";
import TextInput from "../../text-input/TextInput";
import Grid from "../../grid-two-columns/Grid";
import Button from "../../button/Button";
import RotatingLinesLoader from "../../rotating-lines/RotatingLinesLoader";

const DriverSettings = () => {
    const [activeSetting, setActiveSetting] = useState('Account');
    const {driverID} = useParams();
    const [isOnAI, setIsOnAI] = useState(false);
    const [isOndriver, setIsOndriver] = useState(false);
    const [isOnDriver, setIsOnDriver] = useState(false);
    const [isOnUpdates, setIsOnUpdates] = useState(false);
    const [driverInfo, setDriverInfo] = useState(null);
    const fileInputRef = useRef();
    const [driverAvatar, setDriverAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [isOnCarrier, setIsOnCarrier] = useState(false);
    const [avatarFromDB, setAvatarFromDB] = useState(null);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const settingsRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [driverFirstNameLastName, setDriverFirstNameLastName] = useState('');
    const [driverLastName, setDriverLastName] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [driverPhoneNumber, setDriverPhoneNumber] = useState('');
    const [driverEmail, setDriverEmail] = useState('');
    const [alert, setAlert] = useState(false);
    const [alertData, setAlertData] = useState({status: '', text: '', description: ''});
    const [confirmDelete, setConfirmDelete] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [problemDescription, setProblemDescription] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState(driverInfo ? driverInfo.driverEmail : '');
    const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    const handleButtonClick = (setting) => {
        setActiveSetting(setting);
    };

    const handleSubmitSupportQoutes = async () => {
        setIsLoading(true);
        try {
            await axios.post(`${BACKEND_URL}/submit-help-quote/${driverID}`, {email, description, driverID});
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

    const handleSubmitFeedback = async () => {
        setIsLoadingFeedback(true);
        try {
            await axios.post(`${BACKEND_URL}/submit-feedback/${driverID}`, {email, description, driverID});
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
    const toggleTooltip = () => {
        setIsTooltipVisible(!isTooltipVisible);
        setTimeout(() => {
            setIsTooltipVisible(false)
        }, 2000);
    };

    const scrollToSettingsRef = () => {
        settingsRef.current.scrollIntoView({behavior: 'smooth', block: 'start'}) // For smooth scroll
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

    const handleUpdateNotificationsSettings = async () => {
        setIsLoading(true);
        try {
            const response = await axios.put(`${BACKEND_URL}/update-driver-notifications/${driverID}`, {
                driverNotificationFromDriver: isOnDriver,
                driverNotificationFromCarrier: isOnCarrier,
                driverNotificationFromAI: isOnAI,
                driverNotificationOfUpdates: isOnUpdates,
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


    const handleToggleCarrier = () => {
        setIsOnCarrier(!isOnCarrier);
    };

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

    const handleChangePassword = async () => {
        setIsLoading(true);
        if (oldPassword !== driverInfo.driverPassword) {
            setIsLoading(false);
            setAlertData({status: 'warning', text: 'Warning!', description: "Passwords didn't match"});
            setAlert(true);
            setTimeout(() => setAlert(false), 5000);
            return;
        }

        try {
            const response = await axios.put(`${BACKEND_URL}/update-user-password/carrier/${driverInfo.driverID}`, {newPassword});
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


    const handleDeleteClick = () => {
        setIsPopupVisible(true);
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

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    const handleDeleteAccount = async () => {
        const expectedValue = `acc delete ${driverInfo.driverEmail}`;
        if (confirmDelete !== expectedValue) {
            setAlertData({status: 'warning', text: 'Warning!', description: "Value didn't equal"});
            setAlert(true);
            setTimeout(() => setAlert(false), 5000);
            return;
        }

        try {
            await axios.delete(`${BACKEND_URL}/delete-account/driver/${driverID}`);
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

    return (

        <>
            {alert && <Alert status={alertData.status} text={alertData.text} description={alertData.description}/>}
            {isPopupVisible && (
                <Popup title="Confirm Deletion" onClose={handleClosePopup}
                       footerText="After deleting you are not be able to return your account">
                    <p className="delete-popup-text">All data in account such as loads, personal data, statuses,
                        progress will be deleted permanently</p>
                    <h4 className="delete-account-popup-title">Type <span>acc delete {driverInfo.driverEmail}</span> to
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
            <div className="carrier-dashboard-wrapper">
                <DashboardSidebar
                    DashboardAI={{ visible: true, route: `/driver-dashboard/${driverID}` }}
                    Settings={{ visible: true, route: `/driver-settings/${driverID}` }}
                    AssignedLoad={{ visible: true, route: `/driver-assigned-loads/${driverID}` }}
                    isMobileSidebarOpen={isMobileSidebarOpen} toggleMobileSidebar={toggleMobileSidebar}
                />
                <div className="shipper-dashboard-content-settings">
                    <HeaderDashboard
                        contentTitle={driverInfo ? <>Welcome back, {driverInfo.driverFirstAndLastName}!</> :
                            <Skeleton variant="text" width={250}/>}
                        contentSubtitle="Monitor payments, loads, revenues"
                        accountName={driverInfo ? driverInfo.driverFirstAndLastName :
                            <Skeleton variant="text" width={60}/>}
                        accountRole={driverInfo ? driverInfo.role : <Skeleton variant="text" width={40}/>}
                        profileLink={`/driver-profile/${driverID}`}
                        bellLink={`/driver-settings/${driverID}`}
                        settingsLink={`/driver-profile/${driverID}`}
                        avatar={previewSavedImage ? previewSavedImage : DefaultUserAvatar}
                        onBurgerClick={toggleMobileSidebar}
                    />
                    <div className="settings-container">
                        <section className="settings-nav-mobile">
                            <Button variant={activeSetting === 'Account' ? 'default' : 'neutral'} onClick={() => handleButtonClick('Account')}>Account</Button>
                            <Button variant={activeSetting === 'Password' ? 'default' : 'neutral'} onClick={() => handleButtonClick('Password')}>Password</Button>
                            <Button variant={activeSetting === 'Notifications' ? 'default' : 'neutral'} onClick={() => handleButtonClick('Notifications')}>Notifications</Button>
                            <Button variant={activeSetting === 'Help' ? 'default' : 'neutral'} onClick={() => handleButtonClick('Help')}>Help</Button>
                        </section>
                        <section className="settings-nav">
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
                                            <Grid columns="2, 2fr">
                                                <TextInput
                                                    type="text"
                                                    id="driverFirstAndLastName"
                                                    autoComplete="off"
                                                    className="google-style-input"
                                                    required={true}
                                                    value={driverFirstNameLastName}
                                                    onChange={(e) => setDriverFirstNameLastName(e.target.value)}
                                                    label={driverInfo ? driverInfo.driverFirstAndLastName :
                                                        <Skeleton variant="text" width={50}/>}
                                                />
                                                <TextInput
                                                    type="text"
                                                    id="driverPhoneNumber"
                                                    autoComplete="off"
                                                    className="google-style-input"
                                                    required={true}
                                                    value={driverPhoneNumber}
                                                    onChange={(e) => setDriverPhoneNumber(e.target.value)}
                                                    label={driverInfo ? driverInfo.driverPhoneNumber :
                                                        <Skeleton variant="text" width={50}/>}
                                                />
                                                <TextInput
                                                    type="email"
                                                    id="driverEmail"
                                                    autoComplete="off"
                                                    className="google-style-input"
                                                    required={true}
                                                    value={driverEmail}
                                                    onChange={(e) => setDriverEmail(e.target.value)}
                                                    label={driverInfo ? driverInfo.driverEmail :
                                                        <Skeleton variant="text" width={50}/>}
                                                />
                                            </Grid>
                                        </div>
                                        <Button variant="apply" onClick={handleApplySettings}>
                                            {isLoading ?
                                                <>
                                                    <ClipLoader color="#ffffff" loading={isLoading}
                                                                className="apply-settings-button"
                                                                size={25}/> Applying...
                                                </> :
                                                "Apply"}
                                        </Button>
                                    </div>
                                    <section className="deleting-account-section">
                                        <h2>Delete Account</h2>
                                        <a href="#" onClick={handleDeleteClick}>
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
                            {activeSetting === 'Notifications' && (
                                <>
                                    <h2>Notification Settings</h2>
                                    <p>Your can in detail change service notification</p>
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
                                            value={driverInfo ? driverInfo.driverEmail : ''}
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
                                            value={driverInfo.driverEmail}
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

export default DriverSettings;