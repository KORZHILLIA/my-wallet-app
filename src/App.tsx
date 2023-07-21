import { useState, useEffect } from 'react';

import detectMetamask from 'service/metamask/detectMetamask';
import getAccount from 'service/metamask/getAccount';
import formatBalance from 'helpers/formatBalance';
import formatAccount from 'helpers/formatAccount';

import type { Wallet } from 'constants/types';
import './App.css';

function App() {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState<boolean>(false);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    detectMetamask().then(result => setIsMetamaskInstalled(result));
  }, []
  );

  const connectWallet = async () => {
    await getAccount().then(result => {
      const formattedAccount = formatAccount(result.account);
      const formattedBalance = formatBalance(result.balance);
      setWallet({account: formattedAccount, balance: formattedBalance});
    });
  }

  return (<>
      <div>
        <button disabled={!isMetamaskInstalled} onClick={connectWallet}>{wallet ? `${wallet.account} ${wallet.balance}` : 'Connect wallet'}</button>
      </div>
    </>
  )
}

export default App;
