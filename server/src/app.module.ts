import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URI } from './constants';
import { RebalancingData, RebalancingDataSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI),
    MongooseModule.forFeature([
      { name: RebalancingData.name, schema: RebalancingDataSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
