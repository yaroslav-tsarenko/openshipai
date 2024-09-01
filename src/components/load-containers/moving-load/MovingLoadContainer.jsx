import React, {useState} from 'react';
import "./MovingLoadContainer.css";
import Switch from "../../switcher-component/Switch";
import axios from 'axios';
import {useParams} from "react-router-dom";
import Alert from "../../floating-window-success/Alert";
import FloatingWindowFailed from "../../floating-window-failed/FloatingWindowFailed";
import {BACKEND_URL} from "../../../constants/constants";

const MovingLoadContainer = ({pickupLocation, deliveryLocation, loadType}) => {
    const [isFirstSwitch, setIsFirstSwitch] = useState(false);
    const [isSecondSwitch, setIsSecondSwitch] = useState(false);
    const [isThirdSwitch, setIsThirdSwitch] = useState(false);
    const {shipperID} = useParams();
    const [isLoadCreatedSuccess, setIsLoadCreatedSuccess] = useState(false);
    const [isLoadCreatedFailed, setIsLoadCreatedFailed] = useState(false);
    const [selectValue, setSelectValue] = useState('');
    const handleSelectChange = (event) => {
        setSelectValue(event.target.value);
    };
    const [formData, setFormData] = useState({
        loadType: loadType,
        loadTitle: '',
        loadPickupLocation: pickupLocation,
        loadDeliveryLocation: deliveryLocation,
        loadDescription: '',
        loadWeight: '',
        loadLength: '',
        loadWidth: '',
        loadVehicleMake: '',
        loadVehicleYear: '',
        loadVehicleModel: '',
        loadNumberOfRooms: '',
        loadNumberOfPallets: '',
        loadNumberOfBoxes: '',
        loadHeight: '',
        loadQuantity: '',
        loadOperable: false,
        loadConvertible: false,
        loadModified: false,
        loadStorageRequired: false,
        loadPackingRequired: false,
        loadLogisticServiceRequired: false,
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
        <div className="moving-load-container-wrapper">
            {isLoadCreatedSuccess && <Alert text="Load Created Successfully" />}
            {isLoadCreatedFailed && <FloatingWindowFailed text="Something went wrong. Try Again" />}
            <section>
                <h1>Moving Load</h1>
                <p>Try to fill all necessary fields</p>
            </section>
            <div className="moving-load-container-content">
                <div className="moving-loads-container-inputs">
                    <section>
                        <div className="google-input-wrapper">
                            <input
                                type="text"
                                id="loadTitle"
                                autoComplete="off"
                                className="google-style-input"
                                required
                                onChange={handleChange('loadTitle')}
                                value={formData.loadTitle}
                            />
                            <label htmlFor="loadTitle" className="google-style-input-label">Load Title</label>
                        </div>
                    </section>
                    <section>
                        <div className="google-input-wrapper">
                            <input
                                type="text"
                                id="loadVehicleYear"
                                autoComplete="off"
                                className="google-style-input"
                                required
                                onChange={handleChange('loadVehicleYear')}
                                value={formData.loadVehicleYear}
                            />
                            <label htmlFor="loadVehicleYear" className="google-style-input-label">Specify Moving</label>
                        </div>
                    </section>
                    <section>
                        <div className="google-input-wrapper">
                            <input
                                type="text"
                                id="loadNumberOfRooms"
                                autoComplete="off"
                                className="google-style-input"
                                required
                                onChange={handleChange('loadNumberOfRooms')}
                                value={formData.loadNumberOfRooms}
                            />
                            <label htmlFor="loadNumberOfRooms" className="google-style-input-label">Number of
                                Rooms</label>
                        </div>
                    </section>
                    <section>
                        <div className="google-input-wrapper">
                            <input
                                type="text"
                                id="loadNumberOfPallets"
                                autoComplete="off"
                                className="google-style-input"
                                required
                                onChange={handleChange('loadNumberOfPallets')}
                                value={formData.loadNumberOfPallets}
                            />
                            <label htmlFor="loadNumberOfPallets" className="google-style-input-label">Number of
                                Pallets</label>
                        </div>
                    </section>
                    <section>
                        <div className="google-input-wrapper">
                            <input
                                type="text"
                                id="loadNumberOfBoxes"
                                autoComplete="off"
                                className="google-style-input"
                                required
                                onChange={handleChange('loadNumberOfBoxes')}
                                value={formData.loadNumberOfBoxes}
                            />
                            <label htmlFor="loadNumberOfBoxes" className="google-style-input-label">Number of
                                Boxes</label>
                        </div>
                    </section>
                </div>
                <div className="moving-load-additional-options">
                    <div className="moving-loads-container-switchers">
                        <Switch
                            isOn={isSecondSwitch}
                            handleToggle={() => {
                                setIsSecondSwitch(!isSecondSwitch);
                                setFormData({...formData, loadConvertible: !isSecondSwitch});
                                console.log('Logistic Service Required:', !isSecondSwitch);
                            }}
                            label="Logistic Service Required"
                            tip="Select this option if you require specialized logistics services such as route optimization, cargo consolidation, or expedited delivery"
                        />
                        <Switch
                            isOn={isFirstSwitch}
                            handleToggle={() => {
                                setIsFirstSwitch(!isFirstSwitch);
                                setFormData({...formData, loadConvertible: !isFirstSwitch});
                                console.log('Packing service required:', !isFirstSwitch);
                            }}
                            label="Packing service required"
                            tip="Choose this if you need professional packing services to ensure your items are safely prepared for transit. Includes wrapping, boxing, and securing of goods."
                        />
                        <Switch
                            isOn={isThirdSwitch}
                            handleToggle={() => {
                                setIsThirdSwitch(!isThirdSwitch);
                                setFormData({...formData, loadModified: !isThirdSwitch});
                                console.log('Storage needs if any:', !isThirdSwitch);
                            }}
                            label="Storage needs if any"
                            tip="Indicate whether you need storage for your items before or after transportation. Specify if you require short-term or long-term storage solutions."
                        />
                    </div>
                    <div className="moving-load-optional-inputs">
                        <h2>You can add personal note to this load</h2>
                        <p>These can be your preferences, questions or requests</p>
                        <div className="google-input-wrapper">
                            <textarea
                                id="loadDescription"
                                autoComplete="off"
                                className="google-style-input"
                                required
                                style={{height: '100px', maxHeight: '200px'}}
                                onChange={handleChange('loadDescription')}
                                value={formData.loadDescription}
                            />
                            <label htmlFor="loadDescription" className="google-style-input-label">Personal
                                Description</label>
                        </div>
                    </div>
                </div>

                <button className="creating-load-button" onClick={handleCreateLoad}>Create Load</button>
            </div>
        </div>
    );
};

export default MovingLoadContainer;