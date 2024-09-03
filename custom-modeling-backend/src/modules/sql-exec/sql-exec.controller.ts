import { Body, Controller, Get, Headers, Param, Post, Query, Request } from '@nestjs/common';
import {SqlExecService} from './sql-exec.service'

@Controller('sql-exec')
export class SqlExecController {
  constructor(private readonly SqlExecService: SqlExecService) {}

  @Post()
  async execSql(@Body() body){
   
    if(body.nodes[body.id].type === "Database"){
      return this.SqlExecService.execShowDatabase(body);
    }
    else {
      return this.SqlExecService.execTool(body);
    }
  }

  @Post('getNums')
  getItemNums(@Body() body){
    return this.SqlExecService.getItemNums(body);
  }

  @Post('getdatabyfield')
  getDataByField(@Body() body) {
    return this.SqlExecService.getDataByField(body);
  }

  @Post('innerjoin')
  async getUnionSql(@Body() body) {
    return {"data": await this.SqlExecService.getInnerJoinSql(body),"sqlstr":this.SqlExecService.getSelectSql(body)};
  }



}
