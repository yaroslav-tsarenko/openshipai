import React, { useRef, useState } from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import FloatingWindowSuccess from "../../floating-window-success/FloatingWindowSuccess";
import FloatingWindowFailed from "../../floating-window-failed/FloatingWindowFailed";
import RecommendationContainer from "../../reccomendation-container/RecommendationContainer";
import {ReactComponent as PlusIcon} from "../../../assets/plus-blue-icon.svg";
import {ReactComponent as AttachFile} from "../../../assets/files-icon.svg";
import {ReactComponent as CameraIcon} from "../../../assets/camera-icon.svg";
import "./RVLoadContainer.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

const RVLoadContainer = ({pickupLocation, deliveryLocation, loadType, loadSubType, loadPickupDate, loadDeliveryDate, loadPickupTime, loadDeliveryTime,}) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState([]);
    const [filePreviewUrl, setFilePreviewUrl] = useState([]);
    const fileInputRef = useRef();
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
        loadRVType: '',
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

    const handleLoadChange = (input) => (e) => {
        setFormData({...formData, [input]: e.target.value});
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
        setFormData({
            ...formData,
        });
        try {
            const response = await axios.post('https://jarvis-ai-logistic-db-server.onrender.com/save-load-data', formData);
            console.log(response.data);
            setIsLoadCreatedSuccess(true);
        } catch (error) {
            console.error(error);
            setIsLoadCreatedFailed(true);
        }
    };

    return (
        <div className="vehicle-load-container-wrapper">
            {isLoadCreatedSuccess && <FloatingWindowSuccess text="Load Created Successfully"/>}
            {isLoadCreatedFailed && <FloatingWindowFailed text="Something went wrong. Try Again"/>}
            <div className="vehicle-load-container-content">
                <section className="load-title-section">
                    <h1>RV Load</h1>
                    <p>Try to fill all necessary fields</p>
                </section>
                <div className="vehicle-loads-container-inputs">
                    <section>
                        <Box sx={{minWidth: 180, height: '50px'}}>
                            <FormControl fullWidth style={{fontSize: '15px',}}>
                                <InputLabel id="demo-simple-select-label"
                                            style={{fontSize: '15px', fontWeight: 'normal'}}>RV Type</InputLabel>
                                <Select
                                    labelId="loadRVType"
                                    id="loadRVType"
                                    label="Load Type"
                                    name="loadRVType"
                                    value={formData.loadRVType}
                                    onChange={(event) => {
                                        handleLoadChange("loadRVType")(event);
                                    }}
                                    style={{
                                        fontSize: '15px',
                                        fontWeight: 'normal',
                                        color: 'gray',
                                        borderRadius: '5px'
                                    }}
                                >
                                    <MenuItem value="Class A Motorhome"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>Class A Motorhome</MenuItem>
                                    <MenuItem value="Class B Motorhome"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>Class B Motorhome</MenuItem>
                                    <MenuItem value="Class C Motorhome"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>Class C Motorhome</MenuItem>
                                    <MenuItem value="Travel Trailers"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>Travel Trailers</MenuItem>
                                    <MenuItem value="Folding Tent Trailer"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>Folding Tent Trailer</MenuItem>
                                    <MenuItem value="Fifth Wheel"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>Fifth Wheel</MenuItem>
                                    <MenuItem value="Truck Camper"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>Truck Camper</MenuItem>
                                    <MenuItem value="Other"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
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
                <button className="add-another-object-button"><PlusIcon className="another-object-plus-icon"/>Add
                    another RV
                </button>
                <div className="vehicle-type-of-trailer-load">
                    <h2>Choose RV Dimensions</h2>
                    <p>These can be your preferences, questions or requests</p>
                    <div className="vehicle-loads-container-inputs">
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
                                    id="Weight"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('Weight')}
                                    value={formData.Weight}
                                />
                                <label htmlFor="loadVehicleYear" className="google-style-input-label">Weight</label>
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
                <div className="vehicle-load-optional-inputs">
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
                        <img key={index} src={url} alt="Preview" />
                    ))}
                </div>
                <div className="vehicle-load-description">
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
                <button className="creating-load-button" onClick={handleCreateLoad}>Create Load</button>
            </div>
            <div className="vehicle-load-container-content-tips">
                <RecommendationContainer title="Details Matter"
                                         description="The quotes you get are only asaccurate as your listing. Make it as detailed as possible to avoid delays, price increases, and cancellations."/>
                <RecommendationContainer title="Double Check Locations"
                                         description="Include correct locations for accurate pricing."/>
            </div>
        </div>
    );
};

export default RVLoadContainer;