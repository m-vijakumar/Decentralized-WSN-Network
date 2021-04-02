// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;


contract ClusterHeadNode {

  
  mapping(string => string[]) headnodes;

  function addClusterNode() public {
      
        // headnodes[] ;
        
    }
    
    function getClusterNodes(string memory _name) public view returns(string[] memory){
        return headnodes[_name];
    }

}

contract BaseStations is ClusterHeadNode {

  struct BaseStation {
      
    //   string name;
      string[] ClusterHeadNodes;
  }
  mapping(string => BaseStation) basestations;

  string[] allbasestations;
  
  function addBaseStation(string memory _name) public {
        basestations[_name].ClusterHeadNodes.push('ch1');
        allbasestations.push(_name);
        
    }
    
    function getBaseStations() public view returns(string[] memory){     
        return allbasestations;
    }
    
    function verifyBaseStation(string memory _name) internal returns(bool){
        
        for(uint i=0 ; i<allbasestations.length ;i++){
            if(keccak256(bytes(_name)) == keccak256(bytes(allbasestations[i]))){
            return true;
            }
        }
        return false;
    }
    function verifyClusterNode(string memory  _basename , string memory _clustername) public {
        
        if(verifyBaseStation(_basename) == true){
            for(uint i=0 ; i<basestations[_basename].ClusterHeadNodes.length ;i++){
                if(keccak256(bytes(_clustername)) == keccak256(bytes(basestations[_basename].ClusterHeadNodes[i]))){
                    // return basestations[_basename].ClusterHeadNodes[i];
                    revert("cluster node already exits");
                }
            }
             basestations[_basename].ClusterHeadNodes.push(_clustername);
        }else{
            revert("basestations not exist");
        }
    }

}

contract SimpleStorage is BaseStations {
  uint storedData;
  uint[] public arr = [20,30,40];

  function addvalue(uint x) public{
    arr.push(x);
  }

  function getvalue() public view returns(uint[] memory ){
    return arr;
  }
  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}