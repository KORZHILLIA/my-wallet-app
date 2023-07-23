import type { WalletConnectButtonProps } from "constants/types";

import styles from './WalletConnectButton.module.scss';

const WalletConnectButton = ({isDisabled, isConnected, onClick, defaultLabel, balanceLabel, accountLabel}: WalletConnectButtonProps) => {
    const labelConnected = <><span>{balanceLabel}</span><span>{accountLabel}</span></>;
    const finalLabel = isDisabled ? defaultLabel : (isConnected ? labelConnected : defaultLabel);

    return <button className={!isConnected ? styles.btn : styles.btnConnected} disabled={isDisabled} onClick={onClick}>{finalLabel}</button>
};

export default WalletConnectButton;