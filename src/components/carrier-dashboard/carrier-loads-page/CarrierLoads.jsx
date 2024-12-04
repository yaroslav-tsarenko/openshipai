import React, {useEffect, useState, useRef} from "react";
import '../CarrierDashboard.css';
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
import {ReactComponent as CarrierChatIcon} from "../../../assets/chat-icon-grey.svg";
import {ReactComponent as LoadBoxIconWhite} from "../../../assets/LoadBoxIconWhite.svg";
import {ReactComponent as TireIcon} from "../../../assets/TireIcon.svg";
import {ReactComponent as TireIconWhite} from "../../../assets/tire-icon-white.svg";
import {ReactComponent as LoadBoxIcon} from "../../../assets/load-box-icon.svg";
import {ReactComponent as CarrierChatIconWhite} from "../../../assets/chat-icon-white.svg";
import {ReactComponent as ArrowNav} from "../../../assets/arrow-nav.svg";
import {ReactComponent as SearchIcon} from "../../../assets/search-icon.svg";
import {ReactComponent as DefaultUserAvatar} from "../../../assets/default-avatar.svg";
import {ReactComponent as BellIcon} from "../../../assets/bell-icon.svg";
import {ReactComponent as SettingsAccountIcon} from "../../../assets/settings-icon.svg";
import {ReactComponent as BidArrowIcon} from "../../../assets/bid-arrow-icon.svg";
import {ReactComponent as DirectionIconNumbers} from "../../../assets/directions-number-icons.svg";
import {useParams} from 'react-router-dom';
import {Link} from "react-router-dom";
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import LoadContainerBid from "../../load-container-bid/LoadContainerBid";
import axios from "axios";
import {BACKEND_URL} from "../../../constants/constants";
import {Skeleton} from "@mui/material";

