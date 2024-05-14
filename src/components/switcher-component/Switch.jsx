import React, { useState } from 'react';
import './Switch.css';
import {ReactComponent as QuestionIcon} from '../../assets/question-icon.svg';

const Switch = ({isOn, handleToggle, label, tip}) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="switcher-wrapper">
            <label className="switch">
                <input type="checkbox" checked={isOn} onChange={handleToggle}/>
                <span className="slider round"></span>
            </label>
            <span>{label}
                <div className="tooltip-container">
                    <QuestionIcon
                        className="question-icon"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    />
                    {showTooltip && <div className="tooltip">
                        <p>{tip}</p></div>}
                </div>
            </span>
        </div>
    );
};

export default Switch;