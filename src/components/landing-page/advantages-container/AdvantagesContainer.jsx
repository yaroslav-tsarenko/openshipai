import React, { useState } from 'react';
import "../LandingPage.css";
import LightingFastLogistics from "../../../assets/images/lighting-fast-logistics.svg";
import RoadAnalys from "../../../assets/images/analyse-road-data.svg";
import AutoTransportDesicions from "../../../assets/images/auto-transport-delivery.svg";
import AdaptiveWeatherPlanning from "../../../assets/images/adaptive-weather-planning.svg";
import LeftAdvantageContainer from "../left-advantage-container/LeftAdvantageContainer";
import RightAdvantageContainer from "../right-advantage-container/RightAdvantageContainer";

const AdvantagesContainer = () => {

    const [selectedComponent, setSelectedComponent] = useState(
        <LeftAdvantageContainer title="Lightning-Fast Logistics"
                                description="The world's leading businesses AI-Powered model for helping in enterprise"
                                image={LightingFastLogistics}/>
    );
    const [activeButton, setActiveButton] = useState('On-Demand Delivery');
    return (
        <div className="advantages-container-wrapper">
            <h1>Advantages</h1>
            <p>The world's leading businesses AI-Powered model for helping in enterprise</p>
            <section className="advantages-select-button">
                <button className={activeButton === 'On-Demand Delivery' ? 'active' : ''} onClick={() => {
                    setSelectedComponent(<LeftAdvantageContainer title="Lightning-Fast Logistics"
                                                                 description="Expect exceptional
                                                                                              speed and reliability with openship.ai's On-Demand Delivery.
                                                                                              Our AI-driven logistics ensure your shipments are
                                                                                              prioritized, dispatched, and delivered promptly to meet the pace of your business."
                                                                 image={LightingFastLogistics}/>);
                    setActiveButton('On-Demand Delivery');
                }}>On-Demand Delivery
                </button>
                <button className={activeButton === 'Business Intelligence' ? 'active' : ''} onClick={() => {
                    setSelectedComponent(<RightAdvantageContainer title="Data-Driven Decisions"
                                                                  description="Empower your enterprise
                                                                                     with actionable
                                                                                     insights from openship.ai.
                                                                                     Our Business Intelligence tools analyze shipping trends, optimize routes, and forecast costs, leading to smarter, more profitable decisions."
                                                                  image={RoadAnalys}/>);
                    setActiveButton('Business Intelligence');
                }}>Business Intelligence
                </button>
                <button className={activeButton === 'Automotive' ? 'active' : ''} onClick={() => {
                    setSelectedComponent(<LeftAdvantageContainer title="Precision Auto Transport"
                                                                 description="openship.ai provides specialized logistics solutions for the automotive industry. Whether it's parts distribution or vehicle transport, we deliver with the precision and care that automotive logistics demand."
                                                                 image={AutoTransportDesicions}/>);
                    setActiveButton('Automotive');
                }}>Automotive
                </button>
                <button className={activeButton === 'Weather' ? 'active' : ''} onClick={() => {
                    setSelectedComponent(<RightAdvantageContainer title="Adaptive Weather Planning"
                                                                  description="Don’t let the elements slow you down. OpenShip.ai's advanced weather tracking adapts your shipping plans to real-time conditions, reducing delays and safeguarding your deliveries against the unexpected."
                                                                  image={AdaptiveWeatherPlanning}/>);
                    setActiveButton('Weather');
                }}>Weather
                </button>
            </section>
            {selectedComponent}
        </div>
    );
};

export default AdvantagesContainer;