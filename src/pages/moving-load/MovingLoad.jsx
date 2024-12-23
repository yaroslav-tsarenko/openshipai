import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/landing-page-new/header/Header';
import LandingPageFooter from '../../components/landing-page/landing-footer/LandingPageFooter';
import CreateLoadContainer from '../../components/create-load-container/CreateLoadContainer';
import LoadFrameButton from '../../components/load-frame-button/LoadFrameButton';
import LocalMovingIcon from '../../assets/images/local-moving-load-type.svg';
import LongDistanceMovingIcon from '../../assets/images/long-distance-moving-load-type.svg';
import CommercialBusinessMovingIcon from '../../assets/images/business-moving-load-type.svg';
import HeavyMovingIcon from '../../assets/images/heavy-moving-load-type.svg';
import HouseholdMovingIcon from '../../assets/images/household-load-type.svg';
import OfficeMovingIcon from '../../assets/images/office-moving-load-type.svg';
import CorporateMovingIcon from '../../assets/images/corporate-moving-load-type.svg';
import StudentMovingIcon from '../../assets/images/student-moving-load-type.svg';
import MilitaryMovingIcon from '../../assets/images/military-moving-load-type.svg';
import Button from '../../components/button/Button';
import TextInput from '../../components/text-input/TextInput';
import CustomCheckBox from '../../components/custom-checkbox/CustomCheckBox';
import styles from './MovingLoad.module.scss';
import Alert from '../../components/floating-window-success/Alert';
import LocalMovingLoadContainer from "../../components/load-containers/local-moving/LocalMovingLoadContainer";
import LongDistanceMoving from "../../components/load-containers/long-distance-moving/LongDistanceMoving";
import HeavyLiftingAndMovingOnly
    from "../../components/load-containers/heavy-liftin-moving-only/HeavyLiftingMovingOnly";
import CommercialBusinessMoving from "../../components/load-containers/commercial-load-moving/CommercialBusinessMoving";
import HouseHoldItem from "../../components/load-containers/household-item/HouseHoldItem";
import MilitaryMoving from "../../components/load-containers/military-moving/MilitaryMoving";
import StudentMoving from "../../components/load-containers/student-moving/StudentMoving";
import CorporateMoving from "../../components/load-containers/corporate-moving/CorporateMoving";
import OfficeMoving from "../../components/load-containers/office-moving/OfficeMoving";

const loadTypes = [
    {loadType: 'Local Moving (less than 50 miles)', title: 'Local Moving (less than 50 miles)', imageSrc: LocalMovingIcon},
    {loadType: 'Long Distance Moving', title: 'Long Distance Moving', imageSrc: LongDistanceMovingIcon},
    {loadType: 'Commercial / Business Moving', title: 'Commercial / Business Moving', imageSrc: CommercialBusinessMovingIcon},
    {loadType: 'Heavy Lifting and Moving Only', title: 'Heavy Lifting and Moving Only', imageSrc: HeavyMovingIcon},
    {loadType: 'Household item', title: 'Household item', imageSrc: HouseholdMovingIcon},
    {loadType: 'Office Moving', title: 'Office Moving', imageSrc: OfficeMovingIcon},
    {loadType: 'Corporate Moving', title: 'Corporate Moving', imageSrc: CorporateMovingIcon},
    {loadType: 'Student Moving', title: 'Student Moving', imageSrc: StudentMovingIcon},
    {loadType: 'Military Moving', title: 'Military Moving', imageSrc: MilitaryMovingIcon},
];

const MovingLoad = () => {

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
        setSelectedLoadType(loadType);
        setShowAlert(false);
    };

    const calculateDistance = async (origin, destination) => {
        const apiKey = '5b3ce3597851110001cf6248762ba847e9554d668cd26cc9e7b6d06d';
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
                    <CreateLoadContainer step={2} title="Moving Category"
                                         subTitle="Select the category of moving you need">
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
                        {selectedLoadType === 'Local Moving (less than 50 miles)' &&
                            <LocalMovingLoadContainer
                                deliveryLocation={formData.deliveryLocation}
                                pickupLocation={formData.pickupLocation}
                                loadPickupDate={formData.pickupLocationDate}
                                loadDeliveryDate={formData.deliveryLocationDate}
                                loadMilesTrip={formData.loadMilesTrip}
                                loadType={selectedLoadType}
                                loadSubType={selectedLoadType}
                                goBack={goBackToStepTwo}
                                requireRegistration={true}/>}
                        {selectedLoadType === 'Long Distance Moving' &&
                            <LongDistanceMoving
                                deliveryLocation={formData.deliveryLocation}
                                pickupLocation={formData.pickupLocation}
                                loadPickupDate={formData.pickupLocationDate}
                                loadDeliveryDate={formData.deliveryLocationDate}
                                loadMilesTrip={formData.loadMilesTrip}
                                loadType={selectedLoadType}
                                loadSubType={selectedLoadType}
                                goBack={goBackToStepTwo}
                                requireRegistration={true}/>}
                        {selectedLoadType === 'Commercial / Business Moving' &&
                            <CommercialBusinessMoving
                                deliveryLocation={formData.deliveryLocation}
                                pickupLocation={formData.pickupLocation}
                                loadPickupDate={formData.pickupLocationDate}
                                loadDeliveryDate={formData.deliveryLocationDate}
                                loadMilesTrip={formData.loadMilesTrip}
                                loadType={selectedLoadType}
                                loadSubType={selectedLoadType}
                                goBack={goBackToStepTwo}
                                requireRegistration={true}/>}
                        {selectedLoadType === 'Heavy Lifting and Moving Only' &&
                            <HeavyLiftingAndMovingOnly
                                deliveryLocation={formData.deliveryLocation}
                                pickupLocation={formData.pickupLocation}
                                loadPickupDate={formData.pickupLocationDate}
                                loadDeliveryDate={formData.deliveryLocationDate}
                                loadMilesTrip={formData.loadMilesTrip}
                                loadType={selectedLoadType}
                                loadSubType={selectedLoadType}
                                goBack={goBackToStepTwo}
                                requireRegistration={true}/>}
                        {selectedLoadType === 'Household item' &&
                            <HouseHoldItem
                                deliveryLocation={formData.deliveryLocation}
                                pickupLocation={formData.pickupLocation}
                                loadPickupDate={formData.pickupLocationDate}
                                loadDeliveryDate={formData.deliveryLocationDate}
                                loadMilesTrip={formData.loadMilesTrip}
                                loadType={selectedLoadType}
                                loadSubType={selectedLoadType}
                                goBack={goBackToStepTwo}
                                requireRegistration={true}/>}
                        {selectedLoadType === 'Office Moving' &&
                            <OfficeMoving
                                deliveryLocation={formData.deliveryLocation}
                                pickupLocation={formData.pickupLocation}
                                loadPickupDate={formData.pickupLocationDate}
                                loadDeliveryDate={formData.deliveryLocationDate}
                                loadMilesTrip={formData.loadMilesTrip}
                                loadType={selectedLoadType}
                                loadSubType={selectedLoadType}
                                goBack={goBackToStepTwo}
                                requireRegistration={true}/>}
                        {selectedLoadType === 'Corporate Moving' &&
                            <CorporateMoving
                                deliveryLocation={formData.deliveryLocation}
                                pickupLocation={formData.pickupLocation}
                                loadPickupDate={formData.pickupLocationDate}
                                loadDeliveryDate={formData.deliveryLocationDate}
                                loadMilesTrip={formData.loadMilesTrip}
                                loadType={selectedLoadType}
                                loadSubType={selectedLoadType}
                                goBack={goBackToStepTwo}
                                requireRegistration={true}/>}
                        {selectedLoadType === 'Student Moving' &&
                            <StudentMoving deliveryLocation={formData.deliveryLocation}
                                           pickupLocation={formData.pickupLocation}
                                           loadPickupDate={formData.pickupLocationDate}
                                           loadDeliveryDate={formData.deliveryLocationDate}
                                           loadMilesTrip={formData.loadMilesTrip}
                                           loadType={selectedLoadType}
                                           loadSubType={selectedLoadType}
                                           goBack={goBackToStepTwo}
                                           requireRegistration={true}/>}
                        {selectedLoadType === 'Military Moving' &&
                            <MilitaryMoving deliveryLocation={formData.deliveryLocation}
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

export default MovingLoad;
