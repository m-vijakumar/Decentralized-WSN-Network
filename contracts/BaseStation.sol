pragma solidity >=0.4.21 <0.7.0;

pragma experimental ABIEncoderV2;
  
contract ClusterHeadNode {

  struct ClusterNode {
      
      mapping(string => string[]) ordinarynodes;
  }
  mapping(string =>  mapping(string => string[])) clusternodes;



  function addClusterNode(string memory  _basename , string memory _clustername) internal {
      
        clusternodes[_basename][_clustername];
        
    }
    

  function addOrdinayNode(string memory  _basename , string memory _clustername, string memory  _devicename)public {
      clusternodes[_basename][_clustername].push(_devicename);
  }
    
    function getOrdinaynode(string memory _name , string memory _clustername ) public returns(string[] memory ){
        return clusternodes[_name][_clustername];
    }
    
    

}



contract BaseStation is ClusterHeadNode {

  struct BaseStation {
      
    //   string name;
      string[] ClusterHeadNodes;
  }
  mapping(string => BaseStation) basestations;


  string[] allbasestations;
  
  function addBaseStation(string memory _name) public {
        basestations[_name];
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
             addClusterNode(_basename, _clustername);
        }else{
            revert("basestations not exist");
        }
    }
    
    function getClusterNodes(string memory _name) public returns(string[] memory ){
        return basestations[_name].ClusterHeadNodes;
    }
    

}

