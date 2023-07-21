import detectEthereumProvider from '@metamask/detect-provider';

const detectMetamask = async () => {
    const provider = await detectEthereumProvider({silent: true});
    return provider ? true : false;
};

export default detectMetamask;