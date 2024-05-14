import React, {useState} from 'react';
import "./HeavyEquipmentLoadContainer.css";
import Switch from "../../switcher-component/Switch";
import axios from 'axios';
import {useParams} from "react-router-dom";
import FloatingWindowSuccess from "../../floating-window-success/FloatingWindowSuccess";
import FloatingWindowFailed from "../../floating-window-failed/FloatingWindowFailed";

const HeavyEquipmentContainer = ({pickupLocation, deliveryLocation, loadType}) => {
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
        <div className="heavy-load-container-wrapper">
            {isLoadCreatedSuccess && <FloatingWindowSuccess text="Load Created Successfully" />}
            {isLoadCreatedFailed && <FloatingWindowFailed text="Something went wrong. Try Again" />}
            <section>
                <h1>Heavy Equipment Load</h1>
                <p>Try to fill all necessary fields</p>
            </section>
            <div className="heavy-load-container-content">
                <div className="heavy-loads-container-inputs">
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
                            <label htmlFor="loadVehicleYear" className="google-style-input-label">Specify
                                Equipment</label>
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
                            <label htmlFor="loadVehicleMake" className="google-style-input-label">Weight</label>
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
                            <label htmlFor="loadVehicleModel" className="google-style-input-label">Dimensions</label>
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
                            <label htmlFor="loadVehicleModel" className="google-style-input-label">Urgency Level</label>
                        </div>
                    </section>
                </div>
                <div className="heavy-load-additional-options">
                    <div className="heavy-loads-container-switchers">
                        <Switch
                            isOn={isOperable}
                            handleToggle={() => {
                                setIsOperable(!isOperable);
                                setFormData({...formData, loadOperable: !isOperable});
                                console.log('Vehicle on Run:', !isOperable);
                            }}
                            label="Operational Status"
                            tip="Select whether the equipment can be driven onto the transport vehicle by itself or requires assistance."
                        />
                        <Switch
                            isOn={isConvertible}
                            handleToggle={() => {
                                setIsConvertible(!isConvertible);
                                setFormData({...formData, loadConvertible: !isConvertible});
                                console.log('Convertible:', !isConvertible);
                            }}
                            label="Assembly Required"
                            tip="Indicate if the equipment needs to be assembled on-site after delivery, which may affect unloading and setup times."
                        />
                        <Switch
                            isOn={isModified}
                            handleToggle={() => {
                                setIsModified(!isModified);
                                setFormData({...formData, loadModified: !isModified});
                                console.log('Modified:', !isModified);
                            }}
                            label="Handling Requirements"
                            tip="Specify any special handling needs such as climate control, vibration sensitivity, or tarp covering to ensure the equipment's integrity during transit."
                        />
                    </div>
                    <div className="heavy-load-optional-inputs">
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

export default HeavyEquipmentContainer;