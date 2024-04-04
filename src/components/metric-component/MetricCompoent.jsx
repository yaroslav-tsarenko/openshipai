import React from 'react';
import './MetricComponent.css';

const MetricComponent = ({text, description, percent, color}) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div className="metric-container">
            <div className="metric-container-text">
                <h2 className="metric-container-title">{text}</h2>
                <p className="metric-container-description">{description}</p>
            </div>
            <svg width="80" height="80" viewBox="0 0 120 120">
                <circle
                    stroke="#eee"
                    strokeWidth="10"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                />
                <circle
                    stroke={color}
                    strokeWidth="10"
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