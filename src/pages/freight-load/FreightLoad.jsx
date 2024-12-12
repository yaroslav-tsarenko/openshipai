import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from '../../components/landing-page-new/header/Header';
import LandingPageFooter from '../../components/landing-page/landing-footer/LandingPageFooter';
import styles from './FreightLoad.module.scss';
import FreightLoadContainer from "../../components/load-containers/expedite-load-container/FreightLoadContainer";
import LocationTimeDataForm from "../../components/location-time-data-form/LocationTimeDataForm";

const FreightLoad = () => {

    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selectedLoadType] = useState(''); // Track the selected LoadFrameButton

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
                    <>
                        <FreightLoadContainer
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

export default FreightLoad;
