import {ReactNode} from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';


export interface Wallet {
    rawAccount: string;
    formattedAccount: string;
    balance: string;
};

export interface HeaderProps {
    children: ReactNode;
};

export interface WalletConnectButtonProps {
isDisabled: boolean;
isConnected: boolean;
onClick: () => void;
defaultLabel?: string;
balanceLabel?: string;
accountLabel?: string;
};


export interface TransferFormProps {
    onSubmit: (data: TransferFormInputs) => void;
    isDisabled: boolean;
    isSending: boolean;
};

export interface InputProps {
    type: string;
label: string;
register: UseFormRegisterReturn;
error?: string;
};

export interface TransferFormInputs {
    accountID: string;
    ETHValue: string;
};

export interface SpinnerButtonProps {
    type: 'submit' | 'button';
    label: string;
    showSpinner: boolean;
}