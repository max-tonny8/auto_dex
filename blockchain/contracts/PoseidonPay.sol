// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PoseidonPay is Ownable, Pausable, ReentrancyGuard {
    IERC20 public acceptedToken;
    uint256 public monthlyAmount = 0.001 ether;
    uint256 private constant thirtyDaysInSeconds = 24 * 30 * 60 * 60;

    mapping(address => uint) public payments; // customer => last payment timestamp
    address[] public customers;

    constructor() Ownable(msg.sender) {
        acceptedToken = IERC20(0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9); // Sepolia WETH
    }

    event Paid(address indexed custoner, uint timestamp, uint amount);

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function getCustomers() external view returns (address[] memory) {
        return customers;
    }

    function setAcceptedToken(address tokenAddress) external onlyOwner {
        acceptedToken = IERC20(tokenAddress);
    }

    function setMonthlyAmount(uint newAmount) external onlyOwner {
        monthlyAmount = newAmount;
    }

    function withdraw(uint amount) external onlyOwner {
        uint balance = acceptedToken.balanceOf(address(this));
        require(balance >= amount, "Insufficient balance");
        acceptedToken.transfer(owner(), amount);
    }

    function pay(address customer) onlyOwner nonReentrant whenNotPaused {
        bool thirtyDaysHavePassed = payments[customer] <= block.timestamp;
        bool isFirstPayment = payments[customer] == 0;
        bool hasAmount = acceptedToken.balanceOf(customer) >= monthlyAmount;
        bool gavePermission = acceptedToken.allowance(
            customer,
            address(this)
        ) >= monthlyAmount;
        bool isTimeToPay = thirtyDaysHavePassed || isFirstPayment;

        if (!isTimeToPay) return;

        if (!hasAmount || !gavePermission) {
            revert("Insufficient balance and/or allowance");
        }

        acceptedToken.transferFrom(customer, address(this), monthlyAmount);

        if (isFirstPayment) {
            customers.push(customer);
        }

        payments[customer] = block.timestamp + thirtyDaysHavePassed;

        emit Paid(customer, block.timestamp, monthlyAmount);
    }
}
