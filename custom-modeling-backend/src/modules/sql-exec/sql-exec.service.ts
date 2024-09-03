import { Injectable } from '@nestjs/common';
import { PGSql } from '../../utils/database';
//import XLSX from "xlsx";
var sql = require('node-transform-mysql');
const fs = require('fs');
const path = require('path');

let nodes = null;
let lines = null;

let dataFromName = 'public'; 
let itemsInPage = 10; 
@Injectable()
export class SqlExecService {

  execShowDatabase(body) {
    let node = body.nodes[body.id];
    let sqlstr = this.getSelectSqlByNodes([node]);
    let pagenum = (body.page-1) * itemsInPage;
    sqlstr =
      `${sqlstr}
    
    select * from t${node.id} limit ${itemsInPage} offset ${pagenum};`;

    return PGSql.sqlselect(sqlstr);
  }

  execTool(body) {

    nodes = body.nodes;
    lines = body.lines;

    let sortedNodes = this.resortNodes(body.id);
 
    let sqlstr = this.getSelectSqlByNodes(sortedNodes);

    let pagenum = (body.page-1) * itemsInPage;
    

    sqlstr =
      `${sqlstr}
    select * from t${body.id} limit ${itemsInPage} offset ${pagenum};`;
    console.log(sqlstr);
    return PGSql.sqlselect(sqlstr);
  }

  /**
   * 
   * @param body 
   * @returns 
   */
  async getItemNums(body){
    nodes = body.nodes;
    lines = body.lines;
    let sortedNodes = this.resortNodes(body.id);
    let sqlstr = this.getSelectSqlByNodes(sortedNodes);

    sqlstr = 
    `${sqlstr}
    
    select count(*) from t${body.id}`;
    return PGSql.sqlselect(sqlstr);
  }

  /**
   * 
   * @param array 
   * @param node 
   * @returns 
   */
  judgeIfHasNode(array, node){
    for(let i = 0; i < array.length; i++){
      let it = array[i];
      if(it.id == node.id){
        return true;
      }
    }
    return false;
  }
  /**
   * @param id 
   * @returns 
   */
  resortNodes(id){
    let stack1 = [];
    let stack2 = [];

    stack1.push(nodes[id]);
    
    while(stack1.length > 0){
      let t = stack1.pop();
      // console.log('resort', t.id);
      // console.log('judgeResult',this.judgeIfHasNode(stack2, t));
      if(!this.judgeIfHasNode(stack2, t)){
        stack2.unshift(t);
        
        if(t.type !== "Database"){
       
          t.ports.forEach((it, index) => {
            if(index !== t.ports.length-1 && it.lineId !== -1){
              stack1.push(this.getNodeByLine(t, index));
            }
            if(t.type === "Export"){
              stack1.push(this.getNodeByLine(t, 0));
            }
          })
        }

      }
    }
    // console.log('stack2',stack2);
    // console.log('stack2',stack2.length);
    stack2.sort(this.number_compare("id", 1));
    return stack2;
  }


  number_compare(propertyName,type) {
    return function (a,b) {
        var name1 = a[propertyName];
        var name2 = b[propertyName];
        if (!isNaN(Number(name1)) && !isNaN(Number(name2))){
            name1 =Number(name1);
            name2 =Number(name2);
        }
        if (type==1){

            if(name1 < name2){
                return -1;
            }else if(name1 > name2) {
                return 1;
            }else{
                return 0;
            }
        } else if (type==2){
            if(name1 < name2){
                return 1;
            }else if(name1 > name2) {
                return -1;
            }else{
                return 0;
            }
        }

    }
  }
  getDataByField(body) {
    let fields = body.field.map((it, index) => {
      return it.ori_field;
    })
    let sqlstr = sql.table(`${dataFromName}.body.name`).field(fields.join(',')).select();
   
    return PGSql.sqlselect(sqlstr);
  }

  /**
   * 
   * @param nodes 
   * @returns 
   */
  getSelectSqlByNodes(nodes) {
    let sqlstr = nodes.reduce((pre, cur, index) => {
      if (index !== 0) {
        pre += ', ';
      }
      let sql = this.getSelectSqlByNode(cur);

      pre += `t${cur.id} AS (${sql})`;
      return pre;
    }, 'WITH ');

    return sqlstr;
  }

  /**
   * 
   * @param node 
   * @returns 
   */
  getSelectSqlByNode(node) {

    switch (node.type) {
      case 'Database': {
        let table = node.data_state;
        let tableName = table.ori_name;
        let fields = table.field.filter(it => {
          return it.checked === "true"
        }).map(it => it.ori_field.replace(/\$/,'.') + " as " + `"${it.my_field}"`);
        let sqlstr = sql.table(dataFromName+'.'+tableName).field(fields.join(',')).select();
        return sqlstr;
      }
      case 'Inner Join': {
        let leftnode = this.getNodeByLine(node, 0);
        let rightnode = this.getNodeByLine(node, 1);
        // let leftfields = leftnode.data_state.field.map(it => `t${leftnode.id}` + '.' + it.ori_field);
        // let rightfields = rightnode.data_state.field.filter(it => {
        //   return it.ori_field !== node.rightChoiceField[0];
        // }).map(it => `t${rightnode.id}` + '.' + it.ori_field);
        // let leftfieldsstr = leftfields.join(',');
        // let rightfieldstr = rightfields.join(',');
        return `select * from t${leftnode.id} inner join t${rightnode.id}
        on t${leftnode.id}."${node.leftChoiceField[0]}" = t${rightnode.id}."${node.rightChoiceField[0]}"
        `;
      }
      case 'Sort': {
        let innernode = this.getNodeByLine(node, 0);
        return `select * from t${innernode.id} order by ${node.custom_data.choiceField} ${node.custom_data.method}`;
      }
      case "Distinct": {
        let innerNode = this.getNodeByLine(node, 0);
        return `select distinct * from t${innerNode.id}`;
        //return `select distinct t0$zh from t${innerNode.id}`;
      }
      case "Outer Join": {
        let leftnode = this.getNodeByLine(node, 0);
        let rightnode = this.getNodeByLine(node, 1);

        return `select distinct * from t${leftnode.id} full outer join t${rightnode.id}
        on (t${leftnode.id}."${node.leftChoiceField[0]}" = t${rightnode.id}."${node.rightChoiceField[0]}")
        `;        
      }
      case "Left Join": {
        let leftnode = this.getNodeByLine(node, 0);
        let rightnode = this.getNodeByLine(node, 1);

        return `select * from t${leftnode.id} left outer join t${rightnode.id}
        on t${leftnode.id}."${node.leftChoiceField[0]}" = t${rightnode.id}."${node.rightChoiceField[0]}"
        `;        
      }
      case "Right Join": {
        let leftnode = this.getNodeByLine(node, 0);
        let rightnode = this.getNodeByLine(node, 1);

        return `select * from t${leftnode.id} right outer join t${rightnode.id}
        on t${leftnode.id}."${node.leftChoiceField[0]}" = t${rightnode.id}."${node.rightChoiceField[0]}"
        `;        
      }
      case "Export": {
        let innernode = this.getNodeByLine(node, 0);
        return `select * from t${innernode.id}`;
      }
      case "Copy": {
        let innernode = this.getNodeByLine(node, 0);

        let table = innernode.data_state;
        let tableName = table.ori_name;
        let fields = node.data_state.field.filter(it => {
          return it.checked === "true"
        }).map(it => `"${it.my_field}"`);
        let fieldString = fields.join(',');
        let sqlstr = `select ${fieldString} from t${innernode.id}`;
        return sqlstr;        
      }
      case "Intersection": {
        let leftnode = this.getNodeByLine(node, 0);
        let rightnode = this.getNodeByLine(node, 1);

        return `select * from t${leftnode.id} intersect select * from t${rightnode.id}`;
      }
      case "Union": {
        let leftnode = this.getNodeByLine(node, 0);
        let rightnode = this.getNodeByLine(node, 1);

        return `select * from t${leftnode.id} union select * from t${rightnode.id}`;
      }
      case "Difference": {
        let leftnode = this.getNodeByLine(node, 0);
        let rightnode = this.getNodeByLine(node, 1);

        return `select * from t${leftnode.id} except select * from t${rightnode.id}`;
      }
      case "Conditional Filter": {
        let innernode = this.getNodeByLine(node, 0);
        let conditions = node.custom_data.conditions;
        let sqlCondition = conditions.reduce((pre,cur,i) => {
        
          
          if(cur.val!=null){
         
            if(i > 0){
             
              return `${pre} and "${cur.choiceField[0]}" ${cur.method[0]} "${cur.choiceField2[0]}"`
            }
            else{
             
              return `${pre} "${cur.choiceField2[0]}" ${cur.method[0]} '${cur.val}'`
            }
          }else{
            if(cur.val==null){
              if(i > 0){
            
                return `${pre} and "${cur.choiceField[0]}" ${cur.method[0]} ${cur.val}`
              }
              else{
              
                return `${pre} "${cur.choiceField[0]}" ${cur.method[0]} "${cur.val}"`
              }
            }else{
              let ss ="date_part('year',age(#"+ cur.choiceField2[0] + "," + "substr("+ cur.choiceField[0] +",7,8)))";
              return `${pre}`+ss
            }
            
          }
          
        }, '')

        return `select * from t${innernode.id} where ${sqlCondition}`;
      }
      
    }

  }

  /**
   * 获取node对应出口连接的节点
   * @param node node是一个node节点的实例
   * @param portId 
   * @returns node
   */
  getNodeByLine(node, portId) {
    let lineId = node.ports[portId].lineId;
    if (lineId === -1) return null;
    else {
      let selfName = node.ports[portId].name;
      let line = lines[lineId];
      let otherNode;
      if (line.start === selfName) {
        otherNode = line.end.split('_')[0];
      }
      else {
        otherNode = line.start.split('_')[0];
      }
      return nodes[otherNode];
    }
  }

  getSelectSqlByTable(table) {
    let tableName = table.ori_name;
    let fields = table.field.map(it => tableName + '.' + it.ori_field);
    let sqlstr = sql.table(dataFromName+'.'+tableName).field(fields.join(',')).select();
    return { tableName, sqlstr };
  }

  getSelectSql(body) {
    // let sqlstr = 
    // `WITH t1 AS(
    //   SELECT
    //     admins.admin_id AS "admins.admin_id",
    //     admins.admin_name,
    //     tableb.admin_id,
    //     tableb.tablebname 
    //   FROM
    //     admins
    //     INNER JOIN tableb ON admins.admin_id = tableb.admin_id)

    //     select * from t1
    //     `;
    let { tableName: leftTableName, sqlstr: leftSql } = this.getSelectSqlByTable(body.leftTable);
    let { tableName: rightTableName, sqlstr: rightSql } = this.getSelectSqlByTable(body.rightTable);
    let sqlstr = `
        with t1 as (${leftSql}), t2 as (${rightSql}),
        t3 as (select * from t1 inner join t2 on t1.${body.leftField[0]} = t2.${body.rightField[0]})
        select * from t3;
      `;
    return sqlstr;
  }

  getInnerJoinSql(body) {
    let sqlstr = this.getSelectSql(body);
   
    return PGSql.sqlselect(sqlstr);
  }


}
