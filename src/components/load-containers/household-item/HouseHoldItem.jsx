import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import Alert from "../../floating-window-success/Alert";
import FloatingWindowFailed from "../../floating-window-failed/FloatingWindowFailed";
import {ClipLoader} from "react-spinners";
import {BACKEND_URL} from "../../../constants/constants";
import Grid from "../../grid-two-columns/Grid";
import Button from "../../button/Button";
import CreateLoadContainer from "../../create-load-container/CreateLoadContainer";
import TextInput from "../../text-input/TextInput";
import FormSeparator from "../../form-separator/FormSeparator";
import useShipperStore from "../../../stores/landing-registration-shipper/store";
import RegistrationComponent from "../../registration-component/RegistrationComponent";
import RotatingLinesLoader from "../../rotating-lines/RotatingLinesLoader";
import FlexContainer from "../../flex-container/FlexContainer";
import {FaTimes} from "react-icons/fa";
import SEO from "../../seo/SEO";

const HouseHoldItem = ({
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
    const imageInputRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
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
        loadImages: [],
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

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
                color: 'black',
                backgroundColor: 'rgba(50,50,50,0.47)',
                backdropFilter: 'blur(5px)',
            },
            palette: {
                primary: {
                    main: '#024ec9',
                    color: 'black'
                },
                secondary: {
                    main: '#024ec9',
                    color: 'black',
                },
            },
            typography: {
                fontSize: 23,
                color: 'black'
            },
        },
    };

    const options = [
        'Packing & Unpacking',
        'Heavy lifting (more than 100 lbs)',
        'Piano Sauna Pool',
        'Heavy Lifting with special equipment',
        'Furniture assembly and disassembly',
        'I want loaded carrier truck by myself (I take all responsibility for it)',
        'I need professional moving team'
    ];

    const handleOptionChange = (event) => {
        const {
            target: {value},
        } = event;
        setSelectedOptions(
            typeof value === 'string' ? value.split(',') : value,
        );

        setFormData(prevState => ({
            ...prevState,
            loadAdditionalSelectedLoadOptions: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const handleChange = (input) => (e) => {
        setFormData({...formData, [input]: e.target.value});
    };

    const handleLoadChange = (input) => (e) => {
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
                title="Farm Equipment Load - Reliable and Safe Transport"
                description="Transport your farm equipment safely and reliably with our specialized services. Contact us for a quote!"
                keywords="farm equipment transport, reliable farm equipment transport, safe farm equipment transport"
            />
            {isLoadCreatedSuccess && <Alert status="success" text="Success!" description="Load Created Successfully!"/>}
            {isLoadCreatedFailed && <Alert status="error" text="Error!" description="Something went wrong. Try Again"/>}
            {showRegistrationPopup && <RegistrationComponent onRegistrationSuccess={handleRegistrationSuccess}/>}
            <CreateLoadContainer step={4} title="Household item" subTitle="Try to fill all neccesary fields">
                <TextInput
                    id="loadTitle"
                    value={formData.loadTitle}
                    onChange={handleChange('loadTitle')}
                    label="Type of furniture or item? (e.g. Sofa, Bed, Table)"
                />
                <FormSeparator title="Fill All Fields" subTitle="Choose options"/>
                <TextInput
                    id="loadQuantity"
                    value={formData.loadQuantity}
                    onChange={handleChange('loadQuantity')}
                    label="Quantity of items"
                />
                <FormSeparator title="Fill All Fields" subTitle="Choose options"/>
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
                <Button variant="slim">
                    + Add another load
                </Button>

                <FormSeparator title="Load Specifications" subTitle="Fill all necessary fields"/>
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
                <FormSeparator title="Add Note" subTitle="Fill all necessary fields"/>
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

export default HouseHoldItem;