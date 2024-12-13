import React, { useState } from 'react';
import styles from './Header.module.scss';
import { ReactComponent as Logo } from '../../../assets/images/openshipai.svg';
import { ReactComponent as FaBars } from '../../../assets/images/fa-bars-icon.svg';
import { ReactComponent as FaTimes } from '../../../assets/images/fa-times-icon.svg';
import { Link } from "react-router-dom";

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <header className={styles.header}>
            <Link to="/">
                <Logo />
            </Link>
            <nav className={styles.navContent}>
                <Link to={"/open-page"} className={styles.navLink}>Open</Link>
                <Link to={"/ship-page"} className={styles.navLink}>Ship</Link>
                <Link to={"/ai-page"} className={styles.navLink}>AI</Link>
                <Link to={"/safety-page"} className={styles.navLink}>Safety</Link>
                <Link to={"/partners-page"} className={styles.navLink}>Partners</Link>
                <Link to={"/blog-page"} className={styles.navLink}>Blog</Link>
                <Link to={"/about-page"} className={styles.navLink}>About</Link>
            </nav>
            <section>
                <Link to={"/sign-in"} className={styles.loginButton}>Sign In</Link>
                <Link to={"/sign-up"} className={styles.registerButton}>Sign Up</Link>
            </section>
            <button className={styles.bars} onClick={toggleSidebar}>
                <FaBars />
            </button>
            <div className={`${styles.sidebar} ${isSidebarOpen ? styles.showSidebar : ''}`}>
                <button className={styles.closeButton} onClick={toggleSidebar}>
                    <FaTimes />
                </button>
                <nav className={styles.navContentSidebar}>
                    <Link to={"/open-page"} className={styles.navLink}>Open</Link>
                    <Link to={"/ship-page"} className={styles.navLink}>Ship</Link>
                    <Link to={"/ai-page"} className={styles.navLink}>AI</Link>
                    <Link to={"/safety-page"} className={styles.navLink}>Safety</Link>
                    <Link to={"/partners-page"} className={styles.navLink}>Partners</Link>
                    <Link to={"/blog-page"} className={styles.navLink}>Blog</Link>
                    <Link to={"/about-page"} className={styles.navLink}>About</Link>
                </nav>
                <div className={styles.navContentSidebarSection}>
                    <Link to={"/sign-in"} className={styles.loginButton}>Sign In</Link>
                    <Link to={"/sign-up"} className={styles.registerButton}>Sign Up</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;