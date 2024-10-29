"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VistoriasModule = void 0;
const common_1 = require("@nestjs/common");
const vistorias_service_1 = require("./vistorias.service");
const vistorias_controller_1 = require("./vistorias.controller");
const PrismaService_1 = require("../../database/PrismaService");
let VistoriasModule = class VistoriasModule {
};
exports.VistoriasModule = VistoriasModule;
exports.VistoriasModule = VistoriasModule = __decorate([
    (0, common_1.Module)({
        controllers: [vistorias_controller_1.VistoriasController],
        providers: [vistorias_service_1.VistoriaService, PrismaService_1.PrismaService],
    })
], VistoriasModule);
//# sourceMappingURL=vistorias.module.js.map