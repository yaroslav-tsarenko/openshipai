import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from '../../components/landing-page-new/header/Header';
import LandingPageFooter from '../../components/landing-page/landing-footer/LandingPageFooter';
import styles from './HeavyEquipmentLoad.module.scss';
import HeavyEquipmentLoadContainer from "../../components/load-containers/heavy-equipment/HeavyEquipmentContainer";
import LocationTimeDataForm from "../../components/location-time-data-form/LocationTimeDataForm";

const HeavyEquipmentLoad = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        pickupLocation: '',
        pickupLocationDate: '',
        deliveryLocation: '',
        deliveryLocationDate: '',
        loadMilesTrip: '',
        loadLocationStops: [],
        stops: [],
        loadOriginDeliveryPreference: []
    });

    const handleLoadChange = (input) => (e) => {
        setFormData({...formData, [input]: e.target.value});
    };

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
                    <LocationTimeDataForm
                        formData={formData}
                        setFormData={setFormData}
                        handleLoadChange={handleLoadChange}
                        handleReturnToTheMainPage={handleReturnToTheMainPage}
                        setStep={setStep}
                        currentStep={3}
                    />
                )}
                {step === 3 && (
                    <HeavyEquipmentLoadContainer
                        deliveryLocation={formData.deliveryLocation}
                        pickupLocation={formData.pickupLocation}
                        loadPickupDate={formData.pickupLocationDate}
                        loadDeliveryDate={formData.deliveryLocationDate}
                        loadMilesTrip={formData.loadMilesTrip}
                        loadType={''}
                        loadSubType={''}
                        loadLocationStops={formData.loadLocationStops}
                        stops={formData.stops}
                        loadOriginDeliveryPreference={formData.loadOriginDeliveryPreference}
                        goBack={goBackToStepOne}
                        requireRegistration={true}
                    />
                )}
            </div>
            <LandingPageFooter/>
        </>
    );
};

export default HeavyEquipmentLoad;
