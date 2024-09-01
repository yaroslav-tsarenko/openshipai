import React from 'react';
import styles from './TextInput.module.scss';

const TextInput = ({ type = 'text', id, value, onChange, label, options = [], style = {} }) => {
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
                    <option className={styles.optionValueDisabled} value="" disabled selected={!value}>Select value</option>
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
            ) : (
                <input
                    type={type}
                    id={id}
                    autoComplete="off"
                    className={styles['google-style-input']}
                    required
                    onChange={onChange}
                    value={value}
                />
            )}
            <label htmlFor={id} className={styles['google-style-input-label']}>{label}</label>
        </div>
    );
};

export default TextInput;