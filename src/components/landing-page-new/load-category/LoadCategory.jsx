import React from 'react';
import styles from './LoadCategory.module.scss';
import {useNavigate} from "react-router-dom";

const LoadCategory = ({loadLabel, loadTitle, loadImage, link}) => {
    
    const navigate = useNavigate();

    const handleNav = () => {
        navigate(link);
    };

    return (
        <div className={styles.loadCategoryWrapper} onClick={handleNav}>
            <label>{loadLabel}</label>
            <h4>{loadTitle}</h4>
            <img src={loadImage} alt="Load Category Image"/>
        </div>
    );
};

export default LoadCategory;
