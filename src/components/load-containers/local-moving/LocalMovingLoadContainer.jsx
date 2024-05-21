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
import "./LocalMovingLoadContainer.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import {ThemeProvider, createTheme} from "@mui/material";

const LocalMovingLoadContainer = ({pickupLocation, deliveryLocation, loadType, loadSubType, loadPickupDate, loadDeliveryDate, loadPickupTime, loadDeliveryTime,}) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState([]);
    const [filePreviewUrl, setFilePreviewUrl] = useState([]);
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
        loadWeight: '',
        loadLength: '',
        loadWidth: '',
        loadVehicleMake: '',
        loadVehicleYear: '',
        loadVehicleModel: '',
        loadHeight: '',
        loadQuantity: '',
        loadOperable: false,
        loadConvertible: false,
        loadModified: false,
        shipperID: shipperID,
    });

    const theme = createTheme({
        palette: {
            primary: {
                main: '#024ec9', // This will be the primary color of your theme
            },
            secondary: {
                main: '#024ec9', // This will be the secondary color of your theme
            },
            text: {
                primary: '#000000', // This will be the primary text color of your theme
                secondary: '#757575', // This will be the secondary text color of your theme
            },
        },
        typography: {
            fontSize: 23,
        },
    });

// MenuProps for Select component
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
            const response = await axios.post('http://localhost:8080/save-load-data', formData);
            console.log(response.data);
            setIsLoadCreatedSuccess(true);
        } catch (error) {
            console.error(error);
            setIsLoadCreatedFailed(true);
        }
    };

    return (
        <div className="local-moving-load-container-wrapper">
            {isLoadCreatedSuccess && <FloatingWindowSuccess text="Load Created Successfully"/>}
            {isLoadCreatedFailed && <FloatingWindowFailed text="Something went wrong. Try Again"/>}
            <div className="local-moving-load-container-content">
                <section className="load-title-section">
                    <h1>Local Moving (less then 50 mil)</h1>
                    <p>Try to fill all necessary fields</p>
                </section>
                <div className="local-moving-loads-container-inputs">
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
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
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
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
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
                                <InputLabel id="demo-simple-select-label"
                                            style={{fontSize: '15px', fontWeight: 'normal'}}>Delivery
                                    stories</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
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
                <div className="local-moving-type-of-trailer-load">
                    <h2>Does the area have shopping, entertainment, or restaurants?</h2>
                    <p>Choose option</p>
                    <div className="local-moving-loads-container-inputs">
                        <Box sx={{minWidth: "100%", height: '50px', marginBottom: "20px"}}>
                            <FormControl fullWidth style={{fontSize: '15px',}}>
                                <InputLabel id="demo-simple-select-label"
                                            style={{fontSize: '15px', fontWeight: 'normal'}}>Choose option</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
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
                                    <MenuItem value="1"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>1 floor</MenuItem>
                                    <MenuItem value="2"
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
                                    <MenuItem value="3+"
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
                <div className="local-moving-type-of-trailer-load">
                    <h2>Do you need item move upon down at your destination</h2>
                    <p>Choose option</p>
                    <div className="local-moving-loads-container-inputs">
                        <Box sx={{minWidth: "100%", height: '50px', marginBottom: "20px"}}>
                            <FormControl fullWidth style={{fontSize: '15px',}}>
                                <InputLabel id="demo-simple-select-label"
                                            style={{fontSize: '15px', fontWeight: 'normal'}}>Choose option</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
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
                                    <MenuItem value="1"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>Some</MenuItem>
                                    <MenuItem value="2"
                                              style={{
                                                  fontSize: '15px',
                                                  color: 'grey',
                                                  fontWeight: 'normal'
                                              }}>I need</MenuItem>
                                    <MenuItem value="3+"
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
                <div className="local-moving-type-of-trailer-load">
                    <h2>Is there anything else</h2>
                    <p>Choose option</p>
                    <div className="local-moving-loads-container-inputs">
                        <ThemeProvider theme={theme}>
                            <Box sx={{ minWidth: "100%", height: '50px', fontSize: '20px', marginBottom: '25px' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-checkbox-label" sx={{ fontSize: '15px', color: 'black' }}>Options</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={selectedOptions}
                                        onChange={handleOptionChange}
                                        input={<OutlinedInput label="Options" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {options.map((option) => (
                                            <MenuItem key={option} value={option} sx={{ fontSize: '15px', color: 'black' }}>
                                                <Checkbox checked={selectedOptions.indexOf(option) > -1} sx={{
                                                    color: pink[800],
                                                    '&.Mui-checked': {
                                                        color: pink[600],
                                                    },
                                                }}  />
                                                <ListItemText primary={option} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </ThemeProvider>
                    </div>
                </div>

                <div className="local-moving-load-optional-inputs">
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
                <div className="local-moving-load-description">
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
            <div className="local-moving-load-container-content-tips">
                <RecommendationContainer title="Details Matter"
                                         description="The quotes you get are only asaccurate as your listing. Make it as detailed as possible to avoid delays, price increases, and cancellations."/>
                <RecommendationContainer title="Double Check Locations"
                                         description="Include correct locations for accurate pricing."/>
            </div>
        </div>
    );
};

export default LocalMovingLoadContainer;