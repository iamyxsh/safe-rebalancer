import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateRebalancingDataDTO } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  ping(): string {
    return this.appService.pong();
  }

  @Post('/data')
  storeRebalancingData(@Body() body: CreateRebalancingDataDTO) {
    return this.appService.storeRebalancingData(body);
  }

  @Get('/data/:address')
  getRebalancingData(@Param() param: any) {
    return this.appService.getRebalancingData(param.address);
  }
}
