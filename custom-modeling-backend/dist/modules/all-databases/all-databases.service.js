"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllDatabasesService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../../utils/database");
var sql = require('node-transform-mysql');
const fs = require('fs');
const path = require('path');
let databasePath = path.join(__dirname, '../../../static/databases.json');
let AllDatabasesService = class AllDatabasesService {
    getAllDatabases() {
        let rowdata = fs.readFileSync(databasePath);
        let data = JSON.parse(rowdata);
        return data;
    }
    saveDatabases(databases) {
        let data = JSON.stringify(databases, null, 2);
        fs.writeFileSync(databasePath, data);
    }
    async getInfoByDatabaseName(name) {
        let oid = await this.getOidByDatabaseName(name);
        let sqlstr = `SELECT
    relname AS tablename,
    CAST ( obj_description ( ${oid}, 'pg_class' ) AS VARCHAR ) AS COMMENT 
    FROM
      pg_class C 
    WHERE
      relname = '${name}'`;
        return database_1.PGSql.sqlselect(sqlstr);
    }
    async getOidByDatabaseName(name) {
        let sqlstr = `
    WITH oid as (select oid from pg_class where relname='${name}')
    select * from oid;`;
        let data = await database_1.PGSql.sqlselect(sqlstr);
        return data[0].oid;
    }
    getFieldsByDatabaseName(name) {
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
    `;
        return database_1.PGSql.sqlselect(sqlstr);
    }
};
AllDatabasesService = __decorate([
    common_1.Injectable()
], AllDatabasesService);
exports.AllDatabasesService = AllDatabasesService;
//# sourceMappingURL=all-databases.service.js.map