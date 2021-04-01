import React, { useEffect, useState } from "react";
// import {Link ,withRouter } from 'react-router-dom'

import { Graph } from "react-d3-graph";
import Header from "./Header";
import "./../App.css";
import { Button } from "react-bootstrap";
export default function Dashboard(props) {
  // const [userData,setUserData]=useState({});
  const [isSpinner, setSpinner] = useState(true);

  const userlog = async () => {
    try {
      const resp = await fetch("/dashboard");
      const data = await resp.json();
      if (data.success === false) {
        props.history.push("/login");
      }
    } catch (e) {
      console.log(e);
      props.history.push("/login");
    }
  };
  const runExample = async () => {
    // const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.addvalue(40).send({ from: accounts[0], gas: 22000 });
    console.log(props.account, props.contract);
    // Get the value from the contract to prove it worked.
    const response = await props.contract.methods.getvalue().call();

    // Update state with the result.
    // console.log(account, contract);
    console.log(response);
    // this.setState({ storageValue: response });
  };
  useEffect(() => {
    // console.log("sssss")
    // userlog();

    setSpinner(false);


  }, []);
  const data = {
    nodes: [
      { id: "BS1", color: "red", size: 700 },
      { id: "BS2", color: "red", size: 700 },
      { id: "CH1", color: "green", size: 500 },
      { id: "CH2", color: "green", size: 500 },
      { id: "OD1" },
      { id: "OD2" },
    ],
    links: [
      { source: "CH1", target: "OD1" },
      { source: "CH1", target: "OD2" },
      { source: "CH1", target: "BS1" },
      { source: "BS2", target: "CH2" },
      { source: "BS2", target: "BS1" },
    ],
  };

  // the graph configuration, just override the ones you need
  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: "lightgreen",
      size: 220,
      highlightStrokeColor: "blue",
    },
    link: {
      highlightColor: "blue",
    },
  };

  //   const onClickNode = function(nodeId) {
  //     window.alert(`Clicked node ${nodeId}`);
  //   };

  //   const onClickLink = function(source, target) {
  //     window.alert(`Clicked link between ${source} and ${target}`);
  //   };

  if (isSpinner) {
    return (
      <div className="spinner-border " role="status" id="spinner">
        <span className="sr-only">Loading...</span>
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <div className="App">
          <h1>{console.log(props)}</h1>
          <button className="btn ">
            <a href="/add/ordinarynode">Generate New Base Station Node</a>
          </button>
          <button className="btn ">
            <a href="/add/clusternode">Add New Cluster Node</a>
          </button>
          <button className="btn ">
            <a href="/add/ordinarynode">Add Odinary Node</a>
          </button>
          <Graph
            id="graph-id" // id is mandatory
            data={data}
            config={myConfig}
          // onClickNode={onClickNode}
          // onClickLink={onClickLink}
          />
          ;
        </div>
        <button onClick={runExample}>onclick</button>
      </div>
    );
  }
}
