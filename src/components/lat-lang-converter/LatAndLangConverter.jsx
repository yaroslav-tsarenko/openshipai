import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMapShowLocation from "../google-map-show-driver-location/GoogleMapShowLocation";
import GoogleMapRealTimeTrafficComponent
    from "../driver-dashboard/google-map-real-time-traffic-data/GoogleMapRealTimeTrafficComponent";

const LatAndLangConverter = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [coordinates, setCoordinates] = useState('');
    const [location, setLocation] = useState('');
    const [tripDetails, setTripDetails] = useState(null);
    const [error, setError] = useState('');

    const handleOriginChange = (event) => {
        setOrigin(event.target.value);
    };

    const handleDestinationChange = (event) => {
        setDestination(event.target.value);
    };

    const handleCoordinatesChange = (event) => {
        setCoordinates(event.target.value);
    };

    const fetchCoordinates = async (location) => {
        try {
            const response = await axios.get(
                `https://api.openrouteservice.org/geocode/search`,
                {
                    params: {
                        api_key: '5b3ce3597851110001cf6248aaf2054f2cee4e6da1ceb0598a98a7ca',
                        text: location,
                    },
                }
            );

            if (response.data.features.length > 0) {
                const { coordinates } = response.data.features[0].geometry;
                return { lat: coordinates[1], lng: coordinates[0] };
            } else {
                throw new Error('Location not found');
            }
        } catch (error) {
            throw new Error('An error occurred while fetching the coordinates');
        }
    };

    const fetchLocation = async (lat, lng) => {
        try {
            const response = await axios.get(
                `https://api.openrouteservice.org/geocode/reverse`,
                {
                    params: {
                        api_key: '5b3ce3597851110001cf6248aaf2054f2cee4e6da1ceb0598a98a7ca',
                        point: `${lng},${lat}`,
                    },
                }
            );

            if (response.data.features.length > 0) {
                const locationName = response.data.features[0].properties.label;
                setLocation(locationName);
                setError('');
            } else {
                throw new Error('Location not found');
            }
        } catch (error) {
            setError('An error occurred while fetching the location');
            setLocation('');
        }
    };

    const calculateTripDetails = async () => {
        try {
            const originCoords = await fetchCoordinates(origin);
            const destinationCoords = await fetchCoordinates(destination);

            const response = await axios.post(
                `https://api.openrouteservice.org/v2/directions/driving-car`,
                {
                    coordinates: [
                        [originCoords.lng, originCoords.lat],
                        [destinationCoords.lng, destinationCoords.lat],
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer 5b3ce3597851110001cf6248aaf2054f2cee4e6da1ceb0598a98a7ca`,
                    },
                }
            );

            const tripData = response.data.routes[0];
            const allTripMiles = tripData.summary.distance / 1609.34; // Convert meters to miles
            const overallTime = tripData.summary.duration / 3600; // Convert seconds to hours
            const currentTime = new Date();
            const arrivalTime = new Date(currentTime.getTime() + tripData.summary.duration * 1000);

            setTripDetails({
                allTripMiles,
                overallTime,
                arrivalTime: arrivalTime.toLocaleString(),
            });
            setError('');
        } catch (error) {
            setError(error.message);
            setTripDetails(null);
        }
    };

    useEffect(() => {
        if (origin && destination) {
            calculateTripDetails();
        }
    }, [origin, destination]);

    useEffect(() => {
        const coords = coordinates.split(' ');
        if (coords.length === 2) {
            const [lat, lng] = coords.map(parseFloat);
            if (!isNaN(lat) && !isNaN(lng)) {
                fetchLocation(lat, lng);
            }
        }
    }, [coordinates]);

    return (
        <div>
            <input
                type="text"
                value={origin}
                onChange={handleOriginChange}
                placeholder="Enter origin"
            />
            <input
                type="text"
                value={destination}
                onChange={handleDestinationChange}
                placeholder="Enter destination"
            />
            <input
                type="text"
                value={coordinates}
                onChange={handleCoordinatesChange}
                placeholder="Enter coordinates (lat lng)"
            />
            {tripDetails && (
                <div>
                    <p style={{ color: 'black' }}>All Trip Miles: {tripDetails.allTripMiles.toFixed(2)}</p>
                    <p style={{ color: 'black' }}>Overall Time (hours): {tripDetails.overallTime.toFixed(2)}</p>
                    <p style={{ color: 'black' }}>Arrival Time: {tripDetails.arrivalTime}</p>
                </div>
            )}
            {location && (
                <div>
                    <p style={{ color: 'black' }}>Location: {location}</p>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}

        </div>
    );
};

export default LatAndLangConverter;
