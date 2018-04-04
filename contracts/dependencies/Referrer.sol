pragma solidity ^0.4.17;

/**
@title Referrer Contract
*/
contract Referrer {

    mapping(address => address) public referrerOf;
    mapping(address => address) public operatorOf;
    mapping(address => uint) public referrerCount;
    mapping(address => uint) public operatorCount;

    /** 
    @notice Get address of operator and referrer
    @param _player Address of player
    @return {
      "_operator": "The operator address to receive a reward",
      "_referrer": "The referrer address to receive a reward"
    }
    */
    function getService(address _player) public view returns(address _operator, address _referrer) {
        return (operatorOf[_player], referrerOf[_player]);
    }

    /**
    @notice Player registration
    @param _player Player address
    @param _operator Operator address
    @param _referrer Referrer address
    */
    function setService(address _player, address _operator, address _referrer) public {
        require(msg.sender == _operator);
        require(_operator != address(0));
        require(referrerOf[_player] == address(0)); 
        require(operatorOf[_player] == address(0));

        referrerCount[_referrer]++;
        operatorCount[_operator]++;

        if (_referrer != address(0)) {
            referrerOf[_player] = _referrer;
        } else {
            referrerOf[_player] = _operator;   
        }
        operatorOf[_player] = _operator;
    }
}