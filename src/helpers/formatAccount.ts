const formatAccount = (accountID: string): string => {
    const formattedAccountID = accountID.slice(0, 4) + '...' + accountID.slice(-4);
    return formattedAccountID;
};

export default formatAccount;