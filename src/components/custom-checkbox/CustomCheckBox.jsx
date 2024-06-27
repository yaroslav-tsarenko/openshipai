import React from 'react';
import "./CustomCheckBox.css";

const CustomCheckBox = () => {
    return (
        <div className="checkbox-wrapper-4">
            <input type="checkbox" id="morning-checkbox" className="inp-cbx" />
            <label htmlFor="morning-checkbox" className="cbx">
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
    );
};

export default CustomCheckBox;
