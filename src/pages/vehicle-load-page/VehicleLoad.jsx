import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/landing-page-new/header/Header';
import LandingPageFooter from '../../components/landing-page/landing-footer/LandingPageFooter';
import CreateLoadContainer from '../../components/create-load-container/CreateLoadContainer';
import LoadFrameButton from '../../components/load-frame-button/LoadFrameButton';
import VehicleLoadType from '../../assets/car-load-type-2.svg';
import MotoLoadType from '../../assets/moto-load-type-2.svg';
import PowerboatLoadType from '../../assets/powerboats-load-type-2.svg';
import SailboatLoadType from '../../assets/sailboat-load-type-2.svg';
import PersonalwatercraftLoadType from '../../assets/personal-watercrafts-load-type-2.svg';
import ATVLoadType from '../../assets/atv-load-type-2.svg';
import CommercialTruckLoadType from '../../assets/commercial-truck-load-type-2.svg';
import TrailerLoadType from '../../assets/trailer-load-type-2.svg';
import RVLoadType from '../../assets/rv-load-type-2.svg';
import PartsLoadType from '../../assets/parts-load-type-2.svg';
import Button from '../../components/button/Button';
import CarOrLightTruckLoadContainer
    from '../../components/load-containers/car-or-light-truck/CarOrLightTruckLoadContainer';
import MotoEquipmentLoadContainer from '../../components/load-containers/moto-equipment/MotoEquipmentLoadContainer';
import SailboatLoadContainer from '../../components/load-containers/sailboat-load/SailboatLoadContainer';
import TextInput from '../../components/text-input/TextInput';
import CustomCheckBox from '../../components/custom-checkbox/CustomCheckBox';
import styles from './VehicleLoad.module.scss';
import Alert from '../../components/floating-window-success/Alert';
import PersonalWatercraftsLoadContainer
    from "../../components/load-containers/personal-watercrafts/PersonalWatercraftsLoadContainer";
import ATVLoadContainer from "../../components/load-containers/atv-load-container/ATVLoadContainer";
import CommercialTruckLoad from "../../components/load-containers/commercial-truck/CommercialTruckLoad";
import PartsLoadContainer from "../../components/load-containers/parts-load-container/PartsLoadContainer";
import TrailerAndOtherVehicles from "../../components/load-containers/trailer-other-vehicle/TrailerAndOtherVehicles";
import RVLoadContainer from "../../components/load-containers/rv-load-container/RVLoadContainer";
import BoatLoadContainer from "../../components/load-containers/boat-load/BoatLoadContainer";

const loadTypes = [
    {loadType: 'Car or Light Truck', title: 'Car or Light Truck', imageSrc: VehicleLoadType},
    {loadType: 'Moto Equipment', title: 'Moto Equipment', imageSrc: MotoLoadType},
    {loadType: 'Powerboats', title: 'Powerboats', imageSrc: PowerboatLoadType},
    {loadType: 'Sailboats', title: 'Sailboats', imageSrc: SailboatLoadType},
    {loadType: 'Personal watercrafts', title: 'Personal watercrafts', imageSrc: PersonalwatercraftLoadType},
    {loadType: 'ATVs & Power Sports', title: 'ATVs & Power Sports', imageSrc: ATVLoadType},
    {loadType: 'Commercial Truck', title: 'Commercial Truck', imageSrc: CommercialTruckLoadType},
    {loadType: 'Parts', title: 'Parts', imageSrc: PartsLoadType},
    {loadType: 'Trailer & Other Vehicles', title: 'Trailer & Other Vehicles', imageSrc: TrailerLoadType},
    {loadType: 'RV (Recreational Vehicles)', title: 'RV (Recreational Vehicles)', imageSrc: RVLoadType},
];

