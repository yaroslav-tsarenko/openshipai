import React, {useRef, useState} from 'react';
import Switch from "../../switcher-component/Switch";
import axios from 'axios';
import {useParams} from "react-router-dom";
import Alert from "../../floating-window-success/Alert";
import {ClipLoader} from "react-spinners";
import {BACKEND_URL} from "../../../constants/constants";
import Grid from "../../grid-two-columns/Grid";
import Button from "../../button/Button";
import CreateLoadContainer from "../../create-load-container/CreateLoadContainer";
import FormSeparator from "../../form-separator/FormSeparator";
import TextInput from "../../text-input/TextInput";
import {useEffect} from "react";
import useShipperStore from "../../../stores/landing-registration-shipper/store";
import RegistrationComponent from "../../registration-component/RegistrationComponent";
import RotatingLinesLoader from "../../rotating-lines/RotatingLinesLoader";

const CarOrLightTruckLoadContainer = ({
                                          pickupLocation,
                                          loadMilesTrip,
                                          deliveryLocation,
                                          loadType,
                                          loadSubType,
                                          loadPickupDate,
                                          loadDeliveryDate,
                                          loadPickupTime,
                                          loadDeliveryTime,
                                          goBack,
                                          requireRegistration
                                      }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState([]);
    const [filePreviewUrl, setFilePreviewUrl] = useState([]);
    const fileInputRef = useRef();
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
            <CreateLoadContainer title="Vehicle Load" step={4} subTitle="Fill all data">
                <Grid columns="4, 4fr">
                    <TextInput
                        type="text"
                        id="loadTitle"
                        value={formData.loadTitle}
                        onChange={handleChange('loadTitle')}
                        label="Load Title"
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
                <Grid columns="3, 3fr">
                    <Switch
                        /* isOn={isOperable}*/
                        handleToggle={() => {
                            setIsOperable(!isOperable);
                            setFormData({...formData, loadOperable: !isOperable});
                            console.log('Vehicle on Run:', !isOperable);
                        }}
                        label="Vehicle on Run"
                        tip="Is the vehicle currently operational or in use?"
                    />
                    <Switch
                        /*isOn={isConvertible}*/
                        handleToggle={() => {
                            setIsConvertible(!isConvertible);
                            setFormData({...formData, loadConvertible: !isConvertible});
                            console.log('Convertible:', !isConvertible);
                        }}
                        label="Convertible"
                        tip="Is the vehicle a convertible, with a roof that retracts or removes?"
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
                </Grid>
                <FormSeparator title="Vehicle Load Specifications" subTitle={"Fill all necessary fields"}/>
                <Grid columns="3, 3fr">
                    <Switch
                        handleToggle={() => {
                            if (loadTypeOfTrailer !== 'Open Trailer') {
                                setLoadTypeOfTrailer('Open Trailer');
                                setFormData({...formData, loadTypeOfTrailer: 'Open Trailer'});
                            } else {
                                setLoadTypeOfTrailer(null);
                                setFormData({...formData, loadTypeOfTrailer: null});
                            }
                            console.log(loadTypeOfTrailer); // Log the selected value
                        }}
                        label="Open Trailer (Cost loss)"
                        tip="Vehicle is open to the trailer?"
                        value="Open Trailer"
                        isOn={loadTypeOfTrailer === 'Open Trailer'}
                    />
                    <Switch
                        handleToggle={() => {
                            if (loadTypeOfTrailer !== 'Enclosed Trailer') {
                                setLoadTypeOfTrailer('Enclosed Trailer');
                                setFormData({...formData, loadTypeOfTrailer: 'Enclosed Trailer'});
                            } else {
                                setLoadTypeOfTrailer(null);
                                setFormData({...formData, loadTypeOfTrailer: null});
                            }
                            console.log(loadTypeOfTrailer); // Log the selected value
                        }}
                        label="Enclosed Trailer (Costs More)"
                        tip="Vehicle protected"
                        value="Enclosed Trailer"
                        isOn={loadTypeOfTrailer === 'Enclosed Trailer'}
                    />
                    <Switch
                        handleToggle={() => {
                            if (loadTypeOfTrailer !== 'Both') {
                                setLoadTypeOfTrailer('Both');
                                setFormData({...formData, loadTypeOfTrailer: 'Both'});
                            } else {
                                setLoadTypeOfTrailer(null);
                                setFormData({...formData, loadTypeOfTrailer: null});
                            }
                            console.log(loadTypeOfTrailer);
                        }}
                        label="Both"
                        tip="You can opt for open or enclosed trailer"
                        value="Both"
                        isOn={loadTypeOfTrailer === 'Both'}
                    />
                </Grid>
                <FormSeparator title="For better experience attach files"
                               subTitle="AI can better analyze your preference "/>
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
                <Grid columns="1, 2fr">
                    {imagePreviewUrl && imagePreviewUrl.map((url, index) => (
                        <img key={index} className="preview-image-for-load" src={url} alt="Preview"/>
                    ))}
                    {filePreviewUrl.map((url, index) => (
                        <img key={index} src={url} alt="Preview"/>
                    ))}
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

export default CarOrLightTruckLoadContainer;