import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, TrafficLayer, Marker, InfoWindow } from '@react-google-maps/api';
import './GoogleMapRealTimeTrafficComponent.css';
import WeatherComponent from "../../weather-component/WeatherComponent";

const containerStyle = {
    width: '70%',
    height: '35vh'
};

function GoogleMapRealTimeTrafficComponent({ origin, destination }) {
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [infoWindowPosition, setInfoWindowPosition] = useState(null);
    const [routeInfo, setRouteInfo] = useState({ distance: '', duration: '' });
    const [fuelStops, setFuelStops] = useState([]);
    const [fuelStopsCount, setFuelStopsCount] = useState(0);
    const [weather, setWeather] = useState(null); // State for weather data
    const [currentRequest, setCurrentRequest] = useState({ origin, destination });
    const directionsServiceRef = useRef();
    const mapRef = useRef();

    useEffect(() => {
        if (origin && destination && (origin !== currentRequest.origin || destination !== currentRequest.destination)) {
            setDirectionsResponse(null);
            setFuelStops([]);
            setFuelStopsCount(0);
            setCurrentRequest({ origin, destination });
            fetchWeatherData(destination); // Fetch weather data for destination
        }
    }, [origin, destination, currentRequest.origin, currentRequest.destination]);

    const fetchWeatherData = async (location) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=08aadf33344b3a68713abc2bb85e0810&units=metric`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Weather data: ", data); // Log the fetched data
            setWeather(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };
    console.log("Weather state: ", weather); // Log the weather state
    console.log("Weather state: ", weather); // Log the weather state

    const directionsCallback = response => {
        if (response !== null) {
            if (response.status === 'OK') {
                setDirectionsResponse(response);
                const leg = response.routes[0].legs[0];
                setRouteInfo({
                    distance: leg.distance.text,
                    duration: leg.duration.text
                });
                setInfoWindowPosition(leg.steps[0].start_location);
                findFuelStops(leg);
            } else {
                console.log('Directions request failed due to ' + response.status);
            }
        }
    };

    const findFuelStops = (leg) => {
        const service = new window.google.maps.places.PlacesService(mapRef.current.state.map);
        const request = {
            location: leg.start_location,
            radius: '50000',
            type: ['gas_station']
        };

        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setFuelStops(results);
                setFuelStopsCount(results.length);
            }
        });
    };

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBRtLE7Bp4U4rlvAMrEpVoJ2R_evqeohZo" // Replace with your API key
            libraries={['places']}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={directionsResponse ? directionsResponse.routes[0].bounds.getCenter() : { lat: -34.397, lng: 150.644 }}
                zoom={10}
                ref={mapRef}
            >
                <TrafficLayer />

                {origin && destination && !directionsResponse && (
                    <DirectionsService
                        ref={directionsServiceRef}
                        options={{
                            destination: destination,
                            origin: origin,
                            travelMode: 'DRIVING'
                        }}
                        callback={directionsCallback}
                    />
                )}

                {directionsResponse && (
                    <DirectionsRenderer
                        options={{
                            directions: directionsResponse
                        }}
                    />
                )}

                {fuelStops.map((place, index) => (
                    <Marker key={index} position={place.geometry.location} />
                ))}

                {infoWindowPosition && (
                    <InfoWindow
                        position={infoWindowPosition}
                        onCloseClick={() => setInfoWindowPosition(null)}
                    >
                        <div className="google-map-real-time-traffic-component">
                            <p className="google-map-text">{routeInfo.distance}</p>
                            <p className="google-map-text">{routeInfo.duration}</p>
                            <p className="google-map-text">Fuel Stops: {fuelStopsCount}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
}

export default GoogleMapRealTimeTrafficComponent;
