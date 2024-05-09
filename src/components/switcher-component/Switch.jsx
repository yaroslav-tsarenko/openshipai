import React from 'react';
import './Switch.css'; // assuming you saved the above CSS in a file named Switch.css

const Switch = ({isOn, handleToggle, label}) => {
    return (
        <div className="switcher-wrapper">
            <label className="switch">
                <input type="checkbox" checked={isOn} onChange={handleToggle}/>
                <span className="slider round"></span>
            </label>
            <span>{label}</span>
        </div>
    );
};

export default Switch;