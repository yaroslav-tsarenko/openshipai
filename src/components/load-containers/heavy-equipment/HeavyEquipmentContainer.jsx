import React, {useRef, useState} from 'react';
import "./HeavyEquipmentLoadContainer.module.scss";
import Switch from "../../switcher-component/Switch";
import axios from 'axios';
import {useParams} from "react-router-dom";
import Alert from "../../floating-window-success/Alert";
import {ClipLoader} from "react-spinners";
import {BACKEND_URL} from "../../../constants/constants";
import CreateLoadContainer from "../../create-load-container/CreateLoadContainer";
import TextInput from "../../text-input/TextInput";
import FormSeparator from "../../form-separator/FormSeparator";
import Grid from "../../grid-two-columns/Grid";
import Button from "../../button/Button";

const HeavyEquipmentLoadContainer = ({
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
    const fileInputRef = useRef();
    const [isOperable, setIsOperable] = useState(false);
    const [isConvertible, setIsConvertible] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const {shipperID} = useParams();
    const [isOpenTrailer, setIsOpenTrailer] = useState(false);
    const [isEnclosedTrailer, setIsEnclosedTrailer] = useState(false);
    const [isBoth, setIsBoth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadCreatedSuccess, setIsLoadCreatedSuccess] = useState(false);
    const [isLoadCreatedFailed, setIsLoadCreatedFailed] = useState(false);
    const [formData, setFormData] = useState({
        loadType: loadType,
        loadSubType: loadSubType,
        loadSpecifiedItem: '',
        loadTitle: '',
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
    });

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
            {isLoadCreatedSuccess &&
                <Alert status="success" text="Success" description="You have been succesfully created load"/>}
            {isLoadCreatedFailed &&
                <Alert status="error" text="Error" description="There is issue with creating load. Try again later"/>}

            <CreateLoadContainer title="Heavy Load" step={4} subTitle="Try to fill all necessary fields">
                <TextInput
                    type="text"
                    id="loadTitle"
                    value={formData.loadTitle}
                    onChange={handleChange('loadTitle')}
                    label="Load Title"
                />
                <FormSeparator title="Load credentials" subTitle="These can be your preferences"/>
                <Grid columns="2, 2fr">
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
                    <TextInput
                        type="text"
                        id="loadQuantity"
                        value={formData.loadQuantity}
                        onChange={handleChange('loadQuantity')}
                        label="Load Quantity"
                    />
                </Grid>
                <FormSeparator title="Another Info" subTitle="These can be your preferences"/>
                <Grid columns="2, 2fr">
                    <TextInput
                        type="select"
                        id="equipmentType"
                        value={formData.loadEquipmentType}
                        onChange={handleChange('loadEquipmentType')}
                        label="Equipment Type"
                        options={[
                            {value: 'option1', label: 'Option 1'},
                            {value: 'option1', label: 'Option 2'},
                        ]}
                    />
                    <TextInput
                        type="select"
                        id="loadEquipmentCategory"
                        value={formData.loadEquipmentCategory}
                        onChange={handleChange('loadEquipmentCategory')}
                        label="Equipment Category"
                        options={[
                            {value: 'option1', label: 'Option 1'},
                            {value: 'option1', label: 'Option 2'},
                        ]}
                    />
                </Grid>
                <FormSeparator title="Choose type of trailer"
                               subTitle="These can be your preferences, questions or requests"/>
                <Grid columns="3, 3fr">
                    <Switch
                        handleToggle={() => {
                            setIsOperable(!isOperable);
                            setFormData({...formData, loadOperable: !isOperable});
                            console.log('Vehicle on Run:', !isOperable);
                        }}
                        label="Open Trailer (Cost loss)"
                        tip="Vehicle is open to the trailer?"
                    />
                    <Switch
                        handleToggle={() => {
                            setIsOperable(!isOperable);
                            setFormData({...formData, loadOperable: !isOperable});
                            console.log('Vehicle on Run:', !isOperable);
                        }}
                        label="Enclosed Trailer (Costs More)"
                        tip="Vehicle protected"
                    />
                    <Switch
                        handleToggle={() => {
                            setIsOperable(!isOperable);
                            setFormData({...formData, loadOperable: !isOperable});
                            console.log('Vehicle on Run:', !isOperable);
                        }}
                        label="Both"
                        tip="You can opt for open or enclosed trailer"
                    />
                </Grid>
                <FormSeparator title="For better experience attach files"
                               subTitle="AI can better analyze your preferences"/>
                <Grid columns="2, 2fr">
                    <Button buttonText="Make Photo" variant="attach-photo"
                            onClick={() => fileInputRef.current.click()}/>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{display: 'none'}}
                        onChange={handleFileChangeForButton}
                        multiple
                    />
                    <Button buttonText="Attach Files" variant="attach-file" onClick={handleButtonClick}/>
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
                <Grid columns="2, 2fr">
                    <Button buttonText="Go Back" variant="neutral" onClick={goBack}/>
                    <Button variant="default" onClick={handleCreateLoad}>
                        {isLoading ? <ClipLoader size={15} color={"#ffffff"}/> : "Create Load"}
                    </Button>
                </Grid>
            </CreateLoadContainer>
        </>

    );
};

export default HeavyEquipmentLoadContainer;