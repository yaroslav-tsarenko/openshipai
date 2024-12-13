import React, {useEffect, useState, useRef} from "react";
import '../CarrierDashboard.css';
import {ReactComponent as SettingsAccount} from "../../../assets/images/person-settings.svg";
import {ReactComponent as SettingsPassword} from "../../../assets/images/lock-settings.svg";
import {ReactComponent as SettingsNotifications} from "../../../assets/images/notification-person.svg";
import {ReactComponent as SettingsHelp} from "../../../assets/images/help-settings.svg";
import {ReactComponent as DefaultUserAvatar} from "../../../assets/images/default-avatar.svg";
import {ReactComponent as DeleteRedBinIcon} from "../../../assets/images/delete-account-bin-icon.svg";
import {ReactComponent as PencilIcon} from "../../../assets/images/pencil-edit-icon.svg";
import {ReactComponent as IconInfo} from "../../../assets/images/info-icon.svg";
import {useNavigate} from "react-router-dom";
import Switch from '../../switcher-component/Switch';
import {useParams} from 'react-router-dom';
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import {BACKEND_URL} from "../../../constants/constants";
import axios from "axios";
import {Skeleton} from "@mui/material";
import {ClipLoader} from "react-spinners";
import Tooltip from "../../tooltip/Tooltip";
import Popup from "../../popup/Popup";
import TextInput from "../../text-input/TextInput";
import Grid from "../../grid-two-columns/Grid";
import Button from "../../button/Button";
import Alert from "../../floating-window-success/Alert";
import RotatingLinesLoader from "../../rotating-lines/RotatingLinesLoader";

const CarrierSettings = () => {

    const [activeSetting, setActiveSetting] = useState('Account');
    const [carrierInfo, setCarrierInfo] = useState(null);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const {carrierID} = useParams();

    const settingsRef = useRef();
    const fileInputRef = useRef();
    const [isOnAI, setIsOnAI] = useState(false);
    const [isOnCarrier, setIsOnCarrier] = useState(false);
    const [isOnDriver, setIsOnDriver] = useState(false);
    const [isOnUpdates, setIsOnUpdates] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [carrierFirstName, setCarrierFirstName] = useState('');
    const [carrierLastName, setCarrierLastName] = useState('');
    const [carrierPhoneNumber, setCarrierPhoneNumber] = useState('');
    const [carrierEmail, setCarrierEmail] = useState('');
    const [carrierDotNumber, setCarrierDotNumber] = useState('');
    const [carrierCompanyName, setCarrierCompanyName] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertData, setAlertData] = useState({status: '', text: '', description: ''});
    const [confirmDelete, setConfirmDelete] = useState('');
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
    const [email, setEmail] = useState(carrierInfo ? carrierInfo.userShipperEmail : '');
    const [carrierAvatar, setCarrierAvatar] = useState(null);
    const [problemDescription, setProblemDescription] = useState('');
    const [description, setDescription] = useState('');
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
            await axios.post(`${BACKEND_URL}/submit-help-quote/${carrierID}`, {email, description, carrierID});
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
            await axios.post(`${BACKEND_URL}/submit-feedback/${carrierID}`, {email, description, carrierID});
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

    const scrollToSettingsRef = () => {
        if (settingsRef.current) {
            settingsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.error('settingsRef is not assigned to any element');
        }
    };

    const toggleTooltip = () => {
        setIsTooltipVisible(!isTooltipVisible);
        setTimeout(() => {
            setIsTooltipVisible(false)
        }, 2000);
    };

    const handleDeleteClick = () => {
        setIsPopupVisible(true);
    };

    const handleApplySettings = async () => {
        setIsLoading(true);
        const updatedData = {
            name: carrierFirstName,
            secondName: carrierLastName,
            phoneNumber: carrierPhoneNumber,
            email: carrierEmail,
            companyName: carrierCompanyName,
            dotNumber: carrierDotNumber,
        };

        try {
            const response = await axios.put(`${BACKEND_URL}/update-carrier/${carrierID}`, updatedData);
            if (response.status === 200) {
                setCarrierInfo(response.data);
                setAlertData({
                    status: 'success',
                    text: 'Success',
                    description: 'Changes applied successfully'
                });
                setAlert(true);
                setTimeout(() => setAlert(false), 5000);
            }

        } catch (error) {
            console.error('Error updating shipper:', error);
        } finally {
            setAlertData({
                status: 'success',
                text: 'Success',
                description: 'Changes applied successfully'
            });
            setAlert(true);
            setTimeout(() => setAlert(false), 5000);
        }

        if (carrierAvatar) {
            const formData = new FormData();
            formData.append('avatar', carrierAvatar);

            try {
                const response = await axios.post(`${BACKEND_URL}/upload-carrier-avatar/${carrierID}`, formData, {
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
        if (carrierInfo && carrierInfo.carrierAvatar) {
            setLoading(true);
            const avatarUrl = `${BACKEND_URL}/${carrierInfo.carrierAvatar}`;
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
    }, [carrierInfo]);

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

        getAvatar();
    }, [carrierID]);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        setCarrierAvatar(file);
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewImage(url);
        }
    };


    const handleUpdateNotificationsSettings = async () => {
        setIsLoading(true);
        try {
            const response = await axios.put(`${BACKEND_URL}/update-carrier-notifications/${carrierID}`, {
                carrierNotificationFromDriver: isOnDriver,
                carrierNotificationFromCarrier: isOnCarrier,
                carrierNotificationFromAI: isOnAI,
                carrierNotificationOfUpdates: isOnUpdates,
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

    const handleDeleteAccount = async () => {
        const expectedValue = `acc delete ${carrierInfo.carrierAccountAccountEmail}`;
        if (confirmDelete !== expectedValue) {
            setAlertData({status: 'warning', text: 'Warning!', description: "Value didn't equal"});
            setAlert(true);
            setTimeout(() => setAlert(false), 5000);
            return;
        }

        try {
            await axios.delete(`${BACKEND_URL}/delete-account/carrier/${carrierID}`);
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

    const handleChangePassword = async () => {
        setIsLoading(true);
        if (oldPassword !== carrierInfo.carrierAccountPassword) {
            setIsLoading(false);
            setAlertData({status: 'warning', text: 'Warning!', description: "Passwords didn't match"});
            setAlert(true);
            setTimeout(() => setAlert(false), 5000);
            return;
        }

        try {
            const response = await axios.put(`${BACKEND_URL}/update-user-password/carrier/${carrierInfo.carrierID}`, {newPassword});
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


    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    const handleAvatarDelete = () => {
        setCarrierAvatar(null);
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
                const response = await fetch(`${BACKEND_URL}/get-current-user/carrier/${carrierID}`);
                const data = await response.json();
                setCarrierInfo(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getUser();
    }, [carrierID]);

    return (

        <>
            {alert && <Alert status={alertData.status} text={alertData.text} description={alertData.description}/>}
            {isPopupVisible && (
                <Popup title="Confirm Deletion" onClose={handleClosePopup}
                       footerText="After deleting you are not be able to return your account">
                    <p className="delete-popup-text">All data in account such as loads, personal data, statuses,
                        progress will be deleted permanently</p>
                    <h4 className="delete-account-popup-title">Type <span>acc delete {carrierInfo.carrierAccountAccountEmail}</span> to
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
                    DashboardAI={{visible: true, route: `/carrier-dashboard/${carrierID}`}}
                    TakeLoad={{visible: true, route: `/carrier-take-loads/${carrierID}`}}
                    MyLoads={{visible: true, route: `/carrier-loads/${carrierID}`}}
                    DriversAndEquip={{visible: true, route: `/carrier-drivers/${carrierID}`}}
                    Payments={{visible: true, route: `/carrier-payments/${carrierID}`}}
                    ChatWithShipper={{visible: true, route: `/carrier-chat-conversation/${carrierID}`}}
                    Settings={{visible: true, route: `/carrier-settings/${carrierID}`}}
                    isMobileSidebarOpen={isMobileSidebarOpen} toggleMobileSidebar={toggleMobileSidebar}
                />
                <div className="shipper-dashboard-content-settings">
                    <HeaderDashboard
                        contentTitle={carrierInfo ?
                            <>Welcome back, {carrierInfo.carrierContactCompanyName}!</> :
                            <Skeleton variant="text" width={250}/>}
                        contentSubtitle="Monitor payments, loads, revenues"
                        accountName={carrierInfo ? carrierInfo.carrierContactCompanyName :
                            <Skeleton variant="text" width={60}/>}
                        accountRole={carrierInfo ? carrierInfo.role : <Skeleton variant="text" width={40}/>}
                        bellLink={`/carrier-settings/${carrierID}`}
                        settingsLink={`/carrier-profile/${carrierID}`}
                        avatar={previewSavedImage ? previewSavedImage : DefaultUserAvatar}
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
                                                                carrierInfo ?
                                                                    <>
                                                                        {carrierInfo.carrierAccountName}
                                                                    </>
                                                                    :
                                                                    <Skeleton variant="text" width={250}/>}
                                                        </h3>
                                                        <p>
                                                            {carrierInfo ?
                                                                <>
                                                                    {carrierInfo.carrierAccountAccountEmail}
                                                                </>
                                                                :
                                                                <Skeleton variant="text" width={250}/>}
                                                        </p>
                                                    </div>
                                                    <div className="shipper-info-details">
                                                        <p>USA, Los Angeles</p>
                                                        <p>
                                                            {
                                                                carrierInfo ?
                                                                    <>
                                                                        {carrierInfo.carrierContactCompanyName}
                                                                    </>
                                                                    :
                                                                    <Skeleton variant="text" width={250}/>}
                                                        </p>
                                                        <p>
                                                            {
                                                                carrierInfo ?
                                                                    <>
                                                                        {carrierInfo.userShipperEmail}
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
                                                    id="carrierFirstName"
                                                    value={carrierFirstName}
                                                    onChange={(e) => setCarrierFirstName(e.target.value)}
                                                    label={carrierInfo ? carrierInfo.carrierAccountName :
                                                        <Skeleton variant="text" width={50}/>}
                                                />
                                                <TextInput
                                                    type="text"
                                                    id="carrierLastName"
                                                    value={carrierLastName}
                                                    onChange={(e) => setCarrierLastName(e.target.value)}
                                                    label={carrierInfo ? carrierInfo.carrierAccountLastName :
                                                        <Skeleton variant="text" width={50}/>}
                                                />
                                                <TextInput
                                                    type="text"
                                                    id="carrierCompanyName"
                                                    value={carrierCompanyName}
                                                    onChange={(e) => setCarrierCompanyName(e.target.value)}
                                                    label={carrierInfo ? carrierInfo.carrierContactCompanyName :
                                                        <Skeleton variant="text" width={50}/>}
                                                />
                                                <TextInput
                                                    type="text"
                                                    id="carrierPhoneNumber"
                                                    value={carrierPhoneNumber}
                                                    onChange={(e) => setCarrierPhoneNumber(e.target.value)}
                                                    label={carrierInfo ? carrierInfo.carrierCorporatePhoneNumber :
                                                        <Skeleton variant="text" width={50}/>}
                                                />
                                                <TextInput
                                                    type="text"
                                                    id="carrierEmail"
                                                    value={carrierEmail}
                                                    onChange={(e) => setCarrierEmail(e.target.value)}
                                                    label={carrierInfo ? carrierInfo.carrierAccountAccountEmail :
                                                        <Skeleton variant="text" width={50}/>}
                                                />
                                                <TextInput
                                                    type="text"
                                                    id="carrierDotNumber"
                                                    value={carrierDotNumber}
                                                    onChange={(e) => setCarrierDotNumber(e.target.value)}
                                                    label={carrierInfo ? carrierInfo.carrierDotNumber :
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
                                            value={carrierInfo ? carrierInfo.carrierAccountAccountEmail : ''}
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
                                            value={carrierInfo.carrierAccountAccountEmail}
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

export default CarrierSettings;