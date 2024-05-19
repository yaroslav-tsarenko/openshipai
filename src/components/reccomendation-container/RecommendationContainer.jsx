import React from 'react';
import "./RecommendationContainer.css";

const RecommendationContainer = ({title, description}) => {
    return (
        <div className="recommendation-container">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};

export default RecommendationContainer;