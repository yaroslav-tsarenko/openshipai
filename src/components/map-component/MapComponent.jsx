import React, {useEffect, useRef, useState} from "react";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import mbxClient from "@mapbox/mapbox-sdk";
import mapboxgl from "mapbox-gl";

const MapComponent = ({ from, to }) => {
    const mapContainerRef = useRef(null);
    const [fromCoordinates, setFromCoordinates] = useState(null);
    const [toCoordinates, setToCoordinates] = useState(null);

    useEffect(() => {
        const geocodingClient = mbxGeocoding(mbxClient({ accessToken: mapboxgl.accessToken }));

        geocodingClient.forwardGeocode({ query: from, limit: 1 })
            .send()
            .then(response => {
                const { features } = response.body;
                if (features.length > 0) {
                    const { center } = features[0];
                    setFromCoordinates({ lng: center[0], lat: center[1] });
                }
            });

        geocodingClient.forwardGeocode({ query: to, limit: 1 })
            .send()
            .then(response => {
                const { features } = response.body;
                if (features.length > 0) {
                    const { center } = features[0];
                    setToCoordinates({ lng: center[0], lat: center[1] });
                }
            });
    }, [from, to]);

    useEffect(() => {
        if (!fromCoordinates || !toCoordinates) {
            return;
        }

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [fromCoordinates.lng, fromCoordinates.lat],
            zoom: 12
        });

        map.on('load', () => {
            const directions = new MapboxDirections({
                accessToken: mapboxgl.accessToken,
                unit: 'metric',
                profile: 'mapbox/driving'
            });

            map.addControl(directions, 'top-right');

            directions.setOrigin([fromCoordinates.lng, fromCoordinates.lat]);
            directions.setDestination([toCoordinates.lng, toCoordinates.lat]);

            directions.on('route', e => {
                const routes = e.route;
                if (routes.length > 0) {
                    const { duration, distance } = routes[0];
                    setRouteDuration(duration / 3600); // Convert duration from seconds to hours
                    setRouteDistance(distance / 1000); // Convert distance from meters to kilometers
                }
            });
        });

        return () => map && map.remove();
    }, [fromCoordinates, toCoordinates]);

    return <div ref={mapContainerRef} style={{ width: '70%', height: '300px' }} />;
};

export default MapComponent;