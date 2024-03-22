import { IsEnum, IsNotEmpty } from 'class-validator';

export enum ThresholdType {
  LOWER = 'lower',
  UPPER = 'upper',
}
export class CreateRebalancingDataDTO {
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  tokenA: string;

  @IsNotEmpty()
  tokenB: string;

  @IsNotEmpty()
  @IsEnum(ThresholdType)
  type: ThresholdType;

  @IsNotEmpty()
  amount: string;
}
