import React from 'react';

const PricePerKilometer = ({ mil, price }) => {
    const distanceInMiles = parseInt(mil, 10);
    const totalPrice = parseInt(price, 10);
    const distanceInKilometers = distanceInMiles * 1.60934;
    const pricePerKilometer = totalPrice / distanceInKilometers;

    return (
        <h6 className="per-mil-calculating">{`$ ${pricePerKilometer.toFixed(2)} / mi`}</h6>
    );
};

export default PricePerKilometer;