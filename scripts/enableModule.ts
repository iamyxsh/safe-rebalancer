import Safe, { SigningMethod } from '@safe-global/protocol-kit'

export async function enableModule(safe: Safe, module: string): Promise<void> {
  const isEnabled = await safe.isModuleEnabled(module)
  if (isEnabled) {
    console.log(`Module ${module} already enabled`)
  } else {
    let tx = await safe.createEnableModuleTx(module)

    tx = await safe.signTransaction(tx, SigningMethod.ETH_SIGN_TYPED_DATA_V4)
    await safe.executeTransaction(tx)

    console.log('Module Enabled')
  }
}
