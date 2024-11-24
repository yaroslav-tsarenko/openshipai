import React, {useEffect, useState} from 'react';
import '../ShipperDashboard.css';
import {Link, useParams} from 'react-router-dom';
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import {ReactComponent as DirectionIcon} from "../../../assets/load-container-directions-smaller.svg";
import {ReactComponent as ArrowNav} from "../../../assets/arrow-nav.svg";
import axios from 'axios';
import GoogleMapCurrentLoadDirections
    from "../../google-map-show-current-load-direction/GoogleMapCurrentLoadDirections";
import ImageSlider from "../../image-slider/ImageSlider";
import CarrierLoadBid from "../../carrier-load-bid/CarrierLoadBid";
import {Skeleton} from "@mui/material";
import {BACKEND_URL} from "../../../constants/constants";
import LoadStatus from "../../load-status-bar/LoadStatus";
import SEO from "../../seo/SEO";
import useGsapAnimation from "../../../hooks/useGsapAnimation";

const ShipperLoadPage = () => {

    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [loadImages, setLoadImages] = useState([]);
    const {loadCredentialID} = useParams();
    const {shipperID} = useParams();
    const [load, setLoad] = useState(null);
    const [loadBids, setLoadBids] = useState([]);
    const [shipperInfo, setShipperInfo] = useState(null);
    const animation = useGsapAnimation("slideUp")

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/get-current-user/shipper/${shipperID}`);
                const data = await response.json();
                setShipperInfo(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        getUser();
    }, [shipperInfo, shipperID]);

    useEffect(() => {
        const fetchLoad = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/load/${loadCredentialID}`);
                setLoad(response.data);
                setLoadImages(response.data.loadImages.map(image => `${BACKEND_URL}/${image}`));
            } catch (error) {
                console.error('Error fetching load:', error);
            }
        };

        const fetchAvatar = async () => {
            if (shipperInfo && shipperInfo.userShipperAvatar) {
                const avatarUrl = `${BACKEND_URL}/${shipperInfo.userShipperAvatar}`;
                try {
                    await axios.get(avatarUrl);
                    setPreviewSavedImage(avatarUrl);
                } catch (error) {
                    console.error('Image does not exist');
                } finally {
                }
            }
        };

        const fetchAllLoadBids = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-all-load-bids`);
                const data = await response.data;

                if (response.status === 200) {
                    const filteredBids = data.filter(bid => bid.loadCredentialID === loadCredentialID);
                    setLoadBids(filteredBids);
                } else {
                    console.error('Failed to fetch all load bids:', data);
                }
            } catch (error) {
                console.error('Error fetching all load bids:', error);
            }
        };

        fetchAvatar();
        fetchAllLoadBids();
        fetchLoad();
    }, [loadCredentialID]);

    if (!load) {
        return <div>Loading...</div>;
    }

    function splitPascalCase(text) {
        return text.replace(/([a-z])([A-Z])/g, '$1 $2');
    }

    const formattedLoadSubType = splitPascalCase(load.loadSubType);

    return (
        <>
            <SEO
                title={`${load.loadTitle} - ${formattedLoadSubType}`}
                description="Ensure the safe and efficient transport of your load with our specialized load container services. Contact us for a quote!"
                keywords="load, create load, add load, update load, load operations, load management"
            />
            <div className="shipper-dashboard-wrapper">
                <DashboardSidebar
                    DashboardAI={{visible: true, route: `/shipper-dashboard/${shipperID}`}}
                    Settings={{visible: true, route: `/shipper-settings/${shipperID}`}}
                    Payments={{visible: true, route: `/shipper-payments/${shipperID}`}}
                    ChatWithCarrier={{visible: true, route: `/shipper-chat-conversation/${shipperID}`}}
                    MyLoads={{visible: true, route: `/shipper-loads/${shipperID}`}}
                />
                <div className="shipper-dashboard-content">
                    <HeaderDashboard
                        contentTitle={shipperInfo ?
                            <>Welcome back, {shipperInfo.userShipperName}!</> :
                            <Skeleton variant="text" width={250}/>}
                        contentSubtitle="Monitor payments, loads, revenues"
                        accountName={shipperInfo ? shipperInfo.userShipperName : <Skeleton variant="text" width={60}/>}
                        accountRole={shipperInfo ? shipperInfo.userShipperRole : <Skeleton variant="text" width={40}/>}
                        profileLink={`/shipper-profile/${shipperID}`}
                        bellLink={`/shipper-settings/${shipperID}`}
                        settingsLink={`/shipper-profile/${shipperID}`}
                        avatar={previewSavedImage ? previewSavedImage : previewSavedImage}
                    />
                    <div className="load-page-content-page-section" ref={animation}>
                        <div className="load-page-header">
                            <Link to={`/shipper-loads/${shipperID}`} className="go-back-link">
                                <ArrowNav className="arrow-nav-close-open-side-bar"/>
                            </Link>
                            <section>
                                <h1>{load.loadTitle} - {formattedLoadSubType}</h1>
                                <p>{load.loadCredentialID}</p>
                            </section>
                        </div>
                        <div className="load-details-content-wrapper">
                            <LoadStatus status={load.loadStatus}/>
                            <div className="load-details-content">
                                <div className="load-details-container">
                                    <section>
                                        <h4>Shipment Title</h4>
                                        <h2>{load.loadTitle}</h2>
                                    </section>
                                    <section>
                                        <h4>Load ID</h4>
                                        <h2>{load.loadCredentialID}</h2>
                                    </section>
                                    <section>
                                        <h4>Load Subtype</h4>
                                        <h2>{formattedLoadSubType}</h2>
                                    </section>
                                    <section>
                                        <h4>Load Type</h4>
                                        <h2>{load.loadType}</h2>
                                    </section>
                                    <section>
                                        <h4>Load Weight</h4>
                                        <h2>{load.loadWeight}</h2>
                                    </section>
                                    <div className="loadboard-load-direction-wrapper">
                                        <DirectionIcon style={{marginRight: '10px'}}/>
                                        <div className="loadboard-load-direction">
                            <span className="loadboard-load-direction-origin">
                                <h3>{load.loadPickupLocation}</h3>
                                <p>{load.loadPickupDate}</p>
                            </span>
                                            <span className="loadboard-load-direction-destination">
                                <h3>{load.loadDeliveryLocation}</h3>
                                <p>{load.loadDeliveryDate}</p>
                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="load-details-container">
                                    {load.loadWidth && (
                                        <section>
                                            <h4>Load Width</h4>
                                            <h2>{load.loadWidth}</h2>
                                        </section>
                                    )}
                                    {load.loadHeight && (
                                        <section>
                                            <h4>Load Height</h4>
                                            <h2>{load.loadHeight}</h2>
                                        </section>
                                    )}
                                    {load.loadQuantity && (
                                        <section>
                                            <h4>Load Quantity</h4>
                                            <h2>{load.loadQuantity}</h2>
                                        </section>
                                    )}
                                    {load.loadConvertible && (
                                        <section>
                                            <h4>Convertible</h4>
                                            <h2>{load.loadConvertible}</h2>
                                        </section>
                                    )}
                                    {load.loadOperable && (
                                        <section>
                                            <h4>Operable</h4>
                                            <h2>{load.loadOperable}</h2>
                                        </section>
                                    )}
                                    {load.loadMilesTrip && (
                                        <section>
                                            <h4>Load Miles Trip</h4>
                                            <h2>{load.loadMilesTrip}</h2>
                                        </section>
                                    )}
                                </div>
                                <ImageSlider images={loadImages}/>
                                <div className="map-directions-load-details">
                                    <GoogleMapCurrentLoadDirections origin={load.loadPickupLocation}
                                                                    destination={load.loadDeliveryLocation}/>
                                </div>
                            </div>
                            <div className="load-carrier-bids-listing-content">
                                <div className="load-carrier-bids-listing-header">
                                    <h1>Listing From Carriers</h1>
                                    <p>Choose the best matching carrier for your load</p>
                                </div>

                                {loadBids.length !== 0 ? (
                                    loadBids.map(loadBid => (
                                        <CarrierLoadBid
                                            key={loadBid._id}
                                            loadBidPrice={loadBid.loadBidPrice}
                                            loadID={loadBid.loadCredentialID}
                                            shipperID={shipperID}
                                            loadCarrierID={loadBid.loadCarrierID}
                                            loadBidCoverLetter={loadBid.loadBidCoverLetter}
                                            loadEstimatedDeliveryTime={loadBid.loadBidDeliveryDate}
                                        />
                                    ))
                                ) : (
                                    <div className="carriers-bids-empty">
                                        <p>Current listing from carriers is empty...</p>
                                    </div>
                                )}

                            </div>
                        </div>
                        {/*<div style={{background: "grey"}}>
                    <h2>{load.loadTitle}</h2>
                    <p>Type: {load.loadType}</p>
                    <p>Sub Type: {load.loadSubType}</p>
                    <p>Status: {load.loadStatus}</p>
                    <p>Price: {load.loadPrice}</p>
                    <p>Pickup Location: {load.loadPickupLocation}</p>
                    <p>Pickup Date: {load.loadPickupDate}</p>
                    <p>Pickup Time: {load.loadPickupTime}</p>
                    <p>Delivery Location: {load.loadDeliveryLocation}</p>
                    <p>Delivery Date: {load.loadDeliveryDate}</p>
                    <p>Delivery Time: {load.loadDeliveryTime}</p>
                    <p>Description: {load.loadDescription}</p>
                    <p>Type of Packaging: {load.loadTypeOfPackaging}</p>
                    <p>Weight: {load.loadWeight}</p>
                    <p>Length: {load.loadLength}</p>
                    <p>Width: {load.loadWidth}</p>
                    <p>Qoutes: {load.loadQoutes}</p>
                    <p>Miles Trip: {load.loadMilesTrip}</p>
                    <p>Specified Item: {load.loadSpecifiedItem}</p>
                    <p>Moving Size: {load.loadMovingSize}</p>
                    <p>Number of Bedrooms: {load.loadNumberOfBedrooms}</p>
                    <p>Number of Pallets: {load.loadNumberOfPallets}</p>
                    <p>Pickup Stories: {load.loadPickupStories}</p>
                    <p>Delivery Stories: {load.loadDeliveryStories}</p>
                    <p>Special Handling Requirements: {load.loadSpecialHandlingRequirements}</p>
                    <p>Industry Sector: {load.loadIndustrySector}</p>
                    <p>Primary Contact Name: {load.loadPrimaryContactName}</p>
                    <p>Major Items: {load.loadMajorItems}</p>
                    <p>Secondary Contact Name: {load.loadSecondaryContactName}</p>
                    <p>Pickup Floor: {load.loadPickupFloor}</p>
                    <p>Delivery Floor: {load.loadDeliveryFloor}</p>
                    <p>Business Name: {load.loadBusinessName}</p>
                    <p>Type of Business: {load.loadTypeOfBusiness}</p>
                    <p>Lifted Items Quantity: {load.loadLiftedItemsQuantity}</p>
                    <p>Have Freight Elevator: {load.loadHaveFreightElevator}</p>
                    <p>Destination Options: {load.loadDestinationOptions}</p>
                    <p>Service Express Options: {load.loadServiceExpressOptions}</p>
                    <p>Area Option: {load.loadAreaOption}</p>
                    <p>Vehicle Make: {load.loadVehicleMake}</p>
                    <p>Vehicle Year: {load.loadVehicleYear}</p>
                    <p>Vehicle Model: {load.loadVehicleModel}</p>
                    <p>Height: {load.loadHeight}</p>
                    <p>Quantity: {load.loadQuantity}</p>
                    <p>Operable: {load.loadOperable ? 'Yes' : 'No'}</p>
                    <p>Convertible: {load.loadConvertible ? 'Yes' : 'No'}</p>
                    <p>Modified: {load.loadModified ? 'Yes' : 'No'}</p>
                    <p>Number of Items: {load.loadNumberOfItems}</p>
                    <p>Trike: {load.loadTrike ? 'Yes' : 'No'}</p>
                    <p>Is Crate: {load.loadIsCrate}</p>
                    <p>Is Pallet: {load.loadIsPallet}</p>
                    <p>Additional Selected Load Options: {load.loadAdditionalSelectedLoadOptions.join(', ')}</p>
                    <p>Is Box: {load.loadIsBox}</p>
                    <p>Is On Trailer: {load.isOnTrailer ? 'Yes' : 'No'}</p>
                    <p>Has Trailer Preference: {load.hasTrailerPreference ? 'Yes' : 'No'}</p>
                    <p>Type of Trailer: {load.loadTypeOfTrailer}</p>
                    <p>Credential ID: {load.loadCredentialID}</p>
                    <p>Shipper ID: {load.shipperID}</p>
                </div>*/}
                    </div>

                </div>
            </div>

        </>
    );
};


export default ShipperLoadPage;


