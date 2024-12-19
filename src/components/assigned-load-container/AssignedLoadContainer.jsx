import React from 'react';
import InfoItem from "../info-item/InfoItem";
import './AssignedLoadContainer.css';
import LoadInfoList from "../load-direction-info-list/LoadInfoList";
import Grid from "../grid-two-columns/Grid";
import Button from "../button/Button";
import GoogleMapRealTimeTrafficComponent
    from "../driver-dashboard/google-map-real-time-traffic-data/GoogleMapRealTimeTrafficComponent";

const AssignedLoadContainer = ({
                                   loadTitle,
                                   driverID,
                                   loadPickupLocation,
                                   loadCredentialID,
                                   loadDeliveryLocation,
                                   loadType,
                                   loadWeight,
                                   loadTrip
                               }) => {

    const loadPickupLocationFormatted =  loadPickupLocation ? loadPickupLocation.split(",")[0] : "Oregon";
    const loadDeliveryLocationFormatted =  loadDeliveryLocation ? loadDeliveryLocation.split(",")[0] : "Oregon";

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
                <GoogleMapRealTimeTrafficComponent type="destination" origin={loadPickupLocationFormatted} destination={loadDeliveryLocationFormatted} borderRadius={["", "45px", "45px", ""]}/>
            </div>
        </div>
    );
};

export default AssignedLoadContainer;