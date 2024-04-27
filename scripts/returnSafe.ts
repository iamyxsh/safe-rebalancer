import { SafeAccountConfig, SafeFactory } from '@safe-global/protocol-kit'
import { Wallet } from 'ethers'
import SafeApiKit from '@safe-global/api-kit'

export async function returnSafeAddress(
  safeFactory: SafeFactory,
  apiKit: SafeApiKit,
  owner1Signer: Wallet
): Promise<string> {
  const { safes } = await apiKit.getSafesByOwner(
    await owner1Signer.getAddress()
  )
  if (safes.length > 0) {
    console.log('You already have a safe deployed at:', safes[0])
    return safes[0]
  }

  const safeAccountConfig: SafeAccountConfig = {
    owners: [await owner1Signer.getAddress()],
    threshold: 1,
  }
  const protocolKitOwner1 = await safeFactory.deploySafe({
    safeAccountConfig,
  })

  const safeAddress = await protocolKitOwner1.getAddress()

  console.log('Your Safe has been deployed:', safeAddress)

  return safeAddress
}
