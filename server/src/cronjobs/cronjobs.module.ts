import { Module } from '@nestjs/common';
import { CronjobsService } from './cronjobs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RebalancingData, RebalancingDataSchema } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RebalancingData.name, schema: RebalancingDataSchema },
    ]),

    CronjobsModule,
  ],
  providers: [CronjobsService],
})
export class CronjobsModule {}
