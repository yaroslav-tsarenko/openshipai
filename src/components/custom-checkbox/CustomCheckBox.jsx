import React, { useState, useEffect } from 'react';
import "./CustomCheckBox.css";

const CustomCheckBox = ({ checked, id, label, onClick = () => {}, disabled }) => {
    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    const handleCheckboxClick = () => {
        if (!disabled) {
            setIsChecked(!isChecked);
            onClick();
        }
    };

    return (
        <div className={`custom-checkbox-content ${disabled ? 'disabled' : ''}`} onClick={handleCheckboxClick}>
            <div className="checkbox-wrapper-4">
                <input
                    type="checkbox"
                    id={id}
                    className="inp-cbx"
                    checked={isChecked}
                    onChange={handleCheckboxClick}
                    disabled={disabled}
                />
                <label htmlFor={id} className="cbx">
                    <span>
                        <svg width="12px" height="10px">
                            <use xlinkHref="#check-symbol"></use>
                        </svg>
                    </span>
                </label>
                <svg className="inline-svg">
                    <symbol id="check-symbol" viewBox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </symbol>
                </svg>
            </div>
            <p>{label}</p>
        </div>
    );
};

export default CustomCheckBox;