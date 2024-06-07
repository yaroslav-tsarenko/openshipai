import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderDashboard.css';
import {ReactComponent as SearchIcon} from "../../assets/search-icon.svg";
import {ReactComponent as DefaultUserAvatar} from "../../assets/default-avatar.svg";
import {ReactComponent as BellIcon} from "../../assets/bell-icon.svg";
import {ReactComponent as SettingsAccountIcon} from "../../assets/settings-icon.svg";

const HeaderDashboard = ({ contentTitle, contentSubtitle, accountName, accountRole, profileLink, bellLink, settingsLink }) => {
    return (
        <div className="dashboard-content-header">
            <div>
                <h2 className="dashboard-content-title">{contentTitle}</h2>
                <p className="dashboard-content-subtitle">{contentSubtitle}</p>
            </div>
            <div className="account-container">
                <div className="dashboard-searchbar">
                    <SearchIcon className="search-icon-searchbar"/>
                    <input type="text" placeholder="Search anything..."/>
                </div>
                <div className="dashboard-account-info">
                    <section className="account-info">
                        <DefaultUserAvatar width="60" height="60"/>
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
    );
};

export default HeaderDashboard;