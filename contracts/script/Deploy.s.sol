// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {AggregatorV3} from "../src/mocks/AggregatorV3.sol";
import {SafeRebalancerModule} from "../src/RebalancingModule.sol";

contract CounterScript is Script {
    address public swapRouterAddress =
        0xE592427A0AEce92De3Edee1F18E0157C05861564;

    function run() public {
        vm.startBroadcast();

        AggregatorV3 priceAggregator = new AggregatorV3();

        SafeRebalancerModule mod = new SafeRebalancerModule(
            address(priceAggregator),
            swapRouterAddress
        );

        vm.stopBroadcast();

        console2.log(address(mod));
    }
}
