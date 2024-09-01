import React, { useState } from 'react';
import styles from "./Role.module.scss";
import Button from "../../button/Button";

const Role = ({ title, description, image, role }) => {

    const [showMore, setShowMore] = useState(false);

    const handleClick = () => {
        setShowMore(!showMore);
    };

    return (
        <div className={`${styles.roleWrapper} ${styles[role]}`}>
            <h2>{title}</h2>
            <Button variant="more" onClick={handleClick}>
                {showMore ? 'Close' : 'More'}
            </Button>
            <div className={styles.content}>
                <p className={`${styles.description} ${showMore ? styles.fadeIn : styles.fadeOut}`}>
                    {description}
                </p>
                <img
                    src={image}
                    alt="role"
                    className={`${styles.image} ${showMore ? styles.fadeOut : styles.fadeIn}`}
                />
            </div>
        </div>
    );
};

export default Role;
