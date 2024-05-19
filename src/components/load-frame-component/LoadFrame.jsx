import React from 'react';
import {ReactComponent as ArrowRight} from '../../assets/arrow-right-load-frame.svg';
import "./LoadFrame.css";


const LoadFrame = ({loadType, loadImage}) => {
    return (
        <button className="load-frame-container">
            <img src={loadImage} alt={loadType}/>
            <section>
                <h2>{loadType}</h2>
                <ArrowRight width="20"/>
            </section>
        </button>
    );
};

export default LoadFrame;