import { Injectable } from '@nestjs/common';
import { PGSql } from '../../utils/database';
var sql = require('node-transform-mysql');
const fs = require('fs');
const path = require('path');

let databasePath = path.join(__dirname, '../../../static/databases.json');
@Injectable()
export class AllDatabasesService {

  getAllDatabases(){
    let rowdata = fs.readFileSync(databasePath);
    let data = JSON.parse(rowdata);
    return data;
  }

  saveDatabases(databases){
    let data = JSON.stringify(databases, null, 2);
    fs.writeFileSync(databasePath, data);
  }
  
  /**
   * 根据表名获取表信息
   * @param name 表名
   * @returns 
   * [
        {
            "tablename": "test",
            "comment": "表表"
        }
    ]
   */
  async getInfoByDatabaseName(name){
    let oid = await this.getOidByDatabaseName(name);
   
    let sqlstr = `SELECT
    relname AS tablename,
    CAST ( obj_description ( ${oid}, 'pg_class' ) AS VARCHAR ) AS COMMENT 
    FROM
      pg_class C 
    WHERE
      relname = '${name}'`;
   
    return PGSql.sqlselect(sqlstr);

  }

  /**
   * 根据数据库名获取oid
   * @param name 数据库名
   * @returns 
   */
  async getOidByDatabaseName(name){

    let sqlstr = `
    WITH oid as (select oid from pg_class where relname='${name}')
    select * from oid;`
    let data = await PGSql.sqlselect(sqlstr);
    return data[0].oid;
  }

  /**
   * 根据表名获取表字段信息
   * @param name 表名
   * @returns 
   * [
  {
    attnum: 1,
    attname: 'id',
    type: 'int4integer',
    description: '个人ID'
  },
  {
    attnum: 2,
    attname: 'name',
    type: 'varcharcharacter varying(255)',
    description: '名字'
  }
]
   * 
   */
  getFieldsByDatabaseName(name){
    let sqlstr = `
        SELECT A
      .attnum,
      A.attname,
      concat_ws (
      '',
      T.typname,
      SUBSTRING ( format_type ( A.atttypid, A.atttypmod ) FROM '\(.*\)' )) AS TYPE,
      d.description 
    FROM
      pg_class C,
      pg_attribute A,
      pg_type T,
      pg_description d 
    WHERE
      C.relname = '${name}' 
      AND A.attnum > 0 
      AND A.attrelid = C.oid 
      AND A.atttypid = T.oid 
      AND d.objoid = A.attrelid 
      AND d.objsubid = A.attnum;
    `
    return PGSql.sqlselect(sqlstr);

  }

}
