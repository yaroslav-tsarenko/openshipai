import React, {useState} from 'react'
import {Link} from "react-router-dom";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import "./SignUpFormCarrier.css";

function SignCarrierUpForm() {
    const [name, setName] = useState(null)
    const [secondName, setSecondName] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [captchaValue, setCaptchaValue] = useState(null);
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const [progress, setProgress] = useState(0);
    const [usDotNumberCheckbox, setUsDotNumberCheckbox] = useState(false);
    const [usDotNumber, setUsDotNumber] = useState('');
    const [intrastateCarrierCheckbox, setIntrastateCarrierCheckbox] = useState(false);
    const [intrastateCarrier, setIntrastateCarrier] = useState('');
    const [companyName, setCompanyName] = useState(null);
    const [zipCode, setZipCode] = useState(null);
    const [stateProvince, setStateProvince] = useState(null);
    const [country, setCountry] = useState(null);
    const [city, setCity] = useState(null);
    const [isFactoringCompany, setIsFactoringCompany] = useState(false);
    const [formData, setFormData] = useState({});
    const [dunsNumber, setDunsNumber] = useState(null);
    const [usDocket, setUsDocket] = useState(null);
    const handleNextClick = () => {
        setFormData(prevFormData => {
            const updatedFormData = {
                ...prevFormData,
                carrierPrequalification: currentPage === 1 ? {
                    usDocket: usDocket,
                    usDotNumber: usDotNumberCheckbox ? usDotNumber : null,
                    intrastateCarrier: intrastateCarrierCheckbox ? intrastateCarrier : null
                } : prevFormData.carrierPrequalification,
                contactInformation: currentPage === 2 ? {
                    name: name,
                    phoneNumber: phoneNumber,
                    email: email
                } : prevFormData.contactInformation,
                salesContactInformation: currentPage === 3 ? {
                    name: name,
                    phoneNumber: phoneNumber,
                    email: email
                } : prevFormData.salesContactInformation,
                contactAndPayInformation: currentPage === 4 ? {
                    companyName: companyName,
                    zipCode: zipCode,
                    stateProvince: stateProvince,
                    country: country,
                    city: city,
                    isFactoringCompany: isFactoringCompany
                } : prevFormData.contactAndPayInformation,
                payInformation: currentPage === 5 ? {
                    companyName: companyName,
                    zipCode: zipCode,
                    stateProvince: stateProvince,
                    country: country,
                    city: city,
                    email: email,
                    dunsNumber: dunsNumber
                } : prevFormData.payInformation
            };

            axios.post('http://localhost:8080/save-carrier-data', updatedFormData)
                .then(response => {
                    if (response.data.status === "Success") {
                        console.log('Data saved successfully');
                    } else {
                        console.error('Error during saving data:', response.data.message);
                    }
                })
                .catch(err => {
                    console.error('Error during saving data:', err);
                });

            return updatedFormData;
        });

        setCurrentPage(prevPage => prevPage + 1);
    };
    const handlePreviousClick = () => {
        setCurrentPage(prevPage => {
            const nextPage = prevPage - 1;
            const progress = 15; // Set progress to 33%
            setProgress(prevProgress => prevProgress - progress); // Update the progress state variable
            const progressBar = document.querySelector('.progress-bar');
            progressBar.style.width = `${progress}%`;
            progressBar.style.backgroundColor = 'green'; // Change color to green
            return nextPage;
        });
    };
    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };
    const deleteAllCarriers = () => {
        axios.delete('http://localhost:8080/delete-all-carriers')
            .then(response => {
                if (response.data.status === "Success") {
                    console.log('All carriers deleted successfully');
                } else {
                    console.error('Failed to delete all carriers:', response.data.message);
                }
            })
            .catch(err => {
                console.error('Error during deleting all carriers:', err);
            });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Form data:', formData); // Log the form data to the console

        // Send all the form data to the server when the user clicks the submit button
        axios.post('http://localhost:8080/save-carrier-data', formData)
            .then(response => {
                if (response.data.status === "Success") {
                    // Get the last entity in the database
                    axios.get('http://localhost:8080/get-last-carrier')
                        .then(response => {
                            if (response.data.status === "Success") {
                                const carrierPersonalEndpoint = response.data.carrier.carrierPersonalEndpoint;
                                navigate(`/carrier-dashboard/${carrierPersonalEndpoint}`);
                            } else {
                                console.error('Failed to get last carrier:', response.data.message);
                            }
                        })
                        .catch(err => {
                            console.error('Error during getting last carrier:', err);
                        });
                } else {
                    console.error('Failed to save data:', response.data.message);
                }
            })
            .catch(err => {
                console.error('Error during saving data:', err);
            });
    };
    const handleGoogleLoginSignUpSuccess = (credentialResponse) => {
        const credential = credentialResponse.credential;
        axios.post('http://localhost:8080/google-login', {token: credential})
            .then(response => {
                if (response.data.status === "Success") {
                    const personalEndpoint = response.data.user.personalEndpoint;
                    axios.post('http://localhost:8080/create-chat-session', { userEndpoint: personalEndpoint })
                        .then(response => {
                            if (response.data.status === "Success") {
                                navigate(`/jarvis-chat/${personalEndpoint}/${response.data.chatEndpoint}`);
                            } else {
                                console.error('Error creating chat session:', response.data.message);
                            }
                        })
                        .catch(err => {
                            console.error('Error during chat session creation:', err);
                        });
                } else {
                    console.error('Login failed:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Error during login:', error);
            });
    };
    return (
        <div className="sign-in-wrapper">

            <div className="left-side">
                <div className="carrier-customer">
                    <Link to="/sign-up-carrier" className="is-customer">I'm carrier</Link>
                    <Link to="/" className="is-carrier">I'm customer</Link>
                </div>
                <button className="is-carrier" onClick={deleteAllCarriers}>Delete All Carriers</button>
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{width: `${progress}%`}}></div>
                </div>
                <form onSubmit={handleSubmit} className="sign-up-custom-form">
                    {currentPage === 1 && (
                        <form className="sign-up-custom-form">
                            <h2>Carrier Prequalification</h2>
                            <p>Enter ONE carrier identifier for registration</p>
                            <label htmlFor="usDocket" className="label-text">US Docket#</label>
                            <select id="usDocket" className="input-field-name" required>
                                <option value="MC">MC</option>
                                <option value="FF">FF</option>
                                <option value="MX">MX</option>
                            </select>
                            <div className="checkbox-container">
                                <label htmlFor="usDotNumberCheckbox" className="label-text">US Dot Number</label>\
                                <input
                                    type="checkbox"
                                    id="usDotNumberCheckbox"
                                    onChange={(e) => setUsDotNumberCheckbox(e.target.checked)}
                                />
                            </div>
                            {usDotNumberCheckbox && (
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className="input-field-name"
                                    id="usDotNumber"
                                    required
                                    onChange={(e) => setUsDotNumber(e.target.value)}
                                />
                            )}
                            <h2>Or</h2>
                            <div className="checkbox-container">
                                <label htmlFor="intrastateCarrierCheckbox" className="label-text">Intrastate
                                    Carrier</label>
                                <input
                                    type="checkbox"
                                    id="intrastateCarrierCheckbox"
                                    onChange={(e) => setIntrastateCarrierCheckbox(e.target.checked)}
                                />
                            </div>
                            {intrastateCarrierCheckbox && (
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className="input-field-name"
                                    id="intrastateCarrier"
                                    required
                                    onChange={(e) => setIntrastateCarrier(e.target.value)}
                                />
                            )}
                            <div className="next-button-container">
                                <button type="button" onClick={handleNextClick} className="next-button">NEXT</button>
                            </div>
                        </form>
                    )}
                    {currentPage === 2 && (
                        <form className="sign-up-custom-form">
                            <h2>Contact information</h2>
                            <p>Try to fill all fields</p>
                            <label htmlFor="name" className="label-text">First and Last Name</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="input-field-name"
                                id="name"
                                placeholder="First & Last Name"
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label htmlFor="phoneNumber" className="label-text">Phone Number</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="input-field-name"
                                id="phoneNumber"
                                placeholder="+1 123 456 7890"
                                required
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <label htmlFor="email" className="label-text">Email</label>
                            <input
                                type="email"
                                autoComplete="off"
                                className="input-field-name"
                                id="email"
                                placeholder="email@gmail.com"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <h2>Sales</h2>
                            <p>Try to fill all fields</p>
                            <label htmlFor="name" className="label-text">Contact</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="input-field-name"
                                placeholder="First & Last Name"
                                id="name"
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label htmlFor="phoneNumber" className="label-text">Phone Number</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="input-field-name"
                                placeholder="+1 123 456 7890"
                                id="phoneNumber"
                                required
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <label htmlFor="email" className="label-text">Email</label>
                            <input
                                type="email"
                                autoComplete="off"
                                placeholder="email@gmail.com"
                                className="input-field-name"
                                id="email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <div className="previous-next-button">
                                <button type="button" onClick={handlePreviousClick} className="previous-button">PREVIOUS
                                </button>
                                <button type="button" onClick={handleNextClick} className="next-button">NEXT</button>
                            </div>
                        </form>
                    )}
                    {currentPage === 3 && (
                        <form className="sign-up-custom-form">
                            <h2>Sales Contact information</h2>
                            <p>Try to fill all fields</p>
                            <label htmlFor="name" className="label-text">First and Last Name</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="input-field-name"
                                id="name"
                                placeholder="First & Last Name"
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label htmlFor="phoneNumber" className="label-text">Phone Number</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="input-field-name"
                                id="phoneNumber"
                                placeholder="+1 123 456 7890"
                                required
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <label htmlFor="email" className="label-text">Email</label>
                            <input
                                type="email"
                                autoComplete="off"
                                className="input-field-name"
                                id="email"
                                placeholder="email@gmail.com"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {/*<h2>Sales</h2>
                            <p>Try to fill all fields</p>
                            <label htmlFor="name" className="label-text">Contact</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="input-field-name"
                                placeholder="First & Last Name"
                                id="name"
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label htmlFor="phoneNumber" className="label-text">Phone Number</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="input-field-name"
                                placeholder="+1 123 456 7890"
                                id="phoneNumber"
                                required
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <label htmlFor="email" className="label-text">Email</label>
                            <input
                                type="email"
                                autoComplete="off"
                                placeholder="email@gmail.com"
                                className="input-field-name"
                                id="email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            */}
                            <div className="previous-next-button">
                                <button type="button" onClick={handlePreviousClick} className="previous-button">PREVIOUS
                                </button>
                                <button type="button" onClick={handleNextClick} className="next-button">NEXT</button>
                            </div>
                        </form>
                    )}
                    {currentPage === 4 && (
                        <form className="sign-up-custom-form">
                            <h2>Contact and Pay Information</h2>
                            <p>Try to fill all fields</p>
                            <label htmlFor="companyName" className="label-text">Company Name</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="input-field-name"
                                id="companyName"
                                required
                                onChange={(e) => setCompanyName(e.target.value)}
                            />

                            <label htmlFor="zipCode" className="label-text">Zip/Postal Code</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="input-field-name"
                                id="zipCode"
                                required
                                onChange={(e) => setZipCode(e.target.value)}
                            />

                            <label htmlFor="stateProvince" className="label-text">State/Province</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="input-field-name"
                                id="stateProvince"
                                required
                                onChange={(e) => setStateProvince(e.target.value)}
                            />

                            <label htmlFor="country" className="label-text">Country</label>
                            <select id="country" className="input-field-name" required
                                    onChange={(e) => setCountry(e.target.value)}>
                                <option value="">Select Country</option>
                                <option value="USA">USA</option>
                                <option value="Canada">Canada</option>
                            </select>
                            <label htmlFor="city" className="label-text">City</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="input-field-name"
                                id="city"
                                required
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <div className="checkbox-container">
                                <label htmlFor="isFactoringCompany" className="label-text">The Pay to is a Factoring
                                    Company</label>
                                <input
                                    type="checkbox"
                                    id="isFactoringCompany"
                                    onChange={(e) => setIsFactoringCompany(e.target.checked)}
                                />
                            </div>
                            <div className="previous-next-button">
                                <button type="button" onClick={handlePreviousClick}
                                        className="previous-button">PREVIOUS
                                </button>
                                <button type="button" onClick={handleNextClick} className="next-button">NEXT
                                </button>
                            </div>
                        </form>
                    )}
                    {currentPage === 5 && (
                        <form className="sign-up-custom-form">
                            <h2>Pay Information</h2>
                            <p>Try to fill all fields</p>
                            <label htmlFor="companyName" className="label-text">Pay Company Name</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="input-field-name"
                                id="companyName"
                                required
                                onChange={(e) => setCompanyName(e.target.value)}
                            />

                            <label htmlFor="zipCode" className="label-text">Pay to Zip/Postal Code</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="input-field-name"
                                id="zipCode"
                                required
                                onChange={(e) => setZipCode(e.target.value)}
                            />

                            <label htmlFor="stateProvince" className="label-text">Pay State/Province</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="input-field-name"
                                id="stateProvince"
                                required
                                onChange={(e) => setStateProvince(e.target.value)}
                            />

                            <label htmlFor="country" className="label-text">Pay Country</label>
                            <select id="country" className="input-field-name" required
                                    onChange={(e) => setCountry(e.target.value)}>
                                <option value="">Select Country</option>
                                <option value="USA">USA</option>
                                <option value="Canada">Canada</option>
                            </select>
                            <label htmlFor="city" className="label-text">Pay to City</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="input-field-name"
                                id="city"
                                required
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <label htmlFor="city" className="label-text">Pay to Email</label>
                            <input
                                type="email"
                                autoComplete="off"
                                className="input-field-name"
                                id="city"
                                required
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <label htmlFor="city" className="label-text">DUNS Number</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="input-field-name"
                                id="city"
                                required
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <div className="previous-next-button">
                                <button type="button" onClick={handlePreviousClick}
                                        className="previous-button">PREVIOUS
                                </button>
                                <button type="button" onClick={handleNextClick} className="next-button">NEXT</button>
                            </div>
                        </form>
                    )}
                    {currentPage === 6 && (
                        <form className="sign-up-custom-form">
                            <h2>Contact and Pay Information</h2>
                            <p>Try to fill all fields</p>
                            <label htmlFor="companyName" className="label-text">Company Name</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="input-field-name"
                                id="companyName"
                                required
                                onChange={(e) => setCompanyName(e.target.value)}
                            />

                            <label htmlFor="zipCode" className="label-text">Zip/Postal Code</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="input-field-name"
                                id="zipCode"
                                required
                                onChange={(e) => setZipCode(e.target.value)}
                            />

                            <label htmlFor="stateProvince" className="label-text">State/Province</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="input-field-name"
                                id="stateProvince"
                                required
                                onChange={(e) => setStateProvince(e.target.value)}
                            />

                            <label htmlFor="country" className="label-text">Country</label>
                            <select id="country" className="input-field-name" required
                                    onChange={(e) => setCountry(e.target.value)}>
                                <option value="">Select Country</option>
                                <option value="USA">USA</option>
                                <option value="Canada">Canada</option>
                            </select>
                            <label htmlFor="city" className="label-text">City</label>
                            <input
                                type="text"
                                autoComplete="off"
                                className="input-field-name"
                                id="city"
                                required
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <div className="checkbox-container">
                                <label htmlFor="isFactoringCompany" className="label-text">The Pay to is a Factoring
                                    Company</label>
                                <input
                                    type="checkbox"
                                    id="isFactoringCompany"
                                    onChange={(e) => setIsFactoringCompany(e.target.checked)}
                                />
                            </div>
                            <div className="previous-next-button">
                                <button type="button" onClick={handlePreviousClick}
                                        className="previous-button">PREVIOUS
                                </button>
                                <button type="submit" className="next-button">SUBMIT
                                </button>
                            </div>
                        </form>
                    )}
                    <div className="question-div">
                        <p className="question-p">Already have an account?</p>
                        <Link to="/sign-in" className="sign-in-link-sign-up">Sign in now</Link>
                    </div>
                </form>
            </div>
            <div className="right-side">
            </div>
        </div>

    )
}

export default SignCarrierUpForm;
