// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/console2.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {Safe} from "safe-contracts/Safe.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {Enum} from "safe-contracts/common/Enum.sol";

struct RebalanceData {
    address tokenA;
    address tokenB;
    uint256 price;
}

error UnauthorizedExecutor();
error PriceNotReached();

contract SafeRebalancerModule {
    string private constant NAME = "Rebalancer Module";
    string private constant VERSION = "0.1.0";

    AggregatorV3Interface internal immutable dataFeed;
    ISwapRouter internal immutable swapRouter;

    // Safe -> Rebalance Data
    mapping(address => RebalanceData) private rebalanceData;
    // Safe -> Executor Address
    mapping(address => address) private executors;

    constructor(address priceFeed, address _swapRouter) {
        dataFeed = AggregatorV3Interface(priceFeed);
        swapRouter = ISwapRouter(_swapRouter);
    }

    modifier onlyExecutor(address safe) {
        if (executors[safe] != msg.sender) {
            revert UnauthorizedExecutor();
        }
        _;
    }

    function getName() public pure returns (string memory) {
        return NAME;
    }

    function getVersion() public pure returns (string memory) {
        return VERSION;
    }

    function getRouterAddress() public view returns (address) {
        return address(swapRouter);
    }

    function getPriceFeed() public view returns (address) {
        return address(dataFeed);
    }

    function getRebalanceData(
        address safe
    ) external view returns (address, address, uint256) {
        RebalanceData memory data = rebalanceData[safe];
        return (data.tokenA, data.tokenB, data.price);
    }

    function getExecutor(address safe) public view returns (address) {
        return executors[safe];
    }

    function addRebalanceData(
        address tokenA,
        address tokenB,
        uint256 price
    ) external {
        RebalanceData memory data = RebalanceData(tokenA, tokenB, price);
        rebalanceData[msg.sender] = data;
    }

    function addExecutor(address _executor) external {
        executors[msg.sender] = _executor;
    }

    function executeRebalance(
        Safe _safe
    ) external onlyExecutor(address(_safe)) {
        RebalanceData memory data = rebalanceData[address(_safe)];

        if (int256(data.price) >= getPrice()) {
            revert PriceNotReached();
        }

        uint256 balance = IERC20(data.tokenA).balanceOf(address(_safe));

        _safe.execTransactionFromModule(
            data.tokenA,
            0,
            abi.encodeCall(IERC20.approve, (address(this), balance)),
            Enum.Operation.Call
        );

        IERC20(data.tokenA).transferFrom(
            address(_safe),
            address(this),
            balance
        );

        IERC20(data.tokenA).approve(address(swapRouter), balance);

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: data.tokenA,
                tokenOut: data.tokenB,
                fee: 3000,
                recipient: address(_safe),
                deadline: block.timestamp,
                amountIn: balance,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        swapRouter.exactInputSingle(params);
    }

    function getPrice() internal view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        return answer;
    }
}
