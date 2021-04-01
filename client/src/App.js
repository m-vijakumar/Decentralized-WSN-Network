import React, { useState, useEffect } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import OrdinaryNode from "./components/OrdinaryNode";
import ClusterNode from "./components/ClusterNode";

export default function App() {

  const [account, setAccount] = useState();
  const [contract, setContract] = useState();
  const [web3, setWeb3] = useState();

  const runExample = async () => {
    // const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.addvalue(40).send({ from: accounts[0], gas: 22000 });
    console.log(account, contract);
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getvalue().call();

    // Update state with the result.
    console.log(account, contract);
    console.log(response);
    // this.setState({ storageValue: response });
  };


  const init = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = await SimpleStorageContract.networks[networkId];
      const instance = await new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

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

  // useEffect(() => {

  //   const load = async () => {

  //   }

  //   if (typeof web3 !== 'undefined'
  //     && typeof account !== 'undefined'
  //     && typeof contract !== 'undefined') {
  //     load();
  //   }

  // }, [web3, account, contract])

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  } else {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={Home} web3={account, contract} />
          <Route exact path="/login" component={Login} web3={account, contract} />
          <Route exact path="/register" component={Register} web3={account, contract} />
          <Route exact path="/dashboard" component={() => <Dashboard account={account} contract={contract} />} />
          <Route exact path="/add/ordinarynode" component={OrdinaryNode} web3={account, contract} />
          <Route exact path="/add/clusternode" component={ClusterNode} web3={account, contract} />
        </Router>
      </div>
    );
  }
}

