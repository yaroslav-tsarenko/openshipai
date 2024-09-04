import React, { useState, useEffect } from 'react';
import './MetricComponent.css';

const MetricComponent = ({ text, description, percent, color }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;
    const [strokeWidth, setStrokeWidth] = useState(10);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1380) {
                setStrokeWidth(20);
            } else {
                setStrokeWidth(10);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call initially to set the correct strokeWidth

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="metric-container">
            <div className="metric-container-text">
                <h2 className="metric-container-title">{text}</h2>
                <p className="metric-container-description">{description}</p>
            </div>
            <svg width="80" height="80" viewBox="0 0 120 120">
                <circle
                    stroke="#eee"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                />
                <circle
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
                <text x="50%" y="50%" textAnchor="middle" fill="#707070" strokeWidth="1px" dy=".3em" fontSize="25px"
                      fontWeight="bold">{percent}%
                </text>
            </svg>
        </div>
    );
};

export default MetricComponent;