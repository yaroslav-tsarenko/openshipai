import React, {useEffect, useState} from 'react';
import '../ShipperDashboard.css';
import {Link, useParams} from 'react-router-dom';
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import {ReactComponent as DirectionIcon} from "../../../assets/load-container-directions-smaller.svg";
import {ReactComponent as ArrowNav} from "../../../assets/arrow-nav.svg";
import {ReactComponent as ProgressBarStepFirst} from "../../../assets/progress-bar-1-step.svg";
import axios from 'axios';
import GoogleMapCurrentLoadDirections
    from "../../google-map-show-current-load-direction/GoogleMapCurrentLoadDirections";
import BmwImage1 from "../../../assets/bmw-1.png";
import BmwImage2 from "../../../assets/bmw-2.png";
import BmwImage3 from "../../../assets/bmw-3.png";
import BmwImage4 from "../../../assets/bmw-4.png";
import BmwImage5 from "../../../assets/bmw-5.png";
import BmwImage6 from "../../../assets/bmw-6.png";
import ImageSlider from "../../image-slider/ImageSlider";
import LoadContainerBid from "../../load-container-bid/LoadContainerBid";
import CarrierLoadBid from "../../carrier-load-bid/CarrierLoadBid";

const ShipperLoadPage = () => {

    const images = [BmwImage1, BmwImage2, BmwImage3, BmwImage4, BmwImage5, BmwImage6];

    const {loadCredentialID} = useParams();
    const {shipperID} = useParams();
    const [load, setLoad] = useState(null);
    const [loadBids, setLoadBids] = useState([]);

    useEffect(() => {
        const fetchLoad = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/load/${loadCredentialID}`);
                setLoad(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching load:', error);
            }
        };

        const fetchAllLoadBids = async () => {
            try {
                const response = await axios.get('http://localhost:8080/get-all-load-bids');
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

        fetchAllLoadBids();
        fetchLoad();
    }, [loadCredentialID]);

    if (!load) {
        return <div>Loading...</div>;
    }




    return (
        <div className="shipper-dashboard-wrapper">
            <DashboardSidebar
                DashboardAI={{visible: true, route: `/shipper-dashboard/${shipperID}`}}
                Settings={{visible: true, route: `/shipper-settings/${shipperID}`}}
                Profile={{visible: true, route: `/shipper-profile/${shipperID}`}}
                Payments={{visible: true, route: `/shipper-payments/${shipperID}`}}
                ChatWithCarrier={{visible: true, route: `/shipper-chat-conversation/${shipperID}`}}
                MyQoutes={{visible: true, route: `/shipper-qoutes/${shipperID}`}}
                MyLoads={{visible: true, route: `/shipper-loads/${shipperID}`}}
            />
            <div className="shipper-dashboard-content">
                <HeaderDashboard
                    contentTitle="Welcome Back, John"
                    contentSubtitle="Your current payments"
                    accountName="John Doe"
                    accountRole="Shipper"
                    profileLink={`/shipper-profile/${shipperID}`}
                    bellLink={`/shipper-settings/${shipperID}`}
                    settingsLink={`/shipper-profile/${shipperID}`}
                />
                <div className="load-page-header">
                    <Link to={`/shipper-loads/${shipperID}`} className="go-back-link">
                        <ArrowNav className="arrow-nav-close-open-side-bar"/>
                    </Link>
                    <section>
                        <h1>{load.loadTitle}</h1>
                        <p>{load.loadCredentialID}</p>
                    </section>
                </div>
                <div className="load-details-content-wrapper">
                    <ProgressBarStepFirst style={{margin: '20px auto'}}/>
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
                        <ImageSlider images={images}/>
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
                       {loadBids.map(loadBid => (
                           <CarrierLoadBid
                           key={loadBid._id}
                           loadBidPrice={loadBid.loadBidPrice}
                           loadID={loadBid.loadCredentialID}
                           loadCarrierID={loadBid.loadBidCarrierID}
                           loadBidCoverLetter={loadBid.loadBidCoverLetter}
                           loadEstimatedDeliveryTime={loadBid.loadBidDeliveryDate}
                           />
                       ))}

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
    );
};


export default ShipperLoadPage;


