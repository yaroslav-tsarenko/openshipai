import React from 'react';
import styles from './Header.module.scss';
import {ReactComponent as Logo} from '../../../assets/openshipai.svg';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className={styles.header}>
            <Logo/>
            <nav className={styles.navContent}>
                <Link to={"/"} className={styles.navLink}>Open</Link>
                <Link to={"/"} className={styles.navLink}>Ship</Link>
                <Link to={"/"} className={styles.navLink}>AI</Link>
                <Link to={"/"} className={styles.navLink}>Safety</Link>
                <Link to={"/"} className={styles.navLink}>Partners</Link>
                <Link to={"/"} className={styles.navLink}>Blog</Link>
                <Link to={"/"} className={styles.navLink}>About</Link>
            </nav>
            <section>
                <Link to={"/sign-in"} className={styles.loginButton}>Sign In</Link>
                <Link to={"/sign-up"} className={styles.registerButton}>Sign Up</Link>
            </section>
        </header>
    );
};

export default Header;