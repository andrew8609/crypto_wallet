// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract EtherWallet {
    address payable public owner;
    address[] blackList;

    // Events fire whenever deposit or withdrawal is made
    event DepositEvent(address _sender, uint amount, address recipient);
    event WithdrawalEvent(address _sender, uint amount, address recipient);

    constructor () {
        owner = payable(msg.sender);
    }

    receive() external payable {}

    function addBlacklist(address _addr) external {
        blackList.push(_addr);
    }

    function getBlackList() external view returns (address[] memory){
        return blackList;
    }    

    // function withdraw(uint256 _amount) payable external {
    //     require(msg.sender == owner, "caller is not owner");
    //     (bool sent, bytes memory data) = payable (msg.sender).call{value: msg.value}("");
    //     require(sent, "Failed to send Ether");
    // }

    function getBalance() external view returns (uint){
        return address(this).balance;        
    }

}
