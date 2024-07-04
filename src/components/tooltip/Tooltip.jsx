import React, { useState, useEffect, useRef } from 'react';
import './Tooltip.css';

const Tooltip = ({ children, isVisible }) => {
    const tooltipRef = useRef(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [show, setShow] = useState(false); // Internal state to manage visibility

    useEffect(() => {
        if (tooltipRef.current) {
            const triggerElement = tooltipRef.current.parentElement;
            const triggerRect = triggerElement.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();

            setPosition({
                top: triggerRect.top + window.scrollY - tooltipRect.height - 15, // Subtract 20 pixels to move the tooltip up
                left: triggerRect.left + window.scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2) + 55,
            });
        }
    }, [isVisible]);



    if (!isVisible) return null;



    return (
            <div
                className="custom-tooltip"
                ref={tooltipRef}
                style={{top: `${position.top}px`, left: `${position.left}px`}}>
                {children}
            </div>
    );
};

export default Tooltip;