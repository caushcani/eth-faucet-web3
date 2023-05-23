import { useEffect, useState } from "react";
import Web3 from "web3";

interface IProvider {
  web3: any;
}

const useWeb3Provider = () => {
  const [web3Provider, setWeb3Provider] = useState<IProvider>(Object);
  const initializeProvider = async () => {
    let provider = null;
    if (window?.ethereum) {
      provider = window?.ethereum;
      await provider.request({ method: `eth_requestAccounts` });
    } else if (window?.web3) {
      provider = window.web3.currentProvider;
    } else {
      provider = new Web3.providers.HttpProvider("http://localhost:7545");
    }
    setWeb3Provider({
      web3: new Web3(provider),
    });
  };
  useEffect(() => {
    initializeProvider();
  }, []);

  return web3Provider;
};
export default useWeb3Provider;
