import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateLoadContainer from '../../components/create-load-container/CreateLoadContainer';
import TextInput from '../../components/text-input/TextInput';
import Button from '../../components/button/Button';
import CustomCheckBox from '../../components/custom-checkbox/CustomCheckBox';
import InfoItem from "../info-item/InfoItem";

const LocationTimeDataForm = ({ currentStep, formData, setFormData, handleLoadChange, handleBack, handleNext }) => {
    const [distance, setDistance] = useState(null);
    const [selectedPreferences, setSelectedPreferences] = useState(formData.loadOriginDeliveryPreference);
    const [isFormValid, setIsFormValid] = useState(false);
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [deliverySuggestions, setDeliverySuggestions] = useState([]);
    const [stops, setStops] = useState(formData.stops || []);

    const handleCheckboxChange = (preference, isChecked) => {
        const updatedPreferences = isChecked ? [preference] : [];
        setSelectedPreferences(updatedPreferences);
        setFormData((prevData) => ({
            ...prevData,
            loadOriginDeliveryPreference: updatedPreferences,
        }));
    };

    const [pickupLocation, setPickupLocation] = useState({ country: '', state: '', city: '', zip: '' });
    const [deliveryLocation, setDeliveryLocation] = useState({ country: '', state: '', city: '', zip: '' });

    const handleLocationChange = (type, field, value) => {
        if (type === 'pickup') {
            setPickupLocation((prev) => ({ ...prev, [field]: value }));
            if (field === 'city' || field === 'zip') {
                setFormData((prevData) => ({ ...prevData, pickupLocation: `${pickupLocation.city}, ${pickupLocation.zip}` }));
            }
        } else if (type === 'delivery') {
            setDeliveryLocation((prev) => ({ ...prev, [field]: value }));
            if (field === 'city' || field === 'zip') {
                setFormData((prevData) => ({ ...prevData, deliveryLocation: `${deliveryLocation.city}, ${deliveryLocation.zip}` }));
            }
        }
    };

    const fetchAddressSuggestions = async (query, setSuggestions) => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                params: {
                    q: query,
                    format: 'json',
                    addressdetails: 1,
                    countrycodes: 'us',
                },
            });
            setSuggestions(response.data);
        } catch (error) {
            console.error('Error fetching address suggestions:', error);
            setSuggestions([]);
        }
    };

    const handleAddressChange = (type, value) => {
        if (type === 'pickup') {
            setFormData((prevData) => ({ ...prevData, pickupLocation: value }));
            fetchAddressSuggestions(value, setPickupSuggestions);
        } else if (type === 'delivery') {
            setFormData((prevData) => ({ ...prevData, deliveryLocation: value }));
            fetchAddressSuggestions(value, setDeliverySuggestions);
        }
    };

    const handleSuggestionSelect = (type, suggestion) => {
        const address = suggestion.display_name;
        if (type === 'pickup') {
            setFormData((prevData) => ({ ...prevData, pickupLocation: address }));
            setPickupSuggestions([]);
        } else if (type === 'delivery') {
            setFormData((prevData) => ({ ...prevData, deliveryLocation: address }));
            setDeliverySuggestions([]);
        }
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

    useEffect(() => {
        const isValid = formData.pickupLocation && formData.pickupLocationDate &&
            formData.deliveryLocation && formData.deliveryLocationDate;
        setIsFormValid(isValid);
    }, [formData.pickupLocation, formData.pickupLocationDate, formData.deliveryLocation, formData.deliveryLocationDate]);

    const addStop = () => {
        if (stops.length < 5) {
            setStops([...stops, { location: '', date: '' }]);
        }
    };

    const removeStop = (index) => {
        const updatedStops = stops.filter((_, i) => i !== index);
        setStops(updatedStops);
    };

    const handleStopChange = (index, field, value) => {
        const updatedStops = stops.map((stop, i) => i === index ? { ...stop, [field]: value } : stop);
        setStops(updatedStops);
    };

    useEffect(() => {
        setFormData((prevData) => ({ ...prevData, stops }));
    }, [stops]);

    return (
        <CreateLoadContainer step={currentStep} title="Specify origin and delivery locations"
                             subTitle="We can better assist you if you provide us with the following information">
            <div className="load-creation-input-fields">
                <InfoItem>
                    Pickup Location
                </InfoItem>
                <TextInput
                    type="locations"
                    id="pickupLocation"
                    value={formData.pickupLocation || ''}
                    onChange={(e) => handleAddressChange('pickup', e.target.value)}
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
                {stops.map((stop, index) => (
                    <div key={index} className="stops-container">
                        <InfoItem>
                            Stop {index + 1}
                        </InfoItem>
                        <TextInput
                            type="locations"
                            id={`stopLocation${index}`}
                            value={stop.location}
                            onChange={(e) => handleStopChange(index, 'location', e.target.value)}
                            label={`Stop ${index + 1} Location`}
                        />
                        <TextInput
                            type="datetime-local"
                            id={`stopDate${index}`}
                            autoComplete="off"
                            className="google-style-input"
                            onChange={(e) => handleStopChange(index, 'date', e.target.value)}
                            value={stop.date}
                            required
                            label={`Stop ${index + 1} Date And Time`}
                        />
                        <Button variant="remove-stop" buttonText="Remove Stop" onClick={() => removeStop(index)} />
                    </div>
                ))}
                <Button variant="add-stop" buttonText="Add Stop" onClick={addStop} disabled={stops.length >= 5} />
                <InfoItem>
                    Delivery Location
                </InfoItem>
                <TextInput
                    type="locations"
                    id="deliveryLocation"
                    value={formData.deliveryLocation || ''}
                    onChange={(e) => handleAddressChange('delivery', e.target.value)}
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
                <div className="load-preference-checkboxes">
                    <CustomCheckBox
                        id="checkbox1"
                        label="I'm flexible"
                        checked={selectedPreferences.includes("I'm flexible")}
                        onClick={(isChecked) => handleCheckboxChange("I'm flexible", isChecked)}
                    />
                    <CustomCheckBox
                        id="checkbox2"
                        label="In the next few days"
                        checked={selectedPreferences.includes("In the next few days")}
                        onClick={(isChecked) => handleCheckboxChange("In the next few days", isChecked)}
                    />
                    <CustomCheckBox
                        id="checkbox3"
                        label="As soon as possible"
                        checked={selectedPreferences.includes("As soon as possible")}
                        onClick={(isChecked) => handleCheckboxChange("As soon as possible", isChecked)}
                    />
                </div>
                {distance !== null &&
                    <p className="distance-in-miles">Estimated distance: {distance} miles</p>}
                <div className="create-load-buttons">
                    <Button variant="neutral" buttonText="Go Back" onClick={handleBack} />
                    <Button variant="default-100" buttonText="Next" onClick={handleNext} disabled={!isFormValid} />
                </div>
            </div>
        </CreateLoadContainer>
    );
};

export default LocationTimeDataForm;