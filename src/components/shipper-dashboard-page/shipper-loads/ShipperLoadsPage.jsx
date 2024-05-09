import React, {useState} from "react";
import '../ShipperDashboard.css';
import {ReactComponent as OpenshipLogo} from "../../../assets/openship-ai-logo-updated.svg";
import {ReactComponent as DashboardIcon} from "../../../assets/dashboard-icon-grey.svg";
import {ReactComponent as DashboardIconWhite} from "../../../assets/dashboard-icon-white.svg";
import {ReactComponent as LoadIcon} from "../../../assets/load-icon-grey.svg";
import {ReactComponent as LoadIconWhite} from "../../../assets/load-icon-white.svg";
import {ReactComponent as LogoutIcon} from "../../../assets/logout-icon-grey.svg";
import {ReactComponent as LogoutIconWhite} from "../../../assets/logout-icon-white.svg";
import {ReactComponent as PaymentIcon} from "../../../assets/payment-icon-grey.svg";
import {ReactComponent as PaymentIconWhite} from "../../../assets/payment-icon-white.svg";
import {ReactComponent as ProfileIcon} from "../../../assets/profile-icon-grey.svg";
import {ReactComponent as ProfileIconWhite} from "../../../assets/profile-icon-white.svg";
import {ReactComponent as SettingsIcon} from "../../../assets/settings-icon-grey.svg";
import {ReactComponent as SettingsIconWhite} from "../../../assets/settings-icon-white.svg";
import {ReactComponent as QoutesIcon} from "../../../assets/listing-icon-grey.svg";
import {ReactComponent as QoutesIconWhite} from "../../../assets/listing-icon-white.svg";
import {ReactComponent as CarrierChatIcon} from "../../../assets/chat-icon-grey.svg";
import {ReactComponent as CarrierChatIconWhite} from "../../../assets/chat-icon-white.svg";
import {ReactComponent as ArrowNav} from "../../../assets/arrow-nav.svg";
import {ReactComponent as SearchIcon} from "../../../assets/search-icon.svg";
import {ReactComponent as DefaultUserAvatar} from "../../../assets/default-avatar.svg";
import {ReactComponent as BellIcon} from "../../../assets/bell-icon.svg";
import {ReactComponent as SettingsAccountIcon} from "../../../assets/settings-icon.svg";
import {ReactComponent as SortIcon} from "../../../assets/sort-icon-blue.svg";
import {ReactComponent as SortIconWhite} from "../../../assets/sort-icon-white.svg";
import {ReactComponent as FilterIcon} from "../../../assets/filter-icon-blue.svg";
import {ReactComponent as FilterIconWhite} from "../../../assets/filter-icon-white.svg";
import {ReactComponent as CreateLoadIcon} from "../../../assets/create-load-icon-plus.svg";
import {ReactComponent as DirectionIcon} from "../../../assets/direction-icon.svg";
import {ReactComponent as CarrierLogo} from "../../../assets/trane-logo-carrier.svg";

import {useParams} from 'react-router-dom';
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import LoadContainer from "../../load-container/LoadContainer";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {TextField} from "@mui/material";

const HeavyEquipmentContainer = () => {
    return <div style={{color: "black"}}>Heavy Equipment Container</div>;
};

const VehicleLoadContainer = () => {
    return <div style={{color: "black"}}>Vehicle Load Container</div>;
};
const ShipperLoadsPage = () => {

    const [hoveredButton, setHoveredButton] = useState('');
    const [createLoadSection, setCreateLoadSection] = useState(false);
    const {id} = useParams();
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="shipper-dashboard-wrapper">
            <DashboardSidebar
                DashboardAI={{visible: true, route: `/shipper-dashboard/${id}`}}
                Settings={{visible: true, route: `/shipper-settings/${id}`}}
                Profile={{visible: true, route: `/shipper-profile/${id}`}}
                Payments={{visible: true, route: `/shipper-payments/${id}`}}
                ChatWithCarrier={{visible: true, route: `/shipper-chat-conversation/${id}`}}
                MyQoutes={{visible: true, route: `/shipper-qoutes/${id}`}}
                MyLoads={{visible: true, route: `/shipper-loads/${id}`}}
            />
            <div className="shipper-dashboard-content">
                <HeaderDashboard
                    contentTitle="Welcome Back, John"
                    contentSubtitle="Your current payments"
                    accountName="John Doe"
                    accountRole="Shipper"
                    profileLink={`/shipper-profile/${id}`}
                    bellLink={`/shipper-settings/${id}`}
                    settingsLink={`/shipper-profile/${id}`}
                />
                {createLoadSection ? (
                    <div className="shipper-loads-dashboard-content-body">
                        <div className="shipper-dashboard-load-buttons">
                            <section className="shipper-filter-buttons">
                                <button className="filter-buttons-shipper"
                                        onMouseEnter={() => setHoveredButton('SortButton')}
                                        onMouseLeave={() => setHoveredButton('')}>
                                    {hoveredButton === 'SortButton' ?
                                        <SortIconWhite className="button-nav-load-icon"/> :
                                        <SortIcon className="button-nav-load-icon"/>}
                                    Sort
                                </button>
                                <button className="filter-buttons-shipper"
                                        onMouseEnter={() => setHoveredButton('FilterButton')}
                                        onMouseLeave={() => setHoveredButton('')}>
                                    {hoveredButton === 'FilterButton' ?
                                        <FilterIconWhite className="button-nav-load-icon"/> :
                                        <FilterIcon className="button-nav-load-icon"/>}
                                    Filter
                                </button>
                            </section>
                            <button className="create-load-button" onClick={() => setCreateLoadSection(false)}>
                                <CreateLoadIcon className="button-nav-load-icon"/>Create New Load
                            </button>
                        </div>
                        <div className="shipper-loads-wrapper">
                            <LoadContainer/>
                            <LoadContainer/>
                            <LoadContainer/>
                        </div>
                    </div>
                ) : (
                    <div className="shipper-loads-dashboard-content-body">
                        <div className="create-load-container-header">
                            <button onClick={() => setCreateLoadSection(true)}><ArrowNav/></button>
                            <h3>Create Load</h3>
                        </div>
                        <div className="create-load-container-content">
                            <FormControl fullWidth>
                                <InputLabel>Type of Load</InputLabel>
                                <Select value={selectedOption} onChange={handleChange}>
                                    <MenuItem value="heavyEquipment" style={{color: "black"}}>Heavy Equipment</MenuItem>
                                    <MenuItem value="vehicleLoad" style={{color: "black"}}>Vehicle Load</MenuItem>
                                </Select>
                            </FormControl>
                            {selectedOption === 'heavyEquipment' && <HeavyEquipmentContainer />}
                            {selectedOption === 'vehicleLoad' && <VehicleLoadContainer />}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShipperLoadsPage;


