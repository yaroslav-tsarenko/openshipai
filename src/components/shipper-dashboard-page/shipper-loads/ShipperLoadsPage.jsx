import React, {useEffect, useState} from 'react';
import '../ShipperDashboard.css';
import {ReactComponent as OpenshipLogo} from "../../../assets/openship-ai-logo-updated.svg";
import {ReactComponent as ArrowRight} from '../../../assets/arrow-right-load-frame.svg';
import {ReactComponent as ArrowNav} from "../../../assets/arrow-nav.svg";
import {ReactComponent as ArrowBack} from "../../../assets/arrow-back.svg";
import {ReactComponent as LoadDirectionsIcon} from "../../../assets/create-load-direction.svg";
import {ReactComponent as SortIcon} from "../../../assets/sort-icon-blue.svg";
import {ReactComponent as SortIconWhite} from "../../../assets/sort-icon-white.svg";
import {ReactComponent as FilterIcon} from "../../../assets/filter-icon-blue.svg";
import {ReactComponent as FilterIconWhite} from "../../../assets/filter-icon-white.svg";
import { CiCirclePlus } from "react-icons/ci";
import VehicleLoadType from "../../../assets/vehicle-category.svg";
import MovingLoadType from "../../../assets/moving-category.svg";
import {ReactComponent as DefaultUserAvatar} from "../../../assets/default-avatar.svg";
import FreightLoadType from "../../../assets/freight-category.svg";
import HeavyLoadType from "../../../assets/heavy-category.svg";
import {useParams} from 'react-router-dom';
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import LoadContainer from "../../load-container/LoadContainer";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import axios from 'axios';
import HeavyEquipmentContainer from "../../load-containers/heavy-equipment/HeavyEquipmentContainer";
import VehicleLoadContainer from "../../load-containers/vehicle-load/VehicleLoadContainer";
import MotoEquipmentLoadContainer from "../../load-containers/moto-equipment/MotoEquipmentLoadContainer";
import BoatLoadContainer from "../../load-containers/boat-load/BoatLoadContainer";
import CommercialTruckLoad from "../../load-containers/commercial-truck/CommercialTruckLoad";
import RVLoadContainer from "../../load-containers/rv-load-container/RVLoadContainer";
import SailboatLoadContainer from "../../load-containers/sailboat-load/SailboatLoadContainer";
import PersonalWatercraftsLoadContainer
    from "../../load-containers/personal-watercrafts/PersonalWatercraftsLoadContainer";
import ATVLoadContainer from "../../load-containers/atv-load-container/ATVLoadContainer";
import PartsLoadContainer from "../../load-containers/parts-load-container/PartsLoadContainer";
import TrailerAndOtherVehicles from "../../load-containers/trailer-other-vehicle/TrailerAndOtherVehicles";
import LocalMovingLoadContainer from "../../load-containers/local-moving/LocalMovingLoadContainer";
import LongDistanceMoving from "../../load-containers/long-distance-moving/LongDistanceMoving";
import CommercialBusinessMoving from "../../load-containers/commercial-load-moving/CommercialBusinessMoving";
import HeavyLiftingMovingOnly from "../../load-containers/heavy-liftin-moving-only/HeavyLiftingMovingOnly";
import HouseHoldItem from "../../load-containers/household-item/HouseHoldItem";
import OfficeMoving from "../../load-containers/office-moving/OfficeMoving";
import CorporateMoving from "../../load-containers/corporate-moving/CorporateMoving";
import StudentMoving from "../../load-containers/student-moving/StudentMoving";
import MilitaryMoving from "../../load-containers/military-moving/MilitaryMoving";
import ExpediteLoadContainer from "../../load-containers/expedite-load-container/ExpediteLoadContainer";
import FTLLoadContainer from "../../load-containers/ftl-load-container/FTLLoadContainer";
import LTLLoadContainer from "../../load-containers/ltl-load-container/LTLLoadContainer";
import FarmEquipmentLoadContainer from "../../load-containers/farm-equipment-load-container/FarmEquipmentLoadContainer";
import {Skeleton} from "@mui/material";
import {BACKEND_URL} from "../../../constants/constants";

const ShipperLoadsPage = () => {
    const [hoveredButton, setHoveredButton] = useState('');
    const [createLoadSection, setCreateLoadSection] = useState(false);
    const {shipperID} = useParams();
    const [loads, setLoads] = useState([]);
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [step, setStep] = useState(1);
    const [shipperInfo, setShipperInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        pickupLocation: '',
        pickupLocationDate: '',
        pickupLocationTime: '',
        deliveryLocation: '',
        deliveryLocationDate: '',
        deliveryLocationTime: '',
        loadType: '',
        loadSubType: ''
    });


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
    }, [shipperInfo, shipperID]);

    useEffect(() => {
        const fetchLoads = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-all-loads`);
                setLoads(response.data);
            } catch (error) {
                console.error('Error fetching loads:', error);
            }
        };

        fetchLoads();
    }, []);

    const handleLoadFrameClick = (loadType) => {
        setFormData(prevState => ({...prevState, loadType}));
        setStep(2);
    };

    const handleLoadChange = (input) => (e) => {
        setFormData({...formData, [input]: e.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setStep(step + 1);
    };

    return (
        <div className="shipper-dashboard-wrapper">
            <DashboardSidebar
                DashboardAI={{visible: true, route: `/shipper-dashboard/${shipperID}`}}
                Settings={{visible: true, route: `/shipper-settings/${shipperID}`}}
                Payments={{visible: true, route: `/shipper-payments/${shipperID}`}}
                ChatWithCarrier={{visible: true, route: `/shipper-chat-conversation/${shipperID}`}}
                MyLoads={{visible: true, route: `/shipper-loads/${shipperID}`}}
            />
            <div className="shipper-dashboard-content">
                <HeaderDashboard
                    contentTitle={shipperInfo ?
                        <>Welcome back, {shipperInfo.userShipperName}!</> :
                        <Skeleton variant="text" width={250} />}
                    contentSubtitle="Monitor payments, loads, revenues"
                    accountName={shipperInfo ? shipperInfo.userShipperName : <Skeleton variant="text" width={60} />}
                    accountRole={shipperInfo ? shipperInfo.userShipperRole : <Skeleton variant="text" width={40} />}
                    profileLink={`/shipper-profile/${shipperID}`}
                    bellLink={`/shipper-settings/${shipperID}`}
                    settingsLink={`/shipper-profile/${shipperID}`}
                    avatar={previewSavedImage ? previewSavedImage : DefaultUserAvatar}
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
                                <CiCirclePlus className="circle-plus-icon"/>
                                Create New Load
                            </button>
                        </div>
                        <div className="load-containers-wrapper">
                            {/*<button className="apply-settings-button" onClick={deleteAllLoads}>delete all loads</button>*/}
                            {loads.length > 0 ? (
                                loads.map((load, index) => (
                                    <div key={index}>
                                        <LoadContainer
                                            loadStatus={load.loadStatus}
                                            loadPrice={load.loadPrice}
                                            loadTitle={load.loadTitle}
                                            loadTrailerType={load.loadTypeOfTrailer}
                                            loadCredentialID={load.loadCredentialID}
                                            loadWeight={load.loadWeight}
                                            loadPickupTime={load.loadPickupDate}
                                            loadDeliveryTime={load.loadPickupDate}
                                            loadType={load.loadType}
                                            shipperID={shipperID}
                                            loadPickupLocation={load.loadPickupLocation}
                                            loadDeliveryLocation={load.loadDeliveryLocation}
                                            loadVehicleModel={load.loadVehicleModel}
                                            loadVehicleYear={load.loadVehicleYear}
                                            loadMilesTrip={load.loadMilesTrip}
                                            loadQoutes={load.loadQoutes}
                                            loadTypeOfPackaging={load.loadTypeOfPackaging}
                                            loadDescription={load.loadDescription}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="load-empty-message">You don't have created any load</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="shipper-loads-dashboard-content-body">
                        <div className="create-load-container-header">
                            <button onClick={() => setCreateLoadSection(true)}><ArrowNav/></button>
                            <h3>Create Load</h3>
                            {step > 1 &&
                                <button className="go-previous-step-button" onClick={() => setStep(step - 1)}>
                                    <ArrowBack className="arrow-back"/>Previous Step</button>}
                        </div>
                        <div className="create-load-container-content">
                            {step === 1 && (
                                <div className="load-type-frame-wrapper">
                                    <section className="load-frame-description">
                                        <h2>Choose Load Type</h2>
                                        <p>Use our modern shipment system</p>
                                    </section>
                                    <div className="load-type-frame-wrapper-content">
                                        <button className="load-frame-container"
                                                onClick={() => handleLoadFrameClick("Vehicle Load")}>
                                            <img src={VehicleLoadType}/>
                                            <section>
                                                <h2>Vehicle Load</h2>
                                                <ArrowRight width="20"/>
                                            </section>
                                        </button>
                                        <button className="load-frame-container"
                                                onClick={() => handleLoadFrameClick("Moving")}>
                                            <img src={MovingLoadType}/>
                                            <section>
                                                <h2>Moving</h2>
                                                <ArrowRight width="20"/>
                                            </section>
                                        </button>
                                        <button className="load-frame-container"
                                                onClick={() => handleLoadFrameClick("Freight")}>
                                            <img src={FreightLoadType}/>
                                            <section>
                                                <h2>Freight</h2>
                                                <ArrowRight width="20"/>
                                            </section>
                                        </button>
                                        <button className="load-frame-container"
                                                onClick={() => handleLoadFrameClick("Heavy Equipment")}>
                                            <img src={HeavyLoadType}/>
                                            <section>
                                                <h2>Heavy Equipment</h2>
                                                <ArrowRight width="20"/>
                                            </section>
                                        </button>
                                    </div>
                                </div>
                            )}
                            {step === 2 && (
                                <div className="create-load-first-step">
                                    {formData.loadType === "Vehicle Load" && (
                                        <div className="create-load-first-step">
                                            <div className="create-load-credentials-container">
                                                <OpenshipLogo width="300" height="80"/>
                                                <h2>Specify Vehicle Load Type</h2>
                                                <p>By choosing load type, you will redirecting to the current form</p>
                                            </div>
                                            <div className="load-creation-input-fields">
                                                <section>
                                                    <Box sx={{minWidth: 180, marginTop: '70px'}}>
                                                        <FormControl fullWidth style={{fontSize: '15px',}}>
                                                            <InputLabel id="demo-simple-select-label"
                                                                        style={{
                                                                            fontSize: '15px',
                                                                            fontWeight: 'normal'
                                                                        }}>Load Subtype</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                label="Load Subtype"
                                                                name="loadType"
                                                                value={formData.loadSubType}
                                                                onChange={(event) => {
                                                                    handleLoadChange("loadSubType")(event);
                                                                }}
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
                                                                            maxHeight: '350px',
                                                                        },
                                                                    },
                                                                }}
                                                            >
                                                                <MenuItem value="CarOrLightTruck"
                                                                          style={{
                                                                              fontSize: '15px',
                                                                              color: 'grey',
                                                                              fontWeight: 'normal'
                                                                          }}>Car or Light Truck</MenuItem>
                                                                <MenuItem value="MotoEquipment"
                                                                          style={{
                                                                              fontSize: '15px',
                                                                              color: 'grey',
                                                                              fontWeight: 'normal'
                                                                          }}>Moto Equipment</MenuItem>
                                                                <MenuItem value="Powerboats"
                                                                          style={{
                                                                              fontSize: '15px',
                                                                              color: 'grey',
                                                                              fontWeight: 'normal'
                                                                          }}>Powerboats</MenuItem>
                                                                <MenuItem value="Sailboats"
                                                                          style={{
                                                                              fontSize: '15px',
                                                                              color: 'grey',
                                                                              fontWeight: 'normal'
                                                                          }}>Sailboats</MenuItem>
                                                                <MenuItem value="PersonalWatercrafts"
                                                                          style={{
                                                                              fontSize: '15px',
                                                                              color: 'grey',
                                                                              fontWeight: 'normal'
                                                                          }}>Personal watercrafts</MenuItem>
                                                                <MenuItem value="ATVs&PowerSports"
                                                                          style={{
                                                                              fontSize: '15px',
                                                                              color: 'grey',
                                                                              fontWeight: 'normal'
                                                                          }}>ATVs & Power Sports</MenuItem>
                                                                <MenuItem value="CommercialTruck"
                                                                          style={{
                                                                              fontSize: '15px',
                                                                              color: 'grey',
                                                                              fontWeight: 'normal'
                                                                          }}>Commercial Truck</MenuItem>

                                                                <MenuItem value="Parts"
                                                                          style={{
                                                                              fontSize: '15px',
                                                                              color: 'grey',
                                                                              fontWeight: 'normal'
                                                                          }}>Parts</MenuItem>
                                                                <MenuItem value="TrailerAndOtherVehicles"
                                                                          style={{
                                                                              fontSize: '15px',
                                                                              color: 'grey',
                                                                              fontWeight: 'normal'
                                                                          }}>Trailer & Other Vehicles</MenuItem>
                                                                <MenuItem value="RV"
                                                                          style={{
                                                                              fontSize: '15px',
                                                                              color: 'grey',
                                                                              fontWeight: 'normal'
                                                                          }}>RV (Recreational Vehicles)</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Box>
                                                    <div className="creation-load-buttons-nav">
                                                        {step > 1 && <button className="go-previous-step-button"
                                                                             onClick={() => setStep(step - 1)}>
                                                            <ArrowBack
                                                                className="arrow-back"/>Go Back</button>}
                                                        <button className="create-load-submit-button"
                                                                onClick={handleSubmit}>Next
                                                        </button>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    )}
                                    {formData.loadType === "Moving" && (
                                        <div className="load-container">
                                            <div className="create-load-first-step">
                                                <div className="create-load-credentials-container">
                                                    <OpenshipLogo width="300" height="80"/>
                                                    <h2>Specify Moving Load Type</h2>
                                                    <p>By choosing load type, you will redirecting to the current
                                                        form</p>
                                                </div>
                                                <div className="load-creation-input-fields">
                                                    <section>
                                                        <Box sx={{minWidth: 180, marginTop: '70px'}}>
                                                            <FormControl fullWidth style={{fontSize: '15px',}}>
                                                                <InputLabel id="demo-simple-select-label"
                                                                            style={{
                                                                                fontSize: '15px',
                                                                                fontWeight: 'normal'
                                                                            }}>Load Type</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    label="Load Type"
                                                                    name="loadSubType"
                                                                    value={formData.loadSubType}
                                                                    onChange={(event) => {
                                                                        handleLoadChange("loadSubType")(event);
                                                                    }}
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
                                                                                maxHeight: '350px',
                                                                            },
                                                                        },
                                                                    }}
                                                                >
                                                                    <MenuItem value="LocalMoving"
                                                                              style={{
                                                                                  fontSize: '15px',
                                                                                  color: 'grey',
                                                                                  fontWeight: 'normal'
                                                                              }}>Local Moving (less then 50
                                                                        mil)</MenuItem>
                                                                    <MenuItem value="LongDistanceMoving"
                                                                              style={{
                                                                                  fontSize: '15px',
                                                                                  color: 'grey',
                                                                                  fontWeight: 'normal'
                                                                              }}>Long Distance Moving</MenuItem>
                                                                    <MenuItem value="CommercialBusinessMoving"
                                                                              style={{
                                                                                  fontSize: '15px',
                                                                                  color: 'grey',
                                                                                  fontWeight: 'normal'
                                                                              }}>Commercial / Business Moving</MenuItem>
                                                                    <MenuItem value="HeavyLiftingAndMovingOnly"
                                                                              style={{
                                                                                  fontSize: '15px',
                                                                                  color: 'grey',
                                                                                  fontWeight: 'normal'
                                                                              }}>Heavy Lifting and Moving
                                                                        Only</MenuItem>
                                                                    <MenuItem value="HouseholdItem"
                                                                              style={{
                                                                                  fontSize: '15px',
                                                                                  color: 'grey',
                                                                                  fontWeight: 'normal'
                                                                              }}>Household item</MenuItem>
                                                                    <MenuItem value="OfficeMoving"
                                                                              style={{
                                                                                  fontSize: '15px',
                                                                                  color: 'grey',
                                                                                  fontWeight: 'normal'
                                                                              }}>Office Moving</MenuItem>
                                                                    <MenuItem value="CorporateMoving"
                                                                              style={{
                                                                                  fontSize: '15px',
                                                                                  color: 'grey',
                                                                                  fontWeight: 'normal'
                                                                              }}>Corporate Moving</MenuItem>
                                                                    <MenuItem value="StudentMoving"
                                                                              style={{
                                                                                  fontSize: '15px',
                                                                                  color: 'grey',
                                                                                  fontWeight: 'normal'
                                                                              }}>Student Moving</MenuItem>
                                                                    <MenuItem value="MilitaryMoving"
                                                                              style={{
                                                                                  fontSize: '15px',
                                                                                  color: 'grey',
                                                                                  fontWeight: 'normal'
                                                                              }}>Military Moving</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                        <div className="creation-load-buttons-nav">
                                                            {step > 1 && <button className="go-previous-step-button"
                                                                                 onClick={() => setStep(step - 1)}>
                                                                <ArrowBack
                                                                    className="arrow-back"/>Go Back</button>}
                                                            <button className="create-load-submit-button"
                                                                    onClick={handleSubmit}>Next
                                                            </button>
                                                        </div>
                                                    </section>
                                                </div>
                                            </div>

                                        </div>
                                    )}
                                    {formData.loadType === "Freight" && (
                                        <div className="load-container">
                                            <div className="create-load-first-step">
                                                <div className="create-load-credentials-container">
                                                    <OpenshipLogo width="300" height="80"/>
                                                    <h2>Specify Freight Load Type</h2>
                                                    <p>By choosing load type, you will redirecting to the current
                                                        form</p>
                                                </div>
                                                <div className="load-creation-input-fields">
                                                    <section>
                                                        <Box sx={{minWidth: 180, marginTop: '70px'}}>
                                                            <FormControl fullWidth style={{fontSize: '15px',}}>
                                                                <InputLabel id="demo-simple-select-label"
                                                                            style={{
                                                                                fontSize: '15px',
                                                                                fontWeight: 'normal'
                                                                            }}>Load
                                                                    Type</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    label="Load Type"
                                                                    name="loadType"
                                                                    value={formData.loadSubType}
                                                                    onChange={(event) => {
                                                                        handleLoadChange("loadSubType")(event);
                                                                    }}
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
                                                                                maxHeight: '350px',
                                                                            },
                                                                        },
                                                                    }}
                                                                >
                                                                    <MenuItem value="Expedite"
                                                                              style={{
                                                                                  fontSize: '15px',
                                                                                  color: 'grey',
                                                                                  fontWeight: 'normal'
                                                                              }}>Expedite</MenuItem>
                                                                    <MenuItem value="LTL"
                                                                              style={{
                                                                                  fontSize: '15px',
                                                                                  color: 'grey',
                                                                                  fontWeight: 'normal'
                                                                              }}>LTL</MenuItem>
                                                                    <MenuItem value="FTL"
                                                                              style={{
                                                                                  fontSize: '15px',
                                                                                  color: 'grey',
                                                                                  fontWeight: 'normal'
                                                                              }}>FTL</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                        <div className="creation-load-buttons-nav">
                                                            {step > 1 && <button className="go-previous-step-button"
                                                                                 onClick={() => setStep(step - 1)}>
                                                                <ArrowBack
                                                                    className="arrow-back"/>Go Back</button>}
                                                            <button className="create-load-submit-button"
                                                                    onClick={handleSubmit}>Next
                                                            </button>
                                                        </div>
                                                    </section>
                                                </div>
                                            </div>

                                        </div>
                                    )}
                                    {formData.loadType === "Heavy Equipment" && (
                                        <div className="load-container">
                                            <div className="create-load-first-step">
                                                <div className="create-load-credentials-container">
                                                    <OpenshipLogo width="300" height="80"/>
                                                    <h2>Specify Heavy Load Type</h2>
                                                    <p>By choosing load type, you will redirecting to the current
                                                        form</p>
                                                </div>
                                                <div className="load-creation-input-fields">
                                                    <section>
                                                        <Box sx={{minWidth: 180, marginTop: '70px'}}>
                                                            <FormControl fullWidth style={{fontSize: '15px',}}>
                                                                <InputLabel id="demo-simple-select-label"
                                                                            style={{
                                                                                fontSize: '15px',
                                                                                fontWeight: 'normal'
                                                                            }}>Load
                                                                    Type</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    label="Load Type"
                                                                    name="loadType"
                                                                    value={formData.loadSubType}
                                                                    onChange={handleLoadChange("loadSubType")}
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
                                                                                maxHeight: '350px',
                                                                            },
                                                                        },
                                                                    }}
                                                                >
                                                                    <MenuItem value="Farm Equipment"
                                                                              style={{
                                                                                  fontSize: '15px',
                                                                                  color: 'grey',
                                                                                  fontWeight: 'normal'
                                                                              }}>Farm Equipment</MenuItem>
                                                                    <MenuItem value="Construction Equipment"
                                                                              style={{
                                                                                  fontSize: '15px',
                                                                                  color: 'grey',
                                                                                  fontWeight: 'normal'
                                                                              }}>Construction Equipment</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                        <div className="creation-load-buttons-nav">
                                                            {step > 1 && <button className="go-previous-step-button"
                                                                                 onClick={() => setStep(step - 1)}>
                                                                <ArrowBack
                                                                    className="arrow-back"/>Go Back</button>}
                                                            <button className="create-load-submit-button"
                                                                    onClick={handleSubmit}>Next
                                                            </button>
                                                        </div>
                                                    </section>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {step === 3 && (
                                <div className="create-load-first-step">
                                    <div className="create-load-credentials-container">
                                        <OpenshipLogo width="300" height="80"/>
                                        <h2>Create your load</h2>
                                        <p>Create your load in few steps</p>
                                    </div>
                                    <div className="load-creation-input-fields">
                                        <LoadDirectionsIcon className="create-load-direction-icon"/>
                                        <section>
                                            <div className="input-fields-with-date-time">
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
                                                <div className="google-input-wrapper" style={{marginLeft: "10px"}}>
                                                    <input
                                                        type="date"
                                                        id="pickupLocationDate"
                                                        autoComplete="off"
                                                        className="google-style-input"
                                                        onChange={handleLoadChange('pickupLocationDate')}
                                                        value={formData.pickupLocationDate}
                                                        required
                                                    />
                                                    <label htmlFor="pickupLocation"
                                                           className="google-style-input-label">Pickup Date</label>
                                                </div>
                                            </div>
                                            <div className="input-fields-with-date-time">
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
                                                           className="google-style-input-label">Delivery
                                                        Location</label>
                                                </div>
                                                <div className="google-input-wrapper" style={{marginLeft: "10px"}}>
                                                    <input
                                                        type="date"
                                                        id="deliveryLocationDate"
                                                        autoComplete="off"
                                                        className="google-style-input"
                                                        onChange={handleLoadChange('deliveryLocationDate')}
                                                        value={formData.deliveryLocationDate}
                                                        required
                                                    />
                                                    <label htmlFor="deliveryLocationDate"
                                                           className="google-style-input-label">Delivery Date</label>
                                                </div>
                                            </div>
                                            <button className="create-load-submit-button"
                                                    onClick={handleSubmit}>Next
                                            </button>
                                        </section>
                                    </div>
                                </div>
                            )}
                            {step === 4 && (
                                <div className="create-load-wrapper">
                                    {formData.loadSubType === 'RV' &&
                                        <RVLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
                                    {formData.loadSubType === 'Powerboats' &&
                                        <BoatLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
                                    {formData.loadSubType === 'MotoEquipment' &&
                                        <MotoEquipmentLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
                                    {formData.loadSubType === 'CarOrLightTruck' &&
                                        <VehicleLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
                                    {formData.loadSubType === 'Sailboats' &&
                                        <SailboatLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
                                    {formData.loadSubType === 'PersonalWatercrafts' &&
                                        <PersonalWatercraftsLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
                                    {formData.loadSubType === 'ATVs&PowerSports' &&
                                        <ATVLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
                                    {formData.loadSubType === 'CommercialTruck' &&
                                        <CommercialTruckLoad
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
                                    {formData.loadSubType === 'Parts' &&
                                        <PartsLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
                                    {formData.loadSubType === 'TrailerAndOtherVehicles' &&
                                        <TrailerAndOtherVehicles
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
                                    {formData.loadSubType === 'LocalMoving' &&
                                        <LocalMovingLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
                                    {formData.loadSubType === 'LongDistanceMoving' &&
                                        <LongDistanceMoving
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
                                    {formData.loadSubType === 'CommercialBusinessMoving' &&
                                        <CommercialBusinessMoving
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
                                    {formData.loadSubType === 'HeavyLiftingAndMovingOnly' &&
                                        <HeavyLiftingMovingOnly
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
                                    {formData.loadSubType === 'HouseholdItem' &&
                                        <HouseHoldItem
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
                                    {formData.loadSubType === 'OfficeMoving' &&
                                        <OfficeMoving
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
                                    {formData.loadSubType === 'CorporateMoving' &&
                                        <CorporateMoving
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
                                    {formData.loadSubType === 'StudentMoving' &&
                                        <StudentMoving
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
                                    {formData.loadSubType === 'MilitaryMoving' &&
                                        <MilitaryMoving
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
                                    {formData.loadSubType === 'Expedite' &&
                                        <ExpediteLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
                                    {formData.loadSubType === 'FTL' &&
                                        <FTLLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
                                    {formData.loadSubType === 'LTL' &&
                                        <LTLLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
                                    {formData.loadSubType === 'Construction Equipment' &&
                                        <HeavyEquipmentContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
                                    {formData.loadSubType === 'Farm Equipment' &&
                                        <FarmEquipmentLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}/>}
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


