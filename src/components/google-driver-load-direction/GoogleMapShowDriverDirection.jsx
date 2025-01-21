import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, OverlayView } from '@react-google-maps/api';
import _ from 'lodash';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const libraries = ['places'];

const CustomMarker = ({ position, children }) => (
    <OverlayView
        position={position}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
        <div style={{
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: '3px solid white',
            width: '50px',
            height: '50px',
            overflow: 'hidden',
            objectFit: 'cover',
        }}>
            {children}
        </div>
    </OverlayView>
);

const GoogleMapShowDriverDirection = React.memo(function GoogleMapShowDriverDirection({ origin, destination, currentLocation, driverAvatar, isTripStarted }) {
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
            libraries={libraries}
            preventGoogleFontsLoading
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentLocation || { lat: -34.397, lng: 150.644 }}
                zoom={10}
            >
                {currentLocation && (
                    <CustomMarker position={currentLocation}>
                        <img
                            src={driverAvatar}
                            alt="Driver Avatar"
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                border: '1px solid black',
                                objectFit: 'cover'
                            }}
                        />
                    </CustomMarker>
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

                {isTripStarted === "Not Started" && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        fontSize: '24px',
                        zIndex: 1,
                        backdropFilter: 'blur(5px)'
                    }}>
                        Click on "Start Trip" to start your journey
                    </div>
                )}
            </GoogleMap>
        </LoadScript>
    );
});

export default GoogleMapShowDriverDirection;