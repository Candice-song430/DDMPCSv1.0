"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlExecService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../../utils/database");
var sql = require('node-transform-mysql');
const fs = require('fs');
const path = require('path');
let nodes = null;
let lines = null;
let dataFromName = 'hengcheng';
let itemsInPage = 10;
let SqlExecService = class SqlExecService {
    execShowDatabase(body) {
        let node = body.nodes[body.id];
        let sqlstr = this.getSelectSqlByNodes([node]);
        let pagenum = (body.page - 1) * itemsInPage;
        sqlstr = `select * from t${node.id} limit ${itemsInPage} offset ${pagenum};`;
        return database_1.PGSql.sqlselect(sqlstr);
    }
    execTool(body) {
        nodes = body.nodes;
        lines = body.lines;
        let sortedNodes = this.resortNodes(body.id);
        let sqlstr = this.getSelectSqlByNodes(sortedNodes);
        let pagenum = (body.page - 1) * itemsInPage;
        sqlstr =
            `${sqlstr}
    
    select * from t${body.id} limit ${itemsInPage} offset ${pagenum};`;
        return database_1.PGSql.sqlselect(sqlstr);
    }
    async getItemNums(body) {
        nodes = body.nodes;
        lines = body.lines;
        let sortedNodes = this.resortNodes(body.id);
        let sqlstr = this.getSelectSqlByNodes(sortedNodes);
        sqlstr =
            `${sqlstr}
    
    select count(*) from t${body.id}`;
        return database_1.PGSql.sqlselect(sqlstr);
    }
    judgeIfHasNode(array, node) {
        for (let i = 0; i < array.length; i++) {
            let it = array[i];
            if (it.id == node.id) {
                return true;
            }
        }
        return false;
    }
    resortNodes(id) {
        let stack1 = [];
        let stack2 = [];
        stack1.push(nodes[id]);
        while (stack1.length > 0) {
            let t = stack1.pop();
            if (!this.judgeIfHasNode(stack2, t)) {
                stack2.unshift(t);
                if (t.type !== "数据库") {
                    t.ports.forEach((it, index) => {
                        if (index !== t.ports.length - 1 && it.lineId !== -1) {
                            stack1.push(this.getNodeByLine(t, index));
                        }
                        if (t.type === "导出") {
                            stack1.push(this.getNodeByLine(t, 0));
                        }
                    });
                }
            }
        }
        return stack2;
    }
    getDataByField(body) {
        let fields = body.field.map((it, index) => {
            return it.ori_field;
        });
        let sqlstr = sql.table(`${dataFromName}.body.name`).field(fields.join(',')).select();
        return database_1.PGSql.sqlselect(sqlstr);
    }
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
    getSelectSqlByNode(node) {
        switch (node.type) {
            case '数据库': {
                let table = node.data_state;
                let tableName = table.ori_name;
                let fields = table.field.filter(it => {
                    return it.checked === "true";
                }).map(it => it.ori_field.replace(/\$/, '.') + " as " + `"${it.my_field}"`);
                let sqlstr = sql.table(dataFromName + '.' + tableName).field(fields.join(',')).select();
                return sqlstr;
            }
            case '内连接': {
                let leftnode = this.getNodeByLine(node, 0);
                let rightnode = this.getNodeByLine(node, 1);
                return `select * from t${leftnode.id} inner join t${rightnode.id}
        on t${leftnode.id}."${node.leftChoiceField[0]}" = t${rightnode.id}."${node.rightChoiceField[0]}"
        `;
            }
            case '排序': {
                let innernode = this.getNodeByLine(node, 0);
                return `select * from t${innernode.id} order by ${node.custom_data.choiceField} ${node.custom_data.method}`;
            }
            case "去重": {
                let innerNode = this.getNodeByLine(node, 0);
                return `select distinct * from t${innerNode.id}`;
            }
            case "外连接": {
                let leftnode = this.getNodeByLine(node, 0);
                let rightnode = this.getNodeByLine(node, 1);
                return `select * from t${leftnode.id} full outer join t${rightnode.id}
        on t${leftnode.id}."${node.leftChoiceField[0]}" = t${rightnode.id}."${node.rightChoiceField[0]}"
        `;
            }
            case "左连接": {
                let leftnode = this.getNodeByLine(node, 0);
                let rightnode = this.getNodeByLine(node, 1);
                return `select * from t${leftnode.id} left outer join t${rightnode.id}
        on t${leftnode.id}."${node.leftChoiceField[0]}" = t${rightnode.id}."${node.rightChoiceField[0]}"
        `;
            }
            case "右连接": {
                let leftnode = this.getNodeByLine(node, 0);
                let rightnode = this.getNodeByLine(node, 1);
                return `select * from t${leftnode.id} right outer join t${rightnode.id}
        on t${leftnode.id}."${node.leftChoiceField[0]}" = t${rightnode.id}."${node.rightChoiceField[0]}"
        `;
            }
            case "导出": {
                let innernode = this.getNodeByLine(node, 0);
                return `select * from t${innernode.id}`;
            }
            case "复制": {
                let innernode = this.getNodeByLine(node, 0);
                let table = innernode.data_state;
                let tableName = table.ori_name;
                let fields = node.data_state.field.filter(it => {
                    return it.checked === "true";
                }).map(it => `"${it.my_field}"`);
                let fieldString = fields.join(',');
                let sqlstr = `select ${fieldString} from t${innernode.id}`;
                return sqlstr;
            }
            case "交集": {
                let leftnode = this.getNodeByLine(node, 0);
                let rightnode = this.getNodeByLine(node, 1);
                return `select * from ${leftnode.id} intersect select * from ${rightnode.id}`;
            }
            case "并集": {
                let leftnode = this.getNodeByLine(node, 0);
                let rightnode = this.getNodeByLine(node, 1);
                return `select * from ${leftnode.id} union select * from ${rightnode.id}`;
            }
            case "差集": {
                let leftnode = this.getNodeByLine(node, 0);
                let rightnode = this.getNodeByLine(node, 1);
                return `select * from ${leftnode.id} union except * from ${rightnode.id}`;
            }
            case "条件筛选": {
                let innernode = this.getNodeByLine(node, 0);
                let conditions = node.custom_data.conditions;
                let sqlCondition = conditions.reduce((pre, cur, i) => {
                    if (i > 0) {
                        return `${pre} and "${cur.choiceField[0]}" ${cur.method[0]} '${cur.val}'`;
                    }
                    else {
                        return `${pre} "${cur.choiceField[0]}" ${cur.method[0]} '${cur.val}'`;
                    }
                }, '');
                return `select * from t${innernode.id} where ${sqlCondition}`;
            }
        }
    }
    getNodeByLine(node, portId) {
        let lineId = node.ports[portId].lineId;
        if (lineId === -1)
            return null;
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
        let sqlstr = sql.table(dataFromName + '.' + tableName).field(fields.join(',')).select();
        return { tableName, sqlstr };
    }
    getSelectSql(body) {
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
        return database_1.PGSql.sqlselect(sqlstr);
    }
};
SqlExecService = __decorate([
    common_1.Injectable()
], SqlExecService);
exports.SqlExecService = SqlExecService;
//# sourceMappingURL=sql-exec.service.js.map