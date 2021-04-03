import React, { useState, useEffect } from 'react'
import { Dropdown, DropdownButton, InputGroup } from 'react-bootstrap'
import Header from './Header'
export default function ClusterNode(props) {

    const [baseStations, setBaseStations] = useState([]);
    const [displayDropBox, setDisplayDropBox] = useState(false)

    const [formData, setFormData] = useState({})
    const [contract, setContract] = useState(props.contract);
    const [account, setAccount] = useState(props.account);

    const init = async () => {

        console.log("contract", contract)
        const res = await contract.methods.getBaseStations().call();
        setBaseStations(res);
        console.log(res)
        setDisplayDropBox(true)
    }



    const displayBaseStations = baseStations.map((result, index) => {
        return <option key={index} value={result}>{result}</option>
    })

    const handleChange = (e) => {
        console.log({ [e.target.name]: e.target.value })
        setFormData({ ...formData, [e.target.name]: e.target.value });

    }

    const addClusterNode = async (event) => {

        event.preventDefault();

        if (formData.bsname == null) {
            alert("enter Base Station Name");
        } else {
            await props.contract.methods.verifyClusterNode(formData.bsname, formData.cnname).estimateGas(async (err, r) => {

                await props.contract.methods.verifyClusterNode(formData.bsname, formData.cnname).send({ from: props.account[0], gas: r }, (err, result) => {
                    console.log(result)
                });
                const res = await props.contract.methods.getClusterNodes(formData.bsname).call();
                console.log(res)
            })

        }
    }

    return (
        <div className="App">
            <Header />
            <br />
            <button className="btn btn-success " style={{ display: displayDropBox ? "none" : "" }} onClick={init}> GetBaseStations</button>

            <form onChange={handleChange} onSubmit={addClusterNode}>

                <select name="bsname" style={{ display: displayDropBox ? "" : "none" }}>
                    {displayBaseStations}
                </select>

                <br></br>
                <input type="text" name="cnname" />

                <button className="btn btn-success " type="submit"> Add Cluster Node </button>
            </form>


        </div >
    )
}
