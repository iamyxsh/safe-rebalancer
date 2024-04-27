import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RebalancingDataDocument = HydratedDocument<RebalancingData>;

@Schema()
export class RebalancingData {
  @Prop()
  address: string;

  @Prop()
  tokenA: string;

  @Prop()
  tokenB: string;

  @Prop()
  amount: string;

  @Prop()
  sessionKeyPK: string;
}

export const RebalancingDataSchema =
  SchemaFactory.createForClass(RebalancingData);
