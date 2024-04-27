import Safe from '@safe-global/protocol-kit'
import { Signer, ZeroAddress, ethers } from 'ethers'
import SafeApiKit from '@safe-global/api-kit'

export async function addRebalancerData(
  rebalancer: ethers.Contract,
  safe: Safe,
  usdc: string,
  weth: string
) {
  const data = await rebalancer.getRebalanceData(await safe.getAddress())

  if (data.tokenA === ZeroAddress) {
    const safetx = await safe.createTransaction({
      transactions: [
        {
          data: rebalancer.interface.encodeFunctionData('addRebalanceData', [
            usdc,
            weth,
            1000,
          ]),
          to: await rebalancer.getAddress(),
          value: '0',
        },
      ],
    })
    const safeTxHash = await safe.getTransactionHash(safetx)
    const senderSignature = await safe.signHash(safeTxHash)
    safetx.addSignature(senderSignature)
    const executeTxResponse = await safe.executeTransaction(safetx)
    await executeTxResponse.transactionResponse?.wait()
    console.log('Rebalance data added')
  } else {
    console.log('Rebalance already data added')
  }
}

export async function addExecutor(
  rebalancer: ethers.Contract,
  executor: string,
  safe: Safe
) {
  const exec = await rebalancer.getExecutor(await safe.getAddress())

  if (exec === ZeroAddress && exec != executor) {
    let safetx = await safe.createTransaction({
      transactions: [
        {
          data: rebalancer.interface.encodeFunctionData('addExecutor', [
            executor,
          ]),
          to: await rebalancer.getAddress(),
          value: '0',
        },
      ],
    })
    const safeTxHash = await safe.getTransactionHash(safetx)
    const senderSignature = await safe.signHash(safeTxHash)
    safetx.addSignature(senderSignature)
    const executeTxResponse = await safe.executeTransaction(safetx)
    await executeTxResponse.transactionResponse?.wait()

    console.log('Executor Added')
  } else {
    console.log('Executor Already  Added')
  }
}
