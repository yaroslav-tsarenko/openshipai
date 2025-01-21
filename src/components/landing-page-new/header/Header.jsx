import React, { useState, useEffect } from 'react';
import styles from './Header.module.scss';
import Logo2 from '../../../assets/images/openshipai.svg';
import { ReactComponent as FaBars } from '../../../assets/images/fa-bars-icon.svg';
import { ReactComponent as FaTimes } from '../../../assets/images/fa-times-icon.svg';
import { Link } from 'react-router-dom';
import { headerLinks } from '../../../utils/headerLinks';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <>
            <header className={`${styles.header2} ${isScrolled ? styles.header2Scrolled : ''}`}>
                <div className={styles.headerInner2}>
                    <Link to="/">
                        <img src={Logo2} className={styles.logo2} alt="OpenShipAI Logo" />
                    </Link>
                    <nav className={styles.navContent}>
                        {headerLinks.map(({ name, link }) => (
                            <Link to={link} className={styles.navLink} key={name}>
                                {name}
                            </Link>
                        ))}
                    </nav>
                    <div className={styles.headerLogButtons}>
                        <Link to="/sign-in" className={styles.loginButton}>Sign In</Link>
                        <Link to="/sign-up" className={styles.registerButton}>Sign Up</Link>
                    </div>
                    <div className={styles.sidebarIcon} onClick={toggleSidebar}>
                        {isSidebarOpen ? <FaTimes /> : <FaBars />}
                    </div>
                </div>
                <div className={`${styles.burgerMenu} ${isSidebarOpen ? styles.burgerMenuOpen : ''}`}>
                    <nav className={styles.burgerContent}>
                        {headerLinks.map(({ name, link, icon: Icon }) => (
                            <Link to={link} className={styles.navLinkBurger} key={name}>
                                <Icon className={styles.navIcon} />
                                {name}
                            </Link>
                        ))}
                        <div className={styles.authButtons}>
                            <Link to="/sign-in" className={styles.signIn}>Sign In</Link>
                            <Link to="/sign-up" className={styles.signUp}>Sign Up</Link>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;