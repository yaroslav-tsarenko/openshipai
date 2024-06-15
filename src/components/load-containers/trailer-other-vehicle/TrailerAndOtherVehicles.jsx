import React, {useRef, useState} from 'react';
import "./TrailerAndOtherVehicles.css";
import Switch from "../../switcher-component/Switch";
import axios from 'axios';
import {useParams} from "react-router-dom";
import {ReactComponent as PlusIcon} from "../../../assets/plus-blue-icon.svg";
import FloatingWindowSuccess from "../../floating-window-success/FloatingWindowSuccess";
import FloatingWindowFailed from "../../floating-window-failed/FloatingWindowFailed";
import RecommendationContainer from "../../reccomendation-container/RecommendationContainer";
import {ReactComponent as AttachFile} from "../../../assets/files-icon.svg";
import {ReactComponent as CameraIcon} from "../../../assets/camera-icon.svg";
import {ClipLoader} from "react-spinners";

const TrailerAndOtherVehicles = ({pickupLocation, deliveryLocation, loadType, loadSubType, loadPickupDate, loadDeliveryDate, loadPickupTime, loadDeliveryTime,}) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState([]);
    const [filePreviewUrl, setFilePreviewUrl] = useState([]);
    const fileInputRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const {shipperID} = useParams();
    const [isLoadCreatedSuccess, setIsLoadCreatedSuccess] = useState(false);
    const [isLoadCreatedFailed, setIsLoadCreatedFailed] = useState(false);
    const [formData, setFormData] = useState({
        loadType: loadType,
        loadSubType: loadSubType,
        loadSpecifiedItem: '',
        loadTitle: '',
        loadPickupLocation: pickupLocation,
        loadDeliveryLocation: deliveryLocation,
        loadPickupDate: loadPickupDate,
        loadDeliveryDate: loadDeliveryDate,
        loadPickupTime: loadPickupTime,
        loadDeliveryTime: loadDeliveryTime,
        loadDescription: '',
        loadTypeOfTrailer: '',
        loadWeight: (() => `${Math.floor(Math.random() * 10000 + 1000)}`)(),
        loadLength: '',
        loadWidth: '',
        loadPhotos: '',
        loadFiles: '',
        loadVehicleMake: '',
        loadVehicleYear: '',
        loadVehicleModel: '',
        loadHeight: '',
        loadQuantity: '',
        loadOperable: false,
        loadConvertible: false,
        loadModified: false,
        loadPrice: 0,
        loadStatus: 'Published',
        loadCarrierConfirmation: "Not Confirmed",
        loadPaymentStatus: "Not Paid",
        loadAssignedDriverID: "Not Assigned",
        loadDeliveredStatus: "Not Delivered",
        loadCredentialID: (() => `${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`)(),
        shipperID: shipperID,
    });

    const handleChange = (input) => (e) => {
        setFormData({...formData, [input]: e.target.value});
    };
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length + imagePreviewUrl.length > 5) {
            alert('You can only select up to 5 files.');
            return;
        }
        const imageUrls = files.map(file => {
            if (file.type.startsWith('image/')) {
                return URL.createObjectURL(file);
            }
            return null;
        }).filter(url => url !== null);
        setImagePreviewUrl(prevImageUrls => [...prevImageUrls, ...imageUrls]);
    };

    const handleFileChangeForButton = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 5) {
            alert('You can only select up to 5 files.');
            return;
        }
        const fileUrls = files.map(file => URL.createObjectURL(file));
        setFilePreviewUrl(prevFileUrls => [...prevFileUrls, ...fileUrls]);
    };

    const handleCreateLoad = async () => {
        setIsLoading(true);
        setFormData({
            ...formData,
        });
        try {
            const response = await axios.post('https://jarvis-ai-logistic-db-server.onrender.com/save-load-data', formData);
            if (response.status === 200) {
                window.location.reload();
            }
            console.log(response.data);
            setIsLoadCreatedSuccess(true);
        } catch (error) {
            console.error(error);
            setIsLoadCreatedFailed(true);
        }
        setIsLoading(false);
    };

    return (
        <div className="trailers-load-container-wrapper">
            {isLoadCreatedSuccess && <FloatingWindowSuccess text="Load Created Successfully"/>}
            {isLoadCreatedFailed && <FloatingWindowFailed text="Something went wrong. Try Again"/>}
            <div className="trailers-load-container-content">
                <section className="load-title-section">
                    <h1>Trailers & Other vehicles</h1>
                    <p>Try to fill all necessary fields</p>
                </section>
                <div className="trailers-loads-container-inputs">
                    <section>
                        <div className="google-input-wrapper">
                            <input
                                type="text"
                                id="loadTitle"
                                autoComplete="off"
                                className="google-style-input"
                                required
                                onChange={handleChange('loadTitle')}
                                value={formData.loadTitle}
                            />
                            <label htmlFor="loadTitle" className="google-style-input-label">Shipment Title</label>
                        </div>
                    </section>
                    <section>
                        <div className="google-input-wrapper">
                            <input
                                type="number"
                                id="loadQuantity"
                                autoComplete="off"
                                className="google-style-input"
                                required
                                onChange={handleChange('loadVehicleYear')}
                                value={formData.loadQuantity}
                            />
                            <label htmlFor="loadQuantity" className="google-style-input-label">Quantity of items</label>
                        </div>
                    </section>

                </div>
                <div className="trailers-type-of-trailer-load">
                    <h2>Choose shipment Dimensions</h2>
                    <p>These can be your preferences, questions or requests</p>
                    <div className="trailers-loads-container-inputs">
                        <section>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="loadLength"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('loadLength')}
                                    value={formData.loadLength}
                                />
                                <label htmlFor="loadLength" className="google-style-input-label">Length</label>
                            </div>
                        </section>
                        <section>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="loadWeight"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('loadWeight')}
                                    value={formData.loadWeight}
                                />
                                <label htmlFor="loadWeight" className="google-style-input-label">Weight</label>
                            </div>
                        </section>
                        <section>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="loadWidth"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('loadWidth')}
                                    value={formData.loadWidth}
                                />
                                <label htmlFor="loadWidth" className="google-style-input-label">Width</label>
                            </div>
                        </section>
                        <section>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="loadHeight"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('loadHeight')}
                                    value={formData.loadHeight}
                                />
                                <label htmlFor="loadHeight" className="google-style-input-label">Height</label>
                            </div>
                        </section>
                    </div>
                </div>
                <button className="add-another-object-button"><PlusIcon className="another-object-plus-icon"/>Add
                    another parts load
                </button>

                <div className="trailers-load-optional-inputs">
                    <h2>For better experience attach files</h2>
                    <p>AI can better analyze your preferences</p>
                    <div className="additional-preferences-buttons">
                        <button className="rv-additional-preferences-button"
                                onClick={() => fileInputRef.current.click()}>
                            <AttachFile className="additional-preferences-button-icon"/> Attach Files
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{display: 'none'}}
                            onChange={handleFileChangeForButton}
                            multiple
                        />
                        <button className="rv-additional-preferences-button" onClick={handleButtonClick}>
                            <CameraIcon className="additional-preferences-button-icon"/> Make a Photo
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            ref={fileInputRef}
                            style={{display: 'none'}}
                            onChange={handleFileChange}
                            multiple
                        />
                    </div>
                    {imagePreviewUrl && imagePreviewUrl.map((url, index) => (
                        <img key={index} className="preview-image-for-load" src={url} alt="Preview"/>
                    ))}
                    {filePreviewUrl.map((url, index) => (
                        <img key={index} src={url} alt="Preview"/>
                    ))}
                </div>
                <div className="trailers-load-optional-inputs">
                    <h2>You can add personal note to this load</h2>
                    <p>These can be your preferences, questions or requests</p>
                    <div className="google-input-wrapper">
                            <textarea
                                id="loadDescription"
                                autoComplete="off"
                                className="google-style-input"
                                required
                                style={{height: '170px', maxHeight: '200px'}}
                                onChange={handleChange('loadDescription')}
                                value={formData.loadDescription}
                            />
                        <label htmlFor="loadDescription" className="google-style-input-label">Personal
                            Description</label>
                    </div>
                </div>
                <div className="note-container">
                    <h4>Note</h4>
                    <p>After creating load, load will be automatically visible in your dashboard, and on the carrier’s
                        marketplace</p>
                </div>
                <button className="creating-load-button" onClick={handleCreateLoad}>
                    {isLoading ? <ClipLoader size={15} color={"#ffffff"}/> : "Create Load"}
                </button>
            </div>
            <div className="trailers-load-container-content-tips">
                <RecommendationContainer title="Details Matter"
                                         description="The quotes you get are only asaccurate as your listing. Make it as detailed as possible to avoid delays, price increases, and cancellations."/>
                <RecommendationContainer title="Double Check Locations"
                                         description="Include correct locations for accurate pricing."/>
            </div>
        </div>
    );
};

export default TrailerAndOtherVehicles;