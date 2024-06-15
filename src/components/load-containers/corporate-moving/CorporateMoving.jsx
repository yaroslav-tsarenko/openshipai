import React, { useRef, useState } from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import FloatingWindowSuccess from "../../floating-window-success/FloatingWindowSuccess";
import FloatingWindowFailed from "../../floating-window-failed/FloatingWindowFailed";
import RecommendationContainer from "../../reccomendation-container/RecommendationContainer";
import {ReactComponent as PlusIcon} from "../../../assets/plus-blue-icon.svg";
import {ReactComponent as AttachFile} from "../../../assets/files-icon.svg";
import {ReactComponent as CameraIcon} from "../../../assets/camera-icon.svg";
import { pink } from '@mui/material/colors';
import "./CorporateMoving.css";
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
import {ClipLoader} from "react-spinners";

const CorporateMoving = ({pickupLocation, deliveryLocation, loadType, loadSubType, loadPickupDate, loadDeliveryDate, loadPickupTime, loadDeliveryTime,}) => {
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
        loadPrimaryContactName: '',
        loadSecondaryContactName: '',
        loadMajorItems: '',
        loadPickupLocation: pickupLocation,
        loadDeliveryLocation: deliveryLocation,
        loadPickupDate: loadPickupDate,
        loadDeliveryDate: loadDeliveryDate,
        loadPickupTime: loadPickupTime,
        loadDeliveryTime: loadDeliveryTime,
        loadTypeOfPackaging: '',
        loadItemsReassembled: '',
        loadElevator: '',
        loadTypeOfBusiness: '',
        loadIndustrySector: '',
        loadBusinessName: '',
        loadTruckParking: '',
        loadSpecialHandlingRequirements: '',
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
            target: { value },
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
        <div className="corporate-moving-load-container-wrapper">
            {isLoadCreatedSuccess && <FloatingWindowSuccess text="Load Created Successfully"/>}
            {isLoadCreatedFailed && <FloatingWindowFailed text="Something went wrong. Try Again"/>}
            <div className="corporate-moving-load-container-content">
                <section className="load-title-section">
                    <h1>Corporate Moving</h1>
                    <p>Try to fill all necessary fields</p>
                </section>
                <div className="corporate-moving-loads-container-inputs">
                    <section>
                        <Box sx={{minWidth: 180, height: '50px'}}>
                            <FormControl fullWidth style={{fontSize: '15px',}}>
                                <InputLabel id="demo-simple-select-label"
                                            style={{fontSize: '15px', fontWeight: 'normal'}}>Moving Size</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Moving Size"
                                    name="loadMovingSize"
                                    value={formData.loadMovingSize}
                                    onChange={(event) => {
                                        handleLoadChange("loadMovingSize")(event);
                                    }}
                                    style={{
                                        fontSize: '15px',
                                        fontWeight: 'normal',
                                        color: 'gray',
                                        borderRadius: '5px'
                                    }}
                                >
                                    <MenuItem value="Studio"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>Studio</MenuItem>
                                    <MenuItem value="1-bedroom apartment/home/condo"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>1-bedroom apartment/home/condo</MenuItem>
                                    <MenuItem value="2-bedroom apartment/home/condo"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>2-bedroom apartment/home/condo</MenuItem>
                                    <MenuItem value="3-bedroom apartment/home/condo"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>3-bedroom apartment/home/condo</MenuItem>
                                    <MenuItem value="4-bedroom apartment/home/condo"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>4-bedroom apartment/home/condo</MenuItem>
                                    <MenuItem value="House"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>House</MenuItem>
                                    <MenuItem value="Villa"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>Villa</MenuItem>
                                    <MenuItem value="Office"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>Office</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </section>
                    <section>
                        <Box sx={{minWidth: 180, height: '50px'}}>
                            <FormControl fullWidth style={{fontSize: '15px',}}>
                                <InputLabel id="demo-simple-select-label"
                                            style={{fontSize: '15px', fontWeight: 'normal'}}>Number of
                                    bedrooms</InputLabel>
                                <Select
                                    labelId="loadNumberOfBedrooms"
                                    id="loadNumberOfBedrooms"
                                    label="Number of bedrooms"
                                    name="loadNumberOfBedrooms"
                                    value={formData.loadNumberOfBedrooms}
                                    onChange={(event) => {
                                        handleLoadChange("loadNumberOfBedrooms")(event);
                                    }}
                                    style={{
                                        fontSize: '15px',
                                        fontWeight: 'normal',
                                        color: 'gray',
                                        borderRadius: '5px'
                                    }}
                                >
                                    <MenuItem value="1"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>1</MenuItem>
                                    <MenuItem value="2"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>2</MenuItem>
                                    <MenuItem value="3"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>3</MenuItem>
                                    <MenuItem value="4"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>4</MenuItem>
                                    <MenuItem value="4-bedroom apartment/home/condo"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>5+</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </section>
                    <section>
                        <Box sx={{minWidth: 180, height: '50px'}}>
                            <FormControl fullWidth style={{fontSize: '15px',}}>
                                <InputLabel id="demo-simple-select-label"
                                            style={{fontSize: '15px', fontWeight: 'normal'}}>Pickup stories</InputLabel>
                                <Select
                                    labelId="loadPickupStories"
                                    id="loadPickupStories"
                                    label="Pickup stories"
                                    name="loadPickupStories"
                                    value={formData.loadPickupStories}
                                    onChange={(event) => {
                                        handleLoadChange("loadPickupStories")(event);
                                    }}
                                    style={{
                                        fontSize: '15px',
                                        fontWeight: 'normal',
                                        color: 'gray',
                                        borderRadius: '5px'
                                    }}
                                >
                                    <MenuItem value="1"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>1</MenuItem>
                                    <MenuItem value="2"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>2</MenuItem>
                                    <MenuItem value="3+"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>3+</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </section>
                    <section>
                        <Box sx={{minWidth: 180, height: '50px'}}>
                            <FormControl fullWidth style={{fontSize: '15px',}}>
                                <InputLabel id="loadDeliveryStories"
                                            style={{fontSize: '15px', fontWeight: 'normal'}}>Delivery
                                    stories</InputLabel>
                                <Select
                                    labelId="loadDeliveryStories"
                                    id="loadDeliveryStories"
                                    label="Pickup stories"
                                    name="loadDeliveryStories"
                                    value={formData.loadDeliveryStories}
                                    onChange={(event) => {
                                        handleLoadChange("loadDeliveryStories")(event);
                                    }}
                                    style={{
                                        fontSize: '15px',
                                        fontWeight: 'normal',
                                        color: 'gray',
                                        borderRadius: '5px'
                                    }}
                                >
                                    <MenuItem value="1"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>1</MenuItem>
                                    <MenuItem value="2"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>2</MenuItem>
                                    <MenuItem value="3+"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>+3</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </section>
                </div>
                <button className="add-another-object-button"><PlusIcon className="another-object-plus-icon"/>Add
                    another load
                </button>
                <div className="corporate-moving-type-of-trailer-load">
                    <h2>Tell some about your business</h2>
                    <p>Just write little title, all information will be in safety</p>
                    <div className="corporate-moving-loads-container-inputs">
                        <div className="google-input-wrapper">
                            <input
                                id="businessName"
                                autoComplete="off"
                                className="google-style-input"
                                required
                                onChange={handleChange('businessName')}
                                value={formData.loadBusinessName}
                            />
                            <label htmlFor="businessName" className="google-style-input-label">Business Name</label>
                        </div>

                    </div>
                </div>
                <div className="corporate-moving-type-of-trailer-load">
                    <h2>Specify business industry and type of business</h2>
                    <p>Choose option</p>
                    <div className="corporate-moving-loads-container-inputs">
                        <div className="corporate-moving-loads-container-inputs">
                            <section>
                                <Box sx={{width: '100%', height: '50px', marginBottom: '10px'}}>
                                    <FormControl fullWidth style={{fontSize: '15px',}}>
                                        <InputLabel id="demo-simple-select-label"
                                                    style={{fontSize: '15px', fontWeight: 'normal'}}>Type of
                                            Business</InputLabel>
                                        <Select
                                            labelId="loadTypeOfBusiness"
                                            id="loadTypeOfBusiness"
                                            label="Type of Business"
                                            name="loadTypeOfBusiness"
                                            value={formData.loadTypeOfBusiness}
                                            onChange={(event) => {
                                                handleLoadChange("loadTypeOfBusiness")(event);
                                            }}
                                            style={{
                                                fontSize: '15px',
                                                fontWeight: 'normal',
                                                color: 'gray',
                                                borderRadius: '5px'
                                            }}
                                        >
                                            <MenuItem value="Sole Proprietorship"
                                                      style={{
                                                          fontSize: '15px',
                                                          color: 'grey',
                                                          fontWeight: 'normal'
                                                      }}>Sole Proprietorship</MenuItem>
                                            <MenuItem value="Partnership"
                                                      style={{
                                                          fontSize: '15px',
                                                          color: 'grey',
                                                          fontWeight: 'normal'
                                                      }}>Partnership</MenuItem>
                                            <MenuItem value="Corporation"
                                                      style={{
                                                          fontSize: '15px',
                                                          color: 'grey',
                                                          fontWeight: 'normal'
                                                      }}>Corporation</MenuItem>
                                            <MenuItem value="Limited Liability Company (LLC)"
                                                      style={{
                                                          fontSize: '15px',
                                                          color: 'grey',
                                                          fontWeight: 'normal'
                                                      }}>Limited Liability Company (LLC)</MenuItem>
                                            <MenuItem value="Nonprofit"
                                                      style={{
                                                          fontSize: '15px',
                                                          color: 'grey',
                                                          fontWeight: 'normal'
                                                      }}>Nonprofit</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </section>
                            <section>
                                <Box sx={{width: '100%', height: '50px', marginBottom: '10px'}}>
                                    <FormControl fullWidth style={{fontSize: '15px',}}>
                                        <InputLabel id="demo-simple-select-label"
                                                    style={{fontSize: '15px', fontWeight: 'normal'}}>Industry
                                            Sector</InputLabel>
                                        <Select
                                            labelId="loadIndustrySector"
                                            id="loadIndustrySector"
                                            label="Industry Sector"
                                            name="loadIndustrySector"
                                            value={formData.loadIndustrySector}
                                            onChange={(event) => {
                                                handleLoadChange("loadIndustrySector")(event);
                                            }}
                                            style={{
                                                fontSize: '15px',
                                                fontWeight: 'normal',
                                                color: 'gray',
                                                borderRadius: '5px'
                                            }}
                                        >
                                            <MenuItem value="Agriculture"
                                                      style={{
                                                          fontSize: '15px',
                                                          color: 'grey',
                                                          fontWeight: 'normal'
                                                      }}>Agriculture</MenuItem>
                                            <MenuItem value="Construction"
                                                      style={{
                                                          fontSize: '15px',
                                                          color: 'grey',
                                                          fontWeight: 'normal'
                                                      }}>Construction</MenuItem>
                                            <MenuItem value="Education"
                                                      style={{
                                                          fontSize: '15px',
                                                          color: 'grey',
                                                          fontWeight: 'normal'
                                                      }}>Education</MenuItem>
                                            <MenuItem value="Health Care"
                                                      style={{
                                                          fontSize: '15px',
                                                          color: 'grey',
                                                          fontWeight: 'normal'
                                                      }}>Health Care</MenuItem>
                                            <MenuItem value="Information Technology"
                                                      style={{
                                                          fontSize: '15px',
                                                          color: 'grey',
                                                          fontWeight: 'normal'
                                                      }}>Information Technology</MenuItem>
                                            <MenuItem value="Manufacturing"
                                                      style={{
                                                          fontSize: '15px',
                                                          color: 'grey',
                                                          fontWeight: 'normal'
                                                      }}>Manufacturing</MenuItem>
                                            <MenuItem value="Retail"
                                                      style={{
                                                          fontSize: '15px',
                                                          color: 'grey',
                                                          fontWeight: 'normal'
                                                      }}>Retail</MenuItem>
                                            <MenuItem value="Transportation"
                                                      style={{
                                                          fontSize: '15px',
                                                          color: 'grey',
                                                          fontWeight: 'normal'
                                                      }}>Transportation</MenuItem>
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
                        </div>
                    </div>
                </div>
                <div className="corporate-moving-type-of-trailer-load">
                    <h2>Contact information</h2>
                    <p>Just write little title, all information will be in safety</p>
                    <div className="corporate-moving-loads-container-inputs">
                        <div className="google-input-wrapper" style={{marginRight: '10px'}}>
                            <input
                                id="businessName"
                                autoComplete="off"
                                className="google-style-input"
                                required
                                onChange={handleChange('loadPrimaryContactName')}
                                value={formData.loadPrimaryContactName}
                            />
                            <label htmlFor="loadPrimaryContactName" className="google-style-input-label">Primary Contact
                                Name</label>
                        </div>
                        <div className="google-input-wrapper">
                            <input
                                id="loadSecondaryContactName"
                                autoComplete="off"
                                className="google-style-input"
                                required
                                onChange={handleChange('loadSecondaryContactName')}
                                value={formData.loadSecondaryContactName}
                            />
                            <label htmlFor="loadSecondaryContactName" className="google-style-input-label">Secondary
                                Contact Name</label>
                        </div>
                    </div>
                </div>
                <div className="corporate-moving-type-of-trailer-load">
                    <h2>Specify pickup / delivery floors</h2>
                    <p>Choose option</p>
                    <div className="corporate-moving-loads-container-inputs">
                        <div className="corporate-moving-loads-container-inputs">
                            <section>
                                <Box sx={{width: '100%', height: '50px', marginBottom: '10px'}}>
                                    <FormControl fullWidth style={{fontSize: '15px',}}>
                                        <InputLabel id="demo-simple-select-label"
                                                    style={{fontSize: '15px', fontWeight: 'normal'}}>Pickup
                                            floor</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Pickup floor"
                                            name="pickupFloor"
                                            value={formData.pickupFloor}
                                            onChange={(event) => {
                                                handleLoadChange("pickupFloor")(event);
                                            }}
                                            style={{
                                                fontSize: '15px',
                                                fontWeight: 'normal',
                                                color: 'gray',
                                                borderRadius: '5px'
                                            }}
                                        >
                                            <MenuItem value="1"
                                                      style={{
                                                          fontSize: '15px',
                                                          color: 'grey',
                                                          fontWeight: 'normal'
                                                      }}>1</MenuItem>
                                            <MenuItem value="2"
                                                      style={{
                                                          fontSize: '15px',
                                                          color: 'grey',
                                                          fontWeight: 'normal'
                                                      }}>2</MenuItem>
                                            <MenuItem value="3"
                                                      style={{
                                                          fontSize: '15px',
                                                          color: 'grey',
                                                          fontWeight: 'normal'
                                                      }}>3</MenuItem>
                                            <MenuItem value="4"
                                                      style={{
                                                          fontSize: '15px',
                                                          color: 'grey',
                                                          fontWeight: 'normal'
                                                      }}>4</MenuItem>
                                            <MenuItem value="5+"
                                                      style={{
                                                          fontSize: '15px',
                                                          color: 'grey',
                                                          fontWeight: 'normal'
                                                      }}>5+</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </section>
                            <section>
                                <Box sx={{width: '100%', height: '50px', marginBottom: '10px'}}>
                                    <FormControl fullWidth style={{fontSize: '15px',}}>
                                        <InputLabel id="demo-simple-select-label"
                                                    style={{fontSize: '15px', fontWeight: 'normal'}}>Delivery
                                            floor</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Delivery floor"
                                            name="deliveryFloor"
                                            value={formData.pickupFloor}
                                            onChange={(event) => {
                                                handleLoadChange("deliveryFloor")(event);
                                            }}
                                            style={{
                                                fontSize: '15px',
                                                fontWeight: 'normal',
                                                color: 'gray',
                                                borderRadius: '5px'
                                            }}
                                        >
                                            <MenuItem value="1"
                                                      style={{
                                                          fontSize: '15px',
                                                          color: 'grey',
                                                          fontWeight: 'normal'
                                                      }}>1</MenuItem>
                                            <MenuItem value="2"
                                                      style={{
                                                          fontSize: '15px',
                                                          color: 'grey',
                                                          fontWeight: 'normal'
                                                      }}>2</MenuItem>
                                            <MenuItem value="3"
                                                      style={{
                                                          fontSize: '15px',
                                                          color: 'grey',
                                                          fontWeight: 'normal'
                                                      }}>3</MenuItem>
                                            <MenuItem value="4"
                                                      style={{
                                                          fontSize: '15px',
                                                          color: 'grey',
                                                          fontWeight: 'normal'
                                                      }}>4</MenuItem>
                                            <MenuItem value="5+"
                                                      style={{
                                                          fontSize: '15px',
                                                          color: 'grey',
                                                          fontWeight: 'normal'
                                                      }}>5+</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </section>
                        </div>
                    </div>
                </div>
                <div className="vehicle-loads-container-switchers">
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
                </div>
                <div className="corporate-moving-type-of-trailer-load">
                    <h2>Which major items have</h2>
                    <p>Choose option</p>
                    <div className="corporate-moving-loads-container-inputs">
                        <Box sx={{minWidth: "100%", height: '50px', marginBottom: "20px"}}>
                            <FormControl fullWidth style={{fontSize: '15px',}}>
                                <InputLabel id="demo-simple-select-label"
                                            style={{fontSize: '15px', fontWeight: 'normal'}}>Choose option</InputLabel>
                                <Select
                                    labelId="loadMajorItems"
                                    id="loadMajorItems"
                                    label="Choose option"
                                    name="loadMajorItems"
                                    value={formData.loadMajorItems}
                                    onChange={(event) => {
                                        handleLoadChange("loadMajorItems")(event);
                                    }}
                                    style={{
                                        fontSize: '15px',
                                        fontWeight: 'normal',
                                        color: 'gray',
                                        borderRadius: '5px'
                                    }}
                                >
                                    <MenuItem value="Office Furniture"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>Office Furniture</MenuItem>
                                    <MenuItem value="Computers and IT Equipment"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>Computers and IT Equipment</MenuItem>
                                    <MenuItem value="Documents and Files"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>Documents and Files</MenuItem>
                                    <MenuItem value="Electronics"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>Electronics</MenuItem>
                                    <MenuItem value="Artwork and Decorations"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>Artwork and Decorations</MenuItem>
                                    <MenuItem value="Kitchen Equipment"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>Kitchen Equipment</MenuItem>
                                    <MenuItem value="Other"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>

                <div className="commercial-business-moving-type-of-trailer-load">
                    <h2>Does the area have shopping, entertainment, or restaurants?</h2>
                    <p>Choose option</p>
                    <div className="ltl-load-container-inputs">
                        <Box sx={{minWidth: "100%", height: '50px', marginBottom: "20px"}}>
                            <FormControl fullWidth style={{fontSize: '15px',}}>
                                <InputLabel id="demo-simple-select-label"
                                            style={{fontSize: '15px', fontWeight: 'normal'}}>Choose option</InputLabel>
                                <Select
                                    labelId="loadAreaOption"
                                    id="loadAreaOption"
                                    label="Choose option"
                                    name="loadAreaOption"
                                    value={formData.loadAreaOption}
                                    onChange={(event) => {
                                        handleLoadChange("loadAreaOption")(event);
                                    }}
                                    style={{
                                        fontSize: '15px',
                                        fontWeight: 'normal',
                                        color: 'gray',
                                        borderRadius: '5px'
                                    }}
                                >
                                    <MenuItem value="1 floor"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>1 floor</MenuItem>
                                    <MenuItem value="2 floor"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>2 floor</MenuItem>
                                    <MenuItem value="3+"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>+3 floor</MenuItem>
                                    <MenuItem value="Load via passanger or freight + elevator"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>Load via passanger or freight + elevator</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>
                <div className="commercial-business-moving-type-of-trailer-load">
                    <h2>Do you need item move upon down at your destination</h2>
                    <p>Choose option</p>
                    <div className="ltl-load-container-inputs">
                        <Box sx={{minWidth: "100%", height: '50px', marginBottom: "20px"}}>
                            <FormControl fullWidth style={{fontSize: '15px',}}>
                                <InputLabel id="demo-simple-select-label"
                                            style={{fontSize: '15px', fontWeight: 'normal'}}>Choose option</InputLabel>
                                <Select
                                    labelId="loadDestinationOptions"
                                    id="loadDestinationOptions"
                                    label="Choose option"
                                    name="loadDestinationOptions"
                                    value={formData.loadDestinationOptions}
                                    onChange={(event) => {
                                        handleLoadChange("loadDestinationOptions")(event);
                                    }}
                                    style={{
                                        fontSize: '15px',
                                        fontWeight: 'normal',
                                        color: 'gray',
                                        borderRadius: '5px'
                                    }}
                                >
                                    <MenuItem value="Some"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>Some</MenuItem>
                                    <MenuItem value="I need"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>I need</MenuItem>
                                    <MenuItem value="I do not need"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>I do not need</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>
                <div className="commercial-business-moving-type-of-trailer-load">
                    <h2>Is there anything else</h2>
                    <p>Choose option</p>
                    <div className="ltl-load-container-inputs">
                        <ThemeProvider theme={theme}>
                            <Box sx={{minWidth: "100%", height: '50px', fontSize: '20px', marginBottom: '25px'}}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-checkbox-label"
                                                sx={{fontSize: '15px', color: 'black'}}>Options</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={selectedOptions}
                                        onChange={handleOptionChange}
                                        input={<OutlinedInput label="Options"/>}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {options.map((option) => (
                                            <MenuItem key={option} value={option}
                                                      sx={{fontSize: '15px', color: 'black'}}>
                                                <Checkbox checked={selectedOptions.indexOf(option) > -1} sx={{
                                                    color: pink[800],
                                                    '&.Mui-checked': {
                                                        color: pink[600],
                                                    },
                                                }}/>
                                                <ListItemText primary={option}/>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </ThemeProvider>
                    </div>
                </div>

                <div className="corporate-moving-load-optional-inputs">
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
                <div className="corporate-moving-load-description">
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
            <div className="corporate-moving-load-container-content-tips">
                <RecommendationContainer title="Details Matter"
                                         description="The quotes you get are only asaccurate as your listing. Make it as detailed as possible to avoid delays, price increases, and cancellations."/>
                <RecommendationContainer title="Double Check Locations"
                                         description="Include correct locations for accurate pricing."/>
            </div>
        </div>
    );
};

export default CorporateMoving;