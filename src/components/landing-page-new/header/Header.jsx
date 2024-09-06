import React from 'react';
import styles from './Header.module.scss';
import {ReactComponent as Logo} from '../../../assets/openshipai.svg';
import {ReactComponent as FaBars} from '../../../assets/fa-bars-icon.svg';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className={styles.header}>
            <Link to="/">
                <Logo/>
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
            <button className={styles.bars}>
                <FaBars/>
            </button>
        </header>
    );
};

export default Header;