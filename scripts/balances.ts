import { ethers } from 'ethers'
import { returnSafeAddress } from './returnSafe'
import { setup } from './setup'

const balances = async () => {
  const { usdc, weth, safeFactory, owner1Signer, apiKit } = await setup()

  const safeAddress = await returnSafeAddress(safeFactory, apiKit, owner1Signer)

  console.log(
    'USDC Balance of the Safe: ',
    ethers.formatUnits(await usdc.balanceOf(safeAddress), await usdc.decimals())
  )
  console.log(
    'WETH Balance of the Safe: ',

    ethers.formatUnits(await weth.balanceOf(safeAddress), await weth.decimals())
  )
}

balances()
