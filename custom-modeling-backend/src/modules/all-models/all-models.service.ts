import { Injectable } from '@nestjs/common';
import { PGSql } from '../../utils/database';

//let dataFromName = 'hengcheng'; // 所有数据库前加的前缀
let dataFromName = 'public'; // 所有数据库前加的前缀 (本地)
let myModelDatabaseName = "models" // 存储模型的数据库名
@Injectable()
export class AllModelsService {
  
  getModelsBasicInfo(){
    let sqlstr = `select model_id, model_title, model_type, model_desc, model_creater from ${dataFromName}.${myModelDatabaseName}`;
    return PGSql.sqlselect(sqlstr);
  }

  getModelById(id){
    let sqlstr = `select * from ${dataFromName}.${myModelDatabaseName} where model_id = ${id}`;
  
    return PGSql.sqlselect(sqlstr);    
  }
}
