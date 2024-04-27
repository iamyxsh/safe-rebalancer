import { setup } from './setup'
import { USDC_WHALE } from './constants'
import { ethers } from 'ethers'
import Safe from '@safe-global/protocol-kit'

export async function buyUsdc(safe: Safe) {
  const { provider, owner1Signer, usdc } = await setup()

  const whaleBalance = await provider.getBalance(USDC_WHALE)
  if (whaleBalance == ethers.toBigInt(0)) {
    const tx1 = await owner1Signer.sendTransaction({
      to: USDC_WHALE,
      value: ethers.parseEther('1'),
    })
    await tx1.wait()
  }

  const safeAddress = await safe.getAddress()

  const balance = await usdc.balanceOf(safeAddress)
  if (balance === 0) {
    await provider.send('anvil_impersonateAccount', [USDC_WHALE])
    const signer = await provider.getSigner(USDC_WHALE)

    //@ts-ignore
    const tx = await usdc.connect(signer).transfer(safeAddress, 500e6)
    await tx.wait()
  }

  console.log('USDC balance of Safe', await usdc.balanceOf(safeAddress))
}
