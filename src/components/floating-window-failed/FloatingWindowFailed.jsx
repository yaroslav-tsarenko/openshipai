import React, { useEffect, useRef } from 'react';
import './FloatingWindowFailed.css';

const FloatingWindowFailed = ({ text }) => {

    const ref = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            ref.current.style.animation = 'slide-up 0.5s forwards';
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div ref={ref} className="floating-window-component-failed" style={{animation: 'slide-down 0.5s forwards'}}>
            {text}
        </div>
    );
};

export default FloatingWindowFailed;