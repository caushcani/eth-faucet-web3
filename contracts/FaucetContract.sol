// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.8.17 and less than 0.9.0
pragma solidity >=0.8.17 <0.9.0;

contract FaucetContract {
    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    //withdraw  eth
    function withdraw() external payable {
        address payable receiver = payable(msg.sender);
        //1 ether = 1000000000000000000 wei
        payable(receiver).transfer(1000000000000000000);
    }
}
