import { useState, useEffect } from 'react';

import Header from 'modules/Header/Header';
import WalletConnectButton from 'modules/WalletConnectButton/WalletConnectButton';
import TransferForm from 'modules/forms/TransferForm/TransferForm';

import detectMetamask from 'service/metamask/detectMetamask';
import getAccount from 'service/metamask/getAccount';
import formatBalance from 'helpers/formatBalance';
import formatAccount from 'helpers/formatAccount';

import type { Wallet } from 'constants/types';
import type { TransferFormInputs } from 'constants/types';
import './App.scss';

function App() {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState<boolean>(false);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false);

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
    setIsSending(true);
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionConfig],
    }).then((result: string) => {
      setIsSending(false);
      console.log(result);
    }).catch((error: any) => {
      setIsSending(false);
      console.log(error);
    });
  };

  return (<>
       <Header>
        <WalletConnectButton isDisabled={!isMetamaskInstalled} isConnected={Boolean(wallet)} onClick={connectWallet} defaultLabel='Connect wallet' balanceLabel={wallet?.balance} accountLabel={wallet?.formattedAccount} />
       </Header>
        <main className='main'>
          <div className='container'>
        <TransferForm isDisabled={!Boolean(wallet)} onSubmit={sendTransaction} isSending={isSending} />
        </div>
        </main>
    </>
  )
}

export default App;
