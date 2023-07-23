import { ReactComponent as Spinner } from 'assets/svg/spinner.svg';

import type { SpinnerButtonProps } from "constants/types";

import styles from './SpinnerButton.module.scss';

const SpinnerButton = ({ type, label, showSpinner }: SpinnerButtonProps) => {
    return <button className={styles.btn} type={type}>
        {showSpinner && <Spinner className={styles.spinner} />}
        {label}
    </button>
};

export default SpinnerButton;