import React, {useRef, useState} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import Alert from "../../floating-window-success/Alert";
import FloatingWindowFailed from "../../floating-window-failed/FloatingWindowFailed";
import {ThemeProvider, createTheme, TextField} from "@mui/material";
import Switch from "../../switcher-component/Switch";
import {ClipLoader} from "react-spinners";
import {BACKEND_URL} from "../../../constants/constants";
import CreateLoadContainer from "../../create-load-container/CreateLoadContainer";
import FormSeparator from "../../form-separator/FormSeparator";
import TextInput from "../../text-input/TextInput";
import Grid from "../../grid-two-columns/Grid";
import Button from "../../button/Button";

const CorporateMoving = ({
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
        loadDescription: '',
        loadBusinessName: '',
        loadDestinationOptions: '',
        loadAdditionalSelectedLoadOptions: [],
        loadWeight: '',
        loadLength: '',
        loadAreaOption: '',
        loadWidth: '',
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
        selectedLoadOptions: [],
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

    return (
        <>
            {isLoadCreatedSuccess && <Alert text="Load Created Successfully"/>}
            {isLoadCreatedFailed && <FloatingWindowFailed text="Something went wrong. Try Again"/>}
            <CreateLoadContainer step={4} title="Corporate Moving"
                                 subTitle="Try to fill all necessary fields">
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
                            borderRadius: '5px',
                            minWidth: 180,
                            height: '50px'
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
                            borderRadius: '5px',
                            minWidth: 180,
                            height: '50px'
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
                            borderRadius: '5px',
                            minWidth: 180,
                            height: '50px'
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
                            borderRadius: '5px',
                            minWidth: 180,
                            height: '50px'
                        }}
                    />
                </Grid>
                <Button variant="slim">
                    + Add another load
                </Button>
                <FormSeparator title="Tell some about your business"
                               subTitle="Just write little title, all information will be in safety"/>
                <TextInput
                    type="text"
                    id="loadBusinessName"
                    value={formData.loadBusinessName}
                    onChange={handleChange('loadBusinessName')}
                    label="Business Name"
                    style={{className: 'google-style-input', autoComplete: 'off', required: true}}
                />
                <FormSeparator title="Specify business industry and type of business"
                               subTitle="Choose option"/>
                <Grid columns="2, 2fr">
                    <TextInput
                        type="select"
                        id="loadTypeOfBusiness"
                        value={formData.loadTypeOfBusiness}
                        onChange={handleLoadChange('loadTypeOfBusiness')}
                        label="Type of Business"
                        options={[
                            {value: 'Sole Proprietorship', label: 'Sole Proprietorship'},
                            {value: 'Partnership', label: 'Partnership'},
                            {value: 'Corporation', label: 'Corporation'},
                            {value: 'Limited Liability Company (LLC)', label: 'Limited Liability Company (LLC)'},
                            {value: 'Nonprofit', label: 'Nonprofit'}
                        ]}
                        style={{
                            fontSize: '15px',
                            fontWeight: 'normal',
                            color: 'gray',
                            borderRadius: '5px',
                            width: '100%',
                            height: '50px',
                            marginBottom: '10px'
                        }}
                    />
                    <TextInput
                        type="select"
                        id="loadIndustrySector"
                        value={formData.loadIndustrySector}
                        onChange={handleLoadChange('industrySector')}
                        label="Industry Sector"
                        options={[
                            {value: 'Agriculture', label: 'Agriculture'},
                            {value: 'Construction', label: 'Construction'},
                            {value: 'Education', label: 'Education'},
                            {value: 'Health Care', label: 'Health Care'},
                            {value: 'Information Technology', label: 'Information Technology'},
                            {value: 'Manufacturing', label: 'Manufacturing'},
                            {value: 'Retail', label: 'Retail'},
                            {value: 'Transportation', label: 'Transportation'},
                            {value: 'Other', label: 'Other'}
                        ]}
                        style={{
                            fontSize: '15px',
                            fontWeight: 'normal',
                            color: 'gray',
                            borderRadius: '5px',
                            width: '100%',
                            height: '50px',
                            marginBottom: '10px'
                        }}
                    />
                </Grid>
                <FormSeparator title="Specify pickup / delivery floors" subTitle="Choose option"/>
                <Grid columns="2, 2fr">
                    <TextInput
                        type="select"
                        id="loadPickupFloor"
                        value={formData.loadPickupFloor}
                        onChange={handleLoadChange('loadPickupFloor')}
                        label="Pickup floor"
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
                            borderRadius: '5px',
                            width: '100%',
                            height: '50px',
                            marginBottom: '10px'
                        }}
                    />
                    <TextInput
                        type="select"
                        id="loadDeliveryFloor"
                        value={formData.loadDeliveryFloor}
                        onChange={handleLoadChange('loadDeliveryFloor')}
                        label="Delivery floor"
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
                            borderRadius: '5px',
                            width: '100%',
                            height: '50px',
                            marginBottom: '10px'
                        }}
                    />
                </Grid>
                <Grid columns="3, 3fr">
                    <Switch
                        handleToggle={() => {
                            setIsFirstOption(!isFirstOption);
                            setFormData({...formData, loadItemsReassembled: !isFirstOption});
                        }}
                        label="Items re-assembled"
                        tip="Will cubicles or other items need to be re-assembled?"
                    />
                    <Switch
                        handleToggle={() => {
                            setIsSecondOption(!isSecondOption);
                            setFormData({...formData, loadElevator: !isSecondOption});
                        }}
                        label="Elevator"
                        tip="Does building have elevator / freight elevator"
                    />
                    <Switch
                        handleToggle={() => {
                            setIsThirdOption(!isThirdOption);
                            setFormData({...formData, loadTruckParking: !isThirdOption});
                        }}
                        label="Truck parking"
                        tip="Is truck parking available?"
                    />
                </Grid>
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

                />
                <FormSeparator title="Is there anything else" subTitle="Choose option"/>
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
                        fontSize: '15px',
                        color: 'black',
                        minWidth: '100%',
                        height: '50px',
                        marginBottom: '25px'
                    }}
                />
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
                </Grid>
                {imagePreviewUrl && imagePreviewUrl.map((url, index) => (
                    <img key={index} className="preview-image-for-load" src={url} alt="Preview"/>
                ))}
                {filePreviewUrl.map((url, index) => (
                    <img key={index} src={url} alt="Preview"/>
                ))}

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
                <FormSeparator title="Note" subTitle="After creating load, load will be automatically visible in your dashboard, and on the carrier’s
                        marketplace"/>

                <Grid columns="2, 2fr">
                    <Button variant="neutral" onClick={goBack}>
                        Go Back
                    </Button>
                    <Button var="default" className="creating-load-button" onClick={handleCreateLoad}>
                        {isLoading ? <ClipLoader size={15} color={"#ffffff"}/> : "Create Load"}
                    </Button>
                </Grid>

            </CreateLoadContainer>

        </>
    );
};

export default CorporateMoving;