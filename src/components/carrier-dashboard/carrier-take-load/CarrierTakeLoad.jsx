import React, { useEffect, useState, useRef } from "react";
import '../CarrierDashboard.css';
import { ReactComponent as MarkerIcon } from "../../../assets/location-marker-icon.svg";
import { ReactComponent as MarkerIconWhite } from "../../../assets/location-marker-icon-white.svg";
import { ReactComponent as AlongRouteIcon } from "../../../assets/route-marker-icon.svg";
import { ReactComponent as AlongRouteIconWhite } from "../../../assets/route-marker-icon-white.svg";
import { ReactComponent as PickupLocationArrow } from "../../../assets/arrow-icon-pickup.svg";
import { ReactComponent as DeliveryLocationArrow } from "../../../assets/arrow-icon-delivery.svg";
import { useParams } from 'react-router-dom';
import Slider from '@mui/material/Slider';
import axios from 'axios';
import { ReactComponent as SortIcon } from "../../../assets/sort-icon-blue.svg";
import { ReactComponent as DateIcon } from "../../../assets/date-icon.svg";
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import LoadContainerBid from "../../load-container-bid/LoadContainerBid";
import { ReactComponent as DefaultUserAvatar } from "../../../assets/default-avatar.svg";
import { BACKEND_URL } from "../../../constants/constants";
import { Skeleton } from "@mui/material";

const CarrierTakeLoad = () => {
    const [sortOrder, setSortOrder] = useState(null);
    const [loads, setLoads] = useState([]);
    const { carrierID } = useParams();
    const [focusedButton, setFocusedButton] = useState(null);
    const [sliderValuePickup, setSliderValuePickup] = useState(null);
    const [sliderValueDelivery, setSliderValueDelivery] = useState(null);
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [carrierInfo, setCarrierInfo] = useState(null);
    const [showPickUpDatePopup, setShowPickUpDatePopup] = useState(false);
    const [showSortPopup, setShowSortPopup] = useState(false);
    const [showLoadTypePopup, setShowLoadTypePopup] = useState(false);
    const [showWeightPopup, setShowWeightPopup] = useState(false);
    const [showPricingTypePopup, setShowPricingTypePopup] = useState(false);
    const [showLocationTypePopup, setShowLocationTypePopup] = useState(false);
    const [selectedDateOption, setSelectedDateOption] = useState('');
    const [selectedLoadTypeOption, setSelectedLoadTypeOption] = useState('');
    const [selectedWeightOption, setSelectedWeightOption] = useState('');
    const [selectedPricingTypeOption, setSelectedPricingTypeOption] = useState('');
    const [selectedLocationTypeOption, setSelectedLocationTypeOption] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [apiLoads, setApiLoads] = useState([]);

    const toggleSortPopup = () => setShowPickUpDatePopup(!showPickUpDatePopup);
    const toggleFilterPopup = () => setShowSortPopup(!showSortPopup);
    const toggleLoadTypePopup = () => setShowLoadTypePopup(!showLoadTypePopup);
    const toggleWeightPopup = () => setShowWeightPopup(!showWeightPopup);
    const togglePricingTypePopup = () => setShowPricingTypePopup(!showPricingTypePopup);
    const toggleLocationTypePopup = () => setShowLocationTypePopup(!showLocationTypePopup);

    const handleDateSelection = (option) => {
        setSelectedDateOption(option);
    };

    const handleSelectLoadTypeOption = (option) => {
        setSelectedLoadTypeOption(option);
    };

    const handleSelectWeightOption = (option) => {
        setSelectedWeightOption(option);
    };

    const handleSelectPricingTypeOption = (option) => {
        setSelectedPricingTypeOption(option);
    };

    const handleSelectLocationTypeOption = (option) => {
        setSelectedLocationTypeOption(option);
    };

    const handleSortSelection = (order) => {
        setSortOrder(order);
    };

    useEffect(() => {
        fetch('https://api.freeloadboard.com/loads')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setLoads(data); // Assuming the API returns an array of loads

            })
            .catch(error => {

            });
    }, []);

    const isLoadDateMatching = (loadPickUpDate) => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const loadDate = new Date(loadPickUpDate);
        if (selectedDateOption === 'Today') {
            return loadDate.toDateString() === today.toDateString();
        } else if (selectedDateOption === 'Tomorrow') {
            return loadDate.toDateString() === tomorrow.toDateString();
        } else if (selectedDateOption === 'Pickup Date') {
            return true;
        }
        return true;
    };

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

    const handleSliderChangePickup = (event, newValue) => {
        setSliderValuePickup(newValue);
    };


    const handleSliderChangeDelivery = (event, newValue) => {
        setSliderValueDelivery(newValue);
    };

    const handleGeoLocationClick = async (setLocation) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const location = response.data.display_name;
                    setLocation(location);
                } catch (error) {
                    console.error('Error fetching location:', error);
                }
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        const fetchLoads = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-all-loads`);
                setLoads(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching loads:', error);
            }
        };

        fetchLoads();
    }, []);

    const filteredLoads = loads.filter(load => isLoadDateMatching(load.loadPickUpDate));

    const sortedAndFilteredLoads = filteredLoads.sort((a, b) => {
        if (sortOrder === 'Ascending order') {
            return a.loadPrice - b.loadPrice;
        } else if (sortOrder === 'Descending order') {
            return b.loadPrice - a.loadPrice;
        }
        return 0;
    });

    return (
        <div className="carrier-dashboard-wrapper">
            <DashboardSidebar
                DashboardAI={{ visible: true, route: `/carrier-dashboard/${carrierID}` }}
                TakeLoad={{ visible: true, route: `/carrier-take-loads/${carrierID}` }}
                MyLoads={{ visible: true, route: `/carrier-loads/${carrierID}` }}
                DriversAndEquip={{ visible: true, route: `/carrier-drivers/${carrierID}` }}
                Payments={{ visible: true, route: `/carrier-payments/${carrierID}` }}
                ChatWithShipper={{ visible: true, route: `/carrier-chat-conversation/${carrierID}` }}
                Profile={{ visible: true, route: `/carrier-profile/${carrierID}` }}
                Settings={{ visible: true, route: `/carrier-settings/${carrierID}` }}
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
                <div className="carrier-dashboard-content-body">
                    <div className="filter-loads-container">
                        <h2>Filter Shipments</h2>
                        <section className="choose-location-wrapper">
                            <button
                                className="by-location"
                                onFocus={() => setFocusedButton('location')}
                                onBlur={() => setFocusedButton(null)}
                            >
                                {focusedButton === 'location' ? <MarkerIconWhite className="choose-location-icon" /> :
                                    <MarkerIcon className="choose-location-icon" />}
                                Location
                            </button>
                            <button
                                className="by-route"
                                onFocus={() => setFocusedButton('route')}
                                onBlur={() => setFocusedButton(null)}
                            >
                                {focusedButton === 'route' ? <AlongRouteIconWhite className="choose-location-icon" /> :
                                    <AlongRouteIcon className="choose-location-icon" />}
                                Along Route
                            </button>
                        </section>
                        <section className="pickup-delivery-location-wrapper">
                            <h3>Pickup Location</h3>
                            <div className="pickup-delivery-location-input">
                                <PickupLocationArrow />
                                <input
                                    type="text"
                                    placeholder="e.g Austin, TX or 78701"
                                    value={pickupLocation}
                                    onChange={(e) => setPickupLocation(e.target.value)}
                                />
                                <button onClick={() => handleGeoLocationClick(setPickupLocation)}><MarkerIcon /></button>
                            </div>
                        </section>
                        <section className="slider-wrapper-miles">
                            <input
                                type="number"
                                placeholder="Miles"
                                value={sliderValuePickup}
                                onChange={handleSliderChangePickup}
                            />
                            <Slider
                                size="big"
                                value={sliderValuePickup}
                                onChange={handleSliderChangePickup}
                                aria-label="Large"
                                valueLabelDisplay="auto"
                                max={10000}
                            />
                        </section>
                        <section className="pickup-delivery-location-wrapper">
                            <h3>Delivery Location</h3>
                            <div className="pickup-delivery-location-input">
                                <DeliveryLocationArrow />
                                <input
                                    type="text"
                                    placeholder="e.g Austin, TX or 78701"
                                    value={deliveryLocation}
                                    onChange={(e) => setDeliveryLocation(e.target.value)}
                                />
                                <button onClick={() => handleGeoLocationClick(setDeliveryLocation)}><MarkerIcon /></button>
                            </div>
                        </section>
                        <section className="slider-wrapper-miles">
                            <input
                                type="number"
                                placeholder="Miles"
                                value={sliderValueDelivery}
                                onChange={handleSliderChangeDelivery}
                            />
                            <Slider
                                size="big"
                                value={sliderValueDelivery}
                                onChange={handleSliderChangeDelivery}
                                aria-label="Large"
                                valueLabelDisplay="auto"
                                max={10000}
                            />
                        </section>

                        <section className="additional-filters">
                            <hr />
                            <div className="load-filter" onClick={toggleLoadTypePopup}>
                                <label>Load Type</label>
                                <h4>{selectedLoadTypeOption || 'All'}</h4>
                            </div>
                            <hr />
                            <div className="load-filter" onClick={toggleWeightPopup}>
                                <label>Weight</label>
                                <h4>{selectedWeightOption || 'All'}</h4>
                            </div>
                            <hr />
                            <div className="load-filter" onClick={togglePricingTypePopup}>
                                <label>Pricing Type</label>
                                <h4>{selectedPricingTypeOption || 'All'}</h4>
                            </div>
                            <hr />
                            <div className="load-filter" onClick={toggleLocationTypePopup}>
                                <label>Location Type</label>
                                <h4>{selectedLocationTypeOption || 'All'}</h4>
                            </div>
                        </section>
                    </div>
                    <div className="loads-container-wrapper">
                        <div className="load-filter-container">

                            <button className="filter-buttons-shipper" style={{ marginRight: "10px" }}
                                    onClick={toggleSortPopup}>
                                <DateIcon className="button-nav-load-icon" />
                                {selectedDateOption || 'Pickup Date'}
                            </button>

                            <button className="filter-buttons-shipper" onClick={toggleFilterPopup}>
                                <SortIcon className="button-nav-load-icon" />
                                {sortOrder || 'Sort By'}
                            </button>
                            {showLoadTypePopup && (
                                <div className="overlay-popup-select">
                                    <div className="select-popup" onClick={e => e.stopPropagation()}>

                                        <div className="select-popup-header">
                                            <h2>Load Type</h2>
                                            <button className="close-popup-button" onClick={toggleLoadTypePopup}>Close
                                            </button>
                                        </div>

                                        <div className="select-popup-content">
                                            <p onClick={() => handleSelectLoadTypeOption('Vehicle Load')}>Vehicle Load</p>
                                            <p onClick={() => handleSelectLoadTypeOption('Moving')}>Moving</p>
                                            <p onClick={() => handleSelectLoadTypeOption('Freight')}>Freight</p>
                                            <p onClick={() => handleSelectLoadTypeOption('Heavy Construction')}>Heavy Construction</p>
                                            <p onClick={() => handleSelectLoadTypeOption('All')}>All</p>
                                        </div>

                                    </div>
                                </div>
                            )}
                            {showWeightPopup && (
                                <div className="overlay-popup-select">
                                    <div className="select-popup" onClick={e => e.stopPropagation()}>

                                        <div className="select-popup-header">
                                            <h2>Weight</h2>
                                            <button className="close-popup-button" onClick={toggleWeightPopup}>Close
                                            </button>
                                        </div>

                                        <div className="select-popup-content">
                                            <p onClick={() => handleSelectWeightOption('Light')}>Light</p>
                                            <p onClick={() => handleSelectWeightOption('Medium')}>Medium</p>
                                            <p onClick={() => handleSelectWeightOption('Heavy')}>Heavy</p>
                                            <p onClick={() => handleSelectWeightOption('All')}>All</p>
                                        </div>

                                    </div>
                                </div>
                            )}
                            {showPricingTypePopup && (
                                <div className="overlay-popup-select">
                                    <div className="select-popup" onClick={e => e.stopPropagation()}>

                                        <div className="select-popup-header">
                                            <h2>Pricing Type</h2>
                                            <button className="close-popup-button" onClick={togglePricingTypePopup}>Close
                                            </button>
                                        </div>

                                        <div className="select-popup-content">
                                            <p onClick={() => handleSelectPricingTypeOption('Fixed Price')}>Fixed Price</p>
                                            <p onClick={() => handleSelectPricingTypeOption('Negotiable')}>Negotiable</p>
                                            <p onClick={() => handleSelectPricingTypeOption('All')}>All</p>
                                        </div>

                                    </div>
                                </div>
                            )}
                            {showLocationTypePopup && (
                                <div className="overlay-popup-select">
                                    <div className="select-popup" onClick={e => e.stopPropagation()}>

                                        <div className="select-popup-header">
                                            <h2>Location Type</h2>
                                            <button className="close-popup-button" onClick={toggleLocationTypePopup}>Close
                                            </button>
                                        </div>

                                        <div className="select-popup-content">
                                            <p onClick={() => handleSelectLocationTypeOption('Urban')}>Urban</p>
                                            <p onClick={() => handleSelectLocationTypeOption('Suburban')}>Suburban</p>
                                            <p onClick={() => handleSelectLocationTypeOption('Rural')}>Rural</p>
                                            <p onClick={() => handleSelectLocationTypeOption('All')}>All</p>
                                        </div>

                                    </div>
                                </div>
                            )}
                            {showPickUpDatePopup && (
                                <div className="overlay-popup-select">
                                    <div className="select-popup" onClick={e => e.stopPropagation()}>

                                        <div className="select-popup-header">
                                            <h2>Pickup Date</h2>
                                            <button className="close-popup-button" onClick={toggleSortPopup}>Close
                                            </button>
                                        </div>

                                        <div className="select-popup-content">
                                            <p onClick={() => handleDateSelection('Today')}>Today</p>
                                            <p onClick={() => handleDateSelection('Tomorrow')}>Tomorrow</p>
                                            <p onClick={() => handleDateSelection('Pickup Date')}>Clear Filter</p>
                                        </div>

                                    </div>
                                </div>
                            )}

                            {showSortPopup && (
                                <div className="overlay-popup-select">
                                    <div className="select-popup" onClick={e => e.stopPropagation()}>
                                        <div className="select-popup-header">
                                            <h2>Sort Options</h2>
                                            <button className="close-popup-button" onClick={toggleFilterPopup}>Close</button>
                                        </div>
                                        <div className="select-popup-content">
                                            <p onClick={() => handleSortSelection('Ascending order')}>In ascending order</p>
                                            <p onClick={() => handleSortSelection('Descending order')}>In descending order</p>
                                            <p onClick={() => handleSortSelection('Sort By')}>Clear</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="loads-containers-block">
                            {sortedAndFilteredLoads.length > 0 ? (
                                sortedAndFilteredLoads.map(load => (
                                    <LoadContainerBid
                                        key={load._id}
                                        loadPrice={load.loadPrice}
                                        loadTitle={load.loadTitle}
                                        loadPickUpLocation={load.loadPickupLocation}
                                        loadPickUpDate={load.loadPickupDate}
                                        loadDeliveryLocation={load.loadDeliveryLocation}
                                        loadDeliveryDate={load.loadDeliveryDate}
                                        loadType={load.loadType}
                                        loadWeight={`${load.loadWeight} lb`}
                                        loadDistance={`${load.loadMilesTrip} mil`}
                                        loadQoutes={load.loadQoutes}
                                        loadID={load.loadCredentialID}
                                        loadVehicleMake={load.loadVehicleMake}
                                        loadStatus={load.loadStatus}
                                        loadVehicleModel={load.loadVehicleModel}
                                        loadVehicleYear={load.loadVehicleYear}
                                        loadWidth={load.loadWidth}
                                        loadHeight={load.loadHeight}
                                        loadLength={load.loadLength}
                                        loadTypeOfPackaging={load.loadTypeOfPackaging}
                                    />
                                ))
                            ) : (
                                <p className="condition-load-containers-bids-text">There isn't loads by this date</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarrierTakeLoad;
