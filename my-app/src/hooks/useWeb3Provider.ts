import { useEffect, useState } from "react";
import Web3 from "web3";
import ContractManager from "../utils/ContractManager";

interface IProvider {
  web3: any;
}

const useWeb3Provider = () => {
  const [web3Provider, setWeb3Provider] = useState<IProvider>(Object);
  const [contract, setContract] = useState<any>(null);

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

    //load contract
    const res = await ContractManager.getContract("FaucetContract");
    if (res) {
      setContract(res);
    }
  };
  useEffect(() => {
    initializeProvider();
  }, []);

  return { web3Provider, contract };
};
export default useWeb3Provider;
