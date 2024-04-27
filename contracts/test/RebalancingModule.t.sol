// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {SafeTestTools, SafeTestLib, SafeInstance} from "safe-tools/SafeTestTools.sol";
import {SafeRebalancerModule, UnauthorizedExecutor, PriceNotReached} from "../src/RebalancingModule.sol";
import {AggregatorV3} from "../src/mocks/AggregatorV3.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CounterTest is Test, SafeTestTools {
    using SafeTestLib for SafeInstance;

    address public swapRouterAddress =
        0xE592427A0AEce92De3Edee1F18E0157C05861564;
    address public usdcWhale = 0xDa9CE944a37d218c3302F6B82a094844C6ECEb17;
    address public usdcAddress = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    address public wethAddress = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    address public executor = 0xe98cEf1748d2874F09dfFbeC69Dd571A0c02C050;

    SafeRebalancerModule public module;
    SafeInstance public safe;
    ERC20 public usdc = ERC20(usdcAddress);
    AggregatorV3 public priceAggregator;

    function setUp() public {
        priceAggregator = new AggregatorV3();

        safe = _setupSafe();

        module = new SafeRebalancerModule(
            address(priceAggregator),
            swapRouterAddress
        );

        vm.prank(usdcWhale);
        usdc.transfer(address(safe.safe), 50e6);

        safe.enableModule(address(module));

        module.addRebalanceData(usdcAddress, wethAddress, 1000);
        safe.execTransaction({
            to: address(module),
            value: 0,
            data: abi.encodeCall(
                SafeRebalancerModule.addRebalanceData,
                (usdcAddress, wethAddress, 1000)
            )
        });
        safe.execTransaction({
            to: address(module),
            value: 0,
            data: abi.encodeCall(SafeRebalancerModule.addExecutor, executor)
        });
    }

    // Happy Path

    function test_ModuleEnabled() public view {
        assert(safe.safe.isModuleEnabled(address(module)));
    }

    function test_RebalancingData() public view {
        (address tokenA, address tokenB, uint256 price) = module
            .getRebalanceData(address(safe.safe));
        assertEq(tokenA, usdcAddress);
        assertEq(tokenB, wethAddress);
        assertEq(price, 1000);
    }

    function test_Executor() public view {
        address givenExecutor = module.getExecutor(address(safe.safe));
        assertEq(executor, givenExecutor);
    }

    function test_ExecuteRebalancing() public {
        priceAggregator.setPrice(1100);
        vm.prank(executor);
        module.executeRebalance(safe.safe);
        assertEq(usdc.balanceOf(address(safe.safe)), 0);
    }

    // Sad Path

    function test_NotExecutor() public {
        priceAggregator.setPrice(1100);
        vm.prank(address(0));
        vm.expectRevert(abi.encodeWithSelector(UnauthorizedExecutor.selector));
        module.executeRebalance(safe.safe);
    }

    function test_PriceNotReached() public {
        priceAggregator.setPrice(900);
        vm.prank(executor);
        vm.expectRevert(abi.encodeWithSelector(PriceNotReached.selector));
        module.executeRebalance(safe.safe);
    }
}
