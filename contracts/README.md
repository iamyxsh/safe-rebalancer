# Contracts

This section holds the contracts required for the App.

## Components

There are 2 major contracts :-

1. [Rebalancing Module](https://github.com/iamyxsh/safe-rebalancer/blob/master/contracts/src/RebalancingModule.sol)
2. [Mock Aggregator](https://github.com/iamyxsh/safe-rebalancer/blob/master/contracts/src/mocks/AggregatorV3.sol)

## Rebalancing Module

This is a Safe Module that can be enabled in any Safe. This module will execute transaction (swap) when the parameters are reached. Please visist the [contract](https://github.com/iamyxsh/safe-rebalancer/blob/master/contracts/src/RebalancingModule.sol) code to know more about the technical details.

## Aggregator V3

This is a mock contract that acts as a ChainLink price feed. For forked mainnet, I have added a custom function that changes the price and mimics the market.

```solidity
    function setPrice(int256 _price) external {
        price = _price;
    }
```

## Deployment

To deploy the Rebalancer Module and Aggregator contracts

```bash
  forge script script/Deploy.s.sol:DeployScript --broadcast --rpc-url <node url to your forked mainnet> --private-key <your private key>
```