const VehicleLoad = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [distance, setDistance] = useState(null);
    const [selectedLoadType, setSelectedLoadType] = useState(''); // Track the selected LoadFrameButton
    const [showAlert, setShowAlert] = useState(false);

    const [formData, setFormData] = useState({
        pickupLocation: '',
        pickupLocationDate: '',
        deliveryLocation: '',
        deliveryLocationDate: '',
        loadMilesTrip: '',
    });

    const handleLoadChange = (input) => (e) => {
        setFormData({...formData, [input]: e.target.value});
    };

    const handleLoadCategorySelect = (loadType) => {
        setSelectedLoadType(loadType); // Set the selected load type
        setShowAlert(false); // Hide alert on selection
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
                    coordinates: [originCoords, destinationCoords],
                },
                {
                    headers: {
                        Authorization: apiKey,
                        'Content-Type': 'application/json',
                    },
                }
            );
            const distanceInMeters = routeResponse.data.routes[0].summary.distance;
            const distanceInMiles = distanceInMeters / 1609.34;
            setDistance(distanceInMiles.toFixed(2));
            setFormData((prevData) => ({
                ...prevData,
                loadMilesTrip: distanceInMiles.toFixed(2),
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

    const goBackToStepTwo = () => {
        setStep(2);
    };

    const handleReturnToTheMainPage = () => {
        navigate('/');
    };

    const handleNextClick = () => {
        if (!selectedLoadType) {
            setShowAlert(true);
        } else {
            setStep(2);
        }
    };

    return (
        <>
            <Header/>
            <div className={styles.createLoadFrame}>
                {step === 1 && (
                    <CreateLoadContainer step={2} title="Vehicle Category"
                                         subTitle="Select the category of the vehicle you need">
                        <div className={styles.createLoadFrameContent}>
                            {loadTypes.map(({loadType, title, imageSrc}) => (
                                <LoadFrameButton
                                    key={loadType}
                                    loadType={loadType}
                                    title={title}
                                    imageSrc={imageSrc}
                                    isSelected={selectedLoadType === loadType}
                                    onClick={() => handleLoadCategorySelect(loadType)}
                                />
                            ))}
                        </div>
                        <section className={styles.loadFrameButtons}>
                            <Button variant="neutral-non-responsive" onClick={handleReturnToTheMainPage}>
                                Go Back
                            </Button>
                            <Button variant="default-non-responsive" onClick={handleNextClick}
                                    disabled={!selectedLoadType}>
                                Next
                            </Button>
                        </section>
                    </CreateLoadContainer>
                )}
                {step === 2 && (
                    <CreateLoadContainer step={3} title="Specify origin and delivery locations"
                                         subTitle="We can better assist you if you provide us with the following information">
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
                            {distance !== null &&
                                <p className="distance-in-miles">Estimated distance: {distance} miles</p>}
                            <div className="create-load-buttons">
                                <Button variant="neutral" buttonText="Go Back" onClick={() => setStep(1)}/>
                                <Button variant="default" buttonText="Next" onClick={() => setStep(3)}/>
                            </div>
                        </div>
                    </CreateLoadContainer>
                )}

                {step === 3 && (
                    <>
                        {selectedLoadType === 'Car or Light Truck' &&
                            <CarOrLightTruckLoadContainer
                                deliveryLocation={formData.deliveryLocation}
                                pickupLocation={formData.pickupLocation}
                                loadPickupDate={formData.pickupLocationDate}
                                loadDeliveryDate={formData.deliveryLocationDate}
                                loadMilesTrip={formData.loadMilesTrip}
                                loadType={selectedLoadType}
                                loadSubType={selectedLoadType}
                                goBack={goBackToStepTwo}
                                requireRegistration={true}/>}
                        {selectedLoadType === 'Moto Equipment' &&
                            <MotoEquipmentLoadContainer
                                deliveryLocation={formData.deliveryLocation}
                                pickupLocation={formData.pickupLocation}
                                loadPickupDate={formData.pickupLocationDate}
                                loadDeliveryDate={formData.deliveryLocationDate}
                                loadMilesTrip={formData.loadMilesTrip}
                                loadType={selectedLoadType}
                                loadSubType={selectedLoadType}
                                goBack={goBackToStepTwo}
                                requireRegistration={true}/>}
                        {selectedLoadType === 'Sailboats' &&
                            <SailboatLoadContainer
                                deliveryLocation={formData.deliveryLocation}
                                pickupLocation={formData.pickupLocation}
                                loadPickupDate={formData.pickupLocationDate}
                                loadDeliveryDate={formData.deliveryLocationDate}
                                loadMilesTrip={formData.loadMilesTrip}
                                loadType={selectedLoadType}
                                loadSubType={selectedLoadType}
                                goBack={goBackToStepTwo}
                                requireRegistration={true}/>}
                        {selectedLoadType === 'Personal watercrafts' &&
                            <PersonalWatercraftsLoadContainer
                                deliveryLocation={formData.deliveryLocation}
                                pickupLocation={formData.pickupLocation}
                                loadPickupDate={formData.pickupLocationDate}
                                loadDeliveryDate={formData.deliveryLocationDate}
                                loadMilesTrip={formData.loadMilesTrip}
                                loadType={selectedLoadType}
                                loadSubType={selectedLoadType}
                                goBack={goBackToStepTwo}
                                requireRegistration={true}/>}
                        {selectedLoadType === 'ATVs & Power Sports' &&
                            <ATVLoadContainer
                                deliveryLocation={formData.deliveryLocation}
                                pickupLocation={formData.pickupLocation}
                                loadPickupDate={formData.pickupLocationDate}
                                loadDeliveryDate={formData.deliveryLocationDate}
                                loadMilesTrip={formData.loadMilesTrip}
                                loadType={selectedLoadType}
                                loadSubType={selectedLoadType}
                                goBack={goBackToStepTwo}
                                requireRegistration={true}/>}
                        {selectedLoadType === 'Commercial Truck' &&
                            <CommercialTruckLoad
                                deliveryLocation={formData.deliveryLocation}
                                pickupLocation={formData.pickupLocation}
                                loadPickupDate={formData.pickupLocationDate}
                                loadDeliveryDate={formData.deliveryLocationDate}
                                loadMilesTrip={formData.loadMilesTrip}
                                loadType={selectedLoadType}
                                loadSubType={selectedLoadType}
                                goBack={goBackToStepTwo}
                                requireRegistration={true}/>}
                        {selectedLoadType === 'Parts' &&
                            <PartsLoadContainer deliveryLocation={formData.deliveryLocation}
                                                pickupLocation={formData.pickupLocation}
                                                loadPickupDate={formData.pickupLocationDate}
                                                loadDeliveryDate={formData.deliveryLocationDate}
                                                loadMilesTrip={formData.loadMilesTrip}
                                                loadType={selectedLoadType}
                                                loadSubType={selectedLoadType}
                                                goBack={goBackToStepTwo}
                                                requireRegistration={true}/>}
                        {selectedLoadType === 'Trailer & Other Vehicles' &&
                            <TrailerAndOtherVehicles deliveryLocation={formData.deliveryLocation}
                                                     pickupLocation={formData.pickupLocation}
                                                     loadPickupDate={formData.pickupLocationDate}
                                                     loadDeliveryDate={formData.deliveryLocationDate}
                                                     loadMilesTrip={formData.loadMilesTrip}
                                                     loadType={selectedLoadType}
                                                     loadSubType={selectedLoadType}
                                                     goBack={goBackToStepTwo}
                                                     requireRegistration={true}/>}
                        {selectedLoadType === 'RV (Recreational Vehicles)' &&
                            <RVLoadContainer deliveryLocation={formData.deliveryLocation}
                                             pickupLocation={formData.pickupLocation}
                                             loadPickupDate={formData.pickupLocationDate}
                                             loadDeliveryDate={formData.deliveryLocationDate}
                                             loadMilesTrip={formData.loadMilesTrip}
                                             loadType={selectedLoadType}
                                             loadSubType={selectedLoadType}
                                             goBack={goBackToStepTwo}
                                             requireRegistration={true}/>}
                        {selectedLoadType === 'Powerboats' &&
                            <BoatLoadContainer deliveryLocation={formData.deliveryLocation}
                                               pickupLocation={formData.pickupLocation}
                                               loadPickupDate={formData.pickupLocationDate}
                                               loadDeliveryDate={formData.deliveryLocationDate}
                                               loadMilesTrip={formData.loadMilesTrip}
                                               loadType={selectedLoadType}
                                               loadSubType={selectedLoadType}
                                               goBack={goBackToStepTwo}
                                               requireRegistration={true}/>}
                    </>
                )}
            </div>

            {showAlert &&
                <Alert status="warning" text="Warning" description="Please select a load category before proceeding."/>}

            <LandingPageFooter/>
        </>
    );
};

export default VehicleLoad;
