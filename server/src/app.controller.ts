import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateRebalancingDataDTO } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  ping(): string {
    return this.appService.pong();
  }

  @Post("/data")
  storeRebalancingData(@Body() body: CreateRebalancingDataDTO) {
    return this.appService.storeRebalancingData(body);
  }
}
