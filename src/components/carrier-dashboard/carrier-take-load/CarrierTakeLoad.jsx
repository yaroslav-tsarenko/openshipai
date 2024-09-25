import React, {useEffect, useState} from "react";
import '../CarrierDashboard.css';
import {ReactComponent as MarkerIcon} from "../../../assets/location-marker-icon.svg";
import {ReactComponent as MarkerIconWhite} from "../../../assets/location-marker-icon-white.svg";
import {ReactComponent as AlongRouteIcon} from "../../../assets/route-marker-icon.svg";
import {ReactComponent as AlongRouteIconWhite} from "../../../assets/route-marker-icon-white.svg";
import {ReactComponent as PickupLocationArrow} from "../../../assets/arrow-icon-pickup.svg";
import {ReactComponent as DeliveryLocationArrow} from "../../../assets/arrow-icon-delivery.svg";
import {useParams} from 'react-router-dom';
import Slider from '@mui/material/Slider';
import axios from 'axios';
import {ReactComponent as SortIcon} from "../../../assets/sort-icon-blue.svg";
import {ReactComponent as FilterIcon} from "../../../assets/filter-icon.svg";
import {ReactComponent as DateIcon} from "../../../assets/date-icon.svg";
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import LoadContainerBid from "../../load-container-bid/LoadContainerBid";
import {ReactComponent as DefaultUserAvatar} from "../../../assets/default-avatar.svg";
import {BACKEND_URL} from "../../../constants/constants";
import {Skeleton} from "@mui/material";
import Button from "../../button/Button";


const CarrierTakeLoad = () => {
    const [sortOrder, setSortOrder] = useState(null);
    const [loads, setLoads] = useState([]);
    const {carrierID} = useParams();
    const [focusedButton, setFocusedButton] = useState(null);
    const [sliderValuePickup, setSliderValuePickup] = useState(0);
    const [sliderValueDelivery, setSliderValueDelivery] = useState(0);
    const [minWeight, setMinWeight] = useState(0); // Minimum weight state
    const [maxWeight, setMaxWeight] = useState(20000); // Maximum weight state
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [carrierInfo, setCarrierInfo] = useState(null);
    const [showPickUpDatePopup, setShowPickUpDatePopup] = useState(false);
    const [showSortPopup, setShowSortPopup] = useState(false);
    const [showLoadTypePopup, setShowLoadTypePopup] = useState(false);
    const [showWeightPopup, setShowWeightPopup] = useState(false);
    const [showPricingTypePopup, setShowPricingTypePopup] = useState(false);
    const [showLocationTypePopup, setShowLocationTypePopup] = useState(false);
    const [showAutomotiveSubOptions, setShowAutomotiveSubOptions] = useState(false);
    const [showMovingSubOptions, setShowMovingSubOptions] = useState(false);
    const [selectedDateOption, setSelectedDateOption] = useState('');
    const [selectedLoadTypeOption, setSelectedLoadTypeOption] = useState('');
    const [selectedWeightOption, setSelectedWeightOption] = useState('');
    const [selectedPricingTypeOption, setSelectedPricingTypeOption] = useState('');
    const [selectedLocationTypeOption, setSelectedLocationTypeOption] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };
    const [showFilter, setShowFilter] = useState(false);

    const handleFilterClick = () => {
        setShowFilter(!showFilter);
    };
    const toggleSortPopup = () => setShowPickUpDatePopup(!showPickUpDatePopup);
    const toggleFilterPopup = () => setShowSortPopup(!showSortPopup);
    const toggleLoadTypePopup = () => setShowLoadTypePopup(!showLoadTypePopup);
    const toggleWeightPopup = () => setShowWeightPopup(!showWeightPopup);
    const togglePricingTypePopup = () => setShowPricingTypePopup(!showPricingTypePopup);
    const toggleLocationTypePopup = () => setShowLocationTypePopup(!showLocationTypePopup);

    const handleDateSelection = (option) => {
        setSelectedDateOption(option);
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSelectLoadTypeOption = (option) => {
        setSelectedLoadTypeOption(option);
        if (option === 'Automotive') {
            setShowAutomotiveSubOptions(true);
        } else if (option === 'Moving') {
            setShowMovingSubOptions(true);
        } else {
            setShowAutomotiveSubOptions(false);
            setShowMovingSubOptions(false);
        }
    };

    const handleSelectSubLoadTypeOption = (subOption) => {
        setSelectedLoadTypeOption(subOption);
        setShowAutomotiveSubOptions(false);
        setShowMovingSubOptions(false);
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
                setLoads(data);
            })
            .catch(error => {
                console.error('Error fetching loads:', error);
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

    const isLoadTypeMatching = (loadType) => {
        if (selectedLoadTypeOption === 'All' || selectedLoadTypeOption === '') {
            return true;
        }
        return loadType === selectedLoadTypeOption;
    };

    const isLoadWeightMatching = (loadWeight) => {
        if (selectedWeightOption === 'All' || selectedWeightOption === '') {
            return true;
        }
        return loadWeight >= minWeight && loadWeight <= maxWeight;
    };

    const isPricingTypeMatching = (pricingType) => {
        if (selectedPricingTypeOption === 'All' || selectedPricingTypeOption === '') {
            return true;
        }
        return pricingType === selectedPricingTypeOption;
    };

    const isLocationTypeMatching = (locationType) => {
        if (selectedLocationTypeOption === 'All' || selectedLocationTypeOption === '') {
            return true;
        }
        return locationType === selectedLocationTypeOption;
    };

    const isLoadMilesTripMatching = (loadMilesTrip) => {
        if (sliderValuePickup === 0 && sliderValueDelivery === 0) {
            return true;
        }
        if (sliderValuePickup !== 0 && loadMilesTrip <= sliderValuePickup) {
            return true;
        }
        if (sliderValueDelivery !== 0 && loadMilesTrip <= sliderValueDelivery) {
            return true;
        }
        return false;
    };

    const isPickupLocationMatching = (loadPickupLocation) => {
        if (!pickupLocation) return true;
        return loadPickupLocation.includes(pickupLocation);
    };

    const isDeliveryLocationMatching = (loadDeliveryLocation) => {
        if (!deliveryLocation) return true;
        return loadDeliveryLocation.includes(deliveryLocation);
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

    const handleMinWeightChange = (event) => {
        const value = Number(event.target.value);
        setMinWeight(value);
    };

    const handleMaxWeightChange = (event) => {
        const value = Number(event.target.value);
        setMaxWeight(value);
    };

    const handleGeoLocationClick = async (setLocation) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const {latitude, longitude} = position.coords;
                try {
                    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const address = response.data.address;
                    const country = address.country || '';
                    const city = address.city || address.town || address.village || '';
                    const formattedLocation = `${country}, ${city}`.trim();
                    setLocation(formattedLocation);
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

    const filteredLoads = loads.filter(load =>
        isLoadDateMatching(load.loadPickUpDate) &&
        isLoadTypeMatching(load.loadType) &&
        isLoadWeightMatching(load.loadWeight) &&
        isPricingTypeMatching(load.loadPricingType) &&
        isLocationTypeMatching(load.loadLocationType) &&
        isLoadMilesTripMatching(load.loadMilesTrip) &&
        isPickupLocationMatching(load.loadPickupLocation) &&
        isDeliveryLocationMatching(load.loadDeliveryLocation)
    );

    const sortedAndFilteredLoads = filteredLoads.sort((a, b) => {
        if (sortOrder === 'Ascending order') {
            return a.loadPrice - b.loadPrice;
        } else if (sortOrder === 'Descending order') {
            return b.loadPrice - a.loadPrice;
        }
        return 0;
    });

    return (
        <>
            {showLoadTypePopup && (
                <div className="overlay-popup-select">
                    <div className="select-popup" onClick={e => e.stopPropagation()}>

                        <div className="select-popup-header">
                            <h2>Load Type</h2>
                            <button className="close-popup-button" onClick={toggleLoadTypePopup}>Close
                            </button>
                        </div>

                        <div className="select-popup-content">
                            <p onClick={() => handleSelectLoadTypeOption('Freight')}>Freight</p>
                            <p onClick={() => handleSelectLoadTypeOption('Automotive')}>Automotive</p>
                            <p onClick={() => handleSelectLoadTypeOption('Moving')}>Moving</p>
                            <p onClick={() => handleSelectLoadTypeOption('Heavy Equipment')}>Heavy Equipment</p>
                            <p onClick={() => handleSelectLoadTypeOption('All')}>All</p>
                        </div>

                    </div>
                </div>
            )}
            {showAutomotiveSubOptions && (
                <div className="overlay-popup-select">
                    <div className="select-popup" onClick={e => e.stopPropagation()}>

                        <div className="select-popup-header">
                            <h2>Automotive Options</h2>
                            <button className="close-popup-button"
                                    onClick={() => setShowAutomotiveSubOptions(false)}>Close
                            </button>
                        </div>

                        <div className="select-popup-content">
                            <p onClick={() => handleSelectSubLoadTypeOption('Car or Light Truck')}>Car or Light
                                Truck</p>
                            <p onClick={() => handleSelectSubLoadTypeOption('Moto Equipment')}>Moto Equipment</p>
                            <p onClick={() => handleSelectSubLoadTypeOption('Powerboats')}>Powerboats</p>
                            <p onClick={() => handleSelectSubLoadTypeOption('Sailboats')}>Sailboats</p>
                            <p onClick={() => handleSelectSubLoadTypeOption('Personal watercrafts')}>Personal
                                watercrafts</p>
                            <p onClick={() => handleSelectSubLoadTypeOption('Personal watercrafts')}>ATVs & Power
                                Sports</p>
                            <p onClick={() => handleSelectSubLoadTypeOption('Commercial Truck')}>Commercial Truck</p>
                            <p onClick={() => handleSelectSubLoadTypeOption('Parts')}>Parts</p>
                            <p onClick={() => handleSelectSubLoadTypeOption('Trailers & Other Vehicles')}>Trailers &
                                Other Vehicles</p>
                            <p onClick={() => handleSelectSubLoadTypeOption('RV (Recreational Vehicles)')}>RV
                                (Recreational Vehicles)</p>
                        </div>

                    </div>
                </div>
            )}
            {showMovingSubOptions && (
                <div className="overlay-popup-select">
                    <div className="select-popup" onClick={e => e.stopPropagation()}>

                        <div className="select-popup-header">
                            <h2>Moving Options</h2>
                            <button className="close-popup-button" onClick={() => setShowMovingSubOptions(false)}>Close
                            </button>
                        </div>

                        <div className="select-popup-content">
                            <p onClick={() => handleSelectSubLoadTypeOption('Local Moving (less then 50 mil)')}>Local
                                Moving (less then 50 mil)</p>
                            <p onClick={() => handleSelectSubLoadTypeOption('Long Distance Moving')}>Long Distance
                                Moving</p>
                            <p onClick={() => handleSelectSubLoadTypeOption('Commercial / Business Moving')}>Commercial
                                / Business Moving</p>
                            <p onClick={() => handleSelectSubLoadTypeOption('Heavy Lifting and Moving Only')}>Heavy
                                Lifting and Moving Only</p>
                            <p onClick={() => handleSelectSubLoadTypeOption('Household item')}>Household item</p>
                            <p onClick={() => handleSelectSubLoadTypeOption('Office Moving')}>Office Moving</p>
                            <p onClick={() => handleSelectSubLoadTypeOption('Corporate Moving')}>Corporate Moving</p>
                            <p onClick={() => handleSelectSubLoadTypeOption('Student Moving')}>Student Moving</p>
                            <p onClick={() => handleSelectSubLoadTypeOption('Military Moving')}>Military Moving</p>
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
                            <button className="close-popup-button"
                                    onClick={togglePricingTypePopup}>Close
                            </button>
                        </div>

                        <div className="select-popup-content">
                            <p onClick={() => handleSelectPricingTypeOption('Fixed Price')}>Fixed
                                Price</p>
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
                            <button className="close-popup-button"
                                    onClick={toggleLocationTypePopup}>Close
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
                            <button className="close-popup-button" onClick={toggleFilterPopup}>Close
                            </button>
                        </div>
                        <div className="select-popup-content">
                            <p onClick={() => handleSortSelection('Ascending order')}>In ascending
                                order</p>
                            <p onClick={() => handleSortSelection('Descending order')}>In descending
                                order</p>
                            <p onClick={() => handleSortSelection('Sort By')}>Clear</p>
                        </div>
                    </div>
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
                    isMobileSidebarOpen={isMobileSidebarOpen} toggleMobileSidebar={toggleMobileSidebar}
                />
                <div className="shipper-dashboard-content">
                    <HeaderDashboard
                        contentTitle={carrierInfo ?
                            <>Welcome back, {carrierInfo.carrierContactCompanyName}!</> :
                            <Skeleton variant="text" width={250}/>}
                        contentSubtitle="Monitor payments, loads, revenues"
                        accountName={carrierInfo ? carrierInfo.carrierContactCompanyName :
                            <Skeleton variant="text" width={60}/>}
                        accountRole={carrierInfo ? carrierInfo.role : <Skeleton variant="text" width={40}/>}
                        profileLink={`/carrier-profile/${carrierID}`}
                        bellLink={`/carrier-settings/${carrierID}`}
                        settingsLink={`/carrier-profile/${carrierID}`}
                        avatar={previewSavedImage ? previewSavedImage : DefaultUserAvatar}
                        onBurgerClick={toggleMobileSidebar}
                    />
                    <div className="carrier-dashboard-content-body-2">
                        <div className="filter-loads-container">
                            <h2>Filter Shipments</h2>
                            <section className="choose-location-wrapper">
                                <button
                                    className="by-location"
                                    onFocus={() => setFocusedButton('location')}
                                    onBlur={() => setFocusedButton(null)}
                                >
                                    {focusedButton === 'location' ?
                                        <MarkerIconWhite className="choose-location-icon"/> :
                                        <MarkerIcon className="choose-location-icon"/>}
                                    Location
                                </button>
                                <button
                                    className="by-route"
                                    onFocus={() => setFocusedButton('route')}
                                    onBlur={() => setFocusedButton(null)}
                                >
                                    {focusedButton === 'route' ?
                                        <AlongRouteIconWhite className="choose-location-icon"/> :
                                        <AlongRouteIcon className="choose-location-icon"/>}
                                    Along Route
                                </button>
                            </section>
                            <section className="pickup-delivery-location-wrapper">
                                <h3>Pickup Location</h3>
                                <div className="pickup-delivery-location-input">
                                    <PickupLocationArrow/>
                                    <input
                                        type="text"
                                        placeholder="e.g Austin, TX or 78701"
                                        value={pickupLocation}
                                        onChange={(e) => setPickupLocation(e.target.value)}
                                    />
                                    <button onClick={() => handleGeoLocationClick(setPickupLocation)}><MarkerIcon/>
                                    </button>
                                </div>
                            </section>
                            <section className="slider-wrapper-miles">
                                <input
                                    type="number"
                                    placeholder="Miles"
                                    value={sliderValuePickup}
                                    onChange={(e) => setSliderValuePickup(e.target.value)}
                                />
                                <Slider
                                    size="big"
                                    value={sliderValuePickup}
                                    onChange={handleSliderChangePickup}
                                    aria-label="Large"
                                    valueLabelDisplay="auto"
                                    max={10000}
                                    sx={{
                                        color: 'white',
                                        '& .MuiSlider-thumb': {
                                            color: 'white',
                                        },
                                        '& .MuiSlider-track': {
                                            color: 'white',
                                        },
                                        '& .MuiSlider-rail': {
                                            color: 'white',
                                        },
                                        '& .MuiSlider-valueLabel': {
                                            color: 'white',
                                        },
                                    }}
                                />
                            </section>
                            <section className="pickup-delivery-location-wrapper">
                                <h3>Delivery Location</h3>
                                <div className="pickup-delivery-location-input">
                                    <DeliveryLocationArrow/>
                                    <input
                                        type="text"
                                        placeholder="e.g Austin, TX or 78701"
                                        value={deliveryLocation}
                                        onChange={(e) => setDeliveryLocation(e.target.value)}
                                    />
                                    <button onClick={() => handleGeoLocationClick(setDeliveryLocation)}>
                                        <MarkerIcon/>
                                    </button>
                                </div>
                            </section>
                            <section className="slider-wrapper-miles">
                                <input
                                    type="number"
                                    placeholder="Miles"
                                    value={sliderValueDelivery}
                                    onChange={(e) => setSliderValueDelivery(e.target.value)}
                                />
                                <Slider
                                    size="big"
                                    value={sliderValueDelivery}
                                    onChange={handleSliderChangeDelivery}
                                    aria-label="Large"
                                    color={"warning"}
                                    valueLabelDisplay="auto"
                                    max={10000}
                                    sx={{
                                        color: 'white',
                                        '& .MuiSlider-thumb': {
                                            color: 'white',
                                        },
                                        '& .MuiSlider-track': {
                                            color: 'white',
                                        },
                                        '& .MuiSlider-rail': {
                                            color: 'white',
                                        },
                                        '& .MuiSlider-valueLabel': {
                                            color: 'white',
                                        },
                                    }}
                                />
                            </section>

                            <section className="additional-filters">
                                <hr/>
                                <div className="load-filter" onClick={toggleLoadTypePopup}>
                                    <label>Load Type</label>
                                    <h4>{selectedLoadTypeOption || 'All'}</h4>
                                </div>
                                <hr/>
                                <div className="load-filter-weight">
                                    <label>Weight</label>
                                    <Slider
                                        value={[minWeight, maxWeight]}
                                        onChange={(event, newValue) => {
                                            setMinWeight(newValue[0]);
                                            setMaxWeight(newValue[1]);
                                        }}
                                        valueLabelDisplay="auto"
                                        max={20000}
                                        step={100}
                                        style={{marginTop: '10px'}}
                                        sx={{
                                            color: 'white',
                                            '& .MuiSlider-thumb': {
                                                color: 'white',
                                            },
                                            '& .MuiSlider-track': {
                                                color: 'white',
                                            },
                                            '& .MuiSlider-rail': {
                                                color: 'white',
                                            },
                                            '& .MuiSlider-valueLabel': {
                                                color: 'white',
                                            },
                                        }}
                                    />
                                    <section>
                                        <input
                                            type="number"
                                            value={minWeight}
                                            onChange={handleMinWeightChange}
                                            min={0}
                                            max={20000}
                                            step={100}
                                            placeholder={'Min'}
                                        />
                                        <input
                                            type="number"
                                            value={maxWeight}
                                            onChange={handleMaxWeightChange}
                                            min={0}
                                            max={20000}
                                            placeholder={'Max'}
                                            step={100}
                                        />
                                    </section>
                                </div>
                                <hr/>
                                <div className="load-filter" onClick={togglePricingTypePopup}>
                                    <label>Pricing Type</label>
                                    <h4>{selectedPricingTypeOption || 'All'}</h4>
                                </div>
                                <hr/>
                                <div className="load-filter" onClick={toggleLocationTypePopup}>
                                    <label>Location Type</label>
                                    <h4>{selectedLocationTypeOption || 'All'}</h4>
                                </div>
                            </section>
                        </div>
                        <div className="loads-container-wrapper">
                            <div className="load-filter-container">
                                <section>
                                    <Button variant="filter" className="filter-buttons-shipper"
                                            style={{marginRight: "10px"}}
                                            onClick={toggleSortPopup}>
                                        <DateIcon className="button-nav-load-icon"/>
                                        {selectedDateOption || 'Pickup Date'}
                                    </Button>
                                    <Button variant="filter" className="filter-buttons-shipper"
                                            onClick={toggleFilterPopup}>
                                        <SortIcon className="button-nav-load-icon"/>
                                        {sortOrder || 'Sort By'}
                                    </Button>
                                    {windowWidth < 1024 && (
                                        <Button variant="filter" onClick={handleFilterClick}>
                                            {showFilter ? 'Close' : (
                                                <>
                                                    <FilterIcon className="button-nav-load-icon" />
                                                    Filter
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </section>
                            </div>
                            {showFilter ? (
                                <div className="filter-loads-container-mobile">
                                    <h2>Filter Shipments</h2>
                                    <section className="choose-location-wrapper">
                                        <button
                                            className="by-location"
                                            onFocus={() => setFocusedButton('location')}
                                            onBlur={() => setFocusedButton(null)}
                                        >
                                            {focusedButton === 'location' ?
                                                <MarkerIconWhite className="choose-location-icon"/> :
                                                <MarkerIcon className="choose-location-icon"/>}
                                            Location
                                        </button>
                                        <button
                                            className="by-route"
                                            onFocus={() => setFocusedButton('route')}
                                            onBlur={() => setFocusedButton(null)}
                                        >
                                            {focusedButton === 'route' ?
                                                <AlongRouteIconWhite className="choose-location-icon"/> :
                                                <AlongRouteIcon className="choose-location-icon"/>}
                                            Along Route
                                        </button>
                                    </section>
                                    <section className="pickup-delivery-location-wrapper">
                                        <h3>Pickup Location</h3>
                                        <div className="pickup-delivery-location-input">
                                            <PickupLocationArrow/>
                                            <input
                                                type="text"
                                                placeholder="e.g Austin, TX or 78701"
                                                value={pickupLocation}
                                                onChange={(e) => setPickupLocation(e.target.value)}
                                            />
                                            <button onClick={() => handleGeoLocationClick(setPickupLocation)}>
                                                <MarkerIcon/>
                                            </button>
                                        </div>
                                    </section>
                                    <section className="slider-wrapper-miles">
                                        <input
                                            type="number"
                                            placeholder="Miles"
                                            value={sliderValuePickup}
                                            onChange={(e) => setSliderValuePickup(e.target.value)}
                                        />
                                        <Slider
                                            size="big"
                                            value={sliderValuePickup}
                                            onChange={handleSliderChangePickup}
                                            aria-label="Large"
                                            valueLabelDisplay="auto"
                                            max={10000}
                                            sx={{
                                                color: 'white',
                                                '& .MuiSlider-thumb': {
                                                    color: 'white',
                                                },
                                                '& .MuiSlider-track': {
                                                    color: 'white',
                                                },
                                                '& .MuiSlider-rail': {
                                                    color: 'white',
                                                },
                                                '& .MuiSlider-valueLabel': {
                                                    color: 'white',
                                                },
                                            }}
                                        />
                                    </section>
                                    <section className="pickup-delivery-location-wrapper">
                                        <h3>Delivery Location</h3>
                                        <div className="pickup-delivery-location-input">
                                            <DeliveryLocationArrow/>
                                            <input
                                                type="text"
                                                placeholder="e.g Austin, TX or 78701"
                                                value={deliveryLocation}
                                                onChange={(e) => setDeliveryLocation(e.target.value)}
                                            />
                                            <button onClick={() => handleGeoLocationClick(setDeliveryLocation)}>
                                                <MarkerIcon/>
                                            </button>
                                        </div>
                                    </section>
                                    <section className="slider-wrapper-miles">
                                        <input
                                            type="number"
                                            placeholder="Miles"
                                            value={sliderValueDelivery}
                                            onChange={(e) => setSliderValueDelivery(e.target.value)}
                                        />
                                        <Slider
                                            size="big"
                                            value={sliderValueDelivery}
                                            onChange={handleSliderChangeDelivery}
                                            aria-label="Large"
                                            color={"warning"}
                                            valueLabelDisplay="auto"
                                            max={10000}
                                            sx={{
                                                color: 'white',
                                                '& .MuiSlider-thumb': {
                                                    color: 'white',
                                                },
                                                '& .MuiSlider-track': {
                                                    color: 'white',
                                                },
                                                '& .MuiSlider-rail': {
                                                    color: 'white',
                                                },
                                                '& .MuiSlider-valueLabel': {
                                                    color: 'white',
                                                },
                                            }}
                                        />
                                    </section>

                                    <section className="additional-filters">
                                        <hr/>
                                        <div className="load-filter" onClick={toggleLoadTypePopup}>
                                            <label>Load Type</label>
                                            <h4>{selectedLoadTypeOption || 'All'}</h4>
                                        </div>
                                        <hr/>
                                        <div className="load-filter-weight">
                                            <label>Weight</label>
                                            <Slider
                                                value={[minWeight, maxWeight]}
                                                onChange={(event, newValue) => {
                                                    setMinWeight(newValue[0]);
                                                    setMaxWeight(newValue[1]);
                                                }}
                                                valueLabelDisplay="auto"
                                                max={20000}
                                                step={100}
                                                style={{marginTop: '10px'}}
                                                sx={{
                                                    color: 'white',
                                                    '& .MuiSlider-thumb': {
                                                        color: 'white',
                                                    },
                                                    '& .MuiSlider-track': {
                                                        color: 'white',
                                                    },
                                                    '& .MuiSlider-rail': {
                                                        color: 'white',
                                                    },
                                                    '& .MuiSlider-valueLabel': {
                                                        color: 'white',
                                                    },
                                                }}
                                            />
                                            <section>
                                                <input
                                                    type="number"
                                                    value={minWeight}
                                                    onChange={handleMinWeightChange}
                                                    min={0}
                                                    max={20000}
                                                    step={100}
                                                    placeholder={'Min'}
                                                />
                                                <input
                                                    type="number"
                                                    value={maxWeight}
                                                    onChange={handleMaxWeightChange}
                                                    min={0}
                                                    max={20000}
                                                    placeholder={'Max'}
                                                    step={100}
                                                />
                                            </section>
                                        </div>
                                        <hr/>
                                        <div className="load-filter" onClick={togglePricingTypePopup}>
                                            <label>Pricing Type</label>
                                            <h4>{selectedPricingTypeOption || 'All'}</h4>
                                        </div>
                                        <hr/>
                                        <div className="load-filter" onClick={toggleLocationTypePopup}>
                                            <label>Location Type</label>
                                            <h4>{selectedLocationTypeOption || 'All'}</h4>
                                        </div>
                                    </section>
                                </div>
                            ) : (
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
                                        <p className="condition-load-containers-bids-text">There isn't loads by this
                                            date</p>
                                    )}
                                </div>

                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default CarrierTakeLoad;
