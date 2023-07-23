import { useState, useEffect } from 'react';

import TransferForm from 'modules/forms/TransferForm/TransferForm';

import detectMetamask from 'service/metamask/detectMetamask';
import getAccount from 'service/metamask/getAccount';
import formatBalance from 'helpers/formatBalance';
import formatAccount from 'helpers/formatAccount';

import type { Wallet } from 'constants/types';
import type { TransferFormInputs } from 'constants/types';
import './App.css';

function App() {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState<boolean>(false);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    detectMetamask().then(result => setIsMetamaskInstalled(result));
  }, []
  );

  const connectWallet = () => {
    getAccount().then(result => {
      const formattedAccount = formatAccount(result.account);
      const formattedBalance = formatBalance(result.balance);
      setWallet({rawAccount: result.account, formattedAccount, balance: formattedBalance});
      console.log(result.account);
    });
  }

  const sendTransaction = async (formData: TransferFormInputs) => {
    const {accountID, ETHValue} = formData;
    const transactionConfig = {
      from: wallet?.rawAccount,
      to: accountID,
      value: ETHValue,
    };
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionConfig],
    }).then((result: string) => console.log(result)).catch((error: any) => console.log(error));
  };

  return (<>
      <div>
        <button disabled={!isMetamaskInstalled} onClick={connectWallet}>{wallet ? `${wallet.formattedAccount} ${wallet.balance}` : 'Connect wallet'}</button>
        <TransferForm onSubmit={sendTransaction}/>
      </div>
    </>
  )
}

export default App;
