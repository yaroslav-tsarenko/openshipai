import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css'
import styles from './TextInput.module.scss';

const TextInput = ({ type = 'text', id, value, onChange, label, options = [], style = {} }) => {
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPhoneValid, setIsPhoneValid] = useState(true);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        onChange(e);

        if (type === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setIsEmailValid(emailPattern.test(inputValue));
        }
    };

    const handlePhoneChange = (phone) => {
        onChange({ target: { value: phone } });
        setIsPhoneValid(phone.length >= 10); // Example validation
    };

    return (
        <div className={styles['google-input-wrapper']}>
            {type === 'select' ? (
                <select
                    id={id}
                    className={`form-select form-select-lg ${styles['google-style-input']}`}
                    required
                    onChange={onChange}
                    value={value}
                >
                    <option className={styles.optionValueDisabled} value="" disabled selected={!value}>
                        Select value
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
