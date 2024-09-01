import React, { useState } from 'react';
import styles from "./RoundedCheckbox.module.scss"
import { ReactComponent as CheckBoxUnchecked } from "../../assets/checkbox-unchecked.svg";
import { ReactComponent as CheckBoxChecked } from "../../assets/checkbox-checked.svg";

const RoundedCheckbox = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div onClick={handleCheckboxClick} className={styles.checkbox}>
            {isChecked ? <CheckBoxChecked /> : <CheckBoxUnchecked />}
        </div>
    );
};

export default RoundedCheckbox;