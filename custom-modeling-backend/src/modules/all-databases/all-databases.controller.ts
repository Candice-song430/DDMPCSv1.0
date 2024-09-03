import { Body, Controller, Get, Post } from '@nestjs/common';
import {AllDatabasesService} from './all-databases.service'; 
const fs = require('fs');
const path = require('path');

let originPath = path.join(__dirname, '../../../static/origin.json');


@Controller('all-databases')
export class AllDatabasesController {
  constructor(private readonly AllDatabasesService: AllDatabasesService) {}

  @Get()
  getAllDatabases(){
    return this.AllDatabasesService.getAllDatabases();
  }

  @Post('/save')
  saveDatabases(@Body() body){
    this.AllDatabasesService.saveDatabases(body);
  }

  @Get('/getInfoByDatabaseName')
  async getInfoByDatabasesName(){
    let rowdata = fs.readFileSync(originPath);
    let data = JSON.parse(rowdata);
    let databases = [];

    let did = 0;
    for(let it in data){
      for(let databaseName of data[it]){
        let databaseInfo = await this.AllDatabasesService.getInfoByDatabaseName(databaseName)
        let database = {
          "did": did++,
          "ori_name":databaseInfo[0].tablename,
          "show_name":databaseInfo[0].comment || 'None',
          "category":it,
          "field": []
        };
        let databaseFields = await this.AllDatabasesService.getFieldsByDatabaseName(databaseName);
        databaseFields.forEach(it => {
          database.field.push({
            "ori_field":`${database.ori_name}$${it.attname}`,
            "show_field":it.description,
            "type":it.type,
            "checked":"true"
          })
        });
        databases.push(database);

      }
    }

    this.AllDatabasesService.saveDatabases(databases);
    return databases;
  }
}
