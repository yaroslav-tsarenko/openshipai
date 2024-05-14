import React, {useState} from "react";
import '../ShipperDashboard.css';
import {ReactComponent as OpenshipLogo} from "../../../assets/openship-ai-logo-updated.svg";
import {ReactComponent as DashboardIcon} from "../../../assets/dashboard-icon-grey.svg";
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
import {ReactComponent as QoutesIcon} from "../../../assets/listing-icon-grey.svg";
import {ReactComponent as QoutesIconWhite} from "../../../assets/listing-icon-white.svg";
import {ReactComponent as CarrierChatIcon} from "../../../assets/chat-icon-grey.svg";
import {ReactComponent as CarrierChatIconWhite} from "../../../assets/chat-icon-white.svg";
import {ReactComponent as ArrowNav} from "../../../assets/arrow-nav.svg";
import {ReactComponent as ArrowBack} from "../../../assets/arrow-back.svg";
import {ReactComponent as LoadDirectionsIcon} from "../../../assets/create-load-direction.svg";
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
import {ReactComponent as CarrierLogo} from "../../../assets/trane-logo-carrier.svg";

import {useParams} from 'react-router-dom';
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import LoadContainer from "../../load-container/LoadContainer";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import HeavyEquipmentContainer from "../../load-containers/heavy-equipment/HeavyEquipmentContainer";
import VehicleLoadContainer from "../../load-containers/vehicle-load/VehicleLoadContainer";
import MovingLoadContainer from "../../load-containers/moving-load/MovingLoadContainer";
import MotoEquipmentLoadContainer from "../../load-containers/moto-equipment/MotoEquipmentLoadContainer";
import BoatLoadContainer from "../../load-containers/boat-load/BoatLoadContainer";
import CommercialTruckLoad from "../../load-containers/commercial-truck/CommercialTruckLoad";


const ShipperLoadsPage = () => {

    const [hoveredButton, setHoveredButton] = useState('');
    const [createLoadSection, setCreateLoadSection] = useState(false);
    const {shipperID} = useParams();
    const [selectedOption, setSelectedOption] = useState('');
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        pickupLocation: '',
        deliveryLocation: '',
        loadType: ''
    });
    const handleLoadChange = (input) => (e) => {
        setFormData({...formData, [input]: e.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setStep(step + 1);
    };

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="shipper-dashboard-wrapper">
            <DashboardSidebar
                DashboardAI={{visible: true, route: `/shipper-dashboard/${shipperID}`}}
                Settings={{visible: true, route: `/shipper-settings/${shipperID}`}}
                Profile={{visible: true, route: `/shipper-profile/${shipperID}`}}
                Payments={{visible: true, route: `/shipper-payments/${shipperID}`}}
                ChatWithCarrier={{visible: true, route: `/shipper-chat-conversation/${shipperID}`}}
                MyQoutes={{visible: true, route: `/shipper-qoutes/${shipperID}`}}
                MyLoads={{visible: true, route: `/shipper-loads/${shipperID}`}}
            />
            <div className="shipper-dashboard-content">
                <HeaderDashboard
                    contentTitle="Welcome Back, John"
                    contentSubtitle="Your current payments"
                    accountName="John Doe"
                    accountRole="Shipper"
                    profileLink={`/shipper-profile/${shipperID}`}
                    bellLink={`/shipper-settings/${shipperID}`}
                    settingsLink={`/shipper-profile/${shipperID}`}
                />
                {createLoadSection ? (
                    <div className="shipper-loads-dashboard-content-body">
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
                            <button className="create-load-button" onClick={() => setCreateLoadSection(false)}>
                                <CreateLoadIcon className="button-nav-load-icon"/>Create New Load
                            </button>
                        </div>
                        <div className="shipper-loads-wrapper">
                            <LoadContainer/>
                            <LoadContainer/>
                            <LoadContainer/>
                        </div>
                    </div>
                ) : (
                    <div className="shipper-loads-dashboard-content-body">
                        <div className="create-load-container-header">
                            <button onClick={() => setCreateLoadSection(true)}><ArrowNav/></button>
                            <h3>Create Load</h3>
                        </div>
                        <div className="create-load-container-content">
                            {step === 1 && (
                                <div className="create-load-first-step">
                                   <div className="create-load-credentials-container">
                                       <OpenshipLogo width="300" height="80"/>
                                       <h2>Create your load</h2>
                                       <p>Create your load in few steps</p>
                                   </div>
                                    <div className="load-creation-input-fields">
                                        <LoadDirectionsIcon className="create-load-direction-icon"/>
                                        <section>
                                            <div className="google-input-wrapper">
                                                <input
                                                    type="text"
                                                    id="pickupLocation"
                                                    autoComplete="off"
                                                    className="google-style-input"
                                                    onChange={handleLoadChange('pickupLocation')}
                                                    value={formData.pickupLocation}
                                                    required
                                                />
                                                <label htmlFor="pickupLocation"
                                                       className="google-style-input-label">Pickup Location</label>
                                            </div>

                                            <div className="google-input-wrapper">
                                                <input
                                                    type="text"
                                                    id="deliveryLocation"
                                                    autoComplete="off"
                                                    className="google-style-input"
                                                    onChange={handleLoadChange('deliveryLocation')}
                                                    value={formData.deliveryLocation}
                                                    required
                                                />
                                                <label htmlFor="deliveryLocation"
                                                       className="google-style-input-label">Delivery Location</label>
                                            </div>
                                            <button className="create-load-submit-button" onClick={handleSubmit}>Next
                                            </button>
                                        </section>
                                    </div>
                                </div>
                            )}
                            {step === 2 && (
                                <>
                                    <div className="create-load-first-step">
                                        <div className="create-load-credentials-container">
                                            <OpenshipLogo width="300" height="80"/>
                                            <h2>Specify Load Type</h2>
                                            <p>By choosing load type, you will redirecting to the current form</p>
                                        </div>
                                        <div className="load-creation-input-fields">
                                            <section>
                                                <Box sx={{minWidth: 180, marginTop: '70px'}}>
                                                    <FormControl fullWidth style={{fontSize: '15px',}}>
                                                        <InputLabel id="demo-simple-select-label"
                                                                    style={{fontSize: '15px', fontWeight: 'normal'}}>Load Type</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            label="Load Type"
                                                            name="loadType"
                                                            value={formData.loadType}
                                                            onChange={handleLoadChange("loadType")}
                                                            style={{
                                                                fontSize: '15px',
                                                                fontWeight: 'normal',
                                                                color: 'gray',
                                                                borderRadius: '10px'
                                                            }}
                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left"
                                                                },
                                                                transformOrigin: {
                                                                    vertical: "top",
                                                                    horizontal: "left"
                                                                },
                                                                getContentAnchorEl: null,
                                                                PaperProps: {
                                                                    style: {
                                                                        maxHeight: '200px',  // change this as per your requirement
                                                                    },
                                                                },
                                                            }}
                                                        >
                                                            <MenuItem value="vehicleLoad"
                                                                      style={{
                                                                          fontSize: '15px',
                                                                          color: 'grey',
                                                                          fontWeight: 'normal'
                                                                      }}>Vehicle Load</MenuItem>
                                                            <MenuItem value="motoEquipment"
                                                                      style={{
                                                                          fontSize: '15px',
                                                                          color: 'grey',
                                                                          fontWeight: 'normal'
                                                                      }}>Moto Equipment</MenuItem>
                                                            <MenuItem value="heavyEquipment"
                                                                      style={{
                                                                          fontSize: '15px',
                                                                          color: 'grey',
                                                                          fontWeight: 'normal'
                                                                      }}>Heavy Equipment</MenuItem>
                                                            <MenuItem value="boatLoad"
                                                                      style={{
                                                                          fontSize: '15px',
                                                                          color: 'grey',
                                                                          fontWeight: 'normal'
                                                                      }}>Boat Load</MenuItem>
                                                            <MenuItem value="commercialTruck"
                                                                      style={{
                                                                          fontSize: '15px',
                                                                          color: 'grey',
                                                                          fontWeight: 'normal'
                                                                      }}>Commercial Truck</MenuItem>
                                                            <MenuItem value="moving"
                                                                      style={{
                                                                          fontSize: '15px',
                                                                          color: 'grey',
                                                                          fontWeight: 'normal'
                                                                      }}>Moving</MenuItem>
                                                            <MenuItem value="ltl"
                                                                      style={{
                                                                          fontSize: '15px',
                                                                          color: 'grey',
                                                                          fontWeight: 'normal'
                                                                      }}>LTL</MenuItem>
                                                            <MenuItem value="ftl"
                                                                      style={{
                                                                          fontSize: '15px',
                                                                          color: 'grey',
                                                                          fontWeight: 'normal'
                                                                      }}>FTL</MenuItem>
                                                            <MenuItem value="expedite"
                                                                      style={{
                                                                          fontSize: '15px',
                                                                          color: 'grey',
                                                                          fontWeight: 'normal'
                                                                      }}>Expedite</MenuItem>
                                                            <MenuItem value="localMoving"
                                                                      style={{
                                                                          fontSize: '15px',
                                                                          color: 'grey',
                                                                          fontWeight: 'normal'
                                                                      }}>Local Moving</MenuItem>
                                                            <MenuItem value="londDistanceMoving"
                                                                      style={{
                                                                          fontSize: '15px',
                                                                          color: 'grey',
                                                                          fontWeight: 'normal'
                                                                      }}>Long Distance Moving</MenuItem>
                                                            <MenuItem value="studentMoving"
                                                                      style={{
                                                                          fontSize: '15px',
                                                                          color: 'grey',
                                                                          fontWeight: 'normal'
                                                                      }}>Student Move</MenuItem>
                                                            <MenuItem value="corporateMoving"
                                                                      style={{
                                                                          fontSize: '15px',
                                                                          color: 'grey',
                                                                          fontWeight: 'normal'
                                                                      }}>Corporate Moving</MenuItem>
                                                            <MenuItem value="militaryMoving"
                                                                      style={{
                                                                          fontSize: '15px',
                                                                          color: 'grey',
                                                                          fontWeight: 'normal'
                                                                      }}>Heavy Lifting and Moving only</MenuItem>
                                                            <MenuItem value="militaryMoving"
                                                                      style={{
                                                                          fontSize: '15px',
                                                                          color: 'grey',
                                                                          fontWeight: 'normal'
                                                                      }}>Auto Moto Boat Equipment</MenuItem>
                                                            <MenuItem value="militaryMoving"
                                                                      style={{
                                                                          fontSize: '15px',
                                                                          color: 'grey',
                                                                          fontWeight: 'normal'
                                                                      }}>Shipping</MenuItem>
                                                            <MenuItem value="militaryMoving"
                                                                      style={{
                                                                          fontSize: '15px',
                                                                          color: 'grey',
                                                                          fontWeight: 'normal'
                                                                      }}>Military Moving</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                                <div className="creation-load-buttons-nav">
                                                    {step > 1 && <button className="go-previous-step-button" onClick={() => setStep(step - 1)}><ArrowBack className="arrow-back"/>Go Back</button>}
                                                    <button className="create-load-submit-button" onClick={handleSubmit}>Next</button>
                                                </div>
                                            </section>

                                        </div>
                                    </div>
                                </>
                            )}
                            {step === 3 && (
                                <div className="create-load-wrapper">
                                    {formData.loadType === 'vehicleLoad' &&
                                        <VehicleLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadType={formData.loadType}/>}
                                    {formData.loadType === 'heavyEquipment' &&
                                        <HeavyEquipmentContainer
                                            pickupLocation={formData.pickupLocation}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadType={formData.loadType}/>}
                                    {formData.loadType === 'moving' &&
                                        <MovingLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadType={formData.loadType}/>}
                                    {formData.loadType === 'motoEquipment' &&
                                        <MotoEquipmentLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadType={formData.loadType}/>}
                                    {formData.loadType === 'boatLoad' &&
                                        <BoatLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadType={formData.loadType}/>}
                                    {formData.loadType === 'commercialTruck' &&
                                        <CommercialTruckLoad
                                            pickupLocation={formData.pickupLocation}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadType={formData.loadType}/>}
                                    {step > 1 && <button className="go-previous-step-button" onClick={() => setStep(step - 1)}><ArrowBack className="arrow-back"/>Go Back</button>}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default ShipperLoadsPage;


