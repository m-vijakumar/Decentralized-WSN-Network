import React, { useState } from 'react'
import Header from './Header';

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

                await props.contract.methods.Request_of_Registration(bsname).send({ from: props.account[0], gas: r + 1000 }, (err, result) => {
                    console.log(result)
                });
                const res = await props.contract.methods.getBaseStations().call();
                console.log(res)
            })
        }
    }
    return (
        <div>
            <Header />

            <div className="container justify-content-md-center col-sm-4" >
                <form style={{ textAlign: 'left' }} onSubmit={addNewBaseStaion}>
                    <div class="form-group">
                        <label >Base Station Name</label>
                        <input type="name" class="form-control" name="bsname" onChange={handleChange} placeholder="Base Station Name" required />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-secondary ">Genrate New BaseStation</button>
                </form>
            </div>

        </div>
    )
}
