import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HeaderDashboard.css';
import {ReactComponent as SearchIcon} from "../../assets/search-icon.svg";
import {ReactComponent as DefaultUserAvatar} from "../../assets/default-avatar.svg";
import {ReactComponent as BellIcon} from "../../assets/bell-icon.svg";
import {ReactComponent as SettingsAccountIcon} from "../../assets/settings-icon.svg";
import {ReactComponent as SearchbarIcon } from '../../assets/settings-ios-icon.svg';
import { ReactComponent as BarsIcon } from "../../assets/fa-bars-icon.svg";

const HeaderDashboard = ({ contentTitle, contentSubtitle, accountName, accountRole, profileLink, bellLink, settingsLink, avatar }) => {

    const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    const suggestions = [
        { text: "Drivers & Equipment", url: "/link", icon: SearchbarIcon },
        { text: "Take Load", url: "/link", icon: SearchbarIcon },
        { text: "My Loads", url: "/link", icon: SearchbarIcon },
        { text: "Chat", url: "/link", icon: SearchbarIcon },
        { text: "Payments", url: "/link", icon: SearchbarIcon },
        { text: "Profile", url: "/link", icon: SearchbarIcon },
        { text: "Settings", url: "/link", icon: SearchbarIcon },
        { text: "Dashboard", url: "/link", icon: SearchbarIcon },
    ];

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        setFilteredSuggestions(suggestions.filter(suggestion =>
            suggestion.text.toLowerCase().includes(value.toLowerCase())));
    };

    return (
        <>
            {isSearchPopupOpen && (
                <>
                    <div className="search-popup-overlay" onClick={() => setIsSearchPopupOpen(false)}></div>
                    <div className="search-popup">
                        <div className="dashboard-searchbar-expanded">
                            <SearchIcon className="search-icon-searchbar"/>
                            <input
                                type="text"
                                placeholder="Search anything..."
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                        </div>
                        <ul className={`suggestions-list ${inputValue.length > 0 ? '' : 'hidden'}`}>
                            {filteredSuggestions.map((suggestion, index) => (
                                <li key={index}>
                                    <Link to={suggestion.url} className="suggestion-link">
                                        <suggestion.icon className="suggestion-icon"/>
                                        <h2>{suggestion.text}</h2>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
            <div className="dashboard-content-header">
                <div>
                    <h2 className="dashboard-content-title">{contentTitle}</h2>
                    <button className="bars-button">
                        <BarsIcon />
                    </button>
                </div>
                <div className="account-container">
                    <div className="dashboard-searchbar" onClick={() => setIsSearchPopupOpen(true)}>
                        <SearchIcon className="search-icon-searchbar"/>
                        <input type="text" placeholder="Search anything..."/>
                    </div>
                    <button className="searchbar-button-mobile" onClick={() => setIsSearchPopupOpen(true)}>
                        <SearchIcon/>
                    </button>
                    <div className="dashboard-account-info">
                        <section className="account-info">
                            {avatar ? (
                                <img src={avatar} className="user-header-avatar" alt="User Avatar"
                                     />
                            ) : (
                                <DefaultUserAvatar className="user-header-avatar" width="60" height="60"/>
                            )}
                            <Link to={profileLink} className="dashboard-account-info-text">
                                <h3 className="header-dashboard-account-info-name">{accountName}</h3>
                                <p className="header-dashboard-account-info-role">{accountRole}</p>
                            </Link>
                        </section>
                        <Link to={bellLink} className="account-info-buttons"><BellIcon/></Link>
                        <Link to={settingsLink} className="account-info-buttons"><SettingsAccountIcon/></Link>
                    </div>
                </div>
            </div>
        </>

    );
};

export default HeaderDashboard;