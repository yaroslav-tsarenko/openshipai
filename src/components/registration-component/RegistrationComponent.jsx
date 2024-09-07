import React, {useState, useEffect} from 'react';
import Popup from "../popup/Popup";
import styles from "./RegistrationComponent.module.scss";
import Grid from "../grid-two-columns/Grid";
import TextInput from "../text-input/TextInput";
import Button from "../button/Button";
import {ReactComponent as TimesIcon} from "../../assets/fa-times-icon-list.svg";
import {ReactComponent as CheckIcon} from "../../assets/fa-check-icon-list.svg";
import {BACKEND_URL} from "../../constants/constants";
import RotatingLinesLoader from "../rotating-lines/RotatingLinesLoader";

const RegistrationComponent = () => {
    const [showRegistrationPopup, setShowRegistrationPopup] = useState(true);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [completionStatus, setCompletionStatus] = useState({
        userShipperName: false,
        userShipperSecondName: false,
        userShipperPhoneNumber: false,
        userShipperEmail: false,
        userShipperPassword: false,
        userShipperPasswordConfirmation: false
    });

    const [registrationData, setRegistrationData] = useState({
        userShipperName: '',
        userShipperSecondName: '',
        userShipperPhoneNumber: '',
        userShipperEmail: '',
        userShipperPassword: '',
        userShipperPasswordConfirmation: '',
        userShipperID: Math.random().toString(20).substring(2, 20) + Math.random().toString(20).substring(2, 20),
    });

    const handleRegistrationSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${BACKEND_URL}/register-shipper`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registrationData)
            });

            if (response.ok) {
                setTimeout(() => {
                    setShowRegistrationPopup(false);
                }, 3000)
            } else {
                console.error('Failed to create shipper');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10,15}$/; // Phone number with 10 to 15 digits

    const checkFormValidity = (newData) => {
        const {
            userShipperName,
            userShipperSecondName,
            userShipperPhoneNumber,
            userShipperEmail,
            userShipperPassword,
            userShipperPasswordConfirmation
        } = newData;

        const isEmailValid = emailPattern.test(userShipperEmail);
        const isPhoneValid = phonePattern.test(userShipperPhoneNumber);
        const isPasswordMatching = userShipperPassword === userShipperPasswordConfirmation;

        const isValid = userShipperName && userShipperSecondName && isPhoneValid && isEmailValid && userShipperPassword && isPasswordMatching;
        setIsFormValid(isValid);
    };

    const handleRegistrationChange = (input) => (e) => {
        const value = e.target.value;
        const updatedData = {...registrationData, [input]: value};

        setRegistrationData(updatedData);

        setCompletionStatus((prevStatus) => ({
            ...prevStatus,
            [input]: !!value && (
                (input === 'userShipperEmail' && emailPattern.test(value)) ||
                (input === 'userShipperPhoneNumber' && phonePattern.test(value)) ||
                (input === 'userShipperPasswordConfirmation' && updatedData.userShipperPassword === value) ||
                input !== 'userShipperEmail' && input !== 'userShipperPhoneNumber' && input !== 'userShipperPasswordConfirmation'
            )
        }));

        checkFormValidity(updatedData);
    };


    const getStatusMessage = (key) => {
        switch (key) {
            case 'userShipperName':
                return completionStatus[key] ? 'Name completed' : 'Enter Name';
            case 'userShipperSecondName':
                return completionStatus[key] ? 'Second Name completed' : 'Enter Second Name';
            case 'userShipperPhoneNumber':
                return completionStatus[key] ? 'Phone Number completed' : 'Enter a valid Phone Number';
            case 'userShipperEmail':
                return completionStatus[key] ? 'Email completed' : 'Enter a valid Email';
            case 'userShipperPassword':
                return completionStatus[key] ? 'Password completed' : 'Enter Password';
            case 'userShipperPasswordConfirmation':
                return completionStatus[key] ? 'Password Confirmation completed' : 'Passwords do not match';
            default:
                return '';
        }
    };

    return (
        <>
            {showRegistrationPopup && (
                <Popup title="Almost Done!"
                       footerText="After successful registration you will be able to continue creating load. Do not try to reload page, your data will not be saved :)"
                       abilityToClose={true}>
                    <div className={styles.popupContent}>
                        <h2>
                            Just complete the registration and you will be able to continue creating load. Created Load
                            will be saved into your profile!
                        </h2>
                        <Grid columns="2, 2fr">
                            <TextInput
                                type="text"
                                id="name"
                                autoComplete="off"
                                onChange={handleRegistrationChange('userShipperName')}
                                value={registrationData.userShipperName}
                                required
                                label="Name"
                            />
                            <TextInput
                                type="text"
                                id="surname"
                                autoComplete="off"
                                onChange={handleRegistrationChange('userShipperSecondName')}
                                value={registrationData.userShipperSecondName}
                                required
                                label="Last Name"
                            />
                        </Grid>
                        <Grid columns="2, 2fr">
                            <TextInput
                                type="password"
                                id="password"
                                autoComplete="off"
                                onChange={handleRegistrationChange('userShipperPassword')}
                                value={registrationData.userShipperPassword}
                                required
                                label="Password"
                            />
                            <TextInput
                                type="password"
                                id="confirmPassword"
                                autoComplete="off"
                                onChange={handleRegistrationChange('userShipperPasswordConfirmation')}
                                value={registrationData.userShipperPasswordConfirmation}
                                required
                                label="Confirm Password"
                            />
                        </Grid>

                        <TextInput
                            type="email"
                            id="email"
                            autoComplete="off"
                            onChange={handleRegistrationChange('userShipperEmail')}
                            value={registrationData.userShipperEmail}
                            required
                            label="Email"
                        />
                        <TextInput
                            type="phone-number"
                            id="phoneNumber"
                            autoComplete="off"
                            onChange={handleRegistrationChange('userShipperPhoneNumber')}
                            value={registrationData.userShipperPhoneNumber}
                            required
                            label="Phone Number"
                        />
                        <Button variant="default" onClick={handleRegistrationSubmit} disabled={!isFormValid}>
                            {isLoading ?
                                <RotatingLinesLoader title="Processing..."/>
                                :
                                "Register"}
                        </Button>
                    </div>
                    <div className={styles.completionStatus}>
                        {Object.keys(completionStatus).map((key) => (
                            <div key={key} className={completionStatus[key] ? styles.completed : styles.uncompleted}>
                                {completionStatus[key] ? <CheckIcon/> : <TimesIcon/>}
                                <span>{getStatusMessage(key)}</span>
                            </div>
                        ))}
                    </div>
                </Popup>
            )}
        </>
    );
};

export default RegistrationComponent;
