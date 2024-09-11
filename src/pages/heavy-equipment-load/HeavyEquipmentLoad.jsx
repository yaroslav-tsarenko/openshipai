import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/landing-page-new/header/Header';
import LandingPageFooter from '../../components/landing-page/landing-footer/LandingPageFooter';
import CreateLoadContainer from '../../components/create-load-container/CreateLoadContainer';
import Button from '../../components/button/Button';
import TextInput from '../../components/text-input/TextInput';
import CustomCheckBox from '../../components/custom-checkbox/CustomCheckBox';
import styles from './HeavyEquipmentLoad.module.scss';
import HeavyEquipmentLoadContainer from "../../components/load-containers/heavy-equipment/HeavyEquipmentContainer";

const HeavyEquipmentLoad = () => {

    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [distance, setDistance] = useState(null);
    const [selectedLoadType, setSelectedLoadType] = useState(''); // Track the selected LoadFrameButton

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

    const goBackToStepOne = () => {
        setStep(1);
    };

    const handleReturnToTheMainPage = () => {
        navigate('/');
    };

    return (
        <>
            <Header/>
            <div className={styles.createLoadFrame}>
                {step === 1 && (
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
                                <Button variant="neutral" buttonText="Go Back" onClick={handleReturnToTheMainPage}/>
                                <Button variant="default-non-responsive" buttonText="Next" onClick={() => setStep(3)}/>
                            </div>
                        </div>
                    </CreateLoadContainer>
                )}

                {step === 3 && (
                    <>
                        <HeavyEquipmentLoadContainer
                            deliveryLocation={formData.deliveryLocation}
                            pickupLocation={formData.pickupLocation}
                            loadPickupDate={formData.pickupLocationDate}
                            loadDeliveryDate={formData.deliveryLocationDate}
                            loadMilesTrip={formData.loadMilesTrip}
                            loadType={selectedLoadType}
                            loadSubType={selectedLoadType}
                            goBack={goBackToStepOne}
                            requireRegistration={true}/>
                    </>
                )}
            </div>
            <LandingPageFooter/>
        </>
    );
};

export default HeavyEquipmentLoad;
