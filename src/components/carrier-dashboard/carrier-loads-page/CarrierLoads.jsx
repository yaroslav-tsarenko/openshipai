import React, {useEffect, useState} from "react";
import '../CarrierDashboard.css';
import {ReactComponent as DefaultUserAvatar} from "../../../assets/images/default-avatar.svg";
import {useParams} from 'react-router-dom';
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import LoadContainerBid from "../../load-container-bid/LoadContainerBid";
import axios from "axios";
import {BACKEND_URL} from "../../../constants/constants";
import {Skeleton} from "@mui/material";

const CarrierLoads = () => {

    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [loadBids, setLoadBids] = useState([]);
    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };
    const {carrierID} = useParams();
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
                const response = await axios.get(`${BACKEND_URL}/get-load-bids-by-carrier/${carrierID}`);
                setLoadBids(response.data);
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
                isSidebarOpen={isSidebarOpen}
                type="carrier"
                userID={carrierID}
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
                            loadBids.map(load => (
                                <LoadContainerBid
                                    key={load._id}
                                    loadPrice={load.loadAveragePrice}
                                    loadTitle={load.loadTitle}
                                    loadPickUpLocation={load.loadPickupLocation}
                                    loadPickUpDate={load.loadPickupDate}
                                    loadDeliveryLocation={load.loadDeliveryLocation}
                                    loadDeliveryDate={load.loadDeliveryDate}
                                    loadType={load.loadType}
                                    loadWeight={`${load.loadWeight} lb`}
                                    loadDistance={`${load.loadMilesTrip} mil`}
                                    loadQoutes={load.loadQoutes}
                                    loadID={load.loadCredentialID}
                                    loadVehicleMake={load.loadVehicleMake}
                                    loadStatus={load.loadStatus}
                                    loadVehicleModel={load.loadVehicleModel}
                                    loadVehicleYear={load.loadVehicleYear}
                                    loadWidth={load.loadWidth}
                                    loadHeight={load.loadHeight}
                                    loadLength={load.loadLength}
                                    loadTypeOfPackaging={load.loadTypeOfPackaging}
                                    loadDescription={load.loadDescription}
                                    loadCarrierConfirmation={load.loadCarrierConfirmation}
                                    loadPaymentStatus={load.loadPaymentStatus}
                                    loadAssignedDriverID={load.loadAssignedDriverID}
                                    loadSpecifiedItem={load.loadSpecifiedItem}
                                    loadMovingSize={load.loadMovingSize}
                                    loadNumberOfBedrooms={load.loadNumberOfBedrooms}
                                    loadNumberOfPallets={load.loadNumberOfPallets}
                                    loadDeliveredStatus={load.loadDeliveredStatus}
                                    loadPickupStories={load.loadPickupStories}
                                    loadDeliveryStories={load.loadDeliveryStories}
                                    loadSpecialHandlingRequirements={load.loadSpecialHandlingRequirements}
                                    loadIndustrySector={load.loadIndustrySector}
                                    loadPrimaryContactName={load.loadPrimaryContactName}
                                    loadMajorItems={load.loadMajorItems}
                                    loadSecondaryContactName={load.loadSecondaryContactName}
                                    loadPickupFloor={load.loadPickupFloor}
                                    loadDeliveryFloor={load.loadDeliveryFloor}
                                    loadBusinessName={load.loadBusinessName}
                                    loadTypeOfBusiness={load.loadTypeOfBusiness}
                                    loadLiftedItemsQuantity={load.loadLiftedItemsQuantity}
                                    loadHaveFreightElevator={load.loadHaveFreightElevator}
                                    loadDestinationOptions={load.loadDestinationOptions}
                                    loadServiceExpressOptions={load.loadServiceExpressOptions}
                                    loadAreaOption={load.loadAreaOption}
                                    loadQuantity={load.loadQuantity}
                                    loadOperable={load.loadOperable}
                                    loadConvertible={load.loadConvertible}
                                    loadModified={load.loadModified}
                                    loadNumberOfItems={load.loadNumberOfItems}
                                    loadTrike={load.loadTrike}
                                    loadIsCrate={load.loadIsCrate}
                                    loadIsPallet={load.loadIsPallet}
                                    loadTripStarted={load.loadTripStarted}
                                    loadAdditionalSelectedLoadOptions={load.loadAdditionalSelectedLoadOptions}
                                    loadIsBox={load.loadIsBox}
                                    loadCredentialID={load.loadCredentialID}
                                    isOnTrailer={load.isOnTrailer}
                                    hasTrailerPreference={load.hasTrailerPreference}
                                    loadTypeOfTrailer={load.loadTypeOfTrailer}
                                    loadLocationStops={load.loadLocationStops}
                                    loadOriginDeliveryPreference={load.loadOriginDeliveryPreference}
                                    shipperID={load.shipperID}
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
