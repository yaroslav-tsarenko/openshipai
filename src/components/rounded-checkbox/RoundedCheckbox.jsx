import React from 'react';
import styles from './RoundedCheckbox.module.scss';
import { ReactComponent as CheckBoxUnchecked } from '../../assets/images/checkbox-unchecked.svg';
import { ReactComponent as CheckBoxChecked } from '../../assets/images/checkbox-checked.svg';

const RoundedCheckbox = ({ isChecked }) => {
    return (
        <div className={styles.checkbox}>
            {isChecked ? <CheckBoxChecked /> : <CheckBoxUnchecked />}
        </div>
    );
};

export default RoundedCheckbox;
