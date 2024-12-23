import React from 'react';
import styles from './SubArticle.module.scss';

const SubArticle = ({ image, alt, heading, description, link }) => {
    return (
        <div className={styles.subArticle}>
            <img src={image} alt={alt} className={styles.image} />
            <h2 className={styles.subArticleTitle}>{heading}</h2>
            <p className={styles.subArticleDescription}>{description}</p>
            {link && <a href={"#"} className={styles.subArticleLink}>Read more</a>}
        </div>
    );
};

export default SubArticle;