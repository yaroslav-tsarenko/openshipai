import React, { useState, useEffect, useRef } from 'react';
import {
    GoogleMap,
    LoadScriptNext,
    DirectionsService,
    DirectionsRenderer,
    TrafficLayer,
    Marker,
} from '@react-google-maps/api';
import ErrorBoundary from "../../error-boundary/ErrorBoundary";

const libraries = ['places'];

const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
};

function GoogleMapRealTimeTrafficComponent({ origin, destination }) {
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [routeInfo, setRouteInfo] = useState({ distance: '', duration: '' });
    const [fuelStops, setFuelStops] = useState([]);
    const mapRef = useRef(null);

    useEffect(() => {
        if (!origin || !destination) return;
        setDirectionsResponse(null); // Reset on new origin/destination
    }, [origin, destination]);

    const directionsCallback = (response) => {
        if (!response) {
            console.error('No response from DirectionsService');
            return;
        }

        if (response.status === 'OK') {
            setDirectionsResponse(response);
            const leg = response.routes[0].legs[0];
            setRouteInfo({
                distance: leg.distance.text,
                duration: leg.duration.text,
            });
        } else {
            console.error(`Directions request failed: ${response.status}`);
        }
    };

    const handleMapLoad = (map) => {
        mapRef.current = map;
    };

    return (
        <ErrorBoundary>
            <LoadScriptNext
                googleMapsApiKey="AIzaSyBBf32Vkymgt4v6YF5TAw_0cmCx9ESeuD4"
                libraries={libraries}
                loadingElement={<div>Loading Google Maps...</div>}
                id="google-maps-script"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={directionsResponse ? directionsResponse.routes[0].legs[0].start_location : { lat: 37.7749, lng: -122.4194 }}
                    zoom={10}
                    onLoad={handleMapLoad}
                >
                    <TrafficLayer />
                    {origin && destination && !directionsResponse && (
                        <DirectionsService
                            options={{
                                destination,
                                origin,
                                travelMode: 'DRIVING',
                            }}
                            callback={directionsCallback}
                        />
                    )}
                    {directionsResponse && (
                        <DirectionsRenderer
                            options={{ directions: directionsResponse }}
                        />
                    )}
                    {fuelStops.map((stop, index) => (
                        <Marker key={index} position={stop.location} />
                    ))}
                </GoogleMap>
            </LoadScriptNext>
        </ErrorBoundary>

    );
}

export default GoogleMapRealTimeTrafficComponent;
