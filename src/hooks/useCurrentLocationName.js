import { useState, useEffect } from 'react';
import axios from 'axios';

const useCurrentLocationName = () => {
    const [locationName, setLocationName] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLocationName = async (lat, lng) => {
            try {
                const response = await axios.get(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                );

                if (response.data) {
                    const location = response.data.display_name;
                    setLocationName(location);
                } else {
                    throw new Error('Location not found');
                }
            } catch (error) {
                setError('An error occurred while fetching the location');
                setLocationName('');
            }
        };

        const getCurrentPosition = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        fetchLocationName(latitude, longitude);
                    },
                    (error) => {
                        setError('Error getting current position');
                    },
                    { enableHighAccuracy: true }
                );
            } else {
                setError('Geolocation is not supported by this browser.');
            }
        };

        getCurrentPosition();
    }, []);

    return { locationName, error };
};

export default useCurrentLocationName;