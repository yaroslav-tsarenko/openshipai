import React from 'react';
import {ReactComponent as BidArrowIcon} from "../../assets/images/bid-arrow-icon.svg";
import {Link} from "react-router-dom";
import GoogleMapShowDirection from "../google-map-show-direction/GoogleMapShowDirection";
import InfoItem from "../info-item/InfoItem";
import './AssignedLoadContainer.css';
import LoadInfoList from "../load-direction-info-list/LoadInfoList";
import Grid from "../grid-two-columns/Grid";
import Button from "../button/Button";

const AssignedLoadContainer = ({
                                   loadTitle,
                                   driverID,
                                   loadPickupLocation,
                                   loadPickupLocationDate,
                                   loadCredentialID,
                                   loadDeliveryLocation,
                                   loadDeliveryLocationDate,
                                   loadType,
                                   loadWeight,
                                   loadTrip
                               }) => {

    return (
        <div className="take-load-container">
            <div className="load-container-content">
                <Grid columns="3, 1fr">
                    <div className="assigned-load-info">
                        <InfoItem label="Load Title">
                            {loadTitle}
                        </InfoItem>
                        <LoadInfoList
                            loadPickupLocation="Oregon"
                            loadPickupLocationDate="2024-12-14T19:46"
                            loadDeliveryLocation="Washington"
                            loadDeliveryLocationDate="2024-12-11T18:46"
                        />
                    </div>
                    <div className="assigned-load-info">
                        <InfoItem label="Load Type">
                            {loadType}
                        </InfoItem>
                        <InfoItem label="Weight">
                            {loadWeight}
                        </InfoItem>
                        <InfoItem label="Trip">
                            {loadTrip}
                        </InfoItem>
                    </div>
                    <div className="assigned-load-info-assigned">
                        <div className="assigned-load-info-assigned-content">
                            <label className="assigned-load-info-label">Assigned to you</label>
                            <Button variant="apply" to={`/driver-assigned-load/${driverID}/${loadCredentialID}`}>
                                View
                            </Button>
                        </div>
                    </div>
                </Grid>
            </div>
            <div className="map-load-section-load-container">
                <GoogleMapShowDirection origin={loadPickupLocation} destination={loadDeliveryLocation}/>
            </div>
        </div>
    );
};

export default AssignedLoadContainer;