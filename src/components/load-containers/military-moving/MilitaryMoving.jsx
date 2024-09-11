import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import Alert from "../../floating-window-success/Alert";
import FloatingWindowFailed from "../../floating-window-failed/FloatingWindowFailed";
import {pink} from '@mui/material/colors';
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

const MilitaryMoving = ({
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


    return (
        <>
            {isLoadCreatedSuccess && <Alert status="success" text="Success!" description="Load Created Successfully!"/>}
            {isLoadCreatedFailed && <Alert status="error" text="Error!" description="Something went wrong. Try Again"/>}
            {showRegistrationPopup && <RegistrationComponent onRegistrationSuccess={handleRegistrationSuccess}/>}
            <CreateLoadContainer step={4} title="Military Moving" subTitle="Try to fill all neccesary fields">
                <TextInput
                    id="loadTitle"
                    value={formData.loadTitle}
                    onChange={handleChange('loadTitle')}
                    label="Load Title"
                />
                <FormSeparator title="Fill All Fields" subTitle="Choose options"/>
                <Grid columns="4, 4fr">
                    <TextInput
                        type="select"
                        id="loadMovingSize"
                        value={formData.loadMovingSize}
                        onChange={handleLoadChange('loadMovingSize')}
                        label="Moving Size"
                        options={[
                            {value: 'Studio', label: 'Studio'},
                            {value: '1-bedroom apartment/home/condo', label: '1-bedroom apartment/home/condo'},
                            {value: '2-bedroom apartment/home/condo', label: '2-bedroom apartment/home/condo'},
                            {value: '3-bedroom apartment/home/condo', label: '3-bedroom apartment/home/condo'},
                            {value: '4-bedroom apartment/home/condo', label: '4-bedroom apartment/home/condo'},
                            {value: 'House', label: 'House'},
                            {value: 'Villa', label: 'Villa'},
                            {value: 'Office', label: 'Office'}
                        ]}
                        style={{
                            fontSize: '15px',
                            fontWeight: 'normal',
                            color: 'gray',
                            borderRadius: '5px'
                        }}
                    />
                    <TextInput
                        type="select"
                        id="loadNumberOfBedrooms"
                        value={formData.loadNumberOfBedrooms}
                        onChange={handleLoadChange('loadNumberOfBedrooms')}
                        label="Number of bedrooms"
                        options={[
                            {value: '1', label: '1'},
                            {value: '2', label: '2'},
                            {value: '3', label: '3'},
                            {value: '4', label: '4'},
                            {value: '5+', label: '5+'}
                        ]}
                        style={{
                            fontSize: '15px',
                            fontWeight: 'normal',
                            color: 'gray',
                            borderRadius: '5px'
                        }}
                    />
                    <TextInput
                        type="select"
                        id="loadPickupStories"
                        value={formData.loadPickupStories}
                        onChange={handleLoadChange('loadPickupStories')}
                        label="Pickup stories"
                        options={[
                            {value: '1', label: '1'},
                            {value: '2', label: '2'},
                            {value: '3+', label: '3+'}
                        ]}
                        style={{
                            fontSize: '15px',
                            fontWeight: 'normal',
                            color: 'gray',
                            borderRadius: '5px'
                        }}
                    />
                    <TextInput
                        type="select"
                        id="loadDeliveryStories"
                        value={formData.loadDeliveryStories}
                        onChange={handleLoadChange('loadDeliveryStories')}
                        label="Delivery stories"
                        options={[
                            {value: '1', label: '1'},
                            {value: '2', label: '2'},
                            {value: '3+', label: '3+'}
                        ]}
                        style={{
                            fontSize: '15px',
                            fontWeight: 'normal',
                            color: 'gray',
                            borderRadius: '5px'
                        }}
                    />
                </Grid>
                <Button variant="slim">
                    + Add another load
                </Button>
                <FormSeparator title="Does the area have shopping, entertainment, or restaurants?"
                               subTitle="Choose option"/>
                <TextInput
                    type="select"
                    id="loadAreaOption"
                    value={formData.loadAreaOption}
                    onChange={handleLoadChange('loadAreaOption')}
                    label="Choose option"
                    options={[
                        {value: '1 floor', label: '1 floor'},
                        {value: '2 floor', label: '2 floor'},
                        {value: '3+', label: '3+'},
                        {
                            value: 'Load via passanger or freight + elevator',
                            label: 'Load via passanger or freight + elevator'
                        }
                    ]}
                    style={{
                        fontSize: '15px',
                        fontWeight: 'normal',
                        color: 'gray',
                        borderRadius: '5px'
                    }}
                />
                <FormSeparator title="Do you need item move upon down at your destination" subTitle="Choose option"/>
                <TextInput
                    type="select"
                    id="loadDestinationOptions"
                    value={formData.loadDestinationOptions}
                    onChange={handleLoadChange('loadDestinationOptions')}
                    label="Choose option"
                    options={[
                        {value: 'Some', label: 'Some'},
                        {value: 'I need', label: 'I need'},
                        {value: 'I do not need', label: 'I do not need'}
                    ]}
                    style={{
                        fontSize: '15px',
                        fontWeight: 'normal',
                        color: 'gray',
                        borderRadius: '5px'
                    }}
                />
                <FormSeparator title="Is there anything else" subTitle="Fill all necessary fields"/>
                <TextInput
                    type="select"
                    id="demo-multiple-checkbox"
                    value={selectedOptions}
                    onChange={handleOptionChange}
                    label="Options"
                    options={options.map(option => ({value: option, label: option}))}
                    multiple
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    style={{
                        minWidth: "100%",
                        height: '50px',
                        fontSize: '20px',
                        marginBottom: '25px',
                        color: 'black'
                    }}
                    checkboxStyle={{
                        color: pink[800],
                        '&.Mui-checked': {
                            color: pink[600],
                        },
                    }}
                />
                <FormSeparator title="Load Specifications" subTitle="Fill all necessary fields"/>
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
                    {imagePreviewUrl && imagePreviewUrl.map((url, index) => (
                        <img key={index} className="preview-image-for-load" src={url} alt="Preview"/>
                    ))}
                    {filePreviewUrl.map((url, index) => (
                        <img key={index} src={url} alt="Preview"/>
                    ))}
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

export default MilitaryMoving;