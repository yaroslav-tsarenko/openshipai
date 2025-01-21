import React from 'react';
import { RotatingLines } from "react-loader-spinner";
import styles from "./RotatingLinesLoader.module.scss";

const RotatingLinesLoader = ({ title, color = "#fff" }) => {
    return (
        <div className={styles.rotatingLinesLoader}>
            <RotatingLines
                visible={true}
                height="20"
                width="20"
                style={{ marginRight: "10px" }}
                strokeColor={color}
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
            <span style={{ color }}>{title}</span>
        </div>
    );
};

export default RotatingLinesLoader;