const formatBalance = (balance: string): string => {
    const formattedBalance =  (parseInt(balance) / 1000000000000000000).toFixed(3);
    return formattedBalance;
};

export default formatBalance;