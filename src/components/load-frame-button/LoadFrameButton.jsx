import React from 'react';
import styles from './LoadFrameButton.module.scss';
import RoundedCheckbox from '../rounded-checkbox/RoundedCheckbox';

const LoadFrameButton = ({ loadType, imageSrc, isSelected, onClick }) => {
    return (
        <button
            className={`${styles.loadFrameContainer} ${isSelected ? styles.selected : ''}`}
            onClick={onClick}
        >
            <img src={imageSrc} alt={`${loadType} icon`} />
            <section>
                <RoundedCheckbox isChecked={isSelected} />
                <h2>{loadType}</h2>
            </section>
        </button>
    );
};

export default LoadFrameButton;
