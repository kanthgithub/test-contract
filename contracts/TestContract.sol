pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract TestContract {
    mapping(address => uint) public deposits;

    function deposit(uint amount) public payable {
        require(
            amount == msg.value,
            "deposit amount must match msg.value"
        );

        deposits[msg.sender] = deposits[msg.sender] + amount;
    }

    function revertForNoReason(bytes32 signedMessage, uint8 _v, bytes32 _r, bytes32 _s) public {
        require(
            ecrecover(signedMessage, _v, _r, _s) == msg.sender,
            "No reason"
        );
    }
}