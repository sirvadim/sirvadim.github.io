pragma solidity ^0.4.18;

contract ERC20Interface {
    function transfer(address _to, uint256 _value) public;
    function transferFrom(address _from, address _to, uint256 _value) public returns(bool success);
    function balanceOf(address _owner) public constant returns (uint256 balance);
    function allowance(address _owner, address _spender) public constant returns (uint256 remaining);
}

contract RefInterface {
    function getService(address _player) public constant returns(address _operator, address _referrer);
}