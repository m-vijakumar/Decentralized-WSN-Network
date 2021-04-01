// import { useState } from "react"
import React, {useState} from 'react'
import  { Dropdown, DropdownButton } from 'react-bootstrap'
import Header from './Header'
export default function OrdinaryNode() {

    const [isSpinner,setSpinner] =useState(true);
    const [isSpinner1,setSpinner1] =useState(false);

    const sp1 =  <button className="btn btn-success " type="button" disabled>
  <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
  Loading...
</button>
    const sp =  <input type="button" name="register"  value={isSpinner1 ? sp1 :"Add Node"} className="btn btn-success " />

    return (
        <div className="App">
            <Header />
            <br />
            <table className="login"  >
                <tbody>
                    <tr>
                        <td><p>Device Id  : </p></td><td><input type="text" name="username" /></td>
                    </tr>
                    
                    <tr>
                        <td><p>Select BaseStation Id  : </p></td><td><DropdownButton id="dropdown-item-button" title="BaseStaction">
                        
                        <Dropdown.Item as="button">BaseStaction 1</Dropdown.Item>
                        <Dropdown.Item as="button">BaseStaction 2</Dropdown.Item>
                        
                    </DropdownButton></td>
                    </tr>
                    <tr>
                        <td><p>Select Cluster Id  : </p></td><td><DropdownButton id="dropdown-item-button" title="ClusterHeadNode">
                       
                        <Dropdown.Item as="button">ClusterId 1</Dropdown.Item>
                        <Dropdown.Item as="button">ClusterId 2</Dropdown.Item>
                        
                    </DropdownButton></td>
                    </tr>
<br />
                    <tr>
                        <td colSpan="2"><p >{isSpinner1 ? sp1 :sp }</p></td>
                    </tr>
                </tbody>
        </table>
           
        
        </div>
    )
}
