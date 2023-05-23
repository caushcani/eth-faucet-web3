import Web3 from "web3";
import "./App.css";
import { useEffect, useState } from "react";

interface IProvider {
  web3: any;
  provider: Object;
}

function App() {
  const [web3Provider, setWeb3Provider] = useState<IProvider | null>(null);

  const handleConnectWallet = () => {};

  //if there's already a provider, go with it, else use Web3 object.
  const getProvider = async () => {
    let provider = null;
    if (window?.ethereum) {
      provider = window?.ethereum;
    } else if (window?.web3) {
      provider = window.web3.currentProvider;
    } else {
      provider = new Web3.providers.HttpProvider("http://localhost:7545");
    }
    setWeb3Provider({
      web3: new Web3(provider),
      provider: provider,
    });
  };

  const getAccounts = async () => {
    if (web3Provider?.web3) {
      const acc = await web3Provider.web3?.eth.getAccounts();
      debugger;
    }
  };

  useEffect(() => {
    getProvider();
    getAccounts();
  }, []);

  return (
    <div className="App">
      <button onClick={() => handleConnectWallet()}>Connect wallet</button>
    </div>
  );
}

export default App;
