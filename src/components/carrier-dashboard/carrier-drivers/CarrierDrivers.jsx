import React, {useEffect, useState, useRef} from "react";
import axios from 'axios';
import '../CarrierDashboard.css';
import {ReactComponent as OpenshipLogo} from "../../../assets/openship-ai-logo-updated.svg";
import {ReactComponent as DashboardIcon} from "../../../assets/dashboard-icon-grey.svg";
import {ReactComponent as DriverAvatarExample} from "../../../assets/driver-photo-example.svg";
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
import {ReactComponent as SortIcon} from "../../../assets/sort-icon-blue.svg";
import {ReactComponent as SortIconWhite} from "../../../assets/sort-icon-white.svg";
import {ReactComponent as FilterIcon} from "../../../assets/filter-icon-blue.svg";
import {ReactComponent as FilterIconWhite} from "../../../assets/filter-icon-white.svg";
import {ReactComponent as CreateLoadIcon} from "../../../assets/create-load-icon-plus.svg";
import {ReactComponent as DirectionIcon} from "../../../assets/direction-icon.svg";
import {ReactComponent as CarrierIcon} from "../../../assets/trane-logo-carrier.svg";
import {useParams} from 'react-router-dom';
import {Link} from "react-router-dom";
import FloatingWindowSuccess from "../../floating-window-success/FloatingWindowSuccess";
import FloatingWindowFailed from "../../floating-window-failed/FloatingWindowFailed";
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import {BACKEND_URL} from "../../../constants/constants";
import {Skeleton} from "@mui/material";

const CarrierDrivers = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [hoveredButton, setHoveredButton] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isEmailSentSuccesfully, setIsEmailSentSuccesfully] = useState(false);
    const [isFail, setIsFail] = useState(false);
    const {carrierID} = useParams();
    const [isSuccessCredentials, setIsSuccessCredentials] = useState(false);
    const [isDriverPopupOpen, setIsDriverPopupOpen] = useState(false);
    const [sendEmailDriver, setSendEmailDriver] = useState(false);
    const [sendDriverDataFailed, setSendDriverDataFailed] = useState(false);

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

    const [formData, setFormData] = useState({
        driverFirstAndLastName: '',
        driverEmail: '',
        driverPhoneNumber: '',
        driverDateOfBirth: '',
        driverAddress: '',
        driverLicenseClass: '',
        role: 'driver',
        driverPhoto: '',
        driverPassword: (Math.random().toString(36) + Math.random().toString(36)).slice(2, 66),
        driverID: Math.random().toString(36).substring(2, 36) + Math.random().toString(36).substring(2, 36)
            + Math.random().toString(36).substring(2, 36),
        driverCreatedByCarrierID: carrierID,
    });



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BACKEND_URL}/create-driver`, formData);
            console.log('Response:', response);
            if (response.status === 200) {
                console.log('Driver created successfully');
                setIsSuccess(true);
                setIsSuccessCredentials(true);
            } else {
                console.log('Failed to create driver');
                setIsFail(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setIsFail(true);
        }
    };

    const handleSendData = async () => {
        const data = {
            driverEmail: formData.driverEmail,
            driverPassword: formData.driverPassword
        };

        try {
            const response = await fetch(`${BACKEND_URL}/send-driver-credentials`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const jsonResponse = await response.json();
            console.log(jsonResponse);
            setIsEmailSentSuccesfully(true);
            setTimeout(() => {
                setIsDriverPopupOpen(false);
                setIsSuccessCredentials(false);
            }, 1500)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (input) => (e) => {
        setFormData({...formData, [input]: e.target.value});
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
                <div className="shipper-dashboard-load-buttons">
                    <section className="shipper-filter-buttons">
                        <button className="filter-buttons-shipper"
                                onMouseEnter={() => setHoveredButton('SortButton')}
                                onMouseLeave={() => setHoveredButton('')}>
                            {hoveredButton === 'SortButton' ?
                                <SortIconWhite className="button-nav-load-icon"/> :
                                <SortIcon className="button-nav-load-icon"/>}
                            Sort
                        </button>
                        <button className="filter-buttons-shipper"
                                onMouseEnter={() => setHoveredButton('FilterButton')}
                                onMouseLeave={() => setHoveredButton('')}>
                            {hoveredButton === 'FilterButton' ?
                                <FilterIconWhite className="button-nav-load-icon"/> :
                                <FilterIcon className="button-nav-load-icon"/>}
                            Filter
                        </button>
                    </section>
                    <button className="create-load-button" onClick={() => setIsDriverPopupOpen(true)}>
                        <CreateLoadIcon className="button-nav-load-icon"/>
                        Add Driver
                    </button>
                    {isDriverPopupOpen && (
                        <div className="create-driver-overlay">
                            {isSuccess && <FloatingWindowSuccess text="Driver added succesfully"/>}
                            {isFail && <FloatingWindowFailed text="Driver with this credentials already exist"/>}
                            {sendEmailDriver && <FloatingWindowSuccess text="Driver's data sended to driver" />}
                            {sendDriverDataFailed && <FloatingWindowFailed text="Failed to send data to driver" />}
                            {isEmailSentSuccesfully && <FloatingWindowSuccess text="Email sent successfully" />}
                            {isSuccessCredentials ? (
                                <div className="create-driver-popup">
                                    <section>
                                        <div>
                                            <h3>Congratulations!</h3>
                                            <p>Driver added successfully</p>
                                        </div>
                                        <button onClick={() => {
                                            setIsDriverPopupOpen(false);
                                            setIsSuccessCredentials(false);}}>Close</button>
                                    </section>
                                    <div className="create-driver-wrapper-success">
                                        <section>
                                            <span>
                                                <h3>Here is driver credentials</h3>
                                                <p>Driver credentials must only be shared with driver, appreciate personal data </p>
                                            </span>
                                            <span>
                                                <p>Driver Email</p>
                                                <h3>{formData.driverEmail}</h3>
                                            </span>
                                            <span>
                                                <p>Driver Password</p>
                                                <h3>{formData.driverPassword}</h3>
                                            </span>
                                        </section>
                                        <button onClick={handleSendData}>Send Data to Driver</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="create-driver-popup">
                                    <section>
                                        <h3>Add Driver</h3>
                                        <button onClick={() => setIsDriverPopupOpen(false)}>Close</button>
                                    </section>
                                    <div className="create-driver-wrapper">
                                        <div className="add-driver-avatar">
                                            <h3>Add Driver Photo</h3>
                                        </div>
                                        <div className="create-driver-input">
                                            <div className="google-input-wrapper">
                                                <input
                                                    type="text"
                                                    id="driverFirstAndLastName"
                                                    autoComplete="off"
                                                    className="google-style-input"
                                                    required
                                                    onChange={handleChange('driverFirstAndLastName')}
                                                    value={formData.driverFirstAndLastName}
                                                />
                                                <label htmlFor="driverFirstAndLastName" className="google-style-input-label">First Name & Last Name</label>
                                            </div>
                                            <div className="google-input-wrapper">
                                                <input
                                                    type="text"
                                                    id="driverEmail"
                                                    autoComplete="off"
                                                    className="google-style-input"
                                                    required
                                                    onChange={handleChange('driverEmail')}
                                                    value={formData.driverEmail}
                                                />
                                                <label htmlFor="driverEmail" className="google-style-input-label">Driver
                                                    Email</label>
                                            </div>
                                            <div className="google-input-wrapper">
                                                <input
                                                    type="text"
                                                    id="driverPhoneNumber"
                                                    autoComplete="off"
                                                    className="google-style-input"
                                                    required
                                                    onChange={handleChange('driverPhoneNumber')}
                                                    value={formData.driverPhoneNumber}
                                                />
                                                <label htmlFor="driverPhoneNumber" className="google-style-input-label">Driver
                                                    Phone Number</label>
                                            </div>
                                            <button onClick={handleSubmit}>Confirm</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="carrier-dashboard-content-body">
                    <div className="driver-container-card-wrapper">
                        <div className="driver-container-card">
                            <DriverAvatarExample className="driver-photo-example"/>
                            <div className="driver-info-container">
                                <section>
                                    <label>Name & Last Name</label>
                                    <h3>Jack Daniels</h3>
                                </section>
                                <section>
                                    <label>Truck</label>
                                    <h3>MACK R</h3>
                                </section>
                                <section>
                                    <label>Email</label>
                                    <h3>jackdaniels@gmail.com</h3>
                                </section>
                            </div>
                            <div className="driver-info-container">
                                <section>
                                    <label>Insurance Status</label>
                                    <h3>Insured</h3>
                                </section>
                                <section>
                                    <label>Insurance Expired Data</label>
                                    <h3>25.03.2025</h3>
                                </section>
                                <section>
                                    <label>Current Location</label>
                                    <h3>Washington</h3>
                                </section>
                            </div>
                            <div className="driver-info-container">
                                <button>
                                    Get Location
                                </button>
                            </div>
                        </div>
                        <div className="driver-container-card">
                            <DriverAvatarExample className="driver-photo-example"/>
                            <div className="driver-info-container">
                                <section>
                                    <label>Name & Last Name</label>
                                    <h3>Jack Daniels</h3>
                                </section>
                                <section>
                                    <label>Truck</label>
                                    <h3>MACK R</h3>
                                </section>
                                <section>
                                    <label>Email</label>
                                    <h3>jackdaniels@gmail.com</h3>
                                </section>
                            </div>
                            <div className="driver-info-container">
                                <section>
                                    <label>Insurance Status</label>
                                    <h3>Insured</h3>
                                </section>
                                <section>
                                    <label>Insurance Expired Data</label>
                                    <h3>25.03.2025</h3>
                                </section>
                                <section>
                                    <label>Current Location</label>
                                    <h3>Washington</h3>
                                </section>
                            </div>
                            <div className="driver-info-container">
                                <button>
                                    Get Location
                                </button>
                            </div>
                        </div>
                        <div className="driver-container-card">
                            <DriverAvatarExample className="driver-photo-example"/>
                            <div className="driver-info-container">
                                <section>
                                    <label>Name & Last Name</label>
                                    <h3>Jack Daniels</h3>
                                </section>
                                <section>
                                    <label>Truck</label>
                                    <h3>MACK R</h3>
                                </section>
                                <section>
                                    <label>Email</label>
                                    <h3>jackdaniels@gmail.com</h3>
                                </section>
                            </div>
                            <div className="driver-info-container">
                                <section>
                                    <label>Insurance Status</label>
                                    <h3>Insured</h3>
                                </section>
                                <section>
                                    <label>Insurance Expired Data</label>
                                    <h3>25.03.2025</h3>
                                </section>
                                <section>
                                    <label>Current Location</label>
                                    <h3>Washington</h3>
                                </section>
                            </div>
                            <div className="driver-info-container">
                                <button>
                                    Get Location
                                </button>
                            </div>
                        </div>
                        <div className="driver-container-card">
                            <DriverAvatarExample className="driver-photo-example"/>
                            <div className="driver-info-container">
                                <section>
                                    <label>Name & Last Name</label>
                                    <h3>Jack Daniels</h3>
                                </section>
                                <section>
                                    <label>Truck</label>
                                    <h3>MACK R</h3>
                                </section>
                                <section>
                                    <label>Email</label>
                                    <h3>jackdaniels@gmail.com</h3>
                                </section>
                            </div>
                            <div className="driver-info-container">
                                <section>
                                    <label>Insurance Status</label>
                                    <h3>Insured</h3>
                                </section>
                                <section>
                                    <label>Insurance Expired Data</label>
                                    <h3>25.03.2025</h3>
                                </section>
                                <section>
                                    <label>Current Location</label>
                                    <h3>Washington</h3>
                                </section>
                            </div>
                            <div className="driver-info-container">
                                <button>
                                    Get Location
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarrierDrivers;
