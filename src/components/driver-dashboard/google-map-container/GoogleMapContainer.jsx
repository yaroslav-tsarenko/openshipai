import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, InfoWindow } from '@react-google-maps/api';
import './GoogleMapContainer.css';

const containerStyle = {
    width: '70%',
    height: '30vh'
};

function GoogleMapContainer({ origin, destination }) {
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [infoWindowPosition, setInfoWindowPosition] = useState(null);
    const [routeInfo, setRouteInfo] = useState({ distance: '', duration: '' });
    const [currentRequest, setCurrentRequest] = useState({ origin, destination }); // Define currentRequest in state
    const directionsServiceRef = useRef();

    useEffect(() => {
        if (origin && destination && (origin !== currentRequest.origin || destination !== currentRequest.destination)) {
            setDirectionsResponse(null); // Clear existing directions
            setCurrentRequest({ origin, destination }); // Update currentRequest
        }
    }, [origin, destination, currentRequest.origin, currentRequest.destination]); // Add currentRequest to dependency array

    const directionsCallback = response => {
        if (response !== null) {
            if (response.status === 'OK') {
                setDirectionsResponse(response);
                // Extract route info and set InfoWindow position
                const leg = response.routes[0].legs[0];
                setRouteInfo({
                    distance: leg.distance.text,
                    duration: leg.duration.text
                });
                setInfoWindowPosition(leg.steps[0].start_location);
            } else {
                console.log('Directions request failed due to ' + response.status);
            }
        }
    };

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBRtLE7Bp4U4rlvAMrEpVoJ2R_evqeohZo" // Replace with your API key
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

                {infoWindowPosition && (
                    <InfoWindow
                        position={infoWindowPosition}
                        onCloseClick={() => setInfoWindowPosition(null)}
                    >
                        <div className="google-map-container">
                            <p className="google-map-text">{routeInfo.distance}</p>
                            <p className="google-map-text">{routeInfo.duration}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
}

export default GoogleMapContainer;