const CarrierLoads = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [hoveredButton, setHoveredButton] = useState('');
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [loadBids, setLoadBids] = useState([]);
    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };
    const {carrierID} = useParams();
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [carrierInfo, setCarrierInfo] = useState(null);

    useEffect(() => {
        const getAvatar = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-carrier-avatar/${carrierID}`);
                if (response.data.carrierAvatar) {
                    setPreviewSavedImage(`${BACKEND_URL}/${response.data.carrierAvatar}`);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        const getUser = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/get-current-user/carrier/${carrierID}`);
                const data = await response.json();
                setCarrierInfo(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        const fetchLoadBids = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/load-bids`);
                const filteredLoadBids = response.data.filter(loadBid => loadBid.loadBidCarrierID === carrierID);
                setLoadBids(filteredLoadBids);
            } catch (error) {
                console.error('Error fetching load bids:', error);
            }
        };

        getUser();
        fetchLoadBids();
        getAvatar();
    }, [carrierID]);
    return (
        <div className="carrier-dashboard-wrapper">
            <DashboardSidebar
                DashboardAI={{visible: true, route: `/carrier-dashboard/${carrierID}`}}
                TakeLoad={{visible: true, route: `/carrier-take-loads/${carrierID}`}}
                MyLoads={{visible: true, route: `/carrier-loads/${carrierID}`}}
                DriversAndEquip={{visible: true, route: `/carrier-drivers/${carrierID}`}}
                Payments={{visible: true, route: `/carrier-payments/${carrierID}`}}
                ChatWithShipper={{visible: true, route: `/carrier-chat-conversation/${carrierID}`}}
                Settings={{visible: true, route: `/carrier-settings/${carrierID}`}}
                isMobileSidebarOpen={isMobileSidebarOpen} toggleMobileSidebar={toggleMobileSidebar}
            />
            <div className="shipper-dashboard-content">
                <HeaderDashboard
                    contentTitle={carrierInfo ?
                        <>Welcome back, {carrierInfo.carrierContactCompanyName}!</> :
                        <Skeleton variant="text" width={250} />}
                    contentSubtitle="Monitor payments, loads, revenues"
                    accountName={carrierInfo ? carrierInfo.carrierContactCompanyName : <Skeleton variant="text" width={60} />}
                    accountRole={carrierInfo ? carrierInfo.role : <Skeleton variant="text" width={40} />}
                    bellLink={`/carrier-settings/${carrierID}`}
                    settingsLink={`/carrier-profile/${carrierID}`}
                    avatar={previewSavedImage ? previewSavedImage : DefaultUserAvatar}
                    onBurgerClick={toggleMobileSidebar}
                />
                <div className="carrier-dashboard-content-body">
                    <div className="taken-loads-container">
                        {loadBids.length > 0 ? (
                            loadBids.map(loadBid => (
                                <LoadContainerBid
                                    key={loadBid._id}
                                    loadPrice={loadBid.loadBidPrice}
                                    loadTitle={loadBid.loadTitle}
                                    loadPickUpLocation={loadBid.loadPickUpLocation}
                                    loadPickUpDate={loadBid.loadPickUpDate}
                                    loadDeliveryLocation={loadBid.loadDeliveryLocation}
                                    loadDeliveryDate={loadBid.loadDeliveryDate}
                                    loadType={loadBid.loadType}
                                    loadWeight={loadBid.loadWeight}
                                    loadDistance={loadBid.loadDistance}
                                    loadQoutes={loadBid.loadQoutes}
                                    loadID={loadBid.loadCredentialID}
                                    loadVehicleMake={loadBid.loadVehicleMake}
                                    loadStatus={loadBid.loadStatus}
                                    loadVehicleModel={loadBid.loadVehicleModel}
                                    loadVehicleYear={loadBid.loadVehicleYear}
                                    loadWidth={loadBid.loadWidth}
                                    loadHeight={loadBid.loadHeight}
                                    loadLength={loadBid.loadLength}
                                    loadTypeOfPackaging={loadBid.loadTypeOfPackaging}
                                    loadDescription={loadBid.loadDescription}
                                    loadCarrierConfirmation={loadBid.loadCarrierConfirmation}
                                    loadPaymentStatus={loadBid.loadPaymentStatus}
                                    loadAssignedDriverID={loadBid.loadAssignedDriverID}
                                    loadSpecifiedItem={loadBid.loadSpecifiedItem}
                                    loadMovingSize={loadBid.loadMovingSize}
                                    loadNumberOfBedrooms={loadBid.loadNumberOfBedrooms}
                                    loadNumberOfPallets={loadBid.loadNumberOfPallets}
                                    loadDeliveredStatus={loadBid.loadDeliveredStatus}
                                    loadPickupStories={loadBid.loadPickupStories}
                                    loadDeliveryStories={loadBid.loadDeliveryStories}
                                    loadSpecialHandlingRequirements={loadBid.loadSpecialHandlingRequirements}
                                    loadIndustrySector={loadBid.loadIndustrySector}
                                    loadPrimaryContactName={loadBid.loadPrimaryContactName}
                                    loadMajorItems={loadBid.loadMajorItems}
                                    loadSecondaryContactName={loadBid.loadSecondaryContactName}
                                    loadPickupFloor={loadBid.loadPickupFloor}
                                    loadDeliveryFloor={loadBid.loadDeliveryFloor}
                                    loadBusinessName={loadBid.loadBusinessName}
                                    loadTypeOfBusiness={loadBid.loadTypeOfBusiness}
                                    loadLiftedItemsQuantity={loadBid.loadLiftedItemsQuantity}
                                    loadHaveFreightElevator={loadBid.loadHaveFreightElevator}
                                    loadDestinationOptions={loadBid.loadDestinationOptions}
                                    loadServiceExpressOptions={loadBid.loadServiceExpressOptions}
                                    loadAreaOption={loadBid.loadAreaOption}
                                    loadQuantity={loadBid.loadQuantity}
                                    loadOperable={loadBid.loadOperable}
                                    loadConvertible={loadBid.loadConvertible}
                                    loadModified={loadBid.loadModified}
                                    loadNumberOfItems={loadBid.loadNumberOfItems}
                                    loadTrike={loadBid.loadTrike}
                                    loadIsCrate={loadBid.loadIsCrate}
                                    loadIsPallet={loadBid.loadIsPallet}
                                    loadTripStarted={loadBid.loadTripStarted}
                                    loadAdditionalSelectedLoadOptions={loadBid.loadAdditionalSelectedLoadOptions}
                                    loadIsBox={loadBid.loadIsBox}
                                    isOnTrailer={loadBid.isOnTrailer}
                                    hasTrailerPreference={loadBid.hasTrailerPreference}
                                    loadTypeOfTrailer={loadBid.loadTypeOfTrailer}
                                    loadLocationStops={loadBid.loadLocationStops}
                                    loadOriginDeliveryPreference={loadBid.loadOriginDeliveryPreference}
                                    shipperID={loadBid.shipperID}
                                />
                            ))
                        ) : (
                            <p>No loads found for this carrier.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarrierLoads;
