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
exports.SubAmbientesController = void 0;
const common_1 = require("@nestjs/common");
const sub_ambientes_service_1 = require("./sub-ambientes.service");
const sub_ambientes_dto_1 = require("./sub-ambientes.dto");
let SubAmbientesController = class SubAmbientesController {
    constructor(subAmbientesService) {
        this.subAmbientesService = subAmbientesService;
    }
    async create(data) {
        return this.subAmbientesService.createSubAmbiente(data);
    }
    async getSubAmbienteByAmbienteId(ambienteId) {
        return this.subAmbientesService.findAll(ambienteId);
    }
    async findOne(id) {
        return this.subAmbientesService.findOne(id);
    }
    async update(id, data) {
        return this.subAmbientesService.updateSubAmbiente(id, data);
    }
    async delete(id) {
        return this.subAmbientesService.deleteSubAmbiente(id);
    }
};
exports.SubAmbientesController = SubAmbientesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sub_ambientes_dto_1.SubAmbienteDTO]),
    __metadata("design:returntype", Promise)
], SubAmbientesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':ambienteId'),
    __param(0, (0, common_1.Param)('ambienteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubAmbientesController.prototype, "getSubAmbienteByAmbienteId", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubAmbientesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SubAmbientesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubAmbientesController.prototype, "delete", null);
exports.SubAmbientesController = SubAmbientesController = __decorate([
    (0, common_1.Controller)('subambientes'),
    __metadata("design:paramtypes", [sub_ambientes_service_1.SubAmbienteService])
], SubAmbientesController);
//# sourceMappingURL=sub-ambientes.controller.js.map