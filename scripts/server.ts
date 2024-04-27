import axios from 'axios'
import { SERVER_URL } from './constants'
import { Signer, ethers } from 'ethers'

export const storeRebalaninngData = async (
  usdc: string,
  weth: string,
  amount: string,
  safeAddress: string,
  provider: ethers.JsonRpcProvider,
  owner1Signer: Signer
) => {
  const { address } = await axios
    .get(`${SERVER_URL}/data/${safeAddress}`)
    .then((res) => res.data)
  if (!address) {
    await axios.post(`${SERVER_URL}/data`, {
      address: safeAddress,
      tokenA: usdc,
      tokenB: weth,
      amount,
    })
  }

  const { sessionKeyPK } = await axios
    .get(`${SERVER_URL}/data/${safeAddress}`)
    .then((res) => res.data)

  const balance = await provider.getBalance(sessionKeyPK)
  if (balance == ethers.toBigInt(0)) {
    const tx = await owner1Signer.sendTransaction({
      to: sessionKeyPK,
      value: ethers.parseEther('1'),
    })
    await tx.wait()
  }

  return sessionKeyPK
}
