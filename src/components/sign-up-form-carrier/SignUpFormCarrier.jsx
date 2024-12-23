import React, { useState } from 'react';
import axios from 'axios';
import styles from "./SignUpFormCarrier.module.scss";
import { ReactComponent as LogoBlue } from "../../assets/images/logo-blue.svg";
import CustomCheckBox from '../custom-checkbox/CustomCheckBox';
import TextInput from '../text-input/TextInput';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import Typewriter from "typewriter-effect";
import Grid from "../grid-two-columns/Grid";
import { BACKEND_URL } from "../../constants/constants";
import Alert from "../floating-window-success/Alert";
import RotatingLinesLoader from "../rotating-lines/RotatingLinesLoader";
import {Link} from "react-router-dom";

const SignUpFormCarrier = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [message, setMessage] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        carrierUSDotNumber: '',
        carrierDotNumber: '',
        intrastateCarrier: '',
        categories: [],
        equipment: [],
        carrierContactCompanyName: '',
        carrierContactAddress: '',
        carrierContactSuiteOffice: '',
        carrierContactCity: '',
        carrierContactStateProvince: '',
        carrierContactZip: '',
        carrierContactCountry: '',
        carrierPayToCompanyName: '',
        carrierPayToAddress: '',
        carrierPayToSuiteOffice: '',
        carrierPayToCity: '',
        carrierPayToStateProvince: '',
        carrierPayToZipPostal: '',
        carrierPayToCountry: '',
        carrierDunsNumber: '',
        carrierCorporateNameLastName: '',
        carrierCorporatePhoneNumber: '',
        carrierCorporateTitle: '',
        carrierCorporateSellPhone: '',
        carrierSalesContactNameLastName: '',
        carrierSalesPhoneNumber: '',
        carrierSalesTitle: '',
        carrierSalesSellPhone: '',
        carrierSalesFax: '',
        carrierDispatchNameLastName: '',
        carrierDispatchPhoneNumber: '',
        carrierDispatchTitle: '',
        carrierDispatchSellPhone: '',
        carrierDispatchFax: '',
        brokerCarrierAgreement: '',
        carrierInsuranceAgencyCompanyName: '',
        carrierInsuranceAgencyPhoneNumber: '',
        carrierInsuranceAgencyFax: '',
        carrierInsuranceAgencyEmail: '',
        carrierInsurancePolicyNumber: '',
        carrierRequestForTaxPayerName: '',
        carrierRequestForTaxPayerBusinessName: '',
        carrierRequestForTaxPayerAddress: '',
        carrierRequestForTaxPayerCityStateZip: '',
        carrierRequestForTaxPayerSocialSecurityNumber: '',
        carrierRequestForTaxPayerEmployerIdentificationNumber: '',
        carrierAccountName: '',
        carrierAccountLastName: '',
        carrierAccountAccountEmail: '',
        carrierAccountPassword: '',
        carrierAvatar: "uploads/avatar-default.svg",
        role: 'carrier',
        carrierID: Math.random().toString(36).substring(2, 36) + Math.random().toString(36).substring(2, 36),
    });
    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };
    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleCheckboxChange = (field, value) => {
        setFormData(prevState => {
            const newArray = prevState[field].includes(value)
                ? prevState[field].filter(item => item !== value)
                : [...prevState[field], value];
            console.log(`Updated ${field}:`, newArray);
            return { ...prevState, [field]: newArray };
        });
    };


    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const response = await axios.post(`${BACKEND_URL}/sign-up-carrier-account`, formData);
            console.log(response.data);
            setMessage({
                status: 'success',
                text: 'Login successful!',
                description: 'Redirecting to your dashboard...'
            });
            setTimeout(() => {
                navigate('/sign-in');
            }, 1500);
        } catch (error) {
            console.error('Error submitting form:', error);
            setMessage({
                status: 'error',
                text: 'Something went wrong!',
                description: 'Try again later.'
            });
        }
        setIsLoading(false);
    };

    return (
        <>
            {message && <Alert status={message.status} text={message.text} description={message.description}/>}
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <Link to="/">
                        <LogoBlue className={styles.logo}/>
                    </Link>
                    <h1>Welcome, Carrier!</h1>
                    <p><span>Truck to earn</span> - Bid to earn</p>
                    <div className={styles.form}>
                        {currentStep === 1 && (
                            <div className={styles.formContent}>
                                <h2>Select Coverage Area</h2>
                                <CustomCheckBox
                                    label="International"
                                    checked={formData.intrastateCarrier === 'International'}
                                    onChange={() => handleCheckboxChange('intrastateCarrier', 'International')}
                                />
                                <CustomCheckBox
                                    label="Florida only"
                                    checked={formData.intrastateCarrier === 'Florida only'}
                                    onChange={() => handleCheckboxChange('intrastateCarrier', 'Florida only')}
                                />
                                <CustomCheckBox
                                    label="United States"
                                    checked={formData.intrastateCarrier === 'United States'}
                                    onChange={() => handleCheckboxChange('intrastateCarrier', 'United States')}
                                />
                            </div>
                        )}
                        {currentStep === 2 && (
                            <div className={styles.formContent}>
                                <h2>What will you be transporting</h2>
                                <CustomCheckBox
                                    label="All Categories"
                                    checked={formData.categories.includes('All Categories')}
                                    onChange={() => handleCheckboxChange('categories', 'All Categories')}
                                />
                                <CustomCheckBox
                                    label="Vehicles"
                                    checked={formData.categories.includes('Vehicles')}
                                    onChange={() => handleCheckboxChange('categories', 'Vehicles')}
                                />
                                <CustomCheckBox
                                    label="Household Goods"
                                    checked={formData.categories.includes('Household Goods')}
                                    onChange={() => handleCheckboxChange('categories', 'Household Goods')}
                                />
                                <CustomCheckBox
                                    label="Household & Office Moves"
                                    checked={formData.categories.includes('Household & Office Moves')}
                                    onChange={() => handleCheckboxChange('categories', 'Household & Office Moves')}
                                />
                                <CustomCheckBox
                                    label="Boats"
                                    checked={formData.categories.includes('Boats')}
                                    onChange={() => handleCheckboxChange('categories', 'Boats')}
                                />
                                <CustomCheckBox
                                    label="Heavy Equipment"
                                    checked={formData.categories.includes('Heavy Equipment')}
                                    onChange={() => handleCheckboxChange('categories', 'Heavy Equipment')}
                                />
                                <CustomCheckBox
                                    label="Less than Truckload"
                                    checked={formData.categories.includes('Less than Truckload')}
                                    onChange={() => handleCheckboxChange('categories', 'Less than Truckload')}
                                />
                                <CustomCheckBox
                                    label="FTL Freight"
                                    checked={formData.categories.includes('FTL Freight')}
                                    onChange={() => handleCheckboxChange('categories', 'FTL Freight')}
                                />
                                <CustomCheckBox
                                    label="Motorcycles & Power Sports"
                                    checked={formData.categories.includes('Motorcycles & Power Sports')}
                                    onChange={() => handleCheckboxChange('categories', 'Motorcycles & Power Sports')}
                                />
                                <CustomCheckBox
                                    label="Other"
                                    checked={formData.categories.includes('Other')}
                                    onChange={() => handleCheckboxChange('categories', 'Other')}
                                />
                            </div>
                        )}
                        {currentStep === 3 && (
                            <div className={styles.formContent}>
                                <h2>What equipment will you use?</h2>
                                <CustomCheckBox
                                    label="All equipment types"
                                    checked={formData.equipment.includes('All equipment types')}
                                    onChange={() => handleCheckboxChange('equipment', 'All equipment types')}
                                />
                                <CustomCheckBox
                                    label="Powerdack"
                                    checked={formData.equipment.includes('Powerdack')}
                                    onChange={() => handleCheckboxChange('equipment', 'Powerdack')}
                                />
                                <CustomCheckBox
                                    label="Lowboy"
                                    checked={formData.equipment.includes('Lowboy')}
                                    onChange={() => handleCheckboxChange('equipment', 'Lowboy')}
                                />
                                <CustomCheckBox
                                    label="Dry Van"
                                    checked={formData.equipment.includes('Dry Van')}
                                    onChange={() => handleCheckboxChange('equipment', 'Dry Van')}
                                />
                                <CustomCheckBox
                                    label="Flatbed"
                                    checked={formData.equipment.includes('Flatbed')}
                                    onChange={() => handleCheckboxChange('equipment', 'Flatbed')}
                                />
                                <CustomCheckBox
                                    label="Step Deck"
                                    checked={formData.equipment.includes('Step Deck')}
                                    onChange={() => handleCheckboxChange('equipment', 'Step Deck')}
                                />
                                <CustomCheckBox
                                    label="Power Only"
                                    checked={formData.equipment.includes('Power Only')}
                                    onChange={() => handleCheckboxChange('equipment', 'Power Only')}
                                />
                                <CustomCheckBox
                                    label="Reefer"
                                    checked={formData.equipment.includes('Reefer')}
                                    onChange={() => handleCheckboxChange('equipment', 'Reefer')}
                                />
                                <CustomCheckBox
                                    label="Air Ride Van"
                                    checked={formData.equipment.includes('Air Ride Van')}
                                    onChange={() => handleCheckboxChange('equipment', 'Air Ride Van')}
                                />
                                <CustomCheckBox
                                    label="Auto Carrier"
                                    checked={formData.equipment.includes('Auto Carrier')}
                                    onChange={() => handleCheckboxChange('equipment', 'Auto Carrier')}
                                />
                                <CustomCheckBox
                                    label="Dump"
                                    checked={formData.equipment.includes('Dump')}
                                    onChange={() => handleCheckboxChange('equipment', 'Dump')}
                                />
                                <CustomCheckBox
                                    label="Flatbed Double"
                                    checked={formData.equipment.includes('Flatbed Double')}
                                    onChange={() => handleCheckboxChange('equipment', 'Flatbed Double')}
                                />
                                <CustomCheckBox
                                    label="Tanker"
                                    checked={formData.equipment.includes('Tanker')}
                                    onChange={() => handleCheckboxChange('equipment', 'Tanker')}
                                />
                                <CustomCheckBox
                                    label="Van Double"
                                    checked={formData.equipment.includes('Van Double')}
                                    onChange={() => handleCheckboxChange('equipment', 'Van Double')}
                                />
                                <CustomCheckBox
                                    label="Other"
                                    checked={formData.equipment.includes('Other')}
                                    onChange={() => handleCheckboxChange('equipment', 'Other')}
                                />
                            </div>
                        )}
                        {currentStep === 4 && (
                            <div>
                                <h2>Enter US DOT Number</h2>
                                <TextInput
                                    type="text"
                                    id="carrierUSDotNumber"
                                    value={formData.carrierUSDotNumber}
                                    onChange={(e) => setFormData({...formData, carrierUSDotNumber: e.target.value})}
                                    label="US DOT Number"
                                />
                                <TextInput
                                    type="text"
                                    id="carrierDotNumber"
                                    value={formData.carrierDotNumber}
                                    onChange={(e) => setFormData({...formData, carrierDotNumber: e.target.value})}
                                    label="DOT Number"
                                />
                                <TextInput
                                    type="text"
                                    id="carrierContactCompanyName"
                                    value={formData.carrierContactCompanyName}
                                    onChange={(e) => setFormData({...formData, carrierContactCompanyName: e.target.value})}
                                    label="Company Name"
                                />
                            </div>
                        )}

                        {currentStep === 5 && (
                            <Grid columns="2, 1fr">
                                <TextInput
                                    type="email"
                                    id="carrierAccountAccountEmail"
                                    value={formData.carrierAccountAccountEmail}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        carrierAccountAccountEmail: e.target.value
                                    })}
                                    label="Email"
                                />
                                <TextInput
                                    type="text"
                                    id="carrierAccountName"
                                    value={formData.carrierAccountName}
                                    onChange={(e) => setFormData({...formData, carrierAccountName: e.target.value})}
                                    label="First Name"
                                />
                                <TextInput
                                    type="text"
                                    id="carrierAccountLastName"
                                    value={formData.carrierAccountLastName}
                                    onChange={(e) => setFormData({...formData, carrierAccountLastName: e.target.value})}
                                    label="Last Name"
                                />
                                <TextInput
                                    type="password"
                                    id="carrierAccountPassword"
                                    value={formData.carrierAccountPassword}
                                    onChange={(e) => setFormData({...formData, carrierAccountPassword: e.target.value})}
                                    label="Password"
                                />
                                <TextInput
                                    type="phone-number"
                                    id="carrierCorporatePhoneNumber"
                                    value={formData.carrierCorporatePhoneNumber}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        carrierCorporatePhoneNumber: e.target.value
                                    })}
                                    label="Phone Number"
                                />
                            </Grid>
                        )}

                        <div className={styles.buttonContainer}>
                            {currentStep > 1 && (
                                <Button variant="darkGrey-100" buttonText="Previous" onClick={handlePrevious}/>
                            )}
                            {currentStep < 5 ? (
                                <Button variant="default-100" buttonText="Next" onClick={handleNext}/>
                            ) : (
                                <Button variant="apply-non-responsive" onClick={handleSubmit}>
                                    {isLoading ?
                                        <>
                                            <RotatingLinesLoader title="Processing..."/>
                                        </>
                                        :
                                        "Register"}
                                </Button>
                            )}
                        </div>
                        <div className={styles.question}>
                            <p>Already have an account? <span>
                            <Link to="/sign-in">Sign in now</Link>
                            </span></p>
                        </div>
                    </div>
                </div>
                <div className="right-side-login">
                    <section className="right-side-login-section">
                        <h1 className="right-side-login-side-title">
                        WELCOME CARRIER
                        </h1>
                        <p className="right-side-login-side-description">
                            <Typewriter
                                options={{
                                    strings: ["We appreciate see you", "Hope you will be satisfied"],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </p>
                    </section>
                </div>
            </div>

        </>
    );
};

export default SignUpFormCarrier;