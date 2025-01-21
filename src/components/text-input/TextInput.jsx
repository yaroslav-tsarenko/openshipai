import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './TextInput.module.scss';
import RotatingLinesLoader from '../rotating-lines/RotatingLinesLoader';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css'

const TextInput = ({ type = 'text', id, value, onChange, label, selectName, options = [], style = {} }) => {
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    const handlePhoneChange = (phone) => {
        onChange({ target: { value: phone } });
        setIsPhoneValid(phone.length >= 10); // Example validation
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        onChange(e);

        if (type === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setIsEmailValid(emailPattern.test(inputValue));
        } else if (type === 'locations') {
            if (debounceTimeout) clearTimeout(debounceTimeout);
            setDebounceTimeout(
                setTimeout(async () => {
                    if (inputValue.trim().length > 0) {
                        setIsLoading(true);
                        try {
                            const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                                params: {
                                    q: inputValue,
                                    format: 'json',
                                    addressdetails: 1,
                                    countrycodes: 'us',
                                },
                            });
                            setSuggestions(response.data);
                        } catch (error) {
                            console.error('Error fetching address suggestions:', error);
                            setSuggestions([]);
                        } finally {
                            setIsLoading(false);
                        }
                    } else {
                        setSuggestions([]);
                    }
                }, 300)
            );
        }
    };

    const handleSuggestionSelect = (suggestion) => {
        const address = suggestion.display_name;
        onChange({ target: { value: address } });
        setSuggestions([]);
    };

    return (
        <div className={styles['google-input-wrapper']} style={{ position: 'relative' }}>
            {type === 'select' ? (
                <select
                    id={id}
                    className={`form-select form-select-lg ${styles['google-style-input']}`}
                    style={{
                        width: '100%',
                    }}
                    required
                    onChange={onChange}
                    value={value}
                >
                    <option className={styles.optionValueDisabled} value="" disabled selected={!value}>
                        {selectName}
                    </option>
                    {options.map((option, index) => (
                        <option className={styles.optionValue} key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : type === 'textarea' ? (
                <textarea
                    id={id}
                    autoComplete="off"
                    className={styles['google-style-input']}
                    required
                    style={style}
                    onChange={onChange}
                    value={value}
                />
            ) : type === 'phone-number' ? (
                <>
                    <PhoneInput
                        country={'us'}
                        value={value}
                        onChange={handlePhoneChange}
                        inputProps={{
                            name: 'phone',
                            required: true,
                            autoComplete: 'off',
                            id: id,
                        }}
                    />
                </>
            ) : type === 'locations' ? (
                <>
                    <input
                        type="text"
                        id={id}
                        autoComplete="off"
                        className={styles['google-style-input']}
                        required
                        onChange={handleInputChange}
                        value={value}
                    />
                    <label
                        htmlFor={id}
                        className={`${styles['google-style-input-label']} ${value ? styles['filled'] : ''}`}
                    >
                        {label}
                    </label>
                    {isLoading ? (
                        <div className={styles['suggestions']}>
                            <div className={styles['loading-text']}>
                                <RotatingLinesLoader title="AI searching suggestions..."  color="#2e2a2a"/>
                            </div>
                        </div>
                    ) : suggestions.length > 0 ? (
                        <ul className={styles['suggestions']}>
                            {suggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => handleSuggestionSelect(suggestion)}>
                                    {suggestion.display_name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <></>
                    )}
                </>
            ) : (
                <>
                    <input
                        type={type}
                        id={id}
                        autoComplete="off"
                        className={`${styles['google-style-input']} ${
                            type === 'email' ? (isEmailValid ? styles['input-success'] : styles['input-error']) : ''
                        }`}
                        required
                        onChange={handleInputChange}
                        value={value}
                    />
                    <label
                        htmlFor={id}
                        className={`${styles['google-style-input-label']} ${value ? styles['filled'] : ''}`}
                    >
                        {label}
                    </label>
                    {!isEmailValid && type === 'email' && (
                        <span className={styles['error-message']}>Incorrect email format</span>
                    )}
                </>
            )}
        </div>
    );
};

export default TextInput;
