import React, {useState} from 'react';
import {ReactComponent as UserAvatarComponent} from "../../../assets/userAvatar2.svg";
import ClipLoader from 'react-spinners/ClipLoader';
import axios from "axios";
import Alert from "../../floating-window-success/Alert";
import FloatingWindowFailed from "../../floating-window-failed/FloatingWindowFailed";
import {BACKEND_URL} from "../../../constants/constants";
import RotatingLinesLoader from "../../rotating-lines/RotatingLinesLoader";
const DriverEntity = ({ driverFirstAndLastName, driverEmail, driverID, loadID }) => {

    const [isAssignSuccess, setIsAssignSuccess] = useState(false);
    const [isAssignFailed, setIsAssignFailed] = useState(false);
    const [isAssignLoading, setIsAssignLoading] = useState(false);

    const handleAssignLoad = async () => {
        setIsAssignLoading(true);

        try {
            const assignResponse = await axios.put(`${BACKEND_URL}/assign-load/${driverID}`, { loadID: loadID });
            const updateResponse = await axios.put(`${BACKEND_URL}/update-load-assigning/${loadID}`, { loadAssignedDriverID: driverID });
            if (assignResponse.status === 200 && updateResponse.status === 200) {
                setIsAssignSuccess(true);
            } else {
                setIsAssignFailed(true);
            }
        } catch (error) {
            console.error('Error assigning load to driver:', error);
            setIsAssignFailed(true);
        }
        setIsAssignLoading(false);
    };

    return (
        <>
            {isAssignSuccess && <Alert text="You succesfully asigned load for driver"  />}
            {isAssignFailed && <FloatingWindowFailed text="Something went wrong. Try again"  />}
            <div className="driver-container-entity">
                <div className="driver-entity-info">
                    <UserAvatarComponent/>
                    <section>
                        <h2>{driverFirstAndLastName}</h2>
                        <p>{driverEmail}</p>
                        <p>{driverID}</p>
                        <p>{loadID}</p>
                    </section>
                </div>
                <button className="assign-driver-button" onClick={handleAssignLoad}>
                    {isAssignLoading ?
                        <>
                            <RotatingLinesLoader title="Assigning..."/>
                        </>
                        : 'Assign'}
                </button>
            </div>
        </>

    );
};

export default DriverEntity;