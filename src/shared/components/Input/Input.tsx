import { InputProps } from "constants/types";

import styles from './Input.module.scss';

const Input = ({type, label, register, error}: InputProps) => {
    return <label className={styles.label}>
        <span className={styles.labelText}>{label}</span>
        <input className={!error ? styles.input : styles.inputError} type={type} {...register} />
        {error && <span className={styles.error}>{error}</span>}
    </label>
};

export default Input;