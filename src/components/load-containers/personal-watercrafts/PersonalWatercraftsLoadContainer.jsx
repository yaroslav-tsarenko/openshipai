import React, {useEffect, useRef, useState} from 'react';
import Switch from "../../switcher-component/Switch";
import axios from 'axios';
import {useParams} from "react-router-dom";
import Alert from "../../floating-window-success/Alert";
import {BACKEND_URL} from "../../../constants/constants";
import CreateLoadContainer from "../../create-load-container/CreateLoadContainer";
import Grid from "../../grid-two-columns/Grid";
import TextInput from "../../text-input/TextInput";
import FormSeparator from "../../form-separator/FormSeparator";
import Button from "../../button/Button";
import useShipperStore from "../../../stores/landing-registration-shipper/store";
import RegistrationComponent from "../../registration-component/RegistrationComponent";
import RotatingLinesLoader from "../../rotating-lines/RotatingLinesLoader";

const PersonalWatercraftsLoadContainer = ({
                                              pickupLocation,
                                              deliveryLocation,
                                              loadType,
                                              loadSubType,
                                              loadPickupDate,
                                              loadDeliveryDate,
                                              loadPickupTime,
                                              loadDeliveryTime,
                                              loadMilesTrip,
                                              requireRegistration,
                                              goBack
                                          }) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState([]);
    const [filePreviewUrl, setFilePreviewUrl] = useState([]);
    const fileInputRef = useRef();
    const [isOperable, setIsOperable] = useState(false);
    const [isConvertible, setIsConvertible] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [isOpenTrailer, setIsOpenTrailer] = useState(false);
    const [isEnclosedTrailer, setIsEnclosedTrailer] = useState(false);
    const [isBoth, setIsBoth] = useState(false);
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
        setFormData({
            ...formData,
        });
        try {
            const response = await axios.post(`${BACKEND_URL}/save-load-data`, formData);
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

    return (
        <>
            {isLoadCreatedSuccess && <Alert status="success" text="Success!" description="Load Created Successfully!"/>}
            {isLoadCreatedFailed && <Alert status="error" text="Error!" description="Something went wrong. Try Again"/>}
            {showRegistrationPopup && <RegistrationComponent onRegistrationSuccess={handleRegistrationSuccess}/>}
            <CreateLoadContainer step={4} title="Personal Watercraft Load" subTitle="Fill all data">

                <Grid columns="4, 4fr">
                    <TextInput
                        type="text"
                        id="loadTitle"
                        value={formData.loadTitle}
                        onChange={handleChange('loadTitle')}
                        label="Shipment Title"
                    />
                    <TextInput
                        type="text"
                        id="loadVehicleYear"
                        value={formData.loadVehicleYear}
                        onChange={handleChange('loadVehicleYear')}
                        label="Personal Watercraft year"
                    />
                    <TextInput
                        type="text"
                        id="loadVehicleMake"
                        value={formData.loadVehicleMake}
                        onChange={handleChange('loadVehicleMake')}
                        label="Personal Watercraft Make"
                    />
                    <TextInput
                        type="text"
                        id="loadVehicleModel"
                        value={formData.loadVehicleModel}
                        onChange={handleChange('loadVehicleModel')}
                        label="Personal Watercraft Model"
                    />
                </Grid>
                <FormSeparator title="Personal Watercraft Dimensions"
                               subTitle="These can be your preferences, questions or requests"/>
                <Grid columns="4, 4fr">
                    <TextInput
                        type="text"
                        id="Length"
                        value={formData.loadLength}
                        onChange={handleChange('loadLength')}
                        label="Length"
                    />
                    <TextInput
                        type="text"
                        id="Weight"
                        value={formData.loadWeight}
                        onChange={handleChange('loadWeight')}
                        label="Weight"
                    />
                    <TextInput
                        type="text"
                        id="Width"
                        value={formData.loadWidth}
                        onChange={handleChange('loadWidth')}
                        label="Width"
                    />
                    <TextInput
                        type="text"
                        id="Height"
                        value={formData.Height}
                        onChange={handleChange('Height')}
                        label="Height"
                    />
                </Grid>

                <Button variant="slim">
                    + Add another boat
                </Button>
                <FormSeparator title="Choose type of trailer"
                               subTitle="These can be your preferences, questions or requests"/>
                <Grid columns="3, 3fr">
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
                </Grid>
                <FormSeparator title="Additional Preferences"
                               subTitle="These can be your preferences, questions or requests"/>
                <Grid columns="2, 2fr">
                    <Button variant="attach-file"
                            onClick={() => fileInputRef.current.click()}>
                        Attach Files
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{display: 'none'}}
                        onChange={handleFileChangeForButton}
                        multiple
                    />
                    <Button variant="attach-photo" onClick={handleButtonClick}>
                        Make a Photo
                    </Button>
                    <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        ref={fileInputRef}
                        style={{display: 'none'}}
                        onChange={handleFileChange}
                        multiple
                    />
                </Grid>
                <Grid columns="2, 2fr">
                    {imagePreviewUrl && imagePreviewUrl.map((url, index) => (
                        <img key={index} className="preview-image-for-load" src={url} alt="Preview"/>
                    ))}
                    {filePreviewUrl.map((url, index) => (
                        <img key={index} src={url} alt="Preview"/>
                    ))}
                </Grid>
                <FormSeparator title="Additional Options"
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
                    <Button variant="neutral" onClick={goBack}>
                        Go Back
                    </Button>
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

export default PersonalWatercraftsLoadContainer;