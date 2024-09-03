import { Module } from '@nestjs/common';
import { AllModelsService } from './all-models.service';
import { AllModelsController } from './all-models.controller';

@Module({
  providers: [AllModelsService],
  controllers: [AllModelsController]
})
export class AllModelsModule {}
