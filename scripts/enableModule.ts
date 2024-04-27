import Safe, { SigningMethod } from '@safe-global/protocol-kit'

export async function enableModule(
  protocolKit: Safe,
  module: string
): Promise<void> {
  let tx = await protocolKit.createEnableModuleTx(module)

  tx = await protocolKit.signTransaction(
    tx,
    SigningMethod.ETH_SIGN_TYPED_DATA_V4
  )
  await protocolKit.executeTransaction(tx)

  console.log('Module Enabled')
}
