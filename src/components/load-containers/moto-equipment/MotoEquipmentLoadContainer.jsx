import React, {useRef, useState} from 'react';
import "./MotoEquipmentLoadContainer.css";
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

const MotoEquipmentLoadContainer = ({pickupLocation, deliveryLocation, loadType, loadSubType, loadPickupDate, loadDeliveryDate, loadPickupTime, loadDeliveryTime,}) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState([]);
    const [filePreviewUrl, setFilePreviewUrl] = useState([]);
    const fileInputRef = useRef();
    const [isOperable, setIsOperable] = useState(false);
    const [isConvertible, setIsConvertible] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [isTrike, setIsTrike] = useState(false);
    const {shipperID} = useParams();
    const [isOpenTrailer, setIsOpenTrailer] = useState(false);
    const [isEnclosedTrailer, setIsEnclosedTrailer] = useState(false);
    const [isBoth, setIsBoth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
        loadTrike: false,
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
        <div className="moto-load-container-wrapper">
            {isLoadCreatedSuccess && <FloatingWindowSuccess text="Load Created Successfully"/>}
            {isLoadCreatedFailed && <FloatingWindowFailed text="Something went wrong. Try Again"/>}
            <div className="moto-load-container-content">
                <section className="load-title-section">
                    <h1>Moto Load</h1>
                    <p>Try to fill all necessary fields</p>
                </section>
                <div className="moto-loads-container-inputs">
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
                            <label htmlFor="loadTitle" className="google-style-input-label">Load Title</label>
                        </div>
                    </section>
                    <section>
                        <div className="google-input-wrapper">
                            <input
                                type="text"
                                id="loadVehicleYear"
                                autoComplete="off"
                                className="google-style-input"
                                required
                                onChange={handleChange('loadVehicleYear')}
                                value={formData.loadVehicleYear}
                            />
                            <label htmlFor="loadVehicleYear" className="google-style-input-label">Vehicle year</label>
                        </div>
                    </section>
                    <section>
                        <div className="google-input-wrapper">
                            <input
                                type="text"
                                id="loadVehicleMake"
                                autoComplete="off"
                                className="google-style-input"
                                required
                                onChange={handleChange('loadVehicleMake')}
                                value={formData.loadVehicleMake}
                            />
                            <label htmlFor="loadVehicleMake" className="google-style-input-label">Vehicle Make</label>
                        </div>
                    </section>
                    <section>
                        <div className="google-input-wrapper">
                            <input
                                type="text"
                                id="loadVehicleModel"
                                autoComplete="off"
                                className="google-style-input"
                                required
                                onChange={handleChange('loadVehicleModel')}
                                value={formData.loadVehicleModel}
                            />
                            <label htmlFor="loadVehicleModel" className="google-style-input-label">Vehicle Model</label>
                        </div>
                    </section>
                </div>
                <div className="moto-loads-container-switchers">
                    <Switch
                        /* isOn={isOperable}*/
                        handleToggle={() => {
                            setIsOperable(!isOperable);
                            setFormData({...formData, loadOperable: !isOperable});
                            console.log('Vehicle on Run:', !isOperable);
                        }}
                        label="Operable"
                        tip="Is the vehicle currently operational or in use?"
                    />
                    <Switch
                        /*isOn={isConvertible}*/
                        handleToggle={() => {
                            setIsConvertible(!isConvertible);
                            setFormData({...formData, loadConvertible: !isConvertible});
                            console.log('Convertible:', !isConvertible);
                        }}
                        label="Sidecar"
                        tip="Is the vehicle a convertible, with a roof that retracts or removes?"
                    />
                    <Switch
                        /* isOn={isModified}*/
                        handleToggle={() => {
                            setIsTrike(!isTrike);
                            setFormData({...formData, loadModified: !isTrike});
                            console.log('Trike:', !isTrike);
                        }}
                        label="Trike"
                        tip="Has the vehicle three wheels?"
                    />
                    <Switch
                        /* isOn={isModified}*/
                        handleToggle={() => {
                            setIsModified(!isModified);
                            setFormData({...formData, loadModified: !isModified});
                            console.log('Modified:', !isModified);
                        }}
                        label="Modified"
                        tip="Has the vehicle been altered from its original factory specifications?"
                    />
                </div>
                <button className="add-another-object-button"><PlusIcon className="another-object-plus-icon"/>Add
                    another moto
                </button>
                <div className="moto-type-of-trailer-load">
                    <h2>Choose type of trailer</h2>
                    <p>These can be your preferences, questions or requests</p>
                    <div className="type-of-trailer-switchers">
                        <div className="type-of-trailer-switchers">
                            <Switch
                                handleToggle={() => {
                                    setIsOpenTrailer(!isOpenTrailer);
                                    setFormData({...formData, loadTypeOfTrailer: isOpenTrailer ? 'Open Trailer' : ''});
                                }}
                                label="Open Trailer (Cost loss)"
                                tip="Vehicle is open to the trailer?"
                            />
                            <Switch
                                handleToggle={() => {
                                    setIsEnclosedTrailer(!isEnclosedTrailer);
                                    setFormData({
                                        ...formData,
                                        loadTypeOfTrailer: isEnclosedTrailer ? 'Enclosed Trailer' : ''
                                    });
                                }}
                                label="Enclosed Trailer (Costs More)"
                                tip="Vehicle protected"
                            />
                            <Switch
                                handleToggle={() => {
                                    setIsBoth(!isBoth);
                                    setFormData({...formData, loadTypeOfTrailer: isBoth ? 'Both' : ''});
                                }}
                                label="Both"
                                tip="You can opt for open or enclosed trailer"
                            />
                        </div>
                    </div>
                </div>
                <div className="moto-load-optional-inputs">
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
                <div className="moto-load-optional-inputs">
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
            <div className="moto-load-container-content-tips">
                <RecommendationContainer title="Details Matter"
                                         description="The quotes you get are only asaccurate as your listing. Make it as detailed as possible to avoid delays, price increases, and cancellations."/>
                <RecommendationContainer title="Double Check Locations"
                                         description="Include correct locations for accurate pricing."/>
            </div>
        </div>
    );
};

export default MotoEquipmentLoadContainer;