export interface Wallet {
    rawAccount: string;
    formattedAccount: string;
    balance: string;
};


export interface TransferFormInputs {
    accountID: string;
    ETHValue: string;
}

export interface TransferFormProps {
    onSubmit: (data: TransferFormInputs) => void;
}