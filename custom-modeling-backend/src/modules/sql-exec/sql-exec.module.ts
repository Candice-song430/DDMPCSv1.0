import { Module } from '@nestjs/common';
import {SqlExecController} from './sql-exec.controller';
import {SqlExecService} from './sql-exec.service';
@Module({
  controllers: [SqlExecController],
  providers: [SqlExecService]
})
export class SqlExecModule {}
