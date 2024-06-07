import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import _ from 'lodash';

const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '8px',
};

const GoogleMapCurrentLoadDirections = React.memo(function GoogleMapShowDirection({ origin, destination }) {
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [currentRequest, setCurrentRequest] = useState({ origin, destination });
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
        if (origin && destination && (origin !== currentRequest.origin || destination !== currentRequest.destination)) {
            debouncedDirectionsCallback(origin, destination);
        }
    }, [origin, destination, currentRequest.origin, currentRequest.destination, debouncedDirectionsCallback]);

    const directionsCallback = response => {
        if (response !== null) {
            if (response.status === 'OK') {
                setDirectionsResponse(response);
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
                center={directionsResponse ? directionsResponse.routes[0].bounds.getCenter() : { lat: -34.397, lng: 150.644 }}
                zoom={10}
            >
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

export default GoogleMapCurrentLoadDirections;