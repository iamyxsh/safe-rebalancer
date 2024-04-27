# Safe Rebalancer

This is a POC of an app that can automatically change the balance of the tokens in a Gnosis Safe wallet if certain triggers are met.

## Architecture

![Architecture](./visuals/Architecture.png)

## Components

1. [Contracts](https://github.com/iamyxsh/safe-rebalancer/tree/master/contracts)
2. [Server](https://github.com/iamyxsh/safe-rebalancer/tree/master/server)
3. [Script](https://github.com/iamyxsh/safe-rebalancer/tree/master/scripts)

## Running Tests

To run tests, run the following command

```bash
  cd contracts && forge test --rpc-url <your node URL to forked mainnet>
```

## Features

[X] Rebalncer Module

[X] Session Key Generation

[X] Whitelisting Session Key

[X] On-Chain Validation

[X] Server Cron Jobs

## To Do List

[ ] More Secure Session Key (Maybe AWS KMS)

[ ] An individual Session Key Manager Contract

[ ] Better Off-Chain Validation in the Cron Job

[ ] Gas Less Execution of Rebalancing (Maybe Smart Wallet of Session Keys)

[ ] Better management of every token pair
