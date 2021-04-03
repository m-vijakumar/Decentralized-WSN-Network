import React, { useState, useEffect } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import BaseStationContract from "./contracts/BaseStation.json"
import getWeb3 from "./getWeb3";

import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import OrdinaryNode from "./components/OrdinaryNode";
import ClusterNode from "./components/ClusterNode";
import BaseStation from "./components/BaseStation";

export default function App() {

  const [account, setAccount] = useState();
  const [contract, setContract] = useState();
  const [web3, setWeb3] = useState();

  const init = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = await BaseStationContract.networks[networkId];
      const instance = await new web3.eth.Contract(

        BaseStationContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      console.log(instance)
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      setWeb3(web3);
      setAccount(accounts);
      setContract(instance);


      // this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
    // runExample();
  };



  useEffect(() => {
    init()
  }, [])

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  } else {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={() => <Dashboard account={account} contract={contract} web3={web3} />} />
          <Route exact path="/add/ordinarynode" component={() => <OrdinaryNode account={account} contract={contract} />} />
          <Route exact path="/add/clusternode" component={() => <ClusterNode account={account} contract={contract} />} />
          <Route exact path="/add/basestation" component={() => <BaseStation account={account} contract={contract} />} />
        </Router>
      </div>
    );
  }
}

