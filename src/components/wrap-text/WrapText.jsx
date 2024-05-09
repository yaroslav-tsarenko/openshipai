import React from 'react';
import "./WrapText.css";
const WrapText = ({text}) => {
    return (
        <p className="text-wrap-container">
            {text}
        </p>
    );
};

export default WrapText;