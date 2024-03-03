import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const ShowLocation = ({ lat, lng }) => {
    const location = { lat: parseFloat(lat), lng: parseFloat(lng) };
    const mapStyles = { height: "50vh", width: "100%", float: "right", borderTopRightRadius: "15px", borderBottomRightRadius: "15px"};

    return (
        <LoadScript googleMapsApiKey='AIzaSyBRtLE7Bp4U4rlvAMrEpVoJ2R_evqeohZo'>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={location}
            >
                <Marker position={location}/>
            </GoogleMap>
        </LoadScript>
    );
};

export default ShowLocation;