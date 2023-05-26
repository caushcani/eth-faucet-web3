import "./App.css";
import { useEffect, useState } from "react";
import TsxManager from "./utils/TsxManager";
import useWeb3Provider from "./hooks/useWeb3Provider";

function App() {
  const { web3Provider, contract } = useWeb3Provider();
  // const [faucetContract, setFaucetContract] = useState<any>(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const ADDR = "0xf9570CBf7E7B2B7Caf97f1b5cfD61535B0A5eC0d";

  const getAccounts = async () => {
    if (web3Provider?.web3) {
      const acc = await web3Provider.web3?.eth.getAccounts();
      if (acc) {
        setAccount(acc[0]);
      }
      const contractB = await web3Provider.web3.eth.getBalance(ADDR);
      if (contractB) {
        setBalance(contractB);
      }
    }
  };

  const handleWithdraw = async () => {
    if (contract && web3Provider.web3) {
      const newContract = new web3Provider.web3.eth.Contract(
        contract.abi,
        ADDR
      );
      const res = await newContract.methods.withdraw().send({
        from: account,
        value: "10000000000000000000",
      });
      // const res = await web3Provider.web3.eth.sendTransaction({
      //   from: ADDR,
      //   to: account,
      //   value: "1000000000000000000",
      // });

      console.log("RES", res);
    }
  };

  const donate = async () => {
    if (contract && web3Provider.web3) {
      const res = await web3Provider.web3.eth.sendTransaction({
        from: account,
        to: ADDR,
        value: "10000000000000000000",
      });

      console.log("RES", res);
    }
  };
  useEffect(() => {
    if (web3Provider.web3) {
      getAccounts();
    }
  }, [web3Provider.web3]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          {!account && (
            <button className="btn btn-primary" onClick={() => getAccounts()}>
              Connect wallet
            </button>
          )}

          <div className="d-flex justify-content-center flex-column gap-2">
            <h3>Your account: {account}</h3>
            <h4>Balance: {TsxManager.getEthFromWei(balance)}ETH</h4>
          </div>
          <div className="d-flex gap-2 justify-content-center">
            <button className="btn btn-success" onClick={() => donate()}>
              Deposit
            </button>
            <button className="btn btn-danger" onClick={() => handleWithdraw()}>
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
