"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllModelsService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../../utils/database");
let dataFromName = 'public';
let myModelDatabaseName = "models";
let AllModelsService = class AllModelsService {
    getModelsBasicInfo() {
        let sqlstr = `select model_id, model_title, model_type, model_desc, model_creater from ${dataFromName}.${myModelDatabaseName}`;
        return database_1.PGSql.sqlselect(sqlstr);
    }
    getModelById(id) {
        let sqlstr = `select * from ${dataFromName}.${myModelDatabaseName} where model_id = ${id}`;
        return database_1.PGSql.sqlselect(sqlstr);
    }
};
AllModelsService = __decorate([
    common_1.Injectable()
], AllModelsService);
exports.AllModelsService = AllModelsService;
//# sourceMappingURL=all-models.service.js.map