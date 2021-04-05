// import { useState } from "react"
import React, { useState, useEffect } from 'react'
import Header from './Header'
export default function OrdinaryNode(props) {

    const [isSpinner, setSpinner] = useState(true);
    const [isSpinner1, setSpinner1] = useState(false);
    const [baseStations, setBaseStations] = useState([]);
    const [clusterNodes, setClusterNodes] = useState([]);
    const [formData, setFormData] = useState({});
    const [contract, setContract] = useState(props.contract);
    const [account, setAccount] = useState(props.account);

    const init = async () => {

        console.log("contract", contract)
        const res = await contract.methods.getBaseStations().call();
        setBaseStations(res);


    }

    const getClusterNodes = async (e) => {

        await contract.methods.getClusterNodes(e.target.value).call()
            .then((result, err) => {
                console.log(result)
                setClusterNodes(result)
            })

    }

    const displayBaseStations = baseStations.map((result, index) => {
        return <option key={index} value={result}>{result}</option>
    })
    const displayClusterNodes = clusterNodes.map((result, index) => {
        return <option key={index} value={result}>{result}</option>
    })

    const handleChange = (e) => {
        console.log({ [e.target.name]: e.target.value })
        setFormData({ ...formData, [e.target.name]: e.target.value });

    }

    const addOrdinaryNode = async (event) => {

        event.preventDefault();

        if (formData.bsname == null) {
            alert("enter Base Station Name");
        } else {
            await props.contract.methods.Request_of_Registration(formData.bsname, formData.cnname, formData.deviceId).estimateGas(async (err, r) => {

                await props.contract.methods.Request_of_Registration(formData.bsname, formData.cnname, formData.deviceId).send({ from: props.account[0], gas: r }, (err, result) => {
                    console.log(result)
                });
                const res = await props.contract.methods.getOrdinaynode(formData.bsname, formData.cnname).call();
                console.log(res)
            })
        }
    }


    useEffect(() => {
        setSpinner(false)
    }, [])

    const sp1 = <button className="btn btn-success " type="button" disabled >
        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
  Loading...
</button>

    const sp = <input type="button" name="register" value={isSpinner1 ? sp1 : "Add Node"} className="btn btn-success " />
    if (isSpinner) {
        return (
            <div className="spinner-border lg" role="status" id="spinner">
                <span className="sr-only">Loading...</span>

            </div>

        )
    } else {
        return (
            <div className="App">
                <Header />
                <br />
                <button onClick={init}>sdfssdf</button>
                <div className="container justify-content-md-center col-sm-4" >
                    <form style={{ textAlign: 'left' }} onChange={handleChange} onSubmit={addOrdinaryNode}>
                        <div class="form-group">
                            <label >Device Name</label>
                            <input type="name" class="form-control" name="deviceId" placeholder="Device Name" required />
                        </div>

                        <div class="form-group">
                            <label >Select BaseStation</label>
                            <select class="form-control" name="bsname" onChange={getClusterNodes} required>
                                <option selected value="">Select BaseStation</option>
                                {displayBaseStations}
                            </select>
                        </div>
                        <div class="form-group">
                            <label >Select Cluster Head Node</label>
                            <select class="form-control" name="cnname" required>
                                <option selected value="">Select Cluster Head Node</option>
                                {displayClusterNodes}
                            </select>
                        </div>
                        <br />
                        <button type="submit" className="btn btn-secondary ">Add Device</button>
                    </form>
                </div>
            </div>
        )
    }
}
