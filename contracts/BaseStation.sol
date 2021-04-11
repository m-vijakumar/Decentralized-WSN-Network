pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;
 
contract ClusterHeadNode{

  struct ClusterNode {
      
      mapping(string => string[]) ordinarynodes;
  }
  mapping(string =>  mapping(string => string[])) clusternodes;

  function addClusterNode(string memory  _basename , string memory _clustername) internal {
      
        clusternodes[_basename][_clustername];
        
    }
    
  function addOrdinayNode(string memory  _basename , string memory _clustername, string memory  _devicename)internal {
      clusternodes[_basename][_clustername].push(_devicename);
  }
    
  function getOrdinaynode(string memory _basename , string memory _clustername ) public view returns(string[] memory ){
        return clusternodes[_basename][_clustername];
    }
    
  function verifyOrdinayNode(string memory  _basename , string memory _clustername, string memory  _devicename) internal  returns(bool){
        //pending
        for(uint i=0 ; i<clusternodes[_basename][_clustername].length ;i++){
            
            log0(
                bytes32(clusternodes[_basename][_clustername].length)
                );
            
            if(keccak256(bytes(_devicename)) == keccak256(bytes(clusternodes[_basename][_clustername][i]))){
                
                log0(
                    bytes32("true")
                    );
            return true;
            }
        }
        return false;
    }
    
  function Request_of_Verify(string memory  _basename , string memory _clustername, string memory  _devicename)internal {
      
      if(verifyOrdinayNode(_basename , _clustername, _devicename) == true){
          
          log0(
              bytes32("Device Alreay Exits")
              );
          revert("Device Alreay Exits");
      }
      
      addOrdinayNode(_basename , _clustername, _devicename);
      
  }
    
}


contract BaseStation is ClusterHeadNode {

  struct BaseStation {
      
    //   string name;
      string[]  ClusterHeadNodes;
  }
  mapping(string => BaseStation) basestations;


  string[] allbasestations;
  
  function addBaseStation(string memory _name) internal {
        basestations[_name];
        allbasestations.push(_name);
        
    }
    
    
  function getBaseStations() public view returns(string[] memory){     
      return allbasestations;
  }
    
    
  function verifyBaseStation(string memory _name) internal view returns(bool){
        
        for(uint i=0 ; i<allbasestations.length ;i++){
            if(keccak256(bytes(_name)) == keccak256(bytes(allbasestations[i]))){
            return true;
            }
        }
        return false;
    }
    
    
  function verifyClusterNode(string memory  _basename , string memory _clustername) internal view returns(bool){
        
        if(verifyBaseStation(_basename) == true){
            for(uint i=0 ; i<basestations[_basename].ClusterHeadNodes.length ;i++){
                if(keccak256(bytes(_clustername)) == keccak256(bytes(basestations[_basename].ClusterHeadNodes[i]))){
                   
                    return true;
                    
                }
            }
            
             return false;
             
        }else{
            revert("basestations not exist");
        }
    }
    
    
  function getClusterNodes(string memory _name) public view returns(string[] memory ){
        return basestations[_name].ClusterHeadNodes;
    }

    
  function Request_of_Registration(string memory  _basename )public {
      
       if(verifyBaseStation(_basename) == true){
           revert("BaseStation already exits");
      }
      
      addBaseStation(_basename);
  }
  
  
  function Request_of_Registration(string memory  _basename , string memory _clustername )public {
      
      if(verifyClusterNode(_basename , _clustername) == true){
          revert("cluster node already exits");
          
      }
      basestations[_basename].ClusterHeadNodes.push(_clustername);
      addClusterNode(_basename, _clustername);
  }
  
  
  function Request_of_Registration(string memory  _basename , string memory _clustername, string memory  _devicename)public {
      
      if(verifyClusterNode(_basename , _clustername) == true){
           Request_of_Verify(_basename , _clustername, _devicename);
      }
     
  }
  
  function Request_of_Connection(string memory  _basename , string memory _clustername, string memory  _devicename , string memory _device2 )public{
      
      if(verifyClusterNode(_basename, _clustername) == true){
          if(Request_of_Verify(_basename , _clustername, _devicename)== true){
              //drgxdfgf
          }
      }
  }
    
    //genrate public key and private key 

    
    
    // hash device id

    function device_Hash(string memory _deviceID) returns(bytes32 memory hash_id){

        bytes32 hash_Id = keccak256(_deviceID);
    }

}
