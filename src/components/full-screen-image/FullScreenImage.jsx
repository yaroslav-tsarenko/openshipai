import React from 'react';
import styles from './FullScreenImage.module.scss';

const FullScreenImage = ({src}) => {
    return (
        <div className={styles.wrapper}>
            <img src={src} alt="Full screen Image" height={768} width={1440} className={styles.image}/>
        </div>
    );
};

export default FullScreenImage;