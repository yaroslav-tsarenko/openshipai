import React, {useEffect, useRef, useState} from 'react';
import "./HeavyEquipmentLoadContainer.module.scss";
import Switch from "../../switcher-component/Switch";
import axios from 'axios';
import {useParams} from "react-router-dom";
import Alert from "../../floating-window-success/Alert";
import {BACKEND_URL} from "../../../constants/constants";
import CreateLoadContainer from "../../create-load-container/CreateLoadContainer";
import TextInput from "../../text-input/TextInput";
import FormSeparator from "../../form-separator/FormSeparator";
import Grid from "../../grid-two-columns/Grid";
import Button from "../../button/Button";
import useShipperStore from "../../../stores/landing-registration-shipper/store";
import RegistrationComponent from "../../registration-component/RegistrationComponent";
import RotatingLinesLoader from "../../rotating-lines/RotatingLinesLoader";
import FlexContainer from "../../flex-container/FlexContainer";
import {FaTimes} from "react-icons/fa";
import SEO from "../../seo/SEO";

const HeavyEquipmentLoadContainer = ({
                                         pickupLocation,
                                         loadMilesTrip,
                                         deliveryLocation,
                                         loadType,
                                         loadSubType,
                                         loadPickupDate,
                                         loadDeliveryDate,
                                         loadPickupTime,
                                         loadDeliveryTime,
                                         loadLocationStops,
                                         stops,
                                         loadOriginDeliveryPreference,
                                         goBack,
                                         requireRegistration
                                     }) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState([]);
    const [filePreviewUrl, setFilePreviewUrl] = useState([]);
    const fileInputRef = useRef();
    const imageInputRef = useRef();
    const [isOperable, setIsOperable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadCreatedSuccess, setIsLoadCreatedSuccess] = useState(false);
    const [isLoadCreatedFailed, setIsLoadCreatedFailed] = useState(false);
    const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);
    const [requireRegistrationStatus, setRequireRegistrationStatus] = useState(requireRegistration);
    const { shipperID: paramShipperID } = useParams();
    const { userShipperID, registrationStatus } = useShipperStore();
    const [shipperID, setShipperID] = useState(paramShipperID || userShipperID);
    const [registeredShipperID, setRegisteredShipperID] = useState(null);

    useEffect(() => {
        if (userShipperID) {
            setShipperID(userShipperID);
            setFormData((prev) => ({ ...prev, shipperID: userShipperID }));
        }
    }, [userShipperID]);

    console.log("ShipperID:", shipperID);

    const handleRegistrationSuccess = (newShipperID) => {
        setRegisteredShipperID(newShipperID);
        setShowRegistrationPopup(false);
        setRequireRegistrationStatus(false);
        console.log("New shipper ID:" + setShipperID(newShipperID));
    };

    const [formData, setFormData] = useState({
        loadType: loadType,
        loadSubType: "Heavy Load",
        loadSpecifiedItem: '',
        loadTitle: '',
        loadPrice: 0,
        loadQoutes: 0,
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
        loadMilesTrip: loadMilesTrip,
        loadVehicleMake: '',
        loadVehicleYear: '',
        loadVehicleModel: '',
        loadTripStarted: "Not Started",
        loadHeight: '',
        loadQuantity: '',
        loadOperable: false,
        loadConvertible: false,
        loadImages: [],
        loadModified: false,
        loadStatus: 'Published',
        loadCarrierConfirmation: "Not Confirmed",
        loadPaymentStatus: "Not Paid",
        loadAssignedDriverID: "Not Assigned",
        loadDeliveredStatus: "Not Delivered",
        loadCredentialID: (() => `${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`)(),
        /*loadLocationStops: loadLocationStops,
        stops: stops,*/
        loadOriginDeliveryPreference: loadOriginDeliveryPreference,
        shipperID: shipperID
    });

    const handleChange = (input) => (e) => {
        setFormData({...formData, [input]: e.target.value});
    };
    const handleCreateLoad = async () => {
        if (registrationStatus !== 'success') {
            if (requireRegistration) {
                setShowRegistrationPopup(true);
                return;
            }
        }

        setIsLoading(true);
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'loadImages') {
                value.forEach(image => data.append('loadImages', image));
            } else {
                data.append(key, value);
            }
        });

        try {
            const response = await axios.post(`${BACKEND_URL}/save-load-data`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

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
    const handleFileButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleImageButtonClick = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    };
    const handleAddImage = (event) => {
        const files = Array.from(event.target.files);
        if (files.length + imagePreviewUrl.length > 5) {
            alert('You can only select up to 5 photos.');
            return;
        }

        const imageUrls = files.map(file => {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (['png', 'jpg', 'jpeg', 'svg', 'webp'].includes(fileExtension)) {
                return URL.createObjectURL(file);
            }
            return null;
        }).filter(url => url !== null);

        setFormData(prevFormData => ({
            ...prevFormData,
            loadImages: [...prevFormData.loadImages, ...files]
        }));
        setImagePreviewUrl(prevImageUrls => [...prevImageUrls, ...imageUrls]);
    };
    const handleAddFile = (event) => {
        const files = Array.from(event.target.files);
        if (files.length + filePreviewUrl.length > 5) {
            alert('You can only select up to 5 files.');
            return;
        }
        const fileUrls = files.map(file => {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (['pdf', 'doc', 'docx', 'txt'].includes(fileExtension)) {
                return URL.createObjectURL(file);
            }
            return null;
        }).filter(url => url !== null);
        setFilePreviewUrl(prevFileUrls => [...prevFileUrls, ...fileUrls]);
    };
    const handleDeleteImage = (index) => {
        setImagePreviewUrl(prevImageUrls => prevImageUrls.filter((_, i) => i !== index));
    };
    const handleDeleteFile = (index) => {
        setFilePreviewUrl(prevFileUrls => prevFileUrls.filter((_, i) => i !== index));
    };

    return (
        <>
            <SEO
                title="Heavy Equipment Load - Safe and Efficient Transport"
                description="Transport your heavy equipment safely and efficiently with our specialized services. Contact us for a quote!"
                keywords="heavy equipment load, safe transport, efficient transport, heavy equipment shipping"
            />
            {isLoadCreatedSuccess && <Alert status="success" text="Success!" description="Load Created Successfully!"/>}
            {isLoadCreatedFailed && <Alert status="error" text="Error!" description="Something went wrong. Try Again"/>}
            {showRegistrationPopup && <RegistrationComponent onRegistrationSuccess={handleRegistrationSuccess}/>}
            <CreateLoadContainer title="Heavy Load" step={4} subTitle="Try to fill all necessary fields">
                <TextInput
                    type="text"
                    id="loadTitle"
                    value={formData.loadTitle}
                    onChange={handleChange('loadTitle')}
                    label="Load Title"
                />
                <FormSeparator title="Load credentials" subTitle="These can be your preferences"/>
                <Grid columns="2, 2fr">
                    <TextInput
                        type="text"
                        id="loadVehicleMake"
                        value={formData.loadVehicleMake}
                        onChange={handleChange('loadVehicleMake')}
                        label="Vehicle Make"
                    />
                    <TextInput
                        type="text"
                        id="loadVehicleModel"
                        value={formData.loadVehicleModel}
                        onChange={handleChange('loadVehicleModel')}
                        label="Vehicle Model"
                    />
                    <TextInput
                        type="text"
                        id="loadQuantity"
                        value={formData.loadQuantity}
                        onChange={handleChange('loadQuantity')}
                        label="Load Quantity"
                    />
                </Grid>
                <FormSeparator title="Another Info" subTitle="These can be your preferences"/>
                <Grid columns="2, 2fr">
                    <TextInput
                        type="select"
                        id="equipmentType"
                        value={formData.loadEquipmentType}
                        onChange={handleChange('loadEquipmentType')}
                        label="Equipment Type"
                        options={[
                            {value: 'option1', label: 'Option 1'},
                            {value: 'option1', label: 'Option 2'},
                        ]}
                    />
                    <TextInput
                        type="select"
                        id="loadEquipmentCategory"
                        value={formData.loadEquipmentCategory}
                        onChange={handleChange('loadEquipmentCategory')}
                        label="Equipment Category"
                        options={[
                            {value: 'option1', label: 'Option 1'},
                            {value: 'option1', label: 'Option 2'},
                        ]}
                    />
                </Grid>
                <FormSeparator title="Choose type of trailer"
                               subTitle="These can be your preferences, questions or requests"/>
                <Grid columns="3, 3fr">
                    <Switch
                        handleToggle={() => {
                            setIsOperable(!isOperable);
                            setFormData({...formData, loadOperable: !isOperable});
                            console.log('Vehicle on Run:', !isOperable);
                        }}
                        label="Open Trailer (Cost loss)"
                        tip="Vehicle is open to the trailer?"
                    />
                    <Switch
                        handleToggle={() => {
                            setIsOperable(!isOperable);
                            setFormData({...formData, loadOperable: !isOperable});
                            console.log('Vehicle on Run:', !isOperable);
                        }}
                        label="Enclosed Trailer (Costs More)"
                        tip="Vehicle protected"
                    />
                    <Switch
                        handleToggle={() => {
                            setIsOperable(!isOperable);
                            setFormData({...formData, loadOperable: !isOperable});
                            console.log('Vehicle on Run:', !isOperable);
                        }}
                        label="Both"
                        tip="You can opt for open or enclosed trailer"
                    />
                </Grid>
                <FormSeparator title="For better experience attach files"
                               subTitle="AI can better analyze your preferences"/>
                <Grid columns="2, 2fr">
                    <Button variant="attach-file" onClick={handleFileButtonClick}>
                        Attach Files
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleAddFile}
                        multiple
                    />
                    <Button variant="attach-photo" onClick={handleImageButtonClick}>
                        Make a Photo
                    </Button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={imageInputRef}
                        capture="environment"
                        style={{ display: 'none' }}
                        onChange={handleAddImage}
                        multiple
                    />
                </Grid>
                <Grid columns="1, 1fr">
                    {imagePreviewUrl.length > 0 ? (
                        <FlexContainer title="Attached Photos">
                            {imagePreviewUrl.map((url, index) => (
                                <div key={index} className="image-preview-container">
                                    <img width="80" height="60" className="preview-image-for-load" src={url} alt="Preview"/>
                                    <button className="delete-button-icon" onClick={() => handleDeleteImage(index)}>
                                        <FaTimes />
                                    </button>
                                </div>
                            ))}
                        </FlexContainer>
                    ) : (<></>)}
                    {filePreviewUrl.length > 0 ? (
                        <FlexContainer title="Attached Files">
                            {filePreviewUrl.map((url, index) => {
                                const fileName = url.split('/').pop().split('.')[0];
                                const shortFileName = fileName.length > 7 ? `${fileName.substring(0, 7)}...` : fileName;
                                return (
                                    <span key={index} className="file-preview-container">
                                        <button className="delete-button-icon" onClick={() => handleDeleteFile(index)}>
                                            <FaTimes/>
                                        </button>
                                        <p className="file-name">
                                            File {shortFileName}
                                        </p>
                                    </span>
                                );
                            })}
                        </FlexContainer>
                    ) : (<></>)}
                </Grid>
                <FormSeparator title="You can add personal note to this load"
                               subTitle="These can be your preferences, questions or requests"/>
                <TextInput
                    type="textarea"
                    id="loadDescription"
                    value={formData.loadDescription}
                    onChange={handleChange('loadDescription')}
                    label="Personal Description"
                    style={{height: '170px', maxHeight: '200px'}}
                />
                <Grid columns="2, 2fr">
                    <Button buttonText="Go Back" variant="neutral" onClick={goBack}/>
                    <Button variant="default-non-responsive" onClick={handleCreateLoad}>
                        {isLoading ?
                            <RotatingLinesLoader title="Processing..."/>
                            :
                            "Create Load"}
                    </Button>
                </Grid>
            </CreateLoadContainer>
        </>

    );
};

export default HeavyEquipmentLoadContainer;