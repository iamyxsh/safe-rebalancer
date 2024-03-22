import { Injectable } from '@nestjs/common';
import { CreateRebalancingDataDTO } from './types';

@Injectable()
export class AppService {
  pong(): string {
    return 'Playing Ping Pong!';
  }

  async storeRebalancingData(body: CreateRebalancingDataDTO) {
    console.log(body);
  }
}
