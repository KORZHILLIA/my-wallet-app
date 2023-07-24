import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
  
import Header from 'modules/Header/Header';
import WalletConnectButton from 'modules/WalletConnectButton/WalletConnectButton';
import TransferForm from 'modules/forms/TransferForm/TransferForm';
import OuterLink from 'shared/components/OuterLink/OuterLink';

import detectMetamask from 'service/metamask/detectMetamask';
import getAccount from 'service/metamask/getAccount';
import formatBalance from 'helpers/formatBalance';
import formatAccount from 'helpers/formatAccount';
import prepareTransactionObject from 'helpers/prepareTransactionObject';
import sendTransactionToMetamask from 'service/metamask/sendTransactionToMetamask';

import type { Wallet } from 'constants/types';
import type { TransferFormInputs } from 'constants/types';

import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState<boolean>(false);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false);

  useEffect(() => {
      detectMetamask().then(result => {
        setIsMetamaskInstalled(result);
        if (!result) {
          toast.warning('Please install Metamask');
        }
      }).catch(error => toast.error(error.message));
  }, [getAccount]
  );
  
  const connectWallet = () => {
    getAccount().then(result => {
      const formattedAccount = formatAccount(result.account);
      const formattedBalance = formatBalance(result.balance);
      setWallet({rawAccount: result.account, formattedAccount, balance: formattedBalance});
    }).catch(error => {
      if (error.code === -32002) {
        toast.warning('Please reload Metamask, refresh this page and try again');
        return;
      }
      toast.error(error.message);
    });
  }

  const sendTransaction = (formData: TransferFormInputs) => {
    const {accountID, ETHValue} = formData;
    const transactionObject = prepareTransactionObject(wallet?.rawAccount as string, accountID, ETHValue);

    setIsSending(true);
    sendTransactionToMetamask(transactionObject).then((result: string) => {
      setIsSending(false);
      toast.success(`Transaction sent successfully. The hash is ${result}`);
    }).catch((error: any) => {
      setIsSending(false);
      if (error.code === 4001) {
        toast.error('You rejected the transaction');
      } else {
        toast.error(error.message);
      }
    });
  };

  return (<>
       <Header>
        <WalletConnectButton isDisabled={!isMetamaskInstalled} isConnected={Boolean(wallet)} onClick={connectWallet} defaultLabel='Connect wallet' balanceLabel={wallet?.balance} accountLabel={wallet?.formattedAccount} />
       </Header>
        <main className='main'>
          <div className='container'>
        <TransferForm isDisabled={!Boolean(wallet)} onSubmit={sendTransaction} isSending={isSending} />
    <OuterLink linkAddress={import.meta.env.VITE_REPO_URL} label='Code page' />
        </div>
    </main>
    <ToastContainer />
    </>
  )
}

export default App;
