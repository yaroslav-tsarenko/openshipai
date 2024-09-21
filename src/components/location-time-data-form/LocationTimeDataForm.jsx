import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CreateLoadContainer from '../../components/create-load-container/CreateLoadContainer';
import TextInput from '../../components/text-input/TextInput';
import Button from '../../components/button/Button';
import CustomCheckBox from '../../components/custom-checkbox/CustomCheckBox';

const LocationTimeDataForm = ({currentStep, formData, setFormData, handleLoadChange, handleBack, handleNext}) => {
    const [distance, setDistance] = useState(null);
    const [selectedPreferences, setSelectedPreferences] = useState(formData.loadOriginDeliveryPreference);

    const addStop = () => {
        const newStops = [...formData.stops, {stopLoadLocation: '', stopLoadLocationTime: ''}];
        setFormData((prevData) => ({
            ...prevData,
            stops: newStops,
        }));
    };

    const handleStopChange = (index, field) => (e) => {
        const newStops = [...formData.stops];
        newStops[index][field] = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            stops: newStops,
            loadLocationStops: newStops.map((stop, idx) => ({
                stop: idx + 1,
                locationStop: stop.stopLoadLocation,
                locationStopAndTime: stop.stopLoadLocationTime,
            })),
        }));
    };

    const handleCheckboxChange = (preference) => {
        const updatedPreferences = selectedPreferences.includes(preference) ? [] : [preference];
        setSelectedPreferences(updatedPreferences);
        setFormData((prevData) => ({
            ...prevData,
            loadOriginDeliveryPreference: updatedPreferences,
        }));
    };

    const calculateDistance = async (origin, destination) => {
        const apiKey = '5b3ce3597851110001cf6248aaf2054f2cee4e6da1ceb0598a98a7ca'; // Replace with your API key
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

    return (
        <CreateLoadContainer step={currentStep} title="Specify origin and delivery locations"
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
                        type="datetime-local"
                        id="pickupLocationDate"
                        autoComplete="off"
                        className="google-style-input"
                        onChange={handleLoadChange('pickupLocationDate')}
                        value={formData.pickupLocationDate}
                        required
                        label="Pickup Date And Time"
                    />
                </div>
                {formData.stops.map((stop, index) => (
                    <div key={index} className="input-fields-with-date-time">
                        <h4>Stop {index + 1}</h4>
                        <TextInput
                            type="text"
                            id={`stopLocation${index}`}
                            autoComplete="off"
                            className="google-style-input"
                            onChange={handleStopChange(index, 'stopLoadLocation')}
                            value={stop.stopLoadLocation}
                            required
                            label="Stop Location"
                        />
                        <TextInput
                            type="datetime-local"
                            id={`stopTime${index}`}
                            autoComplete="off"
                            className="google-style-input"
                            onChange={handleStopChange(index, 'stopLoadLocationTime')}
                            value={stop.stopLoadLocationTime}
                            required
                            label="Stop Location Time"
                        />
                    </div>
                ))}
                <Button variant="slim" buttonText="+ Add Stop" onClick={addStop}/>
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
                        type="datetime-local"
                        id="deliveryLocationDate"
                        autoComplete="off"
                        className="google-style-input"
                        onChange={handleLoadChange('deliveryLocationDate')}
                        value={formData.deliveryLocationDate}
                        required
                        label="Delivery Date And Time"
                    />
                </div>
                <div className="load-preference-checkboxes">
                    <CustomCheckBox
                        id="checkbox1"
                        label="I'm flexible"
                        checked={selectedPreferences.includes("I'm flexible")}
                        onClick={() => handleCheckboxChange("I'm flexible")}
                    />
                    <CustomCheckBox
                        id="checkbox2"
                        label="In the next few days"
                        checked={selectedPreferences.includes("In the next few days")}
                        onClick={() => handleCheckboxChange("In the next few days")}
                    />
                    <CustomCheckBox
                        id="checkbox3"
                        label="As soon as possible"
                        checked={selectedPreferences.includes("As soon as possible")}
                        onClick={() => handleCheckboxChange("As soon as possible")}
                    />
                </div>
                {distance !== null &&
                    <p className="distance-in-miles">Estimated distance: {distance} miles</p>}
                <div className="create-load-buttons">
                    <Button variant="neutral" buttonText="Go Back" onClick={handleBack}/>
                    <Button variant="default-non-responsive" buttonText="Next" onClick={handleNext}/>
                </div>
            </div>
        </CreateLoadContainer>
    );
};

export default LocationTimeDataForm;
