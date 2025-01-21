import React, { useEffect, useRef, useState } from "react";

const GoogleMapRealTimeTrafficComponent = ({
                                               type,
                                               origin,
                                               destination,
                                               lat,
                                               lng,
                                               borderRadius = ["0px", "0px", "0px", "0px"],
                                               currentLocation,
                                               driverAvatar,
                                               isTripStarted
                                           }) => {
    const mapRef = useRef(null);
    const [defaultLocation, setDefaultLocation] = useState({ lat: 55, lng: 56 });

    const createCustomMarker = (map, position, avatarUrl, labelText) => {
        const markerDiv = document.createElement('div');
        markerDiv.style.position = 'absolute';
        markerDiv.style.display = 'flex';
        markerDiv.style.flexDirection = 'column';
        markerDiv.style.alignItems = 'center';

        const avatarImg = document.createElement('img');
        avatarImg.src = avatarUrl;
        avatarImg.style.width = '50px';
        avatarImg.style.height = '50px';
        avatarImg.style.borderRadius = '50%';
        avatarImg.style.border = '1px solid black';
        avatarImg.style.objectFit = 'cover';
        avatarImg.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
        markerDiv.appendChild(avatarImg);

        const labelDiv = document.createElement('div');
        labelDiv.textContent = labelText;
        labelDiv.style.marginTop = '5px';
        labelDiv.style.padding = '5px 10px';
        labelDiv.style.borderRadius = '15px';
        labelDiv.style.backgroundColor = '#000';
        labelDiv.style.color = '#fff';
        labelDiv.style.fontSize = '12px';
        labelDiv.style.fontWeight = 'bold';
        labelDiv.style.textAlign = 'center';
        markerDiv.appendChild(labelDiv);

        // Attach the custom marker to the map
        const marker = new window.google.maps.OverlayView();
        marker.onAdd = function () {
            const panes = this.getPanes();
            panes.overlayMouseTarget.appendChild(markerDiv);
        };
        marker.draw = function () {
            const overlayProjection = this.getProjection();
            const positionPixel = overlayProjection.fromLatLngToDivPixel(position);
            markerDiv.style.left = `${positionPixel.x - 25}px`; // Center the marker
            markerDiv.style.top = `${positionPixel.y - 25}px`;
        };
        marker.onRemove = function () {
            if (markerDiv.parentElement) {
                markerDiv.parentElement.removeChild(markerDiv);
            }
        };
        marker.setMap(map);

        return marker;
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setDefaultLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    console.error("Error getting current location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    useEffect(() => {
        if (!window.google) {
            console.error("Google Maps JavaScript API not loaded.");
            return;
        }
        const isValidCoordinate = (coordinate) => typeof coordinate === 'number' && !isNaN(coordinate);
        const validLat = isValidCoordinate(lat) ? lat : defaultLocation.lat;
        const validLng = isValidCoordinate(lng) ? lng : defaultLocation.lng;
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
        } else if (type === "driver" && origin && destination && currentLocation && driverAvatar) {
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

            createCustomMarker(map, currentLocation, driverAvatar, 'You');

            if (isTripStarted) {
                map.setCenter(currentLocation);
                map.setZoom(15);
            }
        }
    }, [type, origin, destination, lat, lng, currentLocation, driverAvatar, isTripStarted, defaultLocation]);

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