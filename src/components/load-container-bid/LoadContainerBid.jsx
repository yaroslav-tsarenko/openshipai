import React from 'react';
import "./LoadContainerBid.css";
import {ReactComponent as BidArrowIcon} from "../../assets/bid-arrow-icon.svg";
import {ReactComponent as DirectionIconNumbers} from "../../assets/directions-number-icons.svg";

const LoadContainerBid = ({
                              loadPrice,
                              loadTitle,
                              loadPickUpLocation,
                              loadPickUpDate,
                              loadDeliveryLocation,
                              loadDeliveryDate,
                              loadType,
                              loadWeight,
                              loadDistance,
                              loadQoutes
                          }) => {
    return (
        <div className="take-load-bid-container-wrapper">
            <div className="take-load-bid-container-content">
                <span>
                    <label>Load Title</label>
                    <h3>{loadTitle}</h3>
                </span>
                <span>
                    <label>Price</label>
                    <h1>{loadPrice}</h1>
                </span>
                <div className="carrier-load-directions">
                    <DirectionIconNumbers height="100px"/>
                    <div className="load-carrier-direction">
                        <section>
                            <h3>{loadPickUpLocation}</h3>
                            <p>{loadPickUpDate}</p>
                        </section>
                        <section>
                            <h3>{loadDeliveryLocation}</h3>
                            <p>{loadDeliveryDate}</p>
                        </section>
                    </div>
                </div>
            </div>
            <div className="load-short-info">
                <span>
                    <label>Load Type</label>
                    <h3>{loadType}</h3>
                </span>
                <span>
                    <label>Weight</label>
                    <h3>{loadWeight}</h3>
                </span>
                <span>
                    <label>Trip</label>
                    <h3>{loadDistance}</h3>
                </span>
            </div>
            <div className="instant-book-load">
                <label>Instant Book</label>
                <h3>{loadQoutes} Qoutes</h3>
                <button className="bid-button">Bid<BidArrowIcon className="bid-arrow-icon"/>
                </button>
            </div>
        </div>
    );
};

export default LoadContainerBid;