import React, {useState} from 'react';
import "./VehicleLoadContainer.css";
import Switch from "../../switcher-component/Switch";
import axios from 'axios';
import {useParams} from "react-router-dom";
import FloatingWindowSuccess from "../../floating-window-success/FloatingWindowSuccess";
import FloatingWindowFailed from "../../floating-window-failed/FloatingWindowFailed";

const VehicleLoadContainer = ({pickupLocation, deliveryLocation, loadType}) => {
    const [isOperable, setIsOperable] = useState(false);
    const [isConvertible, setIsConvertible] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const {shipperID} = useParams();
    const [isLoadCreatedSuccess, setIsLoadCreatedSuccess] = useState(false);
    const [isLoadCreatedFailed, setIsLoadCreatedFailed] = useState(false);
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
        loadHeight: '',
        loadQuantity: '',
        loadOperable: false,
        loadConvertible: false,
        loadModified: false,
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
            const response = await axios.post('https://jarvis-ai-logistic-db-server.onrender.com/save-load-data', formData);
            console.log(response.data);
            setIsLoadCreatedSuccess(true);
        } catch (error) {
            console.error(error);
            setIsLoadCreatedFailed(true);
        }
    };

    return (
        <div className="vehicle-load-container-wrapper">
            {isLoadCreatedSuccess && <FloatingWindowSuccess text="Load Created Successfully" />}
            {isLoadCreatedFailed && <FloatingWindowFailed text="Something went wrong. Try Again" />}
            <section>
                <h1>Vehicle Load</h1>
                <p>Try to fill all necessary fields</p>
            </section>
            <div className="vehicle-load-container-content">
                <div className="vehicle-loads-container-inputs">
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
                            <label htmlFor="loadVehicleYear" className="google-style-input-label">Vehicle year</label>
                        </div>
                    </section>
                    <section>
                        <div className="google-input-wrapper">
                            <input
                                type="text"
                                id="loadVehicleMake"
                                autoComplete="off"
                                className="google-style-input"
                                required
                                onChange={handleChange('loadVehicleMake')}
                                value={formData.loadVehicleMake}
                            />
                            <label htmlFor="loadVehicleMake" className="google-style-input-label">Vehicle Make</label>
                        </div>
                    </section>
                    <section>
                        <div className="google-input-wrapper">
                            <input
                                type="text"
                                id="loadVehicleModel"
                                autoComplete="off"
                                className="google-style-input"
                                required
                                onChange={handleChange('loadVehicleModel')}
                                value={formData.loadVehicleModel}
                            />
                            <label htmlFor="loadVehicleModel" className="google-style-input-label">Vehicle Model</label>
                        </div>
                    </section>
                </div>
                <div className="vehicle-load-additional-options">
                    <div className="vehicle-loads-container-switchers">
                        <Switch
                            isOn={isOperable}
                            handleToggle={() => {
                                setIsOperable(!isOperable);
                                setFormData({...formData, loadOperable: !isOperable});
                                console.log('Vehicle on Run:', !isOperable);
                            }}
                            label="Vehicle on Run"
                            tip="Is the vehicle currently operational or in use?"
                        />
                        <Switch
                            isOn={isConvertible}
                            handleToggle={() => {
                                setIsConvertible(!isConvertible);
                                setFormData({...formData, loadConvertible: !isConvertible});
                                console.log('Convertible:', !isConvertible);
                            }}
                            label="Convertible"
                            tip="Is the vehicle a convertible, with a roof that retracts or removes?"
                        />
                        <Switch
                            isOn={isModified}
                            handleToggle={() => {
                                setIsModified(!isModified);
                                setFormData({...formData, loadModified: !isModified});
                                console.log('Modified:', !isModified);
                            }}
                            label="Modified"
                            tip="Has the vehicle been altered from its original factory specifications?"
                        />
                    </div>
                    <div className="vehicle-load-optional-inputs">
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
                            <label htmlFor="loadDescription" className="google-style-input-label">Personal Description</label>
                        </div>
                    </div>
                </div>
                <button className="creating-load-button" onClick={handleCreateLoad}>Create Load</button>
            </div>
        </div>
    );
};

export default VehicleLoadContainer;