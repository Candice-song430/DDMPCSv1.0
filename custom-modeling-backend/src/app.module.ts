import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllDatabasesModule } from './modules/all-databases/all-databases.module';

import { SqlExecModule } from './modules/sql-exec/sql-exec.module';
import { ModelExecModule } from './modules/model-exec/model-exec.module';
import { AllModelsModule } from './modules/all-models/all-models.module';

@Module({
  imports: [AllDatabasesModule, SqlExecModule, ModelExecModule, AllModelsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
