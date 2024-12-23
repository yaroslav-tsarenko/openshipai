import React from 'react';
import styles from "./Description.module.scss";
import {Fade} from "react-awesome-reveal";

const Description = ({ title, description, subDescriptions, children }) => {
    const renderList = (list) => {
        if (Array.isArray(list)) {
            return (
                <Fade>
                    <ul>
                        {list.map((item, index) => (
                            <li className={styles.listItem} key={index}>{item}</li>
                        ))}
                    </ul>
                </Fade>
            );
        }
        if (typeof list === 'object' && list.ordered) {
            return (
                <Fade>
                    <ol>
                    {list.items.map((item, index) => (
                            <li className={styles.listItem} key={index}>{item}</li>
                        ))}
                    </ol>
                </Fade>
            );
        }
        return null;
    };

    return (
        <>
            <Fade>
                <div className={styles.descriptionWrapper}>
                <h1>{title}</h1>
                    <p>{description}</p>
                    {subDescriptions && subDescriptions.map((sub, index) => (
                        <div key={index} className={styles.subDescription}>
                            <h2>{sub.title}</h2>
                            {sub.content && <p>{sub.content}</p>}
                            {sub.list && renderList(sub.list)}
                        </div>
                    ))}

                    {children && <div className={styles.childrenWrapper}>{children}</div>}
                </div>
            </Fade>
        </>
    );
};

export default Description;
