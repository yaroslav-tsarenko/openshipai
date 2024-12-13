import React from 'react';
import VehicleIcon from "../../../assets/images/vehicles-icon.svg";
import HouseHold from "../../../assets/images/household-item.svg";
import HeavyEquipemnt from "../../../assets/images/heavy-equipment-icon.svg";
import BoxIcon from "../../../assets/images/box-pallet-icon.svg";
import "../LandingPage.css"

const LoadTypes = () => {
    return (
        <div className="load-types-wrapper">
            <div className="load-types-content">
                <div className="load-type">
                    <img src={HouseHold} alt="HouseHold" className="load-type-icon"/>
                    <h2 >Household Item</h2>
                    <p >Furniture, Appliances</p>
                </div>
                <div className="load-type">
                    <img src={VehicleIcon} alt="Vehicle Icon" className="load-type-icon"/>
                    <h2 >Vehicle & Boats</h2>
                    <p >Cars, Boats, Trailers, Parts</p>
                </div>
                <div className="load-type">
                    <img src={BoxIcon} alt="BoxIcon" className="load-type-icon"/>
                    <h2 >Freight</h2>
                    <p >LTL, FTL</p>
                </div>
                <div className="load-type">
                    <img src={HeavyEquipemnt} alt="HeavyEquipemnt" className="load-type-icon"/>
                    <h2 >Heavy Equipment</h2>
                    <p >Farm, Construction</p>
                </div>
            </div>
        </div>
    );
};

export default LoadTypes;