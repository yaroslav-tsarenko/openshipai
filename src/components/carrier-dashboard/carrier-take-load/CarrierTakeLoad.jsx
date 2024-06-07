import React, {useEffect, useState, useRef} from "react";
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
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Switch from "../../carrier-switcher-component/Switch";
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import LoadContainerBid from "../../load-container-bid/LoadContainerBid";

const CarrierTakeLoad = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [loads, setLoads] = useState([]);
    const {carrierID} = useParams();
    const [focusedButton, setFocusedButton] = useState(null);
    const [sliderValue, setSliderValue] = useState(null);
    const [isOnAI, setIsOnAI] = useState(false);
    const [pickupDate, setPickupDate] = React.useState(null);
    const [order, setOrder] = React.useState(null);

    const handleChange = (event) => {
        setPickupDate(event.target.value);
    };

    const handleChangeOrder = (event) => {
        setOrder(event.target.value);
    };
    const handleToggleAI = () => {
        setIsOnAI(!isOnAI);
    };
    const handleInputChange = (event) => {
        setSliderValue(event.target.value);
    };

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const fetchLoads = async () => {
            try {
                const response = await axios.get('http://localhost:8080/get-all-loads');
                setLoads(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching loads:', error);
            }
        };

        fetchLoads();
    }, []);

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
                    contentTitle="Take load"
                    contentSubtitle="By clicking on the qoute you can see the carriers listing"
                    accountName="TRANE"
                    accountRole="Carrier"
                    profileLink={`/carrier-profile/${carrierID}`}
                    bellLink={`/carrier-settings/${carrierID}`}
                    settingsLink={`/carrier-profile/${carrierID}`}
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
                                {focusedButton === 'location' ? <MarkerIconWhite className="choose-location-icon"/> :
                                    <MarkerIcon className="choose-location-icon"/>}
                                Location
                            </button>
                            <button
                                className="by-route"
                                onFocus={() => setFocusedButton('route')}
                                onBlur={() => setFocusedButton(null)}
                            >
                                {focusedButton === 'route' ? <AlongRouteIconWhite className="choose-location-icon"/> :
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
                                    placeholder="e.g Austin, TX or 78701"/>
                                <button><MarkerIcon/></button>
                            </div>
                        </section>
                        <section className="slider-wrapper-miles">
                            <input
                                type="number"
                                placeholder="Miles"
                                value={sliderValue}
                                onChange={handleInputChange}
                            />
                            <Slider
                                size="big"
                                value={sliderValue}
                                onChange={handleSliderChange}
                                aria-label="Large"
                                valueLabelDisplay="auto"
                                max={10000}
                            />
                        </section>
                        <section className="pickup-delivery-location-wrapper">
                            <h3>Delivery Location</h3>
                            <div className="pickup-delivery-location-input">
                                <DeliveryLocationArrow/>
                                <input
                                    type="text"
                                    placeholder="e.g Austin, TX or 78701"/>
                                <button><MarkerIcon/></button>
                            </div>
                        </section>
                        <Switch isOn={isOnAI} handleToggle={handleToggleAI}
                                label="Enable Exlusive Shipments"/>
                        <section className="additional-filters">
                            <hr/>
                            <div className="load-filter">
                                <label>Categories</label>
                                <h4>All</h4>
                            </div>
                            <hr/>
                            <div className="load-filter">
                                <label>Weight</label>
                                <h4>All</h4>
                            </div>
                            <hr/>
                            <div className="load-filter">
                                <label>Pricing Type</label>
                                <h4>All</h4>
                            </div>
                            <hr/>
                            <div className="load-filter">
                                <label>Location Type</label>
                                <h4>All</h4>
                            </div>
                        </section>
                    </div>
                    <div className="loads-container-wrapper">
                        <div className="load-filter-container">
                            <Box sx={{minWidth: 180, marginRight: '30px'}}>
                                <FormControl fullWidth style={{fontSize: '15px',}}>
                                    <InputLabel id="demo-simple-select-label"
                                                style={{fontSize: '15px', fontWeight: 'normal'}}>Pickup
                                        Date</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={pickupDate}
                                        label="Pickup Date    "
                                        onChange={handleChange}
                                        style={{
                                            fontSize: '15px',
                                            fontWeight: 'normal',
                                            color: 'gray',
                                            borderRadius: '10px'
                                        }}
                                    >
                                        <MenuItem value={10} style={{
                                            fontSize: '15px',
                                            color: 'grey',
                                            fontWeight: 'normal'
                                        }}>Today</MenuItem>
                                        <MenuItem value={20} style={{
                                            fontSize: '15px',
                                            color: 'grey',
                                            fontWeight: 'normal'
                                        }}>Tomorrow</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{minWidth: 140}}>
                                <FormControl fullWidth style={{fontSize: '15px'}}>
                                    <InputLabel id="demo-simple-select-label"
                                                style={{fontSize: '15px', fontWeight: 'normal'}}>Sort By</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={order}
                                        label="Sort By"
                                        onChange={handleChangeOrder}
                                        style={{
                                            fontSize: '15px',
                                            fontWeight: 'normal',
                                            color: 'grey',
                                            borderRadius: '10px'
                                        }}
                                    >
                                        <MenuItem value={10}
                                                  style={{fontSize: '15px', color: 'grey', fontWeight: 'normal'}}>In
                                            Descending order</MenuItem>
                                        <MenuItem value={20}
                                                  style={{fontSize: '15px', color: 'grey', fontWeight: 'normal'}}>In
                                            Ascending order</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <div className="loads-containers-block">
                            {loads.map(load => (
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
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarrierTakeLoad;
