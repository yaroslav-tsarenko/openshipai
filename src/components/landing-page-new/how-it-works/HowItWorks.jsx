import React, {useState, useEffect} from 'react';
import styles from "./HowItWorks.module.scss";

const HowItWorks = () => {
    const projectExample4 = `https://images.openshipai.com/project-example1.mp4`;

    const [activeItem, setActiveItem] = useState(0);
    const items = [
        {
            title: "Book & Ship",
            description: "Book exclusively with fully licensed carriers and benefit from 24/7 tracking and automation through our stress-free AI solution."
        },
        {
            title: "Chose & Enjoy",
            description: "Select the services that fit your needs from our curated list of options, and enjoy a seamless shipping experience powered by our advanced AI technology. Relax as we handle the details."
        },
        {
            title: "Get Quotes",
            description: "Easily compare competitive quotes from fully licensed carriers. Choose the best option for your budget and schedule with confidence, all within a few clicks."
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveItem((prevActiveItem) => (prevActiveItem + 1) % items.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [items.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveItem((prevActiveItem) => (prevActiveItem + 1) % items.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [activeItem, items.length]);

    const handleItemClick = (index) => {
        setActiveItem(index);
    };

    return (
        <div className={styles.howItWorksWrapper}>
            <h2>How It Works</h2>
            <div className={styles.howItWorksContent}>
                <video src={projectExample4} autoPlay loop></video>
                <section>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`${styles.howItWorksItem} ${index === activeItem ? styles.active : ''}`}
                            onClick={() => handleItemClick(index)}
                        >
                            <h4>{item.title}</h4>
                            <p className={index === activeItem ? styles.visible : styles.hidden}>{item.description}</p>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default HowItWorks;