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
exports.AllModelsController = void 0;
const common_1 = require("@nestjs/common");
const all_models_service_1 = require("./all-models.service");
let AllModelsController = class AllModelsController {
    constructor(AllModelsService) {
        this.AllModelsService = AllModelsService;
    }
    getModelsBasicInfo() {
        return this.AllModelsService.getModelsBasicInfo();
    }
    getModelById(body) {
        return this.AllModelsService.getModelById(body.id);
    }
};
__decorate([
    common_1.Get('basicinfo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AllModelsController.prototype, "getModelsBasicInfo", null);
__decorate([
    common_1.Post('getModelById'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AllModelsController.prototype, "getModelById", null);
AllModelsController = __decorate([
    common_1.Controller('all-models'),
    __metadata("design:paramtypes", [all_models_service_1.AllModelsService])
], AllModelsController);
exports.AllModelsController = AllModelsController;
//# sourceMappingURL=all-models.controller.js.map