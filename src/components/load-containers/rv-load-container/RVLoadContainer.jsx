import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import Alert from "../../floating-window-success/Alert";
import {BACKEND_URL} from "../../../constants/constants";
import Grid from "../../grid-two-columns/Grid";
import Button from "../../button/Button";
import CreateLoadContainer from "../../create-load-container/CreateLoadContainer";
import FormSeparator from "../../form-separator/FormSeparator";
import TextInput from "../../text-input/TextInput";
import RotatingLinesLoader from "../../rotating-lines/RotatingLinesLoader";
import useShipperStore from "../../../stores/landing-registration-shipper/store";
import RegistrationComponent from "../../registration-component/RegistrationComponent";
import FlexContainer from "../../flex-container/FlexContainer";
import {FaTimes} from "react-icons/fa";
import SEO from "../../seo/SEO";

const RVLoadContainer = ({
                                     pickupLocation,
                                     loadMilesTrip,
                                     deliveryLocation,
                                     loadType,
                                     loadSubType,
                                     loadPickupDate,
                                     loadDeliveryDate,
                                     loadPickupTime,
                                     loadDeliveryTime,
    requireRegistration,
                                     goBack
                                 }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState([]);
    const [filePreviewUrl, setFilePreviewUrl] = useState([]);
    const fileInputRef = useRef();
    const imageInputRef = useRef();
    const [isOperable, setIsOperable] = useState(false);
    const [isConvertible, setIsConvertible] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [loadTypeOfTrailer, setLoadTypeOfTrailer] = useState('');
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
        loadSubType: loadSubType,
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
        loadModified: false,
        loadImages: [],
        loadStatus: 'Published',
        loadCarrierConfirmation: "Not Confirmed",
        loadPaymentStatus: "Not Paid",
        loadAssignedDriverID: "Not Assigned",
        loadDeliveredStatus: "Not Delivered",
        loadCredentialID: (() => `${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`)(),
        shipperID: shipperID
    });

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

    const handleChange = (input) => (e) => {
        setFormData({...formData, [input]: e.target.value});
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


    const handleLoadChange = (input) => (e) => {
        setFormData({...formData, [input]: e.target.value});
    };

    return (
        <>
            <SEO
                title="Personal Watercraft Transport - Safe and Reliable Services"
                description="Ensure the safe and reliable transport of your personal watercraft with our specialized services. Contact us for a quote!"
                keywords="personal watercraft transport, safe watercraft transport, reliable watercraft shipping"
            />
            {isLoadCreatedSuccess && <Alert status="success" text="Success!" description="Load Created Successfully!"/>}
            {isLoadCreatedFailed && <Alert status="error" text="Error!" description="Something went wrong. Try Again"/>}
            {showRegistrationPopup && <RegistrationComponent onRegistrationSuccess={handleRegistrationSuccess}/>}
            <CreateLoadContainer title="RV Load" step={4} subTitle="Fill all data">
                <Grid columns="2, 2fr">
                    <TextInput
                        type="select"
                        id="loadRVType"
                        value={formData.loadRVType}
                        onChange={handleLoadChange('loadRVType')}
                        label="RV Type"
                        options={[
                            { value: 'Class A Motorhome', label: 'Class A Motorhome' },
                            { value: 'Class B Motorhome', label: 'Class B Motorhome' },
                            { value: 'Class C Motorhome', label: 'Class C Motorhome' },
                            { value: 'Travel Trailers', label: 'Travel Trailers' },
                            { value: 'Folding Tent Trailer', label: 'Folding Tent Trailer' },
                            { value: 'Fifth Wheel', label: 'Fifth Wheel' },
                            { value: 'Truck Camper', label: 'Truck Camper' },
                            { value: 'Other', label: 'Other' }
                        ]}
                        style={{
                            fontSize: '15px',
                            fontWeight: 'normal',
                            color: 'gray',
                            borderRadius: '5px'
                        }}
                    />
                    <TextInput
                        type="text"
                        id="loadVehicleYear"
                        value={formData.loadVehicleYear}
                        onChange={handleChange('loadVehicleYear')}
                        label="Vehicle year"
                    />
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
                </Grid>
                <FormSeparator title="Load Specifications" subTitle={"Fill all necessary fields"}/>
                <Grid columns="4, 4fr">
                    <TextInput
                        type="text"
                        id="loadLength"
                        value={formData.loadLength}
                        onChange={handleChange('loadLength')}
                        label="Load Length"
                    />
                    <TextInput
                        type="text"
                        id="loadWidth"
                        value={formData.loadWidth}
                        onChange={handleChange('loadWidth')}
                        label="Load Width"
                    />
                    <TextInput
                        type="text"
                        id="loadHeight"
                        value={formData.loadHeight}
                        onChange={handleChange('loadHeight')}
                        label="Load Height"
                    />
                    <TextInput
                        type="text"
                        id="loadWeight"
                        value={formData.loadWeight}
                        onChange={handleChange('loadWeight')}
                        label="Load Weight"
                    />
                </Grid>
                <FormSeparator title="For better experience attach files"
                               subTitle="AI can better analyze your preference "/>
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
                <FormSeparator title="You can add personal note to this load" subTitle="This is optional"/>
                <TextInput
                    type="textarea"
                    id="loadDescription"
                    value={formData.loadDescription}
                    onChange={handleChange('loadDescription')}
                    label="Personal Description"
                    style={{height: '170px', maxHeight: '200px'}}
                />

                <Grid columns="2, 2fr">
                    <Button variant="neutral" buttonText="Go Back" onClick={goBack}/>
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

export default RVLoadContainer;