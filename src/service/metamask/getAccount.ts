const getAccount = async () => {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
    const account = accounts[0];
    const balance = await window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']});
return {account, balance};    
};

export default getAccount;