import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/landing-page-new/header/Header';
import LandingPageFooter from '../../components/landing-page/landing-footer/LandingPageFooter';
import CreateLoadContainer from '../../components/create-load-container/CreateLoadContainer';
import LoadFrameButton from '../../components/load-frame-button/LoadFrameButton';
import HeavyLoadType from '../../assets/heavy-load-type.png';
import Button from '../../components/button/Button';
import CarOrLightTruckLoadContainer from '../../components/load-containers/car-or-light-truck/CarOrLightTruckLoadContainer';
import MotoEquipmentLoadContainer from '../../components/load-containers/moto-equipment/MotoEquipmentLoadContainer';
import SailboatLoadContainer from '../../components/load-containers/sailboat-load/SailboatLoadContainer';
import TextInput from '../../components/text-input/TextInput';
import CustomCheckBox from '../../components/custom-checkbox/CustomCheckBox';
import styles from './VehicleLoad.module.scss';
import Alert from '../../components/floating-window-success/Alert';

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

    // Handle input changes in form fields
    const handleLoadChange = (input) => (e) => {
        setFormData({ ...formData, [input]: e.target.value });
    };

    // Handle the selection of the load category
    const handleLoadCategorySelect = (loadType) => {
        setSelectedLoadType(loadType); // Set the selected load type
        setShowAlert(false); // Hide alert on selection
    };

    // Calculate the distance between pickup and delivery locations
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
            <Header />
            <div className={styles.createLoadFrame}>
                {step === 1 && (
                    <CreateLoadContainer step={2} title="Vehicle Category" subTitle="Select the category of the vehicle you need">
                        <div className={styles.createLoadFrameContent}>
                            {[
                                'Car or Light Truck',
                                'Moto Equipment',
                                'Powerboats',
                                'Sailboats',
                                'Personal watercrafts',
                                'ATVs & Power Sports',
                                'Commercial Truck',
                                'Parts',
                                'Trailer & Other Vehicles',
                                'RV (Recreational Vehicles)',
                            ].map((loadType) => (
                                <LoadFrameButton
                                    key={loadType}
                                    loadType={loadType}
                                    imageSrc={HeavyLoadType}
                                    isSelected={selectedLoadType === loadType}
                                    onClick={() => handleLoadCategorySelect(loadType)}
                                />
                            ))}
                        </div>
                        <section className={styles.loadFrameButtons}>
                            <Button variant="neutral-non-responsive" onClick={handleReturnToTheMainPage}>
                                Go Back
                            </Button>
                            <Button variant="default" onClick={handleNextClick} disabled={!selectedLoadType}>
                                Next
                            </Button>
                        </section>
                    </CreateLoadContainer>
                )}

                {step === 2 && (
                    <CreateLoadContainer step={3} title="Specify origin and delivery locations" subTitle="We can better assist you if you provide us with the following information">
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
                            <Button variant="slim" buttonText="+ Add Stop" />
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
                                <CustomCheckBox id="checkbox1" label="I'm flexible" />
                                <CustomCheckBox id="checkbox2" label="In the next few days" />
                                <CustomCheckBox id="checkbox3" label="As soon as possible" />
                            </div>
                            {distance !== null && <p className="distance-in-miles">Estimated distance: {distance} miles</p>}
                            <div className="create-load-buttons">
                                <Button variant="neutral" buttonText="Go Back" onClick={() => setStep(1)} />
                                <Button variant="default" buttonText="Next" onClick={() => setStep(3)} />
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
                                requireRegistration={true}
                            />}
                        {selectedLoadType === 'Moto Equipment' && <MotoEquipmentLoadContainer goBack={goBackToStepTwo} />}
                        {selectedLoadType === 'Sailboats' && <SailboatLoadContainer goBack={goBackToStepTwo} />}
                    </>
                )}
            </div>

            {showAlert && <Alert status="warning" text="Warning" description="Please select a load category before proceeding." />}

            <LandingPageFooter />
        </>
    );
};

export default VehicleLoad;
