import Web3 from "web3";
import "./App.css";
import { useEffect, useState } from "react";
import TsxManager from "./utils/TsxManager";
import useWeb3Provider from "./hooks/useWeb3Provide";

function App() {
  const web3Provider = useWeb3Provider();
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);

  const getAccounts = async () => {
    if (web3Provider?.web3) {
      const acc = await web3Provider.web3?.eth.getAccounts();
      if (acc) {
        setAccount(acc[0]);
        const balanceFromAddress = await web3Provider.web3.eth.getBalance(
          acc[0]
        );
        setBalance(balanceFromAddress);
      }
    }
  };

  useEffect(() => {
    getAccounts();
  }, [web3Provider.web3]);

  return (
    <div className="container text-center">
      {!account && (
        <button className="btn btn-primary" onClick={() => getAccounts()}>
          Connect wallet
        </button>
      )}

      <h3>Your account: {account}</h3>
      <h4>Balance: {TsxManager.getEthFromWei(balance)}ETH</h4>
      <div className="d-flex gap-2 justify-content-center">
        <button className="btn btn-success">Deposit</button>
        <button className="btn btn-danger">Withdraw</button>
      </div>
    </div>
  );
}

export default App;
