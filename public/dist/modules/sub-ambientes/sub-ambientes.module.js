"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubAmbientesModule = void 0;
const common_1 = require("@nestjs/common");
const sub_ambientes_service_1 = require("./sub-ambientes.service");
const sub_ambientes_controller_1 = require("./sub-ambientes.controller");
const PrismaService_1 = require("../../database/PrismaService");
let SubAmbientesModule = class SubAmbientesModule {
};
exports.SubAmbientesModule = SubAmbientesModule;
exports.SubAmbientesModule = SubAmbientesModule = __decorate([
    (0, common_1.Module)({
        controllers: [sub_ambientes_controller_1.SubAmbientesController],
        providers: [sub_ambientes_service_1.SubAmbienteService, PrismaService_1.PrismaService],
    })
], SubAmbientesModule);
//# sourceMappingURL=sub-ambientes.module.js.map