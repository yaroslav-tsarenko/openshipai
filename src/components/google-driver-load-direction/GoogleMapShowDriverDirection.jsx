import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';
import _ from 'lodash';

const containerStyle = {
    width: '100%',
    height: '100%',
    borderTopRightRadius: '45px',
    borderTopLeftRadius: '45px',
};

const GoogleMapShowDriverDirection = React.memo(function GoogleMapShowDriverDirection({ origin, destination }) {
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [currentRequest, setCurrentRequest] = useState({ origin, destination });
    const [currentLocation, setCurrentLocation] = useState(null);
    const directionsServiceRef = useRef();

    const debouncedDirectionsCallback = useCallback(_.debounce((origin, destination) => {
        setDirectionsResponse(null);
        setCurrentRequest({ origin, destination });
    }, 500), []); // Debounce time is 500ms

    window.onerror = function(message, source, lineno, colno, error) {
        console.error('An error occurred: ', message);
        return true;
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
                },
                (error) => {
                    console.log(error);
                },
                { enableHighAccuracy: true }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }, []);

    useEffect(() => {
        if (origin && destination && (origin !== currentRequest.origin || destination !== currentRequest.destination)) {
            debouncedDirectionsCallback(origin, destination);
        }
    }, [origin, destination, currentRequest.origin, currentRequest.destination, debouncedDirectionsCallback]);

    const directionsCallback = response => {
        if (response !== null) {
            if (response.status === 'OK') {
                setDirectionsResponse(response);
            } else if (response.status === 'ZERO_RESULTS') {
                console.log('No route could be found between the origin and destination.');
            } else {
                console.log('Directions request failed due to ' + response.status);
            }
        }
    };

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDVNDAsPWNwktSF0f7KnAKO5hr8cWSJmNM"
            libraries={['places']}
            preventGoogleFontsLoading
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentLocation || { lat: -34.397, lng: 150.644 }}
                zoom={10}
            >
                {currentLocation && (
                    <Marker position={currentLocation} />
                )}

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
            </GoogleMap>
        </LoadScript>
    );
});

export default GoogleMapShowDriverDirection;