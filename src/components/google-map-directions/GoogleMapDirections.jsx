import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
};

function GoogleMapDirections({ origin, destination }) {
    const [directionsResponse, setDirectionsResponse] = useState(null);

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
            googleMapsApiKey="AIzaSyBRtLE7Bp4U4rlvAMrEpVoJ2R_evqeohZo"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={origin}
                zoom={10}
            >
                {origin && destination && (
                    <DirectionsService
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
}

export default GoogleMapDirections;