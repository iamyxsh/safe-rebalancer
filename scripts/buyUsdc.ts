import { setup } from './setup'
import { USDC_WHALE } from './constants'
import { returnSafeAddress } from './returnSafe'

export async function buyUsdc() {
  const { provider, apiKit, safeFactory, owner1Signer, usdc } = await setup()
  await provider.send('anvil_impersonateAccount', [USDC_WHALE])

  const signer = await provider.getSigner(USDC_WHALE)
  usdc.connect(signer)

  const safeAddress = await returnSafeAddress(safeFactory, apiKit, owner1Signer)

  const tx = await usdc.transfer(safeAddress, 500e6)
  await tx.wait()

  console.log(await usdc.balanceOf(safeAddress))
}
