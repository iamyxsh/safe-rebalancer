import { setup } from './setup'

const changePrice = async () => {
  const { aggregator } = await setup()
  await aggregator.setPrice(900)
}

changePrice()
