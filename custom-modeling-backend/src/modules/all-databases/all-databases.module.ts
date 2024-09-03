import { Module } from '@nestjs/common';
import { AllDatabasesController } from './all-databases.controller';
import { AllDatabasesService } from './all-databases.service';

@Module({
  controllers: [AllDatabasesController],
  providers: [AllDatabasesService]
})
export class AllDatabasesModule {}
