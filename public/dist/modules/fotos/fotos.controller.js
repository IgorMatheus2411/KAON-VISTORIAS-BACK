'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.FotosController = void 0;
const common_1 = require('@nestjs/common');
const fotos_service_1 = require('./fotos.service');
const fotos_dto_1 = require('./fotos.dto');
let FotosController = class FotosController {
  constructor(fotoService) {
    this.fotoService = fotoService;
  }
  async create(data) {
    return this.fotoService.createFotos(data);
  }
  async getFotosBySubambienteId(subAmbienteId) {
    return this.fotoService.findAll(subAmbienteId);
  }
  async update(id, data) {
    return this.fotoService.updateFotos(id, data);
  }
  async delete(id) {
    return this.fotoService.deleteFoto(id);
  }
  async deleteAllBySubAmbienteId(subAmbienteId) {
    return this.fotoService.deleteAllFotosBySubAmbienteId(subAmbienteId);
  }
};
exports.FotosController = FotosController;
__decorate(
  [
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [fotos_dto_1.FotosDTO]),
    __metadata('design:returntype', Promise),
  ],
  FotosController.prototype,
  'create',
  null,
);
__decorate(
  [
    (0, common_1.Get)(':subAmbienteId'),
    __param(0, (0, common_1.Param)('subAmbienteId')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', Promise),
  ],
  FotosController.prototype,
  'getFotosBySubambienteId',
  null,
);
__decorate(
  [
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, fotos_dto_1.FotosDTO]),
    __metadata('design:returntype', Promise),
  ],
  FotosController.prototype,
  'update',
  null,
);
__decorate(
  [
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', Promise),
  ],
  FotosController.prototype,
  'delete',
  null,
);
__decorate(
  [
    (0, common_1.Delete)('all/:subAmbienteId'),
    __param(0, (0, common_1.Param)('subAmbienteId')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', Promise),
  ],
  FotosController.prototype,
  'deleteAllBySubAmbienteId',
  null,
);
exports.FotosController = FotosController = __decorate(
  [
    (0, common_1.Controller)('foto'),
    __metadata('design:paramtypes', [fotos_service_1.FotosService]),
  ],
  FotosController,
);
//# sourceMappingURL=fotos.controller.js.map
