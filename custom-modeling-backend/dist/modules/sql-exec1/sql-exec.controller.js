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
exports.SqlExecController = void 0;
const common_1 = require("@nestjs/common");
const sql_exec_service_1 = require("./sql-exec.service");
let SqlExecController = class SqlExecController {
    constructor(SqlExecService) {
        this.SqlExecService = SqlExecService;
    }
    async execSql(body) {
        console.log('body', body);
        if (body.nodes[body.id].type === "数据库") {
            return this.SqlExecService.execShowDatabase(body);
        }
        else {
            return this.SqlExecService.execTool(body);
        }
    }
    getItemNums(body) {
        return this.SqlExecService.getItemNums(body);
    }
    getDataByField(body) {
        return this.SqlExecService.getDataByField(body);
    }
    async getUnionSql(body) {
        return { "data": await this.SqlExecService.getInnerJoinSql(body), "sqlstr": this.SqlExecService.getSelectSql(body) };
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SqlExecController.prototype, "execSql", null);
__decorate([
    common_1.Post('getNums'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SqlExecController.prototype, "getItemNums", null);
__decorate([
    common_1.Post('getdatabyfield'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SqlExecController.prototype, "getDataByField", null);
__decorate([
    common_1.Post('innerjoin'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SqlExecController.prototype, "getUnionSql", null);
SqlExecController = __decorate([
    common_1.Controller('sql-exec'),
    __metadata("design:paramtypes", [sql_exec_service_1.SqlExecService])
], SqlExecController);
exports.SqlExecController = SqlExecController;
//# sourceMappingURL=sql-exec.controller.js.map