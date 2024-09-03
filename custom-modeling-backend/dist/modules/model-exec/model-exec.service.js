"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelExecService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../../utils/database");
var sql = require('node-transform-mysql');
let dataFromName = 'public';
let myModelDatabaseName = "models";
let ModelExecService = class ModelExecService {
    async getLatestId() {
        let sqlstr = `select count(*) from ${dataFromName}.${myModelDatabaseName}`;
        let res = await database_1.PGSql.sqlselect(sqlstr);
        let cnt = res[0].count;
        if (cnt == 0) {
            return 1;
        }
        else {
            let sqlstr = `select model_id from ${dataFromName}.${myModelDatabaseName} order by model_id desc limit 1`;
            let res = await database_1.PGSql.sqlselect(sqlstr);
            let cnt = res[0].model_id;
            return cnt + 1;
        }
    }
    async saveModel(body) {
        let { model_id, model_title, model_desc, model_creater, model_type, model_nodes, model_lines } = body;
        model_nodes = JSON.stringify(model_nodes);
        model_lines = JSON.stringify(model_lines);
        if (model_id == -1) {
            model_id = await this.getLatestId();
            let sqlstr = `insert into ${dataFromName}.${myModelDatabaseName} (model_id, model_title, model_desc, model_creater, model_nodes, model_lines, model_type) values
      (${model_id}, '${model_title}', '${model_desc}', '${model_creater}', '${model_nodes}', '${model_lines}', '${model_type}')`;
            return database_1.PGSql.sqlselect(sqlstr);
        }
        else {
            let sqlstr = `update ${dataFromName}.${myModelDatabaseName} set model_title='${model_title}', model_desc='${model_desc}', model_creater='${model_creater}', model_nodes='${model_nodes}', model_lines='${model_lines}' , model_type = '${model_type}' where model_id = ${model_id}`;
            await database_1.PGSql.sqlselect(sqlstr);
            return;
        }
    }
    deleteModel(id) {
        let sqlstr = `delete from ${dataFromName}.${myModelDatabaseName}  where model_id = ${id}`;
        return database_1.PGSql.sqlselect(sqlstr);
    }
    async getAllPortsById(id) {
        let sqlstr = `select model_nodes from ${dataFromName}.${myModelDatabaseName}  where model_id = ${id}`;
        let res = await database_1.PGSql.sqlselect(sqlstr);
        let nodes = JSON.parse(res[0].model_nodes).nodes;
        let ret = [];
        nodes.forEach(it => {
            if (it.type === "导出") {
                ret.push({
                    label: it.title,
                    execId: it.id,
                    desc: it.desc
                });
            }
        });
        return ret;
    }
};
ModelExecService = __decorate([
    common_1.Injectable()
], ModelExecService);
exports.ModelExecService = ModelExecService;
//# sourceMappingURL=model-exec.service.js.map