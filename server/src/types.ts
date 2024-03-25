import { IsEnum, IsEthereumAddress, IsNotEmpty } from 'class-validator';

export enum ThresholdType {
  LOWER = 'lower',
  UPPER = 'upper',
}
export class CreateRebalancingDataDTO {
  @IsEthereumAddress()
  address: string;

  @IsEthereumAddress()
  tokenA: string;

  @IsEthereumAddress()
  tokenB: string;

  @IsNotEmpty()
  @IsEnum(ThresholdType)
  type: ThresholdType;

  @IsNotEmpty()
  amount: string;
}
