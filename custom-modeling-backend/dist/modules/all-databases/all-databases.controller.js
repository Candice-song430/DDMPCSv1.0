"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllDatabasesController = void 0;
const common_1 = require("@nestjs/common");
const all_databases_service_1 = require("./all-databases.service");
const fs = require('fs');
const path = require('path');
let originPath = path.join(__dirname, '../../../static/origin.json');
let AllDatabasesController = class AllDatabasesController {
    constructor(AllDatabasesService) {
        this.AllDatabasesService = AllDatabasesService;
    }
    getAllDatabases() {
        return this.AllDatabasesService.getAllDatabases();
    }
    saveDatabases(body) {
        this.AllDatabasesService.saveDatabases(body);
    }
    async getInfoByDatabasesName() {
        let rowdata = fs.readFileSync(originPath);
        let data = JSON.parse(rowdata);
        let databases = [];
        let did = 0;
        for (let it in data) {
            for (let databaseName of data[it]) {
                let databaseInfo = await this.AllDatabasesService.getInfoByDatabaseName(databaseName);
                let database = {
                    "did": did++,
                    "ori_name": databaseInfo[0].tablename,
                    "show_name": databaseInfo[0].comment || 'None',
                    "category": it,
                    "field": []
                };
                let databaseFields = await this.AllDatabasesService.getFieldsByDatabaseName(databaseName);
                databaseFields.forEach(it => {
                    database.field.push({
                        "ori_field": `${database.ori_name}$${it.attname}`,
                        "show_field": it.description,
                        "type": it.type,
                        "checked": "true"
                    });
                });
                databases.push(database);
            }
        }
        this.AllDatabasesService.saveDatabases(databases);
        return databases;
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AllDatabasesController.prototype, "getAllDatabases", null);
__decorate([
    common_1.Post('/save'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AllDatabasesController.prototype, "saveDatabases", null);
__decorate([
    common_1.Get('/getInfoByDatabaseName'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AllDatabasesController.prototype, "getInfoByDatabasesName", null);
AllDatabasesController = __decorate([
    common_1.Controller('all-databases'),
    __metadata("design:paramtypes", [all_databases_service_1.AllDatabasesService])
], AllDatabasesController);
exports.AllDatabasesController = AllDatabasesController;
//# sourceMappingURL=all-databases.controller.js.map