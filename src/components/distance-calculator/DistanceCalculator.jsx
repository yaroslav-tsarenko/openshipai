import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DistanceCalculator = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [distance, setDistance] = useState(null);

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
        } catch (error) {
            console.error('Error calculating distance:', error);
            setDistance(null);
        }
    };

    useEffect(() => {
        if (origin && destination) {
            calculateDistance(origin, destination);
        }
    }, [origin, destination]);

    return (
        <div>
            <h1 style={{color: "black"}}>Distance Calculator</h1>
            <input
                type="text"
                placeholder="Enter origin"
                value={origin}
                style={{border: "1px solid black", marginTop: "10px"}}
                onChange={(e) => setOrigin(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter destination"
                value={destination}
                style={{border: "1px solid black", marginTop: "10px"}}
                onChange={(e) => setDestination(e.target.value)}
            />
            {distance !== null && (
                <p style={{color: "black"}}>The distance between {origin} and {destination} is {distance} miles.</p>
            )}
        </div>
    );
};

export default DistanceCalculator;
