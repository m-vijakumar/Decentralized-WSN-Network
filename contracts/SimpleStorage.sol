// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
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
