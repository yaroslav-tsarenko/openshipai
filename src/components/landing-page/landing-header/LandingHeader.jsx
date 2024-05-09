import React, { useState } from 'react';
import "../LandingPage.css";
import {ReactComponent as OpenshipLogo} from "../../../assets/openship-ai-logo-updated.svg";
import {ReactComponent as DropDownIcon} from "../../../assets/dropbdown-arrow.svg";
import {ReactComponent as BurgerMenuIcon} from "../../../assets/burger-button.svg";
import {ReactComponent as FaTimesIcon} from "../../../assets/fa-times-icon.svg";
import {Link} from "react-router-dom";
import {BsTwitterX} from "react-icons/bs";
import {FaFacebookF, FaInstagram, FaLinkedinIn} from "react-icons/fa";

const LandingHeader = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);;
    const [openDropdown, setOpenDropdown] = useState('');
    const toggleDropdown = (dropdownName) => {
        if (openDropdown === dropdownName) {
            setOpenDropdown(''); // close the dropdown if it's already open
        } else {
            setOpenDropdown(dropdownName); // open the clicked dropdown and close others
        }
    };
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <header className="landing-page-header">
            <OpenshipLogo className="header-logo"/>
            {/*<nav className={`nav-menu-container ${sidebarOpen ? 'open' : ''}`}>
                <a href="#">Company<DropDownIcon className="drop-down-icon"/>
                    <div className="dropdown-content">
                        <a href="#">Company Link 1</a>
                        <a href="#">Company Link 2</a>
                        <a href="#">Company Link 3</a>
                    </div>
                </a>
                <a href="#">Services<DropDownIcon className="drop-down-icon"/>
                    <div className="dropdown-content">
                        <a href="#">Services Link 1</a>
                        <a href="#">Services Link 2</a>
                        <a href="#">Services Link 3</a>
                    </div>
                </a>
                <a href="#">Solutions
                    <DropDownIcon className="drop-down-icon"/>
                    <div className="dropdown-content">
                        <a href="#">Solutions Link 1</a>
                        <a href="#">Solutions Link 2</a>
                        <a href="#">Solutions Link 3</a>
                    </div>
                </a>
                <a href="#">Industries
                    <DropDownIcon className="drop-down-icon"/>
                    <div className="dropdown-content">
                        <a href="#">Industries Link 1</a>
                        <a href="#">Industries Link 2</a>
                        <a href="#">Industries Link 3</a>
                    </div>
                </a>
                <a href="#">About us
                    <DropDownIcon className="drop-down-icon"/>
                    <div className="dropdown-content">
                        <a href="#">About us Link 1</a>
                        <a href="#">About us Link 2</a>
                        <a href="#">About us Link 3</a>
                    </div>
                </a>
            </nav>*/}
            {/*<Link to={"/sign-up"} className="landing-button">Go to Account</Link>*/}
            {/*<BurgerMenuIcon className="burger-menu-header" onClick={toggleSidebar}/>
            <div className={`sidebar-landing-page ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <FaTimesIcon className="fa-times-button-menu-header" onClick={toggleSidebar}/>
                    <OpenshipLogo className="header-logo"/>
                </div>
                <nav className="nav-menu-sidebar-container">
                    <a href="#" onClick={() => toggleDropdown('Company')}>Company<DropDownIcon
                        className={`drop-down-icon ${openDropdown === 'Company' ? 'rotate-icon' : ''}`}/>
                    </a>
                    {openDropdown === 'Company' && (
                        <div className="sidebar-dropdown-content">
                            <a href="#">Company Link 1</a>
                            <a href="#">Company Link 2</a>
                            <a href="#">Company Link 3</a>
                        </div>
                    )}
                    <a href="#" onClick={() => toggleDropdown('Service')}>Service<DropDownIcon
                        className={`drop-down-icon ${openDropdown === 'Service' ? 'rotate-icon' : ''}`}/>
                    </a>
                    {openDropdown === 'Service' && (
                        <div className="sidebar-dropdown-content">
                            <a href="#">Service Link 1</a>
                            <a href="#">Service Link 2</a>
                            <a href="#">Service Link 3</a>
                        </div>
                    )}
                    <a href="#" onClick={() => toggleDropdown('Solutions')}>Solutions<DropDownIcon
                        className={`drop-down-icon ${openDropdown === 'Solutions' ? 'rotate-icon' : ''}`}/>
                    </a>
                    {openDropdown === 'Solutions' && (
                        <div className="sidebar-dropdown-content">
                            <a href="#">Solutions Link 1</a>
                            <a href="#">Solutions Link 2</a>
                            <a href="#">Solutions Link 3</a>
                        </div>
                    )}
                    <a href="#" onClick={() => toggleDropdown('Industries')}>Industries<DropDownIcon
                        className={`drop-down-icon ${openDropdown === 'Industries' ? 'rotate-icon' : ''}`}/>
                    </a>
                    {openDropdown === 'Industries' && (
                        <div className="sidebar-dropdown-content">
                            <a href="#">Industries Link 1</a>
                            <a href="#">Industries Link 2</a>
                            <a href="#">Industries Link 3</a>
                        </div>
                    )}
                    <a href="#" onClick={() => toggleDropdown('AboutUs')}>About Us<DropDownIcon
                        className={`drop-down-icon ${openDropdown === 'AboutUs' ? 'rotate-icon' : ''}`}/>
                    </a>
                    {openDropdown === 'AboutUs' && (
                        <div className="sidebar-dropdown-content">
                            <a href="#">About Us Link 1</a>
                            <a href="#">About Us Link 2</a>
                            <a href="#">About Us Link 3</a>
                        </div>
                    )}
                </nav>

            </div>*/}
            <Link to={"/sign-in"} className="landing-button-sidebar">Go to Account</Link>
        </header>
    );
};

export default LandingHeader;