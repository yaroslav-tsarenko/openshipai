import React, {useEffect, useState, useRef} from 'react';
import '../ShipperDashboard.css';
import {ReactComponent as SortIcon} from "../../../assets/sort-icon-blue.svg";
import {ReactComponent as FilterIcon} from "../../../assets/filter-icon-blue.svg";
import {ReactComponent as AddLoadIcon} from "../../../assets/add-load-icon.svg";
import VehicleLoadType from "../../../assets/vehicle-load-type.png";
import MovingLoadType from "../../../assets/movin-load-type.png";
import FreightLoadType from "../../../assets/freight-load-type.png";
import HeavyLoadType from "../../../assets/heavy-load-type.png";
import {ReactComponent as DefaultUserAvatar} from "../../../assets/default-avatar.svg";
import {useParams} from 'react-router-dom';
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import LoadContainer from "../../load-container/LoadContainer";
import axios from 'axios';
import CarOrLightTruckLoadContainer from "../../load-containers/car-or-light-truck/CarOrLightTruckLoadContainer";
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
import FreightLoadContainer from "../../load-containers/expedite-load-container/FreightLoadContainer";
import FTLLoadContainer from "../../load-containers/ftl-load-container/FTLLoadContainer";
import LTLLoadContainer from "../../load-containers/ltl-load-container/LTLLoadContainer";
import {Skeleton} from "@mui/material";
import {BACKEND_URL} from "../../../constants/constants";//
import Form from 'react-bootstrap/Form';
import CreateLoadContainer from "../../create-load-container/CreateLoadContainer";
import RoundedCheckbox from "../../rounded-checkbox/RoundedCheckbox";
import CustomCheckBox from "../../custom-checkbox/CustomCheckBox";
import HeavyEquipmentLoadContainer from "../../load-containers/heavy-equipment/HeavyEquipmentContainer";
import Button from "../../button/Button";
import LoadFrameButton from "../../load-frame-button/LoadFrameButton";
import TextInput from "../../text-input/TextInput";


const ShipperLoadsPage = () => {
    const [createLoadSection, setCreateLoadSection] = useState(true);
    const {shipperID} = useParams();
    const [loads, setLoads] = useState([]);
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [step, setStep] = useState(1);
    const [sortedLoads, setSortedLoads] = useState([]);
    const [shipperInfo, setShipperInfo] = useState(null);
    const dropdownRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [showSortPopup, setShowSortPopup] = useState(false);
    const [showFilterPopup, setShowFilterPopup] = useState(false);
    const [sortOrder, setSortOrder] = useState('');
    const [distance, setDistance] = useState(null);
    const [selectedLoadType, setSelectedLoadType] = useState('');
    const [sortedAndFilteredLoads, setSortedAndFilteredLoads] = useState([]);
    const [formData, setFormData] = useState({
        pickupLocation: '',
        pickupLocationDate: '',
        pickupLocationTime: '',
        deliveryLocation: '',
        deliveryLocationDate: '',
        deliveryLocationTime: '',
        loadType: '',
        loadSubType: '',
        loadMilesTrip: ''
    });

    const selectStyles = {
        fontSize: '15px',
        fontWeight: 'normal',
        color: 'gray',
        borderRadius: '10px',
        height: '50px',
        cursor: 'pointer',
        marginTop: "17px",
        marginBottom: "15px",
        width: '100%'
    };

    const optionStyles = {
        fontSize: '17px',
        color: "grey",
        fontWeight: 'normal',
        cursor: "pointer",
    };

    console.log("Selected loadSubType:", formData.loadSubType);

    const goToStepThree = () => {
        setStep(3);
    };

    const calculateDistance = async (origin, destination) => {
        const apiKey = '5b3ce3597851110001cf6248aaf2054f2cee4e6da1ceb0598a98a7ca';
        try {
            const originResponse = await axios.get(
                `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${origin}`
            );
            const destinationResponse = await axios.get(
                `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${destination}`
            );
            const originCoords = originResponse.data.features[0].geometry.coordinates;
            const destinationCoords = destinationResponse.data.features[0].geometry.coordinates;
            const routeResponse = await axios.post(
                `https://api.openrouteservice.org/v2/directions/driving-car`,
                {
                    coordinates: [originCoords, destinationCoords]
                },
                {
                    headers: {
                        Authorization: apiKey,
                        'Content-Type': 'application/json'
                    }
                }
            );
            const distanceInMeters = routeResponse.data.routes[0].summary.distance;
            const distanceInMiles = distanceInMeters / 1609.34;
            setDistance(distanceInMiles.toFixed(2));
            setFormData((prevData) => ({
                ...prevData,
                loadMilesTrip: distanceInMiles.toFixed(2)
            }));
        } catch (error) {
            console.error('Error calculating distance:', error);
            setDistance(null);
        }
    };

    useEffect(() => {
        if (formData.pickupLocation && formData.deliveryLocation) {
            calculateDistance(formData.pickupLocation, formData.deliveryLocation);
        }
    }, [formData.pickupLocation, formData.deliveryLocation]);

    useEffect(() => {
        const filtered = getFilteredLoads(); // Assuming this function applies the selectedFilter to loads
        const sorted = filtered.sort((a, b) => {
            if (sortOrder === 'ascending') {
                return a.loadPrice - b.loadPrice;
            } else if (sortOrder === 'descending') {
                return b.loadPrice - a.loadPrice;
            }
            return 0;
        });
        setSortedAndFilteredLoads(sorted);
    }, [loads, selectedFilter, sortOrder]);

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

        const fetchAvatar = async () => {
            if (shipperInfo && shipperInfo.userShipperAvatar) {
                setLoading(true);
                const avatarUrl = `${BACKEND_URL}/${shipperInfo.userShipperAvatar}`;

                try {
                    await axios.get(avatarUrl);
                    setPreviewSavedImage(avatarUrl);
                } catch (error) {
                    console.error('Image does not exist');
                } finally {
                    setLoading(false);
                }
            }
        };

        const fetchLoads = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-all-loads/${shipperID}`);
                setLoads(response.data);
            } catch (error) {
                console.error('Error fetching loads:', error);
            }
        };

        getUser();
        fetchAvatar();
        fetchLoads();
    }, [shipperInfo, shipperID]);


    const handleNextClick = () => {
        if (selectedLoadType) {
            if (selectedLoadType === "Heavy Equipment" || selectedLoadType === "Freight") {
                setStep(3);
            } else {
                setStep(2);
            }
        } else {
            alert('Please select a load type');
        }
    };

    const toggleSortPopup = () => setShowSortPopup(!showSortPopup);
    const toggleFilterPopup = () => setShowFilterPopup(!showFilterPopup);

    const getFilteredLoads = () => {
        if (!selectedFilter) return loads;
        return loads.filter(load => load.loadType === selectedFilter);
    };

    const handleFilterSelection = (filterType) => {
        setSelectedFilter(filterType);
    };
    const handleSortAscending = () => {
        setSortOrder('ascending');
        sortLoadsByPrice('ascending');
    };

    const sortLoadsByPrice = (order) => {
        const sorted = [...loads].sort((a, b) => {
            if (order === 'ascending') {
                return a.loadPrice - b.loadPrice;
            } else if (order === 'descending') {
                return b.loadPrice - a.loadPrice;
            }
            return 0;
        });
        setSortedLoads(sorted);
    };


    const handleSortDescending = () => {
        setSortOrder('descending');
        sortLoadsByPrice('descending');
    };

    const handleLoadFrameClick = (loadType) => {
        setSelectedLoadType(loadType);
        setFormData(prevState => ({...prevState, loadType}));
    };

    const handleLoadChange = (input) => (e) => {
        setFormData({...formData, [input]: e.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setStep(step + 1);
    };

    const goBackToStepThree = () => {
        setStep(3);
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
                        <>Your Loads</> :
                        <Skeleton variant="text" width={250}/>}
                    contentSubtitle="Monitor payments, loads, revenues"
                    accountName={shipperInfo ? shipperInfo.userShipperName : <Skeleton variant="text" width={60}/>}
                    accountRole={shipperInfo ? shipperInfo.userShipperRole : <Skeleton variant="text" width={40}/>}
                    profileLink={`/shipper-profile/${shipperID}`}
                    bellLink={`/shipper-settings/${shipperID}`}
                    settingsLink={`/shipper-profile/${shipperID}`}
                    avatar={previewSavedImage ? previewSavedImage : DefaultUserAvatar}
                />
                {createLoadSection ? (
                    <div className="dashboard-content-body">
                        <div className="shipper-dashboard-load-buttons">
                            <section className="shipper-filter-buttons">
                                <Button variant="filter" onClick={toggleSortPopup}>
                                    <SortIcon className="button-nav-load-icon"/>
                                    Sort
                                </Button>
                                <Button variant="filter" onClick={toggleFilterPopup}>
                                    <FilterIcon className="button-nav-load-icon"/>
                                    Filter
                                </Button>
                                {showSortPopup && (
                                    <div className="overlay-popup-select" onClick={toggleSortPopup}>
                                        <div className="select-popup" onClick={e => e.stopPropagation()}>
                                            <div className="select-popup-header">
                                                <h2>Sort Options</h2>
                                                <button onClick={toggleSortPopup} className="close-popup-button">Close
                                                </button>
                                            </div>
                                            <div className="select-popup-content">
                                                <p onClick={handleSortAscending}>In ascending order</p>
                                                <p onClick={handleSortDescending}>In descending order</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {showFilterPopup && (
                                    <div className="overlay-popup-select" onClick={toggleFilterPopup}>
                                        <div className="select-popup" onClick={e => e.stopPropagation()}>
                                            <div className="select-popup-header">
                                                <h2>Filter Options</h2>
                                                <button onClick={toggleFilterPopup}
                                                        className="close-popup-button">Close
                                                </button>
                                            </div>
                                            <div className="select-popup-content">
                                                <p onClick={() => handleFilterSelection('')}>Show All</p>
                                                <p onClick={() => handleFilterSelection('Vehicle Load')}>Only Vehicle
                                                    Load</p>
                                                <p onClick={() => handleFilterSelection('Moving')}>Only Moving</p>
                                                <p onClick={() => handleFilterSelection('Freight')}>Only Freight</p>
                                                <p onClick={() => handleFilterSelection('Heavy Equipment')}>Only Heavy
                                                    Equipment</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </section>
                            <section className="shipper-filter-buttons">
                                <Button variant="apply" onClick={() => setCreateLoadSection(false)}>
                                    <AddLoadIcon className="add-load-icon"/>
                                    Create New Load
                                </Button>
                            </section>
                        </div>
                        <div className="load-containers-wrapper">
                            {
                                loads.length === 0 ? (
                                    <p className="load-empty-message">You haven't created any load</p>
                                ) : sortedAndFilteredLoads.length > 0 ? (
                                    sortedAndFilteredLoads.map((load, index) => (
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
                                    <p className="load-empty-message">No loads match the selected filter</p>
                                )
                            }
                        </div>
                    </div>
                ) : (
                    <div className="shipper-loads-dashboard-content-body">
                        <div className="create-load-container-content">
                            {step === 1 && (

                                <CreateLoadContainer
                                    step={1}
                                    title="Choose Load Type"
                                    subTitle="Use our modern shipment system">
                                    <div className="load-type-frame-wrapper-content">
                                        <LoadFrameButton
                                            loadType="Vehicle Load"
                                            imageSrc={VehicleLoadType}
                                            isChecked={selectedLoadType === "Vehicle Load"}
                                            onClick={() => handleLoadFrameClick("Vehicle Load")}
                                        />
                                        <LoadFrameButton
                                            loadType="Moving"
                                            imageSrc={MovingLoadType}
                                            isChecked={selectedLoadType === "Moving"}
                                            onClick={() => handleLoadFrameClick("Moving")}
                                        />
                                        <LoadFrameButton
                                            loadType="Freight"
                                            imageSrc={FreightLoadType}
                                            isChecked={selectedLoadType === "Freight"}
                                            onClick={() => handleLoadFrameClick("Freight")}
                                        />
                                        <LoadFrameButton
                                            loadType="Heavy Equipment"
                                            imageSrc={HeavyLoadType}
                                            isChecked={selectedLoadType === "Heavy Equipment"}
                                            onClick={() => handleLoadFrameClick("Heavy Equipment")}
                                        />
                                    </div>
                                    <div className="create-load-buttons">
                                        <Button variant="neutral" buttonText="Go Back"
                                                onClick={() => setCreateLoadSection(true)}/>
                                        <Button variant="default" buttonText="Next" onClick={handleNextClick}/>
                                    </div>
                                </CreateLoadContainer>
                            )}
                            {step === 2 && (
                                <>
                                    {formData.loadType === "Vehicle Load" && (
                                        <CreateLoadContainer
                                            step={2}
                                            title="Specify Vehicle"
                                            subTitle="By choosing load type, you will redirecting to the current form">

                                            <Form.Select
                                                name="loadSubType"
                                                value={formData.loadSubType}
                                                onChange={(event) => handleLoadChange("loadSubType")(event)}
                                                style={selectStyles}
                                            >
                                                <option value="CarOrLightTruck" style={optionStyles}>Car or Light
                                                    Truck
                                                </option>
                                                <option value="MotoEquipment" style={optionStyles}>Moto Equipment
                                                </option>
                                                <option value="Powerboats" style={optionStyles}>Powerboats</option>
                                                <option value="Sailboats" style={optionStyles}>Sailboats</option>
                                                <option value="PersonalWatercrafts" style={optionStyles}>Personal
                                                    watercrafts
                                                </option>
                                                <option value="ATVs&PowerSports" style={optionStyles}>ATVs & Power
                                                    Sports
                                                </option>
                                                <option value="CommercialTruck" style={optionStyles}>Commercial Truck
                                                </option>
                                                <option value="Parts" style={optionStyles}>Parts</option>
                                                <option value="TrailerAndOtherVehicles" style={optionStyles}>Trailer &
                                                    Other Vehicles
                                                </option>
                                                <option value="RV" style={optionStyles}>RV (Recreational Vehicles)
                                                </option>
                                            </Form.Select>
                                            <div className="create-load-buttons">
                                                {step > 1 &&
                                                    <Button variant="neutral"
                                                            buttonText="Go Back"
                                                            onClick={() => setStep(step - 1)}
                                                    />
                                                }
                                                <Button variant="default" buttonText="Next" onClick={handleSubmit}/>
                                            </div>


                                        </CreateLoadContainer>
                                    )}
                                    {formData.loadType === "Moving" && (
                                        <CreateLoadContainer
                                            step={2}
                                            title="Specify Moving Load Type"
                                            subTitle="By choosing load type, you will redirecting to the current form">
                                            <Form.Select
                                                name="loadType"
                                                value={formData.loadSubType}
                                                onChange={(event) => handleLoadChange("loadSubType")(event)}
                                                style={selectStyles}
                                            >
                                                <option value="LocalMoving" style={optionStyles}>Local Moving (less than
                                                    50 miles)
                                                </option>
                                                <option value="LongDistanceMoving" style={optionStyles}>Long Distance
                                                    Moving
                                                </option>
                                                <option value="CommercialBusinessMoving" style={optionStyles}>Commercial
                                                    / Business Moving
                                                </option>
                                                <option value="HeavyLiftingAndMovingOnly" style={optionStyles}>Heavy
                                                    Lifting and Moving Only
                                                </option>
                                                <option value="HouseholdItem" style={optionStyles}>Household item
                                                </option>
                                                <option value="OfficeMoving" style={optionStyles}>Office Moving</option>
                                                <option value="CorporateMoving" style={optionStyles}>Corporate Moving
                                                </option>
                                                <option value="StudentMoving" style={optionStyles}>Student Moving
                                                </option>
                                                <option value="MilitaryMoving" style={optionStyles}>Military Moving
                                                </option>
                                            </Form.Select>
                                            <div className="create-load-buttons">
                                                {step > 1 && (
                                                    <Button variant="neutral" buttonText="Go Back"
                                                            onClick={() => setStep(step - 1)}/>
                                                )}
                                                <Button variant="default" buttonText="Next" onClick={handleSubmit}/>
                                            </div>
                                        </CreateLoadContainer>
                                    )}

                                    {formData.loadType === "Freight" && (
                                        <CreateLoadContainer
                                            step={2}
                                            title="Specify Freight Load Type"
                                            subTitle="By choosing load type, you will redirecting to the current form">
                                            <Form.Select
                                                name="loadType"
                                                value={formData.loadSubType}
                                                onChange={(event) => handleLoadChange("loadSubType")(event)}
                                                style={selectStyles}
                                            >
                                                <option value="Expedite" style={optionStyles}>Expedite</option>
                                                <option value="LTL" style={optionStyles}>LTL</option>
                                                <option value="FTL" style={optionStyles}>FTL</option>
                                            </Form.Select>
                                            <div className="create-load-buttons">
                                                {step > 1 && (
                                                    <Button variant="neutral" buttonText="Go Back"
                                                            onClick={() => setStep(step - 1)}/>
                                                )}
                                                <Button variant="default" buttonText="Next" onClick={handleSubmit}/>
                                            </div>
                                        </CreateLoadContainer>
                                    )}

                                    {formData.loadType === "Heavy Equipment" && (
                                        <CreateLoadContainer
                                            step={2}
                                            title="Specify Heavy Load Type"
                                            subTitle="By choosing load type, you will redirecting to the current form">
                                            <Form.Select
                                                name="loadType"
                                                value={formData.loadSubType}
                                                onChange={(event) => handleLoadChange("loadSubType")(event)}
                                                style={selectStyles}
                                            >
                                                <option value="Farm Equipment" style={optionStyles}>Farm Equipment
                                                </option>
                                                <option value="Construction Equipment" style={optionStyles}>Construction
                                                    Equipment
                                                </option>
                                            </Form.Select>
                                            <div className="create-load-buttons">
                                                {step > 1 && (
                                                    <Button variant="neutral" buttonText="Go Back"
                                                            onClick={() => setStep(step - 1)}/>
                                                )}
                                                <Button variant="default" buttonText="Next" onClick={handleSubmit}/>
                                            </div>
                                        </CreateLoadContainer>
                                    )}
                                </>
                            )}
                            {step === 3 && (
                                <CreateLoadContainer
                                    step={3}
                                    title="Specify origin and delivery locations"
                                    subTitle="We can better assist you if you provide us with the following information"
                                >
                                    <div className="load-creation-input-fields">
                                        <div className="input-fields-with-date-time">
                                            <TextInput
                                                type="text"
                                                id="pickupLocation"
                                                autoComplete="off"
                                                className="google-style-input"
                                                onChange={handleLoadChange('pickupLocation')}
                                                value={formData.pickupLocation}
                                                required
                                                label="Pickup Location"
                                            />
                                            <TextInput
                                                type="date"
                                                id="pickupLocationDate"
                                                autoComplete="off"
                                                className="google-style-input"
                                                onChange={handleLoadChange('pickupLocationDate')}
                                                value={formData.pickupLocationDate}
                                                required
                                                label="Pickup Date"
                                            />
                                        </div>
                                        <Button variant="slim" buttonText="+ Add Stop"/>
                                        <div className="input-fields-with-date-time">
                                            <TextInput
                                                type="text"
                                                id="deliveryLocation"
                                                autoComplete="off"
                                                className="google-style-input"
                                                onChange={handleLoadChange('deliveryLocation')}
                                                value={formData.deliveryLocation}
                                                required
                                                label="Delivery Location"
                                            />
                                            <TextInput
                                                type="date"
                                                id="deliveryLocationDate"
                                                autoComplete="off"
                                                className="google-style-input"
                                                onChange={handleLoadChange('deliveryLocationDate')}
                                                value={formData.deliveryLocationDate}
                                                required
                                                label="Delivery Date"
                                            />
                                        </div>
                                        <div className="load-preference-checkboxes">
                                            <CustomCheckBox id="checkbox1" label="I'm flexible"/>
                                            <CustomCheckBox id="checkbox2" label="In the next few days"/>
                                            <CustomCheckBox id="checkbox3" label="As soon as possible"/>
                                        </div>
                                        {distance !== null && (
                                            <p className="distance-in-miles">Estimated distance: {distance} miles</p>
                                        )}
                                        <div className="create-load-buttons">
                                            <Button variant="neutral" buttonText="Go Back"
                                                    onClick={() => setStep(2)}/>
                                            <Button variant="default" buttonText="Next" onClick={handleSubmit}/>
                                        </div>

                                    </div>
                                </CreateLoadContainer>
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
                                            loadSubType={formData.loadSubType}
                                            goBack={goBackToStepThree}
                                        />}
                                    {formData.loadSubType === 'CarOrLightTruck' && (
                                        <CarOrLightTruckLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadMilesTrip={formData.loadMilesTrip}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            loadDeliveryTime={formData.deliveryLocationTime}
                                            goBack={goBackToStepThree}
                                        />
                                    )}
                                    {formData.loadSubType === 'Powerboats' &&
                                        <BoatLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}
                                            goBack={goBackToStepThree}
                                        />}
                                    {formData.loadSubType === 'MotoEquipment' &&
                                        <MotoEquipmentLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}
                                            goBack={goBackToStepThree}/>}

                                    {formData.loadSubType === 'Sailboats' &&
                                        <SailboatLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}
                                            goBack={goBackToStepThree}
                                        />}
                                    {formData.loadSubType === 'PersonalWatercrafts' &&
                                        <PersonalWatercraftsLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}
                                            goBack={goBackToStepThree}
                                        />}
                                    {formData.loadSubType === 'ATVs&PowerSports' &&
                                        <ATVLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}
                                            goBack={goBackToStepThree}
                                        />}
                                    {formData.loadSubType === 'CommercialTruck' &&
                                        <CommercialTruckLoad
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}
                                            goBack={goBackToStepThree}
                                        />}
                                    {formData.loadSubType === 'Parts' &&
                                        <PartsLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}
                                            goBack={goBackToStepThree}
                                        />}
                                    {formData.loadSubType === 'TrailerAndOtherVehicles' &&
                                        <TrailerAndOtherVehicles
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}
                                            goBack={goBackToStepThree}
                                        />}
                                    {formData.loadSubType === 'LocalMoving' &&
                                        <LocalMovingLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}
                                            goBack={goBackToStepThree}/>}
                                    {formData.loadSubType === 'LongDistanceMoving' &&
                                        <LongDistanceMoving
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}
                                            goBack={goBackToStepThree}/>}
                                    {formData.loadSubType === 'CommercialBusinessMoving' &&
                                        <CommercialBusinessMoving
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}
                                            goBack={goBackToStepThree}
                                        />}
                                    {formData.loadSubType === 'HeavyLiftingAndMovingOnly' &&
                                        <HeavyLiftingMovingOnly
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}
                                            goBack={goBackToStepThree}
                                        />}
                                    {formData.loadSubType === 'HouseholdItem' &&
                                        <HouseHoldItem
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}
                                            goBack={goBackToStepThree}
                                        />}
                                    {formData.loadSubType === 'OfficeMoving' &&
                                        <OfficeMoving
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}
                                            goBack={goBackToStepThree}
                                        />}
                                    {formData.loadSubType === 'CorporateMoving' &&
                                        <CorporateMoving
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}
                                            goBack={goBackToStepThree}
                                        />}
                                    {formData.loadSubType === 'StudentMoving' &&
                                        <StudentMoving
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}
                                            goBack={goBackToStepThree}
                                        />}
                                    {formData.loadSubType === 'MilitaryMoving' &&
                                        <MilitaryMoving
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}
                                            goBack={goBackToStepThree}
                                        />}
                                    {formData.loadType === 'Freight' &&
                                        <FreightLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}
                                            goBack={goBackToStepThree}
                                        />}
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
                                    {formData.loadType === "Heavy Equipment" &&
                                        <HeavyEquipmentLoadContainer
                                            pickupLocation={formData.pickupLocation}
                                            loadPickupDate={formData.pickupLocationDate}
                                            loadPickupTime={formData.pickupLocationTime}
                                            deliveryLocation={formData.deliveryLocation}
                                            loadDeliveryDate={formData.deliveryLocationDate}
                                            deliveryLocationTime={formData.deliveryLocationTime}
                                            loadType={formData.loadType}
                                            loadSubType={formData.loadSubType}
                                            goBack={goBackToStepThree}/>}
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


