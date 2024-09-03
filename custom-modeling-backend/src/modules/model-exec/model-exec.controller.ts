import { Body, Controller, Get, Post } from '@nestjs/common';
import { ModelExecService } from './model-exec.service'

@Controller('model-exec')
export class ModelExecController {
  constructor(private readonly ModelExecService: ModelExecService) { }

  @Post('save')
  saveModel(@Body() body) {
    return this.ModelExecService.saveModel(body);
  }

  @Get()
  test() {
    return this.ModelExecService.getLatestId();
  }

  // 根据模型ID获取所有的Export
  @Post('getAllPortsById')
  async getAllPortsById(@Body() body) {
    return await this.ModelExecService.getAllPortsById(body.id);
  }


  
  @Post('delete')
  deleteModel(@Body() body){
    return this.ModelExecService.deleteModel(body.id);
  }

}
