import { Injectable } from '@nestjs/common';
import { PGSql } from '../../utils/database';
var sql = require('node-transform-mysql');

//let dataFromName = 'hengcheng'; // 所有数据库前加的前缀
let dataFromName = 'public'; // 所有数据库前加的前缀 (本地)
let myModelDatabaseName = "models" // 存储模型的数据库名
@Injectable()
export class ModelExecService {

  /**
   * 获取模型数据库里的最新应分配Id
   * @param id 
   */
  async getLatestId(){
    let sqlstr = `select count(*) from ${dataFromName}.${myModelDatabaseName}`;
    let res = await PGSql.sqlselect(sqlstr);
    let cnt = res[0].count;
    // 如果当前数据库没有数据，返回0
    if(cnt == 0){
      return 1;
    }
    else{
      // 否则查找目前最大id
      let sqlstr = `select model_id from ${dataFromName}.${myModelDatabaseName} order by model_id desc limit 1`;
      
      let res = await PGSql.sqlselect(sqlstr);
  
      let cnt = res[0].model_id;
      return cnt+1;
    }
  }

  async saveModel(body){
    let {model_id, model_title, model_desc, model_creater,model_type, model_nodes, model_lines} = body;
    model_nodes = JSON.stringify(model_nodes);
    model_lines = JSON.stringify(model_lines);
    if(model_id == -1){
      model_id = await this.getLatestId();
      let sqlstr = `insert into ${dataFromName}.${myModelDatabaseName} (model_id, model_title, model_desc, model_creater, model_nodes, model_lines, model_type) values
      (${model_id}, '${model_title}', '${model_desc}', '${model_creater}', '${model_nodes}', '${model_lines}', '${model_type}')`;
     
      return PGSql.sqlselect(sqlstr);
    }
    else{
      let sqlstr = `update ${dataFromName}.${myModelDatabaseName} set model_title='${model_title}', model_desc='${model_desc}', model_creater='${model_creater}', model_nodes='${model_nodes}', model_lines='${model_lines}' , model_type = '${model_type}' where model_id = ${model_id}`;
      await PGSql.sqlselect(sqlstr)
      return ;
    }
  }

  deleteModel(id){
    let sqlstr = `delete from ${dataFromName}.${myModelDatabaseName}  where model_id = ${id}`;
    return PGSql.sqlselect(sqlstr);
  }     

  async getAllPortsById(id){
    let sqlstr = `select model_nodes from ${dataFromName}.${myModelDatabaseName}  where model_id = ${id}`;
    let res = await PGSql.sqlselect(sqlstr);
    let nodes = JSON.parse(res[0].model_nodes).nodes;
 
    let ret = [];
    nodes.forEach(it => {
      if(it.type === "导出"){
        ret.push({
          label: it.title,
          execId: it.id,
          desc: it.desc          
        })
      }
    })
    return ret;
  }
}
