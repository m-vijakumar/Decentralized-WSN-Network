import React, { useEffect, useState } from "react";
// import {Link ,withRouter } from 'react-router-dom'

import { Graph } from "react-d3-graph";
import Header from "./Header";
import "./../App.css";
import { Button } from "react-bootstrap";
export default function Dashboard(props) {
  // const [userData,setUserData]=useState({});
  const [isSpinner, setSpinner] = useState(true);
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

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

    await props.contract.methods.addvalue(40).send({ from: props.account[0], gas: 22000 });
    console.log(props.account, props.contract);
    const response = await props.contract.methods.getvalue().call();
    console.log(response);
  };

  useEffect(() => {
    // getNetwork()
    setSpinner(false);

  }, []);

  // useEffect(() => {

  //   console.log(contract, account)
  // }, [web3, contract, account])
  const getNetwork = async () => {


    await props.contract.methods.getBaseStations().call()
      .then(async (res) => {

        res.map(async (basename) => {

          setNodes(nodes => [...nodes, { id: basename, color: "red", size: 700 }])

          await props.contract.methods.getClusterNodes(basename).call()
            .then(async (result) => {
              result.map(async (clustername) => {
                console.log("clustername", clustername)
                console.log("basename", clustername)

                setNodes(nodes => [...nodes, { id: basename + "  " + clustername, color: "green", size: 500 }])
                setLinks(links => [...links, { source: basename, target: basename + "  " + clustername }])

                await props.contract.methods.getOrdinaynode(basename, clustername).call()
                  .then(async (r) => {
                    r.map((deviceName) => {

                      setNodes(nodes => [...nodes, { id: basename + "  " + clustername + " " + deviceName }])
                      setLinks(links => [...links, { source: basename + "  " + clustername, target: basename + "  " + clustername + " " + deviceName }])

                    })
                  })

              })

            })
        })

        for (let index = 1; index < res.length; index++) {
          setLinks(links => [...links, { source: res[index - 1], target: res[index] }])

        }

      })




  }

  // the graph configuration, just override the ones you need
  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: "lightgreen",
      size: 550,
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
          <h1>Network</h1>
          <button className="btn ">
            <a href="/add/basestation">Generate New Base Station Node</a>
          </button>
          <button className="btn ">
            <a href="/add/clusternode">Add New Cluster Node</a>
          </button>
          <button className="btn ">
            <a href="/add/ordinarynode">Add Odinary Node</a>
          </button>
          <Graph
            id="graph-id" // id is mandatory
            data={{ nodes: nodes, links: links }}
            config={myConfig}
          // onClickNode={onClickNode}
          // onClickLink={onClickLink}
          />

        </div>
        <button onClick={getNetwork} className="btn btn-secondary">get Netwotk</button>
      </div>
    );
  }
}
