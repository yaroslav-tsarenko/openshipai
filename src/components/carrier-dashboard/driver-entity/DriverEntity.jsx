import React, {useState} from 'react';
import {ReactComponent as UserAvatarComponent} from "../../../assets/images/userAvatar2.svg";
import axios from "axios";
import Alert from "../../floating-window-success/Alert";
import FloatingWindowFailed from "../../floating-window-failed/FloatingWindowFailed";
import {BACKEND_URL} from "../../../constants/constants";
import RotatingLinesLoader from "../../rotating-lines/RotatingLinesLoader";
import Button from "../../button/Button";
const DriverEntity = ({ driverFirstAndLastName, driverEmail, driverID, loadID }) => {

    const [isAssignSuccess, setIsAssignSuccess] = useState(false);
    const [isAssignFailed, setIsAssignFailed] = useState(false);
    const [isAssignLoading, setIsAssignLoading] = useState(false);
    const [message, setMessage] = useState(null)
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
            setMessage({
                status: 'success',
                text: 'Load assigned!',
                description: 'Driver will be notified'
            });
        } catch (error) {
            setMessage({
                status: 'error',
                text: 'Something went wrong!',
                description: 'Try again later'
            });
            console.error('Error assigning load to driver:', error);
        }
        setIsAssignLoading(false);
    };

    return (
        <>
            {message && <Alert status={message.status} text={message.text} description={message.description}/>}
            <div className="driver-container-entity">
                <div className="driver-entity-info">
                    <UserAvatarComponent/>
                    <section>
                        <h2>{driverFirstAndLastName}</h2>
                        <p>{driverEmail}</p>
                    </section>
                </div>
                <Button variant="apply-non-responsive"  onClick={handleAssignLoad}>
                    {isAssignLoading ?
                        <>
                            <RotatingLinesLoader title="Assigning..."/>
                        </>
                        : 'Assign'}
                </Button>
            </div>
        </>

    );
};

export default DriverEntity;