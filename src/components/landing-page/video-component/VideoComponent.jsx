import React from 'react'
import '../LandingPage.css';

const VideoComponent = ({video}) => {
    return (
        <div className='video-main'>
            <div className="video-overlay"></div>
            <video src={video} autoPlay loop muted/>
            <div className="video-content">
                <h1>openship.ai</h1>
                <p> Your Gateway to Global Shipping Empowered by AI</p>
                <section className="main-slider-button-wrapper">
                    <button className="become-shipper-button">Become Shipper</button>
                    <button className="become-carrier-button">Become Carrier</button>
                </section>
            </div>
        </div>
    )
}

export default VideoComponent