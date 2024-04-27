import { buyUsdc } from './buyUsdc'
import { REBALANCER_MODULE, USDC, WETH } from './constants'
import { enableModule } from './enableModule'
import { addExecutor, addRebalancerData } from './module'
import { returnSafeAddress } from './returnSafe'
import { storeRebalaninngData } from './server'
import { setup } from './setup'
import Safe from '@safe-global/protocol-kit'

async function main() {
  const {
    safeFactory,
    apiKit,
    owner1Signer,
    ethAdapterOwner1,
    rebalancerModule,
    provider,
  } = await setup()

  const safeAddress = await returnSafeAddress(safeFactory, apiKit, owner1Signer)

  //@ts-ignore
  let safe = await Safe.default.create({
    ethAdapter: ethAdapterOwner1,
    safeAddress: safeAddress,
  })

  await buyUsdc(safe)

  await enableModule(safe, REBALANCER_MODULE)

  await addRebalancerData(rebalancerModule, safe, USDC, WETH)

  const executorKey = await storeRebalaninngData(
    USDC,
    WETH,
    '1000',
    await safe.getAddress(),
    provider,
    owner1Signer
  )

  await addExecutor(rebalancerModule, executorKey, safe)

  process.exit(1)
}

main()
