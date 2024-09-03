import { Module } from '@nestjs/common';
import { ModelExecService } from './model-exec.service';
import { ModelExecController } from './model-exec.controller';


@Module({
  controllers: [ModelExecController],
  providers: [ModelExecService],
})
export class ModelExecModule {}
