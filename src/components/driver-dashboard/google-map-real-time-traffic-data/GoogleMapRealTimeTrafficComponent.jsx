import React, { useEffect, useRef } from "react";

const GoogleMapRealTimeTrafficComponent = ({
                                               type,
                                               origin,
                                               destination,
                                               lat,
                                               lng,
                                               borderRadius = ["0px", "0px", "0px", "0px"]
                                           }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!window.google) {
            console.error("Google Maps JavaScript API not loaded.");
            return;
        }
        const isValidCoordinate = (coordinate) => typeof coordinate === 'number' && !isNaN(coordinate);
        const validLat = isValidCoordinate(lat) ? lat : 0;
        const validLng = isValidCoordinate(lng) ? lng : 0;
        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: validLat, lng: validLng },
            zoom: 10,
            styles: [],
        });

        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer({
            map,
        });

        if (type === "destination" && origin && destination) {
            directionsService.route({
                origin,
                destination,
                travelMode: window.google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result);
                    map.fitBounds(result.routes[0].bounds);
                } else {
                    console.error("Directions request failed due to " + status);
                }
            });

        } else if (type === "location" && isValidCoordinate(lat) && isValidCoordinate(lng)) {
            new window.google.maps.Marker({
                position: { lat: validLat, lng: validLng },
                map: map,
            });
            map.setCenter({ lat: validLat, lng: validLng });
            map.setZoom(15);
        }
    }, [type, origin, destination, lat, lng]);

    return (
        <div
            ref={mapRef}
            style={{
                borderRadius: borderRadius.join(" "),
                width: "100%",
                height: "100%",
            }}
        ></div>
    );
};

export default GoogleMapRealTimeTrafficComponent;
