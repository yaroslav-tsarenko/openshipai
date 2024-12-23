import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DistanceCalculator = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [distance, setDistance] = useState(null);
    const [tripDuration, setTripDuration] = useState(null);
    const [arrivalTime, setArrivalTime] = useState(null);

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
            const distanceInMiles = distanceInMeters / 1609.344; // More accurate conversion factor
            const durationInSeconds = routeResponse.data.routes[0].summary.duration;
            const durationInMinutes = durationInSeconds / 60;
            const hours = Math.floor(durationInMinutes / 60);
            const minutes = Math.round(durationInMinutes % 60);

            const arrival = new Date();
            arrival.setMinutes(arrival.getMinutes() + durationInMinutes);

            setDistance(distanceInMiles.toFixed(2));
            setTripDuration(`${hours} hours ${minutes} min`);
            setArrivalTime(arrival.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        } catch (error) {
            console.error('Error calculating distance:', error);
            setDistance(null);
            setTripDuration(null);
            setArrivalTime(null);
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
            {tripDuration !== null && (
                <p style={{color: "black"}}>The trip duration is {tripDuration}.</p>
            )}
            {arrivalTime !== null && (
                <p style={{color: "black"}}>The estimated arrival time is {arrivalTime}.</p>
            )}
        </div>
    );
};

export default DistanceCalculator;