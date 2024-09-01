import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '40%',
    height: '250px',
    borderTopRightRadius: '25px',
    borderBottomRightRadius: '25px',
};

const GoogleMapShowLocation = ({ lat, lng }) => {
    // Convert lat and lng from strings to numbers
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

    // Ensure lat and lng are valid numbers
    const isValidLatLng = (value) => typeof value === 'number' && isFinite(value);

    const center = {
        lat: isValidLatLng(latNum) ? latNum : 0,
        lng: isValidLatLng(lngNum) ? lngNum : 0
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyDVNDAsPWNwktSF0f7KnAKO5hr8cWSJmNM">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={map => console.log('Map loaded:', map)}
                onError={error => console.error('Error loading map:', error)}
            >
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    );
};

export default GoogleMapShowLocation;