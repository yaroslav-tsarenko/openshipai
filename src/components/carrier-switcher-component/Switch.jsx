import React from 'react';
import './CarrierSwitch.css'; // assuming you saved the above CSS in a file named Switch.css

const Switch = ({isOn, handleToggle, label}) => {
    return (
        <div className="carrier-switcher-wrapper">
            <label className="switch">
                <input type="checkbox" checked={isOn} onChange={handleToggle}/>
                <span className="slider round"></span>
            </label>
            <span>{label}</span>
        </div>
    );
};

export default Switch;