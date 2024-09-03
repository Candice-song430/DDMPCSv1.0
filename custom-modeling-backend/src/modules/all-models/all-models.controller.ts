import { Body, Controller, Get, Post } from '@nestjs/common';
import {AllModelsService} from './all-models.service';
@Controller('all-models')
export class AllModelsController {
  constructor(private readonly AllModelsService: AllModelsService) {}

  @Get('basicinfo')
  getModelsBasicInfo(){
    return this.AllModelsService.getModelsBasicInfo();
  }

  @Post('getModelById')
  getModelById(@Body() body){
    return this.AllModelsService.getModelById(body.id);
  }
}
