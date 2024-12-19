import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './HeaderDashboard.css';
import DefaultUserAvatar from "../../assets/images/default-avatar.png";
import {MdSearch, MdNotificationsNone} from "react-icons/md";
import {LuSettings} from "react-icons/lu";
import {ReactComponent as SearchbarIcon} from '../../assets/images/settings-ios-icon.svg';
import {ReactComponent as BarsIcon} from "../../assets/images/fa-bars-icon.svg";
import useGsapAnimation from "../../hooks/useGsapAnimation";

const HeaderDashboard = ({
                             onBurgerClick,
                             contentTitle,
                             contentSubtitle,
                             accountName,
                             accountRole,
                             profileLink,
                             bellLink,
                             settingsLink,
                             avatar
                         }) => {

    const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const animation = useGsapAnimation('smoothTransition');
    const suggestions = [
        {text: "Drivers & Equipment", url: "/link", icon: SearchbarIcon},
        {text: "Take Load", url: "/link", icon: SearchbarIcon},
        {text: "My Loads", url: "/link", icon: SearchbarIcon},
        {text: "Chat", url: "/link", icon: SearchbarIcon},
        {text: "Payments", url: "/link", icon: SearchbarIcon},
        {text: "Profile", url: "/link", icon: SearchbarIcon},
        {text: "Settings", url: "/link", icon: SearchbarIcon},
        {text: "Dashboard", url: "/link", icon: SearchbarIcon},
    ];

    const animationRef = useGsapAnimation('pop');

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
                    <div className="search-popup" ref={animationRef}>
                        <div className="dashboard-searchbar-expanded">
                            <MdSearch className="search-icon-searchbar"/>
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
            <div className="dashboard-content-header" ref={animation}>
                <div>
                    <h2 className="dashboard-content-title">{contentTitle}</h2>
                    <button className="bars-button" onClick={onBurgerClick}>
                        <BarsIcon/>
                    </button>
                </div>
                <div className="account-container">
                    <div className="dashboard-searchbar" onClick={() => setIsSearchPopupOpen(true)}>
                        <MdSearch className="search-icon-searchbar"/>
                        <input type="text" placeholder="Search anything..."/>
                    </div>
                    <button className="searchbar-button-mobile" onClick={() => setIsSearchPopupOpen(true)}>
                        <MdSearch/>
                    </button>
                    <div className="dashboard-account-info">
                        <div className="account-info">
                            {avatar ? (
                                <img src={avatar} className="user-header-avatar" alt="User Avatar"/>
                            ) : (
                                <img src={DefaultUserAvatar} className="user-header-avatar" width="60" height="60" alt="User Avatar"/>
                            )}
                            <Link to={profileLink} className="dashboard-account-info-text">
                                <h3 className="header-dashboard-account-info-name">{accountName}</h3>
                                <p className="header-dashboard-account-info-role">{accountRole}</p>
                            </Link>
                        </div>
                        <Link to={bellLink} className="account-info-buttons"><MdNotificationsNone size={25}/></Link>
                        <Link to={settingsLink} className="account-info-buttons"><LuSettings size={25}/></Link>
                    </div>
                </div>
            </div>
        </>

    );
};

export default HeaderDashboard;