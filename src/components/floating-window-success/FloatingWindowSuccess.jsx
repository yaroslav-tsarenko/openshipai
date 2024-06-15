import React, { useEffect, useRef } from 'react';
import './FloatingWindowSuccess.css';

const FloatingWindowSuccess = ({ text }) => {

    const ref = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            ref.current.style.animation = 'slide-up 0.5s forwards';
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div ref={ref} className="floating-window-component" style={{animation: 'slide-down 0.5s forwards'}}>
            {text}
        </div>
    );
};

export default FloatingWindowSuccess;