import React, {useRef, useState} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import Alert from "../../floating-window-success/Alert";
import FloatingWindowFailed from "../../floating-window-failed/FloatingWindowFailed";
import RecommendationContainer from "../../reccomendation-container/RecommendationContainer";
import {ReactComponent as PlusIcon} from "../../../assets/plus-blue-icon.svg";
import {ReactComponent as AttachFile} from "../../../assets/files-icon.svg";
import {ReactComponent as CameraIcon} from "../../../assets/camera-icon.svg";
import {pink} from '@mui/material/colors';
import "./FreightLoadContainer.module.scss";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import {ThemeProvider, createTheme, TextField} from "@mui/material";
import Switch from "../../switcher-component/Switch";
import {BACKEND_URL} from "../../../constants/constants";
import CreateLoadContainer from "../../create-load-container/CreateLoadContainer";
import TextInput from "../../text-input/TextInput";
import Grid from "../../grid-two-columns/Grid";
import Button from "../../button/Button";
import FormSeparator from "../../form-separator/FormSeparator";
import RoundedCheckbox from "../../rounded-checkbox/RoundedCheckbox";
import CustomCheckBox from "../../custom-checkbox/CustomCheckBox";

const FreightLoadContainer = ({
                                  pickupLocation,
                                  deliveryLocation,
                                  loadType,
                                  loadSubType,
                                  loadPickupDate,
                                  loadDeliveryDate,
                                  loadPickupTime,
                                  loadDeliveryTime,
                                  goBack
                              }) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState([]);
    const [filePreviewUrl, setFilePreviewUrl] = useState([]);
    const [isFirstOption, setIsFirstOption] = useState(false);
    const [isSecondOption, setIsSecondOption] = useState(false);
    const [isThirdOption, setIsThirdOption] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showTrailerTypes, setShowTrailerTypes] = useState(false);
    const handleToggleTrailerTypes = () => {
        setShowTrailerTypes(!showTrailerTypes);
    };
    const handleToggleLoadTypeOfTrailer = () => {
        setFormData(prevState => ({
            ...prevState,
            loadTypeOfTrailer: prevState.loadTypeOfTrailer === "No" ? "" : "No"
        }));
    };
    const fileInputRef = useRef();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const {shipperID} = useParams();
    const [isLoadCreatedSuccess, setIsLoadCreatedSuccess] = useState(false);
    const [isLoadCreatedFailed, setIsLoadCreatedFailed] = useState(false);
    const [formData, setFormData] = useState({
        loadType: loadType,
        loadSubType: loadSubType,
        loadSpecifiedItem: '',
        loadMovingSize: '',
        loadNumberOfBedrooms: '',
        loadPickupStories: '',
        loadDeliveryStories: '',
        loadTitle: '',
        loadPickupLocation: pickupLocation,
        loadDeliveryLocation: deliveryLocation,
        loadPickupDate: loadPickupDate,
        loadDeliveryDate: loadDeliveryDate,
        loadPickupTime: loadPickupTime,
        loadDeliveryTime: loadDeliveryTime,
        loadPickupFloor: '',
        loadDeliveryFloor: '',
        loadTypeOfPackaging: '',
        loadItemsReassembled: '',
        loadElevator: '',
        loadTruckParking: '',
        loadSpecialHandlingRequirements: '',
        loadIndustrySector: '',
        loadDestinationOptions: '',
        loadServiceExpressOptions: '',
        loadDescription: '',
        loadWeight: '',
        loadLength: '',
        loadAreaOption: '',
        loadWidth: '',
        loadVehicleMake: '',
        loadVehicleYear: '',
        loadVehicleModel: '',
        loadHeight: '',
        loadQuantity: '',
        loadAdditionalSelectedLoadOptions: [],
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

    const theme = createTheme({
        palette: {
            primary: {
                main: '#024ec9',
            },
            secondary: {
                main: '#024ec9',
            },
            text: {
                primary: '#000000',
                secondary: '#757575',
            },
        },
        typography: {
            fontSize: 23,
        },
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

        // Update the formData state
        setFormData(prevState => ({
            ...prevState,
            selectedLoadOptions: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const handleCheckboxChange = (newChecked) => {
        setFormData(prevState => ({
            ...prevState,
            loadTypeOfTrailer: newChecked ? "No" : ""
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

    const handleCreateLoad = async () => {
        setFormData({
            ...formData,
        });
        try {
            const response = await axios.post(`${BACKEND_URL}/save-load-data`, formData);
            console.log(response.data);
            setIsLoadCreatedSuccess(true);
        } catch (error) {
            console.error(error);
            setIsLoadCreatedFailed(true);
        }
    };

    return (
        <>
            {isLoadCreatedSuccess && <Alert status="success" text="Success" description="Load Created Successfully"/>}
            {isLoadCreatedFailed && <FloatingWindowFailed text="Something went wrong. Try Again"/>}
            <CreateLoadContainer title="Freight Load" step={4} subTitle="Fill all needed information">
                <TextInput
                    type="text"
                    id="loadTitle"
                    value={formData.loadTitle}
                    onChange={handleChange('loadTitle')}
                    label="Load Title"
                />
                <FormSeparator title="Trailer Preference" subTitle="Choose"/>
                <Grid columns="2, 2fr">
                    <CustomCheckBox checked={showTrailerTypes} onClick={handleToggleTrailerTypes} label="Yes" />
                    <CustomCheckBox
                        id="checkbox1"
                        label="No"
                        onClick={handleToggleLoadTypeOfTrailer}
                        checked={formData.loadTypeOfTrailer === "No"}
                    />
                </Grid>
                {showTrailerTypes && (
                    <>
                        <FormSeparator title="Trailer Types" subTitle="Choose"/>
                        <Grid columns="2, 2fr">
                            <CustomCheckBox id="checkbox3" label="Flatbed" disabled />
                            <CustomCheckBox id="checkbox4" label="Dry Van" disabled />
                            <CustomCheckBox id="checkbox5" label="Reefer" disabled />
                            <CustomCheckBox id="checkbox6" label="Step Deck" disabled />
                            <CustomCheckBox id="checkbox7" label="Lowboy" disabled />
                            <CustomCheckBox id="checkbox8" label="Tanker" disabled />
                            <CustomCheckBox id="checkbox9" label="Container" disabled />
                            <CustomCheckBox id="checkbox10" label="Car Carrier" disabled />
                            <CustomCheckBox id="checkbox11" label="Livestock" disabled />
                            <CustomCheckBox id="checkbox12" label="Logging" disabled />
                        </Grid>
                    </>
                )}
                <FormSeparator title="Load Details" subTitle="Fill all needed information"/>
                <Grid columns="2, 2fr">
                    <TextInput
                        type="text"
                        id="loadQuantity"
                        value={formData.loadQuantity}
                        onChange={handleChange('loadQuantity')}
                        label="Units"
                    />
                    <TextInput
                        type="select"
                        id="loadTypeOfPackaging"
                        value={formData.loadTypeOfPackaging}
                        onChange={handleChange('loadTypeOfPackaging')}
                        label="Equipment Category"
                        options={[
                            { value: 'pallet', label: 'Pallet' },
                            { value: 'crate', label: 'Crate' },
                            { value: 'box', label: 'Box' },
                            { value: 'drum', label: 'Drum' },
                            { value: 'bag', label: 'Bag' },
                            { value: 'bundle', label: 'Bundle' },
                            { value: 'roll', label: 'Roll' },
                            { value: 'container', label: 'Container' },
                            { value: 'loose', label: 'Loose' },
                            { value: 'Coils', label: 'Coils' },
                            { value: 'Cans', label: 'Cans' },
                            { value: 'Coils', label: 'Coils' },
                            { value: 'Cylinders', label: 'Cylinders' },
                            { value: 'Reels', label: 'Reels' },
                            { value: 'Rolls', label: 'Rolls' },
                            { value: 'Tube/Pipes', label: 'Tube/Pipes' },
                        ]}
                    />
                </Grid>
                <FormSeparator title="Unit Measurements" subTitle="Fill all needed information"/>
                <Grid columns="4, 4fr">
                    <TextInput
                        type="text"
                        id="loadLength"
                        value={formData.loadLength}
                        onChange={handleChange('loadLength')}
                        label="Length (in.)"
                    />
                    <TextInput
                        type="text"
                        id="loadWidth"
                        value={formData.loadWidth}
                        onChange={handleChange('loadWidth')}
                        label="Width (in.)"
                    />
                    <TextInput
                        type="text"
                        id="loadHeight"
                        value={formData.loadHeight}
                        onChange={handleChange('loadHeight')}
                        label="Height (in.)"
                    />
                    <TextInput
                        type="text"
                        id="loadWeight"
                        value={formData.loadWeight}
                        onChange={handleChange('loadWeight')}
                        label="Weight (lbs.)"
                    />
                </Grid>
                <FormSeparator title="Loading Requirements" subTitle="Choose"/>
                <Grid columns="2, 2fr">
                    <CustomCheckBox id="checkbox33" label="Liftgate Pickup" disabled />
                    <CustomCheckBox id="checkbox33" label="Pallet Jack assist" disabled />
                    <CustomCheckBox id="checkbox33" label="LBlind shipment" disabled />
                    <CustomCheckBox id="checkbox33" label="Liftgate delivery" disabled />
                    <CustomCheckBox id="checkbox33" label="Assembly-Disassembly" disabled />
                    <CustomCheckBox id="checkbox33" label="Appointment Requirement" disabled />
                </Grid>
                <FormSeparator title="For better experience attach files" subTitle="AI can better analyze your preferences"/>
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

                <FormSeparator title="Add Notice" subTitle="Try to briefly describe load"/>
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
                    <Button className="creating-load-button" onClick={handleCreateLoad}>Create Load</Button>

                </Grid>
            </CreateLoadContainer>
        </>

    );
};

export default FreightLoadContainer;