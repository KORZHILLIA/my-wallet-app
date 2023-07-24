import type { TransactionObject } from "constants/types";

const sendTransactionToMetamask = async (transactionObject: TransactionObject) => { 
    const result = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionObject],
    });
    return result;
};

export default sendTransactionToMetamask;