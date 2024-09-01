import React, {useState} from 'react'
import {Link} from "react-router-dom";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import "./SignUpFormCarrier.css";
import Typewriter from "typewriter-effect";
import {
    ReactComponent as ProgressBar1
} from "../../assets/progres-bar-1-page.svg";
import {
    ReactComponent as ProgressBar2
} from "../../assets/progres-bar-2-page.svg";
import {
    ReactComponent as ProgressBar3
} from "../../assets/progres-bar-3-page.svg";
import {
    ReactComponent as ProgressBar4
} from "../../assets/progres-bar-4-page.svg";
import {
    ReactComponent as ProgressBar5
} from "../../assets/progres-bar-5-page.svg";
import {
    ReactComponent as ProgressBar6
} from "../../assets/progres-bar-6-page.svg";
import {
    ReactComponent as ProgressBar7
} from "../../assets/progres-bar-7-page.svg";
import {
    ReactComponent as ProgressBar8
} from "../../assets/progres-bar-8-page.svg";
import {
    ReactComponent as ProgressBar9
} from "../../assets/progres-bar-9-page.svg";
import {
    ReactComponent as ProgressBar10
} from "../../assets/progres-bar-10-page.svg";
import Alert from "../floating-window-success/Alert";
import {BACKEND_URL} from "../../constants/constants";
import {CircularProgress} from "@mui/material";

function SignCarrierUpForm() {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(50);
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({
        carrierUSDotNumber: '',
        carrierDotNumber: '',
        intrastateCarrier: '',
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
        role: 'carrier',
        carrierID: Math.random().toString(36).substring(2, 36) + Math.random().toString(36).substring(2, 36),
    });

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleChange = (input) => (e) => {
        setFormData({...formData, [input]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post(`${BACKEND_URL}/save-carrier-data`, formData)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    setTimeout(() => {
                        setMessage("Account created successfully!");
                        setIsLoading(false);
                        setTimeout(() => {
                            navigate(`/sign-in`);
                        }, 1500);
                    }, 500);
                }
            })
            .catch(error => {
                console.log('Error:', error);
                setIsLoading(false);
            });
    };

    switch (step) {
        case 1:
            return (
                <div className="sign-in-wrapper">
                    <div className="carrier-sign-up-left-side-container">
                        <div className="carrier-sign-up-left-side-content">
                            <h2 className="h2-title-sign-up-carrier">Carrier Prequalification</h2>
                            <h3 className="h3-title-sign-up-carrier">Enter one carrier indentifier for registration</h3>
                            <h5 className="h5-title-carrier-sign-up">Interstate Carrier</h5>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="us-docket"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierUSDotNumber')}
                                    value={formData.carrierUSDotNumber}
                                />
                                <label htmlFor="email" className="google-style-input-label">US Docket (MC, FF,
                                    MX)</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="us-dot-number"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierDotNumber')} value={formData.carrierDotNumber}
                                />
                                <label htmlFor="email" className="google-style-input-label">US DOT Number</label>
                            </div>
                            <p className="carrier-sign-up-p-text">Or</p>
                            <h5 className="h5-title-carrier-sign-up">Intrastate Carrier</h5>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="intrastate-carrier"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('intrastateCarrier')} value={formData.intrastateCarrier}
                                />
                                <label htmlFor="email" className="google-style-input-label">Intrastate Carrier</label>
                            </div>
                            <button className="next-button-carrier-sign-up" onClick={nextStep}>Next</button>
                        </div>
                    </div>
                    <div className="carrier-sign-up-right-side">
                        <div className="progress-bar-container">
                            <ProgressBar1/>
                        </div>
                        <section className="carrier-sign-up-right-side-section">
                            <h1 className="carrier-sign-up-right-side-title">
                                <Typewriter
                                    options={{
                                        strings: ["I'm Carrier"],
                                        autoStart: true,
                                        loop: true,
                                        pauseFor: 4500,
                                    }}
                                />
                            </h1>
                            <p className="carrier-sign-up-right-side-description">
                                <Typewriter
                                    options={{
                                        strings: ["I have empty space in my truck"],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </p>
                        </section>
                    </div>
                </div>
            )
        case 2:
            return (
                <div className="sign-in-wrapper">
                    <div className="carrier-sign-up-left-side-container">
                        <div className="carrier-sign-up-left-side-content">
                            <h2 className="h2-title-sign-up-carrier">Contact Information</h2>
                            <h3 className="h3-title-sign-up-carrier">You must complete the fields below, If you don't
                                know any specific information, you can just no fill this field</h3>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierContactCompanyName"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierContactCompanyName')}
                                    value={formData.carrierContactCompanyName}
                                />
                                <label htmlFor="email" className="google-style-input-label">Company Name</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierContactAddress"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierContactAddress')}
                                    value={formData.carrierContactAddress}
                                />
                                <label htmlFor="email" className="google-style-input-label">Address</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierContactSuiteOffice"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierContactSuiteOffice')}
                                    value={formData.carrierContactSuiteOffice}
                                />
                                <label htmlFor="email" className="google-style-input-label">Suite/Office</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierContactCity"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierContactCity')} value={formData.carrierContactCity}
                                />
                                <label htmlFor="email" className="google-style-input-label">City</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierContactStateProvince"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierContactStateProvince')} value={formData.carrierContactStateProvince}
                                />
                                <label htmlFor="email" className="google-style-input-label">State/Province</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierContactZip"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierContactZip')} value={formData.carrierContactZip}
                                />
                                <label htmlFor="email" className="google-style-input-label">Zip/Postal Code</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierContactCountry"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierContactCountry')}
                                    value={formData.carrierContactCountry}
                                />
                                <label htmlFor="email" className="google-style-input-label">Country</label>
                            </div>
                            <button className="previous-button-carrier-sign-up" onClick={prevStep}>&larr;
                            </button>
                            <button className="next-button-carrier-sign-up" onClick={nextStep}>Next</button>
                        </div>
                    </div>
                    <div className="carrier-sign-up-right-side">
                        <div className="progress-bar-container">
                            <ProgressBar2/>
                        </div>
                        <section className="carrier-sign-up-right-side-section">
                            <h1 className="carrier-sign-up-right-side-title">
                                <Typewriter
                                    options={{
                                        strings: ["I'm Carrier"],
                                        autoStart: true,
                                        loop: true,
                                        pauseFor: 4500,
                                    }}
                                />
                            </h1>
                            <p className="carrier-sign-up-right-side-description">
                                <Typewriter
                                    options={{
                                        strings: ["I have empty space in my truck"],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </p>
                        </section>
                    </div>
                </div>
            )
        case 3:
            return (
                <div className="sign-in-wrapper">
                    <div className="carrier-sign-up-left-side-container">
                        <div className="carrier-sign-up-left-side-content">
                            <h2 className="h2-title-sign-up-carrier">Pay to information</h2>
                            <h3 className="h3-title-sign-up-carrier">You must complete the fields below, If you don't
                                know any specific information, you can just no fill this field</h3>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierPayToCompanyName"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierPayToCompanyName')}
                                    value={formData.carrierPayToCompanyName}
                                />
                                <label htmlFor="email" className="google-style-input-label">Pay to Company Name</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierPayToAddress"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierPayToAddress')} value={formData.carrierPayToAddress}
                                />
                                <label htmlFor="email" className="google-style-input-label">Pay to Address</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierPayToSuiteOffice"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierPayToSuiteOffice')} value={formData.carrierPayToSuiteOffice}
                                />
                                <label htmlFor="email" className="google-style-input-label">Pay to Suite/Office</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierPayToCity"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierPayToCity')} value={formData.carrierPayToCity}
                                />
                                <label htmlFor="email" className="google-style-input-label">Pay to City</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierPayToStateProvince"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierPayToStateProvince')} value={formData.carrierPayToStateProvince}
                                />
                                <label htmlFor="email" className="google-style-input-label">Pay to
                                    State/Province</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierPayToZipPostal"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierPayToZipPostal')} value={formData.carrierPayToZipPostal}
                                />
                                <label htmlFor="email" className="google-style-input-label">Pay to Zip/Postal
                                    Code</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierPayToCountry"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierPayToCountry')} value={formData.carrierPayToCountry}
                                />
                                <label htmlFor="email" className="google-style-input-label">Pay to Country</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierDunsNumber"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierDunsNumber')} value={formData.carrierDunsNumber}
                                />
                                <label htmlFor="email" className="google-style-input-label">DUNS Number</label>
                            </div>
                            <button className="previous-button-carrier-sign-up" onClick={prevStep}>&larr;
                            </button>
                            <button className="next-button-carrier-sign-up" onClick={nextStep}>Next</button>
                        </div>
                    </div>

                    <div className="carrier-sign-up-right-side">
                        <div className="progress-bar-container">
                            <ProgressBar3/>
                        </div>
                        <section className="carrier-sign-up-right-side-section">
                            <h1 className="carrier-sign-up-right-side-title">
                                <Typewriter
                                    options={{
                                        strings: ["I'm Carrier"],
                                        autoStart: true,
                                        loop: true,
                                        pauseFor: 4500,
                                    }}
                                />
                            </h1>
                            <p className="carrier-sign-up-right-side-description">
                                <Typewriter
                                    options={{
                                        strings: ["I have empty space in my truck"],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </p>
                        </section>
                    </div>
                </div>
            )
        case 4:
            return (
                <div className="sign-in-wrapper">
                    <div className="carrier-sign-up-left-side-container">
                        <div className="carrier-sign-up-left-side-content">
                            <h2 className="h2-title-sign-up-carrier">Corporate Contact Information</h2>
                            <h3 className="h3-title-sign-up-carrier">You must complete the fields below, If you don't
                                know any specific information, you can just no fill this field</h3>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierCorporateNameLastName"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierCorporateNameLastName')} value={formData.carrierCorporateNameLastName}
                                />
                                <label htmlFor="email" className="google-style-input-label">Name & Last Name</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierCorporatePhoneNumber"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierCorporatePhoneNumber')} value={formData.carrierCorporatePhoneNumber}
                                />
                                <label htmlFor="email" className="google-style-input-label">Phone Number</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierCorporateTitle"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierCorporateTitle')} value={formData.carrierCorporateTitle}
                                />
                                <label htmlFor="email" className="google-style-input-label">Title</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierCorporateSellPhone"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierCorporateSellPhone')} value={formData.carrierCorporateSellPhone}
                                />
                                <label htmlFor="email" className="google-style-input-label">Sell Phone</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierSalesContactNameLastName"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierSalesContactNameLastName')} value={formData.carrierSalesContactNameLastName}
                                />
                                <label htmlFor="email" className="google-style-input-label">Fax</label>
                            </div>
                            <button className="previous-button-carrier-sign-up" onClick={prevStep}>&larr;
                            </button>
                            <button className="next-button-carrier-sign-up" onClick={nextStep}>Next</button>
                        </div>
                    </div>

                    <div className="carrier-sign-up-right-side">
                        <div className="progress-bar-container">
                            <ProgressBar4/>
                        </div>
                        <section className="carrier-sign-up-right-side-section">
                            <h1 className="carrier-sign-up-right-side-title">
                                <Typewriter
                                    options={{
                                        strings: ["I'm Carrier"],
                                        autoStart: true,
                                        loop: true,
                                        pauseFor: 4500,
                                    }}
                                />
                            </h1>
                            <p className="carrier-sign-up-right-side-description">
                                <Typewriter
                                    options={{
                                        strings: ["I have empty space in my truck"],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </p>
                        </section>
                    </div>
                </div>
            )
        case 5:
            return (
                <div className="sign-in-wrapper">
                    <div className="carrier-sign-up-left-side-container">
                        <div className="carrier-sign-up-left-side-content">
                            <h2 className="h2-title-sign-up-carrier">Sales Contact Information</h2>
                            <h3 className="h3-title-sign-up-carrier">You must complete the fields below, If you don't
                                know any specific information, you can just no fill this field, or if you have data
                                similar data like in previous pages, you can skip this step</h3>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierSalesContactNameLastName"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierSalesContactNameLastName')} value={formData.carrierSalesContactNameLastName}
                                />
                                <label htmlFor="carrierSalesContactNameLastName" className="google-style-input-label">Name & Last Name</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierSalesPhoneNumber"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierSalesPhoneNumber')} value={formData.carrierSalesPhoneNumber}
                                />
                                <label htmlFor="email" className="google-style-input-label">Phone Number</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierSalesTitle"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierSalesTitle')} value={formData.carrierSalesTitle}
                                />
                                <label htmlFor="email" className="google-style-input-label">Title</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierSalesSellPhone"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierSalesSellPhone')} value={formData.carrierSalesSellPhone}
                                />
                                <label htmlFor="email" className="google-style-input-label">Sell Phone</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierSalesFax"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierSalesFax')} value={formData.carrierSalesFax}
                                />
                                <label htmlFor="email" className="google-style-input-label">Fax</label>
                            </div>
                            <button className="previous-button-carrier-sign-up" onClick={prevStep}>&larr;
                            </button>
                            <button className="next-button-carrier-sign-up" onClick={nextStep}>Next</button>
                        </div>
                    </div>

                    <div className="carrier-sign-up-right-side">
                        <div className="progress-bar-container">
                            <ProgressBar5/>
                        </div>
                        <section className="carrier-sign-up-right-side-section">
                            <h1 className="carrier-sign-up-right-side-title">
                                <Typewriter
                                    options={{
                                        strings: ["I'm Carrier"],
                                        autoStart: true,
                                        loop: true,
                                        pauseFor: 4500,
                                    }}
                                />
                            </h1>
                            <p className="carrier-sign-up-right-side-description">
                                <Typewriter
                                    options={{
                                        strings: ["I have empty space in my truck"],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </p>
                        </section>
                    </div>
                </div>
            )
        case 6:
            return (
                <div className="sign-in-wrapper">
                    <div className="carrier-sign-up-left-side-container">
                        <div className="carrier-sign-up-left-side-content">
                            <h2 className="h2-title-sign-up-carrier">Dispatch Contact Information</h2>
                            <h3 className="h3-title-sign-up-carrier">You must complete the fields below, If you don't
                                know any specific information, you can just no fill this field, or if you have data
                                similar data like in previous pages, you can skip this step</h3>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierDispatchNameLastName"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierDispatchNameLastName')} value={formData.carrierDispatchNameLastName}
                                />
                                <label htmlFor="email" className="google-style-input-label">Name & Last Name</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierDispatchPhoneNumber"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierDispatchPhoneNumber')} value={formData.carrierDispatchPhoneNumber}
                                />
                                <label htmlFor="email" className="google-style-input-label">Phone Number</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierDispatchTitle"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierDispatchTitle')} value={formData.carrierDispatchTitle}
                                />
                                <label htmlFor="email" className="google-style-input-label">Title</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierDispatchSellPhone"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierDispatchSellPhone')} value={formData.carrierDispatchSellPhone}
                                />
                                <label htmlFor="email" className="google-style-input-label">Sell Phone</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierDispatchFax"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierDispatchFax')} value={formData.carrierDispatchFax}
                                />
                                <label htmlFor="email" className="google-style-input-label">Fax</label>
                            </div>
                            <button className="previous-button-carrier-sign-up" onClick={prevStep}>&larr;
                            </button>
                            <button className="next-button-carrier-sign-up" onClick={nextStep}>Next</button>
                        </div>
                    </div>

                    <div className="carrier-sign-up-right-side">
                        <div className="progress-bar-container">
                            <ProgressBar6/>
                        </div>
                        <section className="carrier-sign-up-right-side-section">
                            <h1 className="carrier-sign-up-right-side-title">
                                <Typewriter
                                    options={{
                                        strings: ["I'm Carrier"],
                                        autoStart: true,
                                        loop: true,
                                        pauseFor: 4500,
                                    }}
                                />
                            </h1>
                            <p className="carrier-sign-up-right-side-description">
                                <Typewriter
                                    options={{
                                        strings: ["I have empty space in my truck"],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </p>
                        </section>
                    </div>
                </div>
            )
        case 7:
            return (
                <div className="sign-in-wrapper">
                    <div className="carrier-sign-up-left-side-container">
                        <div className="carrier-sign-up-left-side-content">
                            <h2 className="h2-title-sign-up-carrier">Broker-Carrier Agreement</h2>
                            <h3 className="h3-title-sign-up-carrier">
                                Check the box for any of the companies you do not want to be set up with.
                            </h3>
                            <div className="checkbox-container-wrapper">
                                <label className="checkbox-container">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                    <p className="checkbox-text">Aetna Freight Lines, Inc.</p>

                                </label>
                                <label className="checkbox-container">
                                    <input type="checkbox"/>
                                    <span className="checkmark"></span>
                                    <p className="checkbox-text">American Transport, Inc</p>

                                </label>
                                <label className="checkbox-container">
                                    <input type="checkbox"/>
                                    <span className="checkmark"></span>
                                    <p className="checkbox-text">American Wind Transport Group, LLC</p>

                                </label>
                                <label className="checkbox-container">
                                    <input type="checkbox"/>
                                    <span className="checkmark"></span>
                                    <p className="checkbox-text">ATI Trucking, LLC</p>

                                </label>
                                <label className="checkbox-container">
                                    <input type="checkbox"/>
                                    <span className="checkmark"></span>
                                    <p className="checkbox-text">Greentree Transportation Co</p>

                                </label>
                                <label className="checkbox-container">
                                    <input type="checkbox"/>
                                    <span className="checkmark"></span>
                                    <p className="checkbox-text">Greentree Logisctics</p>

                                </label>
                                <label className="checkbox-container">
                                    <input type="checkbox"/>
                                    <span className="checkmark"></span>
                                    <p className="checkbox-text">Hot Shop Expres, Inc.</p>

                                </label>
                                <label className="checkbox-container">
                                    <input type="checkbox"/>
                                    <span className="checkmark"></span>
                                    <p className="checkbox-text">Jones Express, Inc</p>

                                </label>
                                <label className="checkbox-container">
                                    <input type="checkbox"/>
                                    <span className="checkmark"></span>
                                    <p className="checkbox-text">Jonec Motor Co., Inc.</p>

                                </label>
                            </div>
                            <button className="previous-button-carrier-sign-up" onClick={prevStep}>&larr;
                            </button>
                            <button className="next-button-carrier-sign-up" onClick={nextStep}>Next</button>
                        </div>
                    </div>

                    <div className="carrier-sign-up-right-side">
                        <div className="progress-bar-container">
                            <ProgressBar7/>
                        </div>
                        <section className="carrier-sign-up-right-side-section">
                            <h1 className="carrier-sign-up-right-side-title">
                                <Typewriter
                                    options={{
                                        strings: ["I'm Carrier"],
                                        autoStart: true,
                                        loop: true,
                                        pauseFor: 4500,
                                    }}
                                />
                            </h1>
                            <p className="carrier-sign-up-right-side-description">
                                <Typewriter
                                    options={{
                                        strings: ["I have empty space in my truck"],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </p>
                        </section>
                    </div>
                </div>
            )
        case 8:
            return (
                <div className="sign-in-wrapper">
                    <div className="carrier-sign-up-left-side-container">
                        <div className="carrier-sign-up-left-side-content">
                            <h2 className="h2-title-sign-up-carrier">Cargo Insurance Agency</h2>
                            <h3 className="h3-title-sign-up-carrier">You need to enter information about your cargo
                                insurance agency, if you do not have specify information, you can skip this step</h3>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierInsuranceAgencyCompanyName"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierInsuranceAgencyCompanyName')} value={formData.carrierInsuranceAgencyCompanyName}
                                />
                                <label htmlFor="email" className="google-style-input-label">Insurance Agency Company
                                    Name</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierInsuranceAgencyPhoneNumber"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierInsuranceAgencyPhoneNumber')} value={formData.carrierInsuranceAgencyPhoneNumber}
                                />
                                <label htmlFor="email" className="google-style-input-label">Insurance Agency
                                    Phone</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierInsuranceAgencyFax"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierInsuranceAgencyFax')} value={formData.carrierInsuranceAgencyFax}
                                />
                                <label htmlFor="email" className="google-style-input-label">Insurance Agency Fax</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierInsuranceAgencyEmail"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierInsuranceAgencyEmail')} value={formData.carrierInsuranceAgencyEmail}
                                />
                                <label htmlFor="email" className="google-style-input-label">Insurance Agency
                                    Email</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierInsurancePolicyNumber"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierInsurancePolicyNumber')} value={formData.carrierInsurancePolicyNumber}
                                />
                                <label htmlFor="email" className="google-style-input-label">Your Policy Number</label>
                            </div>
                            <button className="previous-button-carrier-sign-up" onClick={prevStep}>&larr;
                            </button>
                            <button className="next-button-carrier-sign-up" onClick={nextStep}>Next</button>
                        </div>
                    </div>
                    <div className="carrier-sign-up-right-side">
                        <div className="progress-bar-container">
                            <ProgressBar8/>
                        </div>
                        <section className="carrier-sign-up-right-side-section">
                            <h1 className="carrier-sign-up-right-side-title">
                                <Typewriter
                                    options={{
                                        strings: ["I'm Carrier"],
                                        autoStart: true,
                                        loop: true,
                                        pauseFor: 4500,
                                    }}
                                />
                            </h1>
                            <p className="carrier-sign-up-right-side-description">
                                <Typewriter
                                    options={{
                                        strings: ["I have empty space in my truck"],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </p>
                        </section>
                    </div>
                </div>
            )
        case 9:
            return (
                <div className="sign-in-wrapper">
                    <div className="carrier-sign-up-left-side-container">
                        <div className="carrier-sign-up-left-side-content">
                            <h2 className="h2-title-sign-up-carrier">Request For Taxpayer</h2>
                            <h3 className="h3-title-sign-up-carrier">You need to enter identification number and
                                certification</h3>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierRequestForTaxPayerName"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierRequestForTaxPayerName')} value={formData.carrierRequestForTaxPayerName}
                                />
                                <label htmlFor="email" className="google-style-input-label">Name</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierRequestForTaxPayerBusinessName"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierRequestForTaxPayerBusinessName')} value={formData.carrierRequestForTaxPayerBusinessName}
                                />
                                <label htmlFor="email" className="google-style-input-label">Business Name</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierRequestForTaxPayerAddress"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierRequestForTaxPayerAddress')} value={formData.carrierRequestForTaxPayerAddress}
                                />
                                <label htmlFor="email" className="google-style-input-label">Address</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierRequestForTaxPayerCityStateZip"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierRequestForTaxPayerCityStateZip')} value={formData.carrierRequestForTaxPayerCityStateZip}
                                />
                                <label htmlFor="email" className="google-style-input-label">City, State and Zip</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierRequestForTaxPayerSocialSecurityNumber"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierRequestForTaxPayerSocialSecurityNumber')} value={formData.carrierRequestForTaxPayerSocialSecurityNumber}
                                />
                                <label htmlFor="email" className="google-style-input-label">Social Security
                                    Number</label>
                            </div>
                            <p className="carrier-sign-up-p-text">Or</p>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierRequestForTaxPayerEmployerIdentificationNumber"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierRequestForTaxPayerEmployerIdentificationNumber')} value={formData.carrierRequestForTaxPayerEmployerIdentificationNumber}
                                />
                                <label htmlFor="email" className="google-style-input-label">Employer Identification
                                    Number</label>
                            </div>
                            <button className="previous-button-carrier-sign-up" onClick={prevStep}>&larr;
                            </button>
                            <button className="next-button-carrier-sign-up" onClick={nextStep}>Next</button>
                        </div>
                    </div>
                    <div className="carrier-sign-up-right-side">
                        <div className="progress-bar-container">
                            <ProgressBar9/>
                        </div>
                        <section className="carrier-sign-up-right-side-section">
                            <h1 className="carrier-sign-up-right-side-title">
                                <Typewriter
                                    options={{
                                        strings: ["I'm Carrier"],
                                        autoStart: true,
                                        loop: true,
                                        pauseFor: 4500,
                                    }}
                                />
                            </h1>
                            <p className="carrier-sign-up-right-side-description">
                                <Typewriter
                                    options={{
                                        strings: ["I have empty space in my truck"],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </p>
                        </section>
                    </div>
                </div>
            )
        case 10:
            return (
                <div className="sign-in-wrapper">
                    <div className="carrier-sign-up-left-side-container">
                        <div className="carrier-sign-up-left-side-content">
                            <h2 className="h2-title-sign-up-carrier">Let's Finish</h2>
                            <h3 className="h3-title-sign-up-carrier">Now you need to fill fields for your Openship
                                profile</h3>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierAccountName"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierAccountName')} value={formData.carrierAccountName}
                                />
                                <label htmlFor="email" className="google-style-input-label">Name</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierAccountLastName"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierAccountLastName')} value={formData.carrierAccountLastName}
                                />
                                <label htmlFor="email" className="google-style-input-label">Last Name</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierAccountAccountEmail"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierAccountAccountEmail')} value={formData.carrierAccountAccountEmail}
                                />
                                <label htmlFor="email" className="google-style-input-label">Main Email</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="carrierAccountPassword"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                    onChange={handleChange('carrierAccountPassword')} value={formData.carrierAccountPassword}
                                />
                                <label htmlFor="email" className="google-style-input-label">Password</label>
                            </div>
                            <div className="google-input-wrapper">
                                <input
                                    type="text"
                                    id="confirmPassword"
                                    autoComplete="off"
                                    className="google-style-input"
                                    required
                                />
                                <label htmlFor="confirmPassword" className="google-style-input-label">Confirm Password</label>
                            </div>
                            <p className="carrier-sign-up-p-text">NOTE: This data which you need to use to login</p>

                            <button className="previous-button-carrier-sign-up" onClick={prevStep}>&larr;
                            </button>
                            <button className="next-button-carrier-submit-button" onClick={handleSubmit}>
                                {isLoading ? <CircularProgress size={30}/>
                                    : 'Create Account'}
                            </button>
                            {message && <Alert text={message} />}
                        </div>
                    </div>
                    <div className="carrier-sign-up-right-side">
                        <div className="progress-bar-container">
                        <ProgressBar10/>
                        </div>
                        <section className="carrier-sign-up-right-side-section">
                            <h1 className="carrier-sign-up-right-side-title">
                                <Typewriter
                                    options={{
                                        strings: ["I'm Carrier"],
                                        autoStart: true,
                                        loop: true,
                                        pauseFor: 4500,
                                    }}
                                />
                            </h1>
                            <p className="carrier-sign-up-right-side-description">
                                <Typewriter
                                    options={{
                                        strings: ["I have empty space in my truck"],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </p>
                        </section>
                    </div>
                </div>
            )
        default:
            return <h1>Invalid step</h1>;
    }
}

export default SignCarrierUpForm;
