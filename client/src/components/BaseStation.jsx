import React, { useState } from 'react'

export default function BaseStation(props) {

    const [bsname, setbsname] = useState(null);

    const handleChange = (e) => {
        setbsname(e.target.value);
    }
    const addNewBaseStaion = async (event) => {

        event.preventDefault();

        if (bsname == null) {
            alert("enter Base Station Name");
        } else {
            await props.contract.methods.Request_of_Registration(bsname).estimateGas(async (err, r) => {

                await props.contract.methods.Request_of_Registration(bsname).send({ from: props.account[0], gas: r + 100 }, (err, result) => {
                    console.log(result)
                });
                const res = await props.contract.methods.getBaseStations().call();
                console.log(res)
            })
        }
    }
    return (
        <div>
            <form onSubmit={addNewBaseStaion}>
                <input type="text" name="BSname" onChange={handleChange} />
                <input type="submit" name="Add New BaseStaion" />
            </form>
        </div>
    )
}
