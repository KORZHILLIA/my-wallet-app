import type { TransactionObject } from "constants/types";

const prepareTransactionObject = (from: string, to: string, value: string): TransactionObject => {
    return {from, to, value};
 };

export default prepareTransactionObject;