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
exports.VistoriasController = void 0;
const common_1 = require("@nestjs/common");
const vistorias_service_1 = require("./vistorias.service");
const vistoria_dto_1 = require("./vistoria.dto");
let VistoriasController = class VistoriasController {
    constructor(vistoriaService) {
        this.vistoriaService = vistoriaService;
    }
    async create(data) {
        return this.vistoriaService.createVistoria(data);
    }
    async findAll(userId) {
        return this.vistoriaService.findAll(userId);
    }
    async findOne(id) {
        return this.vistoriaService.findOne(id);
    }
    async updateVistoria(id, data) {
        return this.vistoriaService.updateVistoria(id, data);
    }
    async delete(id) {
        return this.vistoriaService.delete(id);
    }
};
exports.VistoriasController = VistoriasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vistoria_dto_1.VistoriaDTO]),
    __metadata("design:returntype", Promise)
], VistoriasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VistoriasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VistoriasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VistoriasController.prototype, "updateVistoria", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VistoriasController.prototype, "delete", null);
exports.VistoriasController = VistoriasController = __decorate([
    (0, common_1.Controller)('vistorias'),
    __metadata("design:paramtypes", [vistorias_service_1.VistoriaService])
], VistoriasController);
//# sourceMappingURL=vistorias.controller.js.map