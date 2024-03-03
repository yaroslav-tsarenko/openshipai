import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {ClipLoader} from "react-spinners";
import './WeatherComponent.css';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=78dc2df5914a4652a5e190211242602 &q=Oregon`);
                setWeatherData(response.data);
            } catch (error) {
                console.error("Error fetching weather data: ", error);
            }
        };
        fetchWeather();
    }, []);
    if (!weatherData) return <div><ClipLoader color={"#e7e7e7"} loading={true} size={25}/></div>;
    return (
        <div className="weather-data-container">
            <label>Location</label>
            <div className="load-metrics">{weatherData.location.name}</div>
            <label>Temperature</label>
            <div className="load-metrics">{weatherData.current.temp_c}°C
                <img src={weatherData.current.condition.icon} alt="weather-icon" width="25" height="25"/>
            </div>
            <label>Condition</label>
            <div className="load-metrics"> {weatherData.current.condition.text}</div>
        </div>
    );
};

export default Weather;