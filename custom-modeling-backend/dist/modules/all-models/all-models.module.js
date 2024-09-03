"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllModelsModule = void 0;
const common_1 = require("@nestjs/common");
const all_models_service_1 = require("./all-models.service");
const all_models_controller_1 = require("./all-models.controller");
let AllModelsModule = class AllModelsModule {
};
AllModelsModule = __decorate([
    common_1.Module({
        providers: [all_models_service_1.AllModelsService],
        controllers: [all_models_controller_1.AllModelsController]
    })
], AllModelsModule);
exports.AllModelsModule = AllModelsModule;
//# sourceMappingURL=all-models.module.js.map