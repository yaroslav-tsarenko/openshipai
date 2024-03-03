import React, {useState} from 'react'
import {Link} from "react-router-dom";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import "./SignUpFormCarrier.css";

function SignCarrierUpForm() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        secondName: '',
        companyName: '',
        usDocket: '',
        usDotNumber: '',
        email: '',
        phoneNumber: '',
        dunsNumber: '',
        carrierPassword: '',
        carrierID: Math.random().toString(36).substring(2, 36) + Math.random().toString(36).substring(2, 36),
    });

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleChange = (input) => (e) => {
        setFormData({ ...formData, [input]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/save-carrier-data', formData)
            .then(response => {
                console.log(response);
                navigate(`/carrier-dashboard/${response.data.carrier._id}`);
            })
            .catch(error => {
                console.log(error);
            });
    };

    switch (step) {
        case 1:
            return (
                <div className="sign-in-wrapper">
                    <div className="left-side">
                        <div className="carrier-customer">
                            <Link to="/sign-up-carrier" className="is-customer">I'm carrier</Link>
                            <Link to="/" className="is-carrier">I'm customer</Link>
                        </div>
                        <h2>Step 1</h2>
                        <input className="input-field-name" type="text" placeholder="Name" value={formData.name} onChange={handleChange('name')}/>
                        <input className="input-field-name" type="text" placeholder="Second Name" value={formData.secondName} onChange={handleChange('secondName')}/>
                        <button className="submit-bid-button" onClick={nextStep}>Next</button>
                    </div>
                    <div className="right-side">
                    </div>
                </div>
            )
        case 2:
            return (
                <div className="sign-in-wrapper">
                    <div className="left-side">
                        <div className="carrier-customer">
                            <Link to="/sign-up-carrier" className="is-customer">I'm carrier</Link>
                            <Link to="/" className="is-carrier">I'm customer</Link>
                        </div>
                        <h2>Step 2</h2>
                        <input className="input-field-name" type="text" placeholder="Company Name" value={formData.companyName} onChange={handleChange('companyName')}/>
                        <input className="input-field-name" type="text" placeholder="US Docket" value={formData.usDocket} onChange={handleChange('usDocket')}/>
                        <button className="hide-details-button" onClick={prevStep}>Previous</button>
                        <button className="submit-bid-button" onClick={nextStep}>Next</button>
                    </div>
                    <div className="right-side">
                    </div>
                </div>
            );
        case 3:
            return (
                <div className="sign-in-wrapper">
                    <div className="left-side">
                        <div className="carrier-customer">
                            <Link to="/sign-up-carrier" className="is-customer">I'm carrier</Link>
                            <Link to="/" className="is-carrier">I'm customer</Link>
                        </div>
                        <h2>Step 3</h2>
                        <input className="input-field-name" type="text" placeholder="US Dot Number" value={formData.usDotNumber} onChange={handleChange('usDotNumber')}/>
                        <input className="input-field-name" type="text" placeholder="Email" value={formData.email} onChange={handleChange('email')}/>
                        <button className="hide-details-button" onClick={prevStep}>Previous</button>
                        <button className="submit-bid-button" onClick={nextStep}>Next</button>
                    </div>
                    <div className="right-side">
                    </div>
                </div>
            );
        case 4:
            return (
                <div className="sign-in-wrapper">
                    <div className="left-side">
                        <div className="carrier-customer">
                            <Link to="/sign-up-carrier" className="is-customer">I'm carrier</Link>
                            <Link to="/" className="is-carrier">I'm customer</Link>
                        </div>
                        <h2>Step 4</h2>
                        <input className="input-field-name" type="text" placeholder="Phone Number"
                               value={formData.phoneNumber} onChange={handleChange('phoneNumber')}/>
                        <input className="input-field-name" type="text" placeholder="DUNS Number"
                               value={formData.dunsNumber} onChange={handleChange('dunsNumber')}/>
                        <button className="hide-details-button" onClick={prevStep}>Previous</button>
                        <button className="submit-bid-button" onClick={nextStep}>Next</button>
                    </div>
                    <div className="right-side">
                    </div>
                </div>
            );
        case 5:
            return (
                <div className="sign-in-wrapper">
                    <div className="left-side">
                        <div className="carrier-customer">
                            <Link to="/sign-up-carrier" className="is-customer">I'm carrier</Link>
                            <Link to="/" className="is-carrier">I'm customer</Link>
                        </div>
                        <h2>Step 5</h2>
                        <input className="input-field-name" type="password" placeholder="Come up Strong Password" value={formData.carrierPassword} onChange={handleChange('carrierPassword')}/>
                        <input className="input-field-name" type="password" placeholder="Confirm Password"/>
                        <button className="hide-details-button" onClick={prevStep}>Previous</button>
                        <button className="submit-bid-button" onClick={handleSubmit}>Submit</button>
                    </div>
                    <div className="right-side">
                    </div>
                </div>
            );
        default:
            return <h1>Invalid step</h1>;
    }
}

export default SignCarrierUpForm;
