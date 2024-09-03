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
exports.ModelExecController = void 0;
const common_1 = require("@nestjs/common");
const model_exec_service_1 = require("./model-exec.service");
let ModelExecController = class ModelExecController {
    constructor(ModelExecService) {
        this.ModelExecService = ModelExecService;
    }
    saveModel(body) {
        return this.ModelExecService.saveModel(body);
    }
    test() {
        return this.ModelExecService.getLatestId();
    }
    async getAllPortsById(body) {
        return await this.ModelExecService.getAllPortsById(body.id);
    }
    deleteModel(body) {
        return this.ModelExecService.deleteModel(body.id);
    }
};
__decorate([
    common_1.Post('save'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ModelExecController.prototype, "saveModel", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ModelExecController.prototype, "test", null);
__decorate([
    common_1.Post('getAllPortsById'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ModelExecController.prototype, "getAllPortsById", null);
__decorate([
    common_1.Post('delete'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ModelExecController.prototype, "deleteModel", null);
ModelExecController = __decorate([
    common_1.Controller('model-exec'),
    __metadata("design:paramtypes", [model_exec_service_1.ModelExecService])
], ModelExecController);
exports.ModelExecController = ModelExecController;
//# sourceMappingURL=model-exec.controller.js.map