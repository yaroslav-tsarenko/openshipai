import React, {useEffect, useState} from "react";
import axios from 'axios';
import '../CarrierDashboard.css';
import {ReactComponent as DefaultUserAvatar} from "../../../assets/default-avatar.svg";
import {ReactComponent as SortIcon} from "../../../assets/sort-icon-blue.svg";
import {ReactComponent as SortIconWhite} from "../../../assets/sort-icon-white.svg";
import {ReactComponent as FilterIcon} from "../../../assets/filter-icon-blue.svg";
import {ReactComponent as FilterIconWhite} from "../../../assets/filter-icon-white.svg";
import {ReactComponent as CreateLoadIcon} from "../../../assets/add-driver-icon.svg";
import {useParams} from 'react-router-dom';
import Alert from "../../floating-window-success/Alert";
import FloatingWindowFailed from "../../floating-window-failed/FloatingWindowFailed";
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import {BACKEND_URL} from "../../../constants/constants";
import {Skeleton} from "@mui/material";
import DriverContainer from "../../driver-container/DriverContainer";
import {ClipLoader} from "react-spinners";
import Button from "../../button/Button";
import RotatingLinesLoader from "../../rotating-lines/RotatingLinesLoader";

const CarrierDrivers = () => {
    const [selectedImage, setSelectedImage] = useState(null);
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
    const [drivers, setDrivers] = useState([]);
    const [showSortPopup, setShowSortPopup] = useState(false);
    const [showFilterPopup, setShowFilterPopup] = useState(false);
    const [sortOrder, setSortOrder] = useState('');
    const [sortedAndFilteredLoads, setSortedAndFilteredLoads] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
    };

    const handleFilterSelection = (filterType) => {
    };

    const handleSortAscending = () => {
        setSortOrder('ascending');
    };

    const toggleSortPopup = () => setShowSortPopup(!showSortPopup);
    const toggleFilterPopup = () => setShowFilterPopup(!showFilterPopup);

    useEffect(() => {
        const fetchDrivers = async () => {
            const response = await fetch(`${BACKEND_URL}/get-drivers/${carrierID}`);
            const data = await response.json();
            setDrivers(data);
        };

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
        fetchDrivers();

    }, [carrierID]);

    const [formData, setFormData] = useState({
        driverFirstAndLastName: '',
        driverEmail: '',
        driverPhoneNumber: '',
        driverDateOfBirth: '',
        driverAddress: '',
        driverLicenseClass: '',
        role: 'driver',
        driverAvatar: selectedImage,
        driverPassword: (Math.random().toString(36) + Math.random().toString(36)).slice(2, 66),
        driverID: Math.random().toString(36).substring(2, 36) + Math.random().toString(36).substring(2, 36)
            + Math.random().toString(36).substring(2, 36),
        driverCreatedByCarrierID: carrierID,
    });

    const handleSubmit = async (e) => {
        setIsLoading(true);
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
            setIsLoading(false);
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
                window.location.reload()
            }, 1500)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (input) => (e) => {
        setFormData({...formData, [input]: e.target.value});
    };

    return (

        <>
            {showSortPopup && (
                <div className="overlay-popup-select" onClick={toggleSortPopup}>
                    <div className="select-popup" onClick={e => e.stopPropagation()}>
                        <div className="select-popup-header">
                            <h2>Sort Options</h2>
                            <button onClick={toggleSortPopup} className="close-popup-button">Close</button>
                        </div>
                        <div className="select-popup-content">
                            <p onClick={handleSortAscending}>Newest</p>
                            <p>Oldest</p>
                            <p>All</p>
                        </div>
                    </div>
                </div>
            )}
            {showFilterPopup && (
                <div className="overlay-popup-select" onClick={toggleFilterPopup}>
                    <div className="select-popup" onClick={e => e.stopPropagation()}>
                        <div className="select-popup-header">
                            <h2>Filter Options</h2>
                            <button onClick={toggleFilterPopup} className="close-popup-button">Close</button>
                        </div>
                        <div className="select-popup-content">
                            <p onClick={() => handleFilterSelection('')}>Show All</p>
                            <p onClick={() => handleFilterSelection('Available')}>Insurance Expired</p>
                            <p onClick={() => handleFilterSelection('On Trip')}>Insurance Active</p>
                        </div>
                    </div>
                </div>
            )}
            {isDriverPopupOpen && (
                <div className="create-driver-overlay">
                    {isSuccess && <Alert status="success" text="Success!" description="Driver added succesfully"/>}
                    {isFail && <FloatingWindowFailed text="Driver with this credentials already exist"/>}
                    {sendEmailDriver && <Alert text="Driver's data sended to driver"/>}
                    {sendDriverDataFailed && <FloatingWindowFailed text="Failed to send data to driver"/>}
                    {isEmailSentSuccesfully && <Alert text="Email sent successfully"/>}
                    {isSuccessCredentials ? (
                        <div className="create-driver-popup">
                            <section>
                                <div>
                                    <h3>Congratulations!</h3>
                                    <p>Driver added successfully</p>
                                </div>
                                <button onClick={() => {
                                    setIsDriverPopupOpen(false);
                                    setIsSuccessCredentials(false);
                                }} className="close-popup-button">Close
                                </button>
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
                                <Button variant="apply" onClick={handleSendData}>
                                    Send Data to Driver
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="create-driver-popup">
                            <section>
                                <h3>Add Driver</h3>
                                <button className="close-popup-button"
                                        onClick={() => setIsDriverPopupOpen(false)}>Close
                                </button>
                            </section>
                            <div className="create-driver-wrapper">
                                <div className="add-driver-description">
                                    <h2>Info</h2>
                                    <p>Try to fill all fields by true information, this data will be
                                        operable by AI, and it can better works with real data</p>
                                </div>
                                <div className="create-driver-content">
                                    <>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            style={{display: 'none'}}
                                            id="file-input"
                                        />
                                        <div
                                            className="add-driver-avatar"
                                            onClick={() => document.getElementById('file-input').click()}
                                        >
                                            {selectedImage ? (
                                                <img src={selectedImage} alt="Driver" style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover'
                                                }}/>
                                            ) : (
                                                <>
                                                    <h3>Add Driver Photo</h3>
                                                </>
                                            )}
                                        </div>
                                    </>
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
                                            <label htmlFor="driverFirstAndLastName"
                                                   className="google-style-input-label">First Name & Last
                                                Name</label>
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
                                            <label htmlFor="driverEmail"
                                                   className="google-style-input-label">Driver
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
                                            <label htmlFor="driverPhoneNumber"
                                                   className="google-style-input-label">Driver
                                                Phone Number</label>
                                        </div>
                                        <Button variant="apply" onClick={handleSubmit}>
                                            {isLoading ?
                                                <>
                                                    <RotatingLinesLoader title="Processing"/>
                                                </>
                                                :
                                                "Confirm"}
                                        </Button>
                                    </div>
                                </div>
                                <div className="add-driver-description">
                                    <h2>Note</h2>
                                    <p>When you connect driver to your account,
                                        in the next modal window you will see the driver
                                        credentials, this credentials you can save or send to the driver's
                                        email</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
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
                    />
                    <div className="shipper-dashboard-load-buttons">
                        <div className="nav-items-wrapper">
                            <section className="shipper-filter-buttons">
                                <Button variant="filter" className="filter-buttons-shipper" onClick={toggleSortPopup}>
                                    <SortIcon className="button-nav-load-icon"/> Sort
                                </Button>
                                <Button variant="filter" className="filter-buttons-shipper" onClick={toggleFilterPopup}>
                                    <FilterIcon className="button-nav-load-icon"/> Filter
                                </Button>
                            </section>
                            <section className="add-driver-section">
                                <Button variant="apply" className="create-load-button"
                                        onClick={() => setIsDriverPopupOpen(true)}>
                                    <CreateLoadIcon className="button-nav-load-icon"/>
                                    Add Driver
                                </Button>
                            </section>
                        </div>
                    </div>
                    <div className="carrier-dashboard-content-body">
                        {drivers.length > 0 ? (
                            drivers.map(driver => (
                                <DriverContainer
                                    key={driver.driverID}
                                    driverNameAndLastName={driver.driverFirstAndLastName}
                                    driverTruck={driver.driverTruck}
                                    driverEmail={driver.driverEmail}
                                    driverCurrentLocation={driver.driverCurrentLocation}
                                    driverExpiredInsurance={driver.driverExpiredInsurance}
                                    driverInsuranceStatus={driver.driverInsuranceStatus}
                                    driverLat={driver.driverLat}
                                    driverLng={driver.driverLng}
                                />
                            ))
                        ) : (
                            <p className="carrier-dashboard-drivers-message">Currently you didn't add any
                                driver..</p>
                        )}
                    </div>
                </div>
            </div>
        </>

    );
};

export default CarrierDrivers;
