import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import Alert from "../../floating-window-success/Alert";
import "./FreightLoadContainer.module.scss";
import {BACKEND_URL} from "../../../constants/constants";
import CreateLoadContainer from "../../create-load-container/CreateLoadContainer";
import TextInput from "../../text-input/TextInput";
import Grid from "../../grid-two-columns/Grid";
import Button from "../../button/Button";
import FormSeparator from "../../form-separator/FormSeparator";
import CustomCheckBox from "../../custom-checkbox/CustomCheckBox";
import RegistrationComponent from "../../registration-component/RegistrationComponent";
import useShipperStore from "../../../stores/landing-registration-shipper/store";
import FlexContainer from "../../flex-container/FlexContainer";
import {FaTimes} from "react-icons/fa";
import SEO from "../../seo/SEO";

const FreightLoadContainer = ({
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
    const [checkedOptionsLoadRequirements, setCheckedOptionsLoadRequirements] = useState({
        LiftgatePickup: false,
        PalletJackAssist: false,
        BlindShipment: false,
        LiftgateDelivery: false,
        AssemblyDisassembly: false,
        AppointmentRequirement: false
    });

    const handleCheckboxChangeLoadRequirements = (option) => {
        setCheckedOptions(prevState => ({
            ...prevState,
            [option]: !prevState[option]
        }));
    };

    const [checkedOptions, setCheckedOptions] = useState({
        Flatbed: false,
        DryVan: false,
        Reefer: false,
        StepDeck: false,
        Lowboy: false,
        Tanker: false,
        Container: false,
        CarCarrier: false,
        Livestock: false,
        Logging: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showTrailerTypes, setShowTrailerTypes] = useState(false);

    const handleToggleTrailerTypes = () => {
        setShowTrailerTypes(!showTrailerTypes);
        if (!showTrailerTypes) {
            setFormData(prevState => ({
                ...prevState,
                loadTypeOfTrailer: ""
            }));
        }
    };

    const handleToggleLoadTypeOfTrailer = () => {
        setFormData(prevState => ({
            ...prevState,
            loadTypeOfTrailer: prevState.loadTypeOfTrailer === "No" ? "" : "No"
        }));
        if (formData.loadTypeOfTrailer !== "No") {
            setShowTrailerTypes(false);
        }
    };
    const fileInputRef = useRef();
    const imageInputRef = useRef();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);
    const [requireRegistrationStatus, setRequireRegistrationStatus] = useState(requireRegistration);
    const { shipperID: paramShipperID } = useParams();
    const { userShipperID, registrationStatus } = useShipperStore();
    const [shipperID, setShipperID] = useState(paramShipperID || userShipperID);
    const [registeredShipperID, setRegisteredShipperID] = useState(null);
    const [isLoadCreatedSuccess, setIsLoadCreatedSuccess] = useState(false);
    const [isLoadCreatedFailed, setIsLoadCreatedFailed] = useState(false);
    const [formData, setFormData] = useState({
        loadType: loadType,
        loadSubType: 'Freight',
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
        loadMilesTrip: loadMilesTrip,
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
        loadImages: [],
        loadPrice: 0,
        loadStatus: 'Published',
        loadCarrierConfirmation: "Not Confirmed",
        loadPaymentStatus: "Not Paid",
        loadAssignedDriverID: "Not Assigned",
        loadDeliveredStatus: "Not Delivered",
        loadCredentialID: (() => `${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`)(),
        shipperID: shipperID,
    });

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

    const handleCheckboxChangeTypeOfTrailer = (option) => {
        setCheckedOptions(prevState => ({
            ...prevState,
            [option]: !prevState[option]
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
            <SEO
                title="Freight Load - Fast and Reliable Freight Transport"
                description="Get fast and reliable freight transport services. Contact us for a quote and ensure your freight is delivered on time."
                keywords="freight load, reliable freight transport, fast freight shipping, freight services"
            />
            {isLoadCreatedSuccess && <Alert status="success" text="Success!" description="Load Created Successfully!"/>}
            {isLoadCreatedFailed && <Alert status="error" text="Error!" description="Something went wrong. Try Again"/>}
            {showRegistrationPopup && <RegistrationComponent onRegistrationSuccess={handleRegistrationSuccess}/>}
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
                    <CustomCheckBox checked={showTrailerTypes} onClick={handleToggleTrailerTypes} label="Yes"/>
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
                                <CustomCheckBox
                                    id="checkbox3"
                                    label="Flatbed"
                                    checked={checkedOptions.Flatbed}
                                    onClick={() => handleCheckboxChangeTypeOfTrailer('Flatbed')}
                                    onChange={() => handleCheckboxChangeTypeOfTrailer('Flatbed')}
                                />
                                <CustomCheckBox
                                    id="checkbox4"
                                    label="Dry Van"
                                    checked={checkedOptions.DryVan}
                                    onClick={() => handleCheckboxChangeTypeOfTrailer('DryVan')}
                                    onChange={() => handleCheckboxChangeTypeOfTrailer('DryVan')}
                                />
                                <CustomCheckBox
                                    id="checkbox5"
                                    label="Reefer"
                                    checked={checkedOptions.Reefer}
                                    onClick={() => handleCheckboxChangeTypeOfTrailer('Reefer')}
                                    onChange={() => handleCheckboxChangeTypeOfTrailer('Reefer')}
                                />
                                <CustomCheckBox
                                    id="checkbox6"
                                    label="Step Deck"
                                    checked={checkedOptions.StepDeck}
                                    onClick={() => handleCheckboxChangeTypeOfTrailer('StepDeck')}
                                    onChange={() => handleCheckboxChangeTypeOfTrailer('StepDeck')}
                                />
                                <CustomCheckBox
                                    id="checkbox7"
                                    label="Lowboy"
                                    checked={checkedOptions.Lowboy}
                                    onClick={() => handleCheckboxChangeTypeOfTrailer('Lowboy')}
                                    onChange={() => handleCheckboxChangeTypeOfTrailer('Lowboy')}
                                />
                                <CustomCheckBox
                                    id="checkbox8"
                                    label="Tanker"
                                    checked={checkedOptions.Tanker}
                                    onClick={() => handleCheckboxChangeTypeOfTrailer('Tanker')}
                                    onChange={() => handleCheckboxChangeTypeOfTrailer('Tanker')}
                                />
                                <CustomCheckBox
                                    id="checkbox9"
                                    label="Container"
                                    checked={checkedOptions.Container}
                                    onClick={() => handleCheckboxChangeTypeOfTrailer('Container')}
                                    onChange={() => handleCheckboxChangeTypeOfTrailer('Container')}
                                />
                                <CustomCheckBox
                                    id="checkbox10"
                                    label="Car Carrier"
                                    checked={checkedOptions.CarCarrier}
                                    onClick={() => handleCheckboxChangeTypeOfTrailer('CarCarrier')}
                                    onChange={() => handleCheckboxChangeTypeOfTrailer('CarCarrier')}
                                />
                                <CustomCheckBox
                                    id="checkbox11"
                                    label="Livestock"
                                    checked={checkedOptions.Livestock}
                                    onClick={() => handleCheckboxChangeTypeOfTrailer('Livestock')}
                                    onChange={() => handleCheckboxChangeTypeOfTrailer('Livestock')}
                                />
                                <CustomCheckBox
                                    id="checkbox12"
                                    label="Logging"
                                    checked={checkedOptions.Logging}
                                    onClick={() => handleCheckboxChangeTypeOfTrailer('Logging')}
                                    onChange={() => handleCheckboxChangeTypeOfTrailer('Logging')}
                                />
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
                            {value: 'pallet', label: 'Pallet'},
                            {value: 'crate', label: 'Crate'},
                            {value: 'box', label: 'Box'},
                            {value: 'drum', label: 'Drum'},
                            {value: 'bag', label: 'Bag'},
                            {value: 'bundle', label: 'Bundle'},
                            {value: 'roll', label: 'Roll'},
                            {value: 'container', label: 'Container'},
                            {value: 'loose', label: 'Loose'},
                            {value: 'Coils', label: 'Coils'},
                            {value: 'Cans', label: 'Cans'},
                            {value: 'Coils', label: 'Coils'},
                            {value: 'Cylinders', label: 'Cylinders'},
                            {value: 'Reels', label: 'Reels'},
                            {value: 'Rolls', label: 'Rolls'},
                            {value: 'Tube/Pipes', label: 'Tube/Pipes'},
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
                    <CustomCheckBox
                        id="checkbox33"
                        label="Liftgate Pickup"
                        checked={checkedOptions.LiftgatePickup}
                        onClick={() => handleCheckboxChangeLoadRequirements('LiftgatePickup')}
                        onChange={() => handleCheckboxChangeLoadRequirements('LiftgatePickup')}
                    />
                    <CustomCheckBox
                        id="checkbox34"
                        label="Pallet Jack assist"
                        checked={checkedOptions.PalletJackAssist}
                        onClick={() => handleCheckboxChangeLoadRequirements('PalletJackAssist')}
                        onChange={() => handleCheckboxChangeLoadRequirements('PalletJackAssist')}
                    />
                    <CustomCheckBox
                        id="checkbox35"
                        label="Blind shipment"
                        checked={checkedOptions.BlindShipment}
                        onClick={() => handleCheckboxChangeLoadRequirements('BlindShipment')}
                        onChange={() => handleCheckboxChangeLoadRequirements('BlindShipment')}
                    />
                    <CustomCheckBox
                        id="checkbox36"
                        label="Liftgate delivery"
                        checked={checkedOptions.LiftgateDelivery}
                        onClick={() => handleCheckboxChangeLoadRequirements('LiftgateDelivery')}
                        onChange={() => handleCheckboxChangeLoadRequirements('LiftgateDelivery')}
                    />
                    <CustomCheckBox
                        id="checkbox37"
                        label="Assembly-Disassembly"
                        checked={checkedOptions.AssemblyDisassembly}
                        onClick={() => handleCheckboxChangeLoadRequirements('AssemblyDisassembly')}
                        onChange={() => handleCheckboxChangeLoadRequirements('AssemblyDisassembly')}
                    />
                    <CustomCheckBox
                        id="checkbox38"
                        label="Appointment Requirement"
                        checked={checkedOptions.AppointmentRequirement}
                        onClick={() => handleCheckboxChangeLoadRequirements('AppointmentRequirement')}
                        onChange={() => handleCheckboxChangeLoadRequirements('AppointmentRequirement')}
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
                    <Button variant="default-non-responsive" onClick={handleCreateLoad}>Create Load</Button>
                </Grid>
            </CreateLoadContainer>
        </>

    );
};

export default FreightLoadContainer;