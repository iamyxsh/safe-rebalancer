import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ThresholdType } from './types';

export type RebalancingDataDocument = HydratedDocument<RebalancingData>;

@Schema()
export class RebalancingData {
  @Prop()
  address: string;

  @Prop()
  tokenA: string;

  @Prop()
  tokenB: string;

  @Prop({ type: String, enum: ThresholdType, default: ThresholdType.LOWER })
  type: ThresholdType;

  @Prop()
  amount: string;

  @Prop()
  sessionKeyPK: string;
}

export const RebalancingDataSchema =
  SchemaFactory.createForClass(RebalancingData);
