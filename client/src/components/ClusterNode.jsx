import React from 'react'
import  { Dropdown, DropdownButton } from 'react-bootstrap'
import Header from './Header'
export default function ClusterNode() {

    const addClusterNode =()=>{

        const response = fetch("",{

        },
        )
    }
    
    return (
        <div className="App">
            <Header />
            <br />
            <DropdownButton id="dropdown-item-button" title="Dropdown button">
                <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
                <Dropdown.Item as="button">BaseStaction 1</Dropdown.Item>
                <Dropdown.Item as="button">BaseStaction 2</Dropdown.Item>
                
            </DropdownButton>
            <br></br>
            <button className="btn btn-success " onClick={addClusterNode}> Add Cluster Node </button>
        
        </div>
    )
}
