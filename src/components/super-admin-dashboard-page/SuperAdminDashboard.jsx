import React, { useState, useRef, useEffect } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios';
import {
    faBars,
    faCog, faEdit, faEllipsisH, faFilter,
    faRobot,
    faSearch,
    faSignOutAlt,
    faTimes, faTrashAlt,
    faTruck,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {ReactComponent as UserAvatarComponent} from "../../assets/userAvatar2.svg";
import {ReactComponent as BellComponent} from "../../assets/bell.svg";
import "./SuperAdminDashboard.css";
import SignatureCanvas from "react-signature-canvas";
const SuperAdminDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const [personalEndpoint, setPersonalEndpoint] = useState('');
    const [chatEndpoint, setChatEndpoint] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [formData, setFormData] = useState({
        vehicleType: '',
        vehicleModel: '',
        vehicleYear: '',
        vehicleColor: '',
        vehicleLicensePlate: '',
        vehicleVin: '',
        pickupLocation: '',
        deliveryLocation: '',
    });
    const handleFormSubmit = (event) => {
        event.preventDefault();
    };

    const handleFormChange = (event) => {
        // Handle form change
    };

    const handleCancel = () => {
        // Handle cancel action
    };
    const toggleOpen = (index) => {
        setSelectedRowIndex(index);
        setIsOpen(index !== selectedRowIndex);
    };
    const handleEdit = (user) => {
        setSelectedUser(user); // Set the selected user
        setShowEditForm(true); // Show the edit form
    };

    const handleDetails = (user) => {
        setSelectedUser(user); // Set the selected user
        setShowDetails(true); // Show the details
    };

    const handleDelete = (user) => {
        const confirmation = window.confirm(`Are you sure you want to delete user ${user.name}?`);
        if (confirmation) {
            axios.delete(`http://localhost:8080/user-email/${user.email}`)
                .then(response => {
                    setUsers(users.filter(u => u.email !== user.email));
                    window.alert('User successfully deleted'); // Alert the user
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                    window.alert('Error deleting user'); // Alert the user
                });
        }
    };

    useEffect(() => {
        axios.get('http://localhost:8080/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="admin-dashboard-wrapper">
            <div className={`admin-side-bar ${isSidebarOpen ? "" : "closed"}`} ref={sidebarRef}>
                <p className="dashboard-title"><FontAwesomeIcon className="navigation-icon" icon={faUser}/>Super Admin Dashboard</p>
                <div className="admin-side-bar-navigation">
                    <Link to="/admin-dashboard" className="navigation-button-2"><FontAwesomeIcon
                        className="navigation-icon" icon={faUser}/>Users</Link>
                    <Link to={`/jarvis-chat/${personalEndpoint}/${chatEndpoint}`} className="navigation-button">
                        <FontAwesomeIcon className="navigation-icon" icon={faTruck}/>Users load
                    </Link>
                    <Link to={`/jarvis-chat/${personalEndpoint}/${chatEndpoint}`} className="navigation-button">
                        <FontAwesomeIcon className="navigation-icon" icon={faRobot}/>Jarvis Chat Page
                    </Link>
                </div>
                <div className="admin-side-bar-navigation">
                    <Link to="/admin-dashboard" className="navigation-button-settings"><FontAwesomeIcon
                        className="navigation-icon" icon={faCog}/>Settings</Link>
                    <Link to="/jarvis-chat" className="navigation-button-logout"><FontAwesomeIcon
                        className="navigation-icon" icon={faSignOutAlt}/>Logout</Link>
                </div>
            </div>
            <button className="toggle-button" onClick={toggleSidebar}>
                <FontAwesomeIcon className="fa-bars-icon-times-icon" icon={isSidebarOpen ? faTimes : faBars}/>
            </button>
            <div className="admin-content">
                <div className="admin-content-wrapper">
                    <div className="admin-inner-content-first">
                        <div className="search-bar">
                            <FontAwesomeIcon icon={faSearch} className="search-icon"/>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search all users, drivers, etc."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="user-details-wrapper">
                            <UserAvatarComponent className="user-avatar"/>
                            <div className="user-details">
                                <p className="user-name">{user ? user.name : 'Loading...'}</p>
                                <p className="user-status">Customer</p>
                            </div>
                            <BellComponent className="bell-icon"/>
                        </div>
                    </div>
                    <div className="admin-inner-content-second">
                        <div className="inner-content-second-text">
                            <p className="inner-content-second-text-first">Project Management</p>
                            <p className="inner-content-second-text-second">Monitor users, users, status, payments
                                etc.</p>
                        </div>
                        <div className="data-operations-wrapper">
                            <div className="little-search-bar">
                                <FontAwesomeIcon icon={faSearch} className="search-icon-little-search-bar"/>
                                <input
                                    type="text"
                                    className="little-search-input"
                                    placeholder="Search users"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}/>
                            </div>
                            <button className="custom-button-filter"><FontAwesomeIcon className="filter-icon"
                                                                                      icon={faFilter}/> Filter
                            </button>
                        </div>

                    </div>
                    <div className="table-wrapper">
                        <div className="table-columns-titles">
                            <p>User</p>
                            <p>PICKUP</p>
                            <p>DESTINATION</p>
                            <p>User STATUS</p>
                            <p>Email</p>
                            <p>PRICE</p>
                            <p>INFO</p>
                        </div>
                        {users.map((user, index) => (
                            <div className="table-items-wrapper">
                                <div className={`table-item ${user === selectedUser ? 'selected' : ''}`}
                                     key={index}>
                                    <p>{user.name}</p>
                                    <p>{user.secondName}</p>
                                    <p>{user.phoneNumber}</p>
                                    <p>{user.email}</p>
                                    <p>{user.personalEndpoint}</p>
                                    <div className="dropdown">
                                        <button className="dropdown-button"
                                                onClick={() => toggleOpen(index)}>&#8942;</button>
                                        {isOpen && selectedRowIndex === index && (
                                            <div className="dropdown-menu-buttons">
                                                <a href="#/action-1" onClick={() => handleEdit(user)}>Edit
                                                    user <FontAwesomeIcon className="icon-a" icon={faEdit}/></a>
                                                <a href="#/action-2" onClick={() => handleDetails(user)}>More
                                                    Details <FontAwesomeIcon className="icon-a" icon={faEllipsisH}/></a>
                                                <a href="#/action-3" onClick={() => handleDelete(user)}>Delete
                                                    user <FontAwesomeIcon className="icon-a" icon={faTrashAlt}/></a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {showDetails && selectedUser === user && (
                                    <div className="user-table-details-wrapper">
                                        <div className="load-details">
                                            <label>
                                                <h2>Name</h2>
                                                <p>{selectedUser.name}</p>
                                            </label>
                                            <label>
                                                <h2>Second Name</h2>
                                                <p>{selectedUser.secondName}</p>
                                            </label>
                                            <label>
                                                <h2>Phone Number</h2>
                                                <p>{selectedUser.phoneNumber}</p>
                                            </label>
                                            <label>
                                                <h2>Email</h2>
                                                <p>{selectedUser.email}</p>
                                            </label>
                                            <label>
                                                <h2>Personal Endpoint</h2>
                                                <p>{selectedUser.personalEndpoint}</p>
                                            </label>
                                        </div>
                                        <button className="hide-details-button"
                                                onClick={() => setShowDetails(false)}>Hide
                                        </button>
                                    </div>
                                )}
                                {showEditForm && selectedUser === user && (
                                    <div className="load-edit-form">
                                        <form onSubmit={handleFormSubmit}>
                                            <label>
                                                Name:
                                                <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder={selectedUser.name} />
                                            </label>
                                            <label>
                                                Second Name:
                                                <input type="text" name="secondName" value={formData.secondName} onChange={handleFormChange} placeholder={selectedUser.secondName} />
                                            </label>
                                            <label>
                                                Phone Number:
                                                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleFormChange} placeholder={selectedUser.phoneNumber} />
                                            </label>
                                            <label>
                                                Email:
                                                <input type="text" name="email" value={formData.email} onChange={handleFormChange} placeholder={selectedUser.email} />
                                            </label>
                                            <label>
                                                Password:
                                                <input type="password" name="password" value={formData.password} onChange={handleFormChange} placeholder="Enter new password" />
                                            </label>
                                            <label>
                                                Personal Endpoint:
                                                <input type="text" name="personalEndpoint" value={formData.personalEndpoint} onChange={handleFormChange} placeholder={selectedUser.personalEndpoint} disabled />
                                            </label>
                                            <label>
                                                Chat Endpoints:
                                                <input type="text" name="chatEndpoints" value={formData.chatEndpoints} onChange={handleFormChange} placeholder={selectedUser.chatEndpoints.join(', ')} disabled />
                                            </label>
                                            <label>
                                                Role:
                                                <select name="role" value={formData.role} onChange={handleFormChange}>
                                                    <option value="customer">Customer</option>
                                                    <option value="carrier">Carrier</option>
                                                    <option value="super-admin">Super Admin</option>
                                                </select>
                                            </label>
                                            <button className="edit-form-submit" type="submit">Submit</button>
                                            <button className="edit-form-cancel" type="button" onClick={handleCancel}>Cancel</button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;