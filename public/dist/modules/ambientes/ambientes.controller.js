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
exports.AmbientesController = void 0;
const common_1 = require('@nestjs/common');
const ambientes_service_1 = require('./ambientes.service');
const ambientes_dto_1 = require('./ambientes.dto');
let AmbientesController = class AmbientesController {
  constructor(ambientesService) {
    this.ambientesService = ambientesService;
  }
  async create(data) {
    return this.ambientesService.createAmbiente(data);
  }
  async getAmbientesByVistoria(vistoriaId) {
    return this.ambientesService.findAll(vistoriaId);
  }
  async findOne(id) {
    return this.ambientesService.findOne(id);
  }
  async update(id, data) {
    return this.ambientesService.updateAmbiente(id, data);
  }
  async delete(id) {
    return this.ambientesService.deleteAmbiente(id);
  }
};
exports.AmbientesController = AmbientesController;
__decorate(
  [
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [ambientes_dto_1.AmbienteDTO]),
    __metadata('design:returntype', Promise),
  ],
  AmbientesController.prototype,
  'create',
  null,
);
__decorate(
  [
    (0, common_1.Get)(':vistoriaId'),
    __param(0, (0, common_1.Param)('vistoriaId')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', Promise),
  ],
  AmbientesController.prototype,
  'getAmbientesByVistoria',
  null,
);
__decorate(
  [
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', Promise),
  ],
  AmbientesController.prototype,
  'findOne',
  null,
);
__decorate(
  [
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, Object]),
    __metadata('design:returntype', Promise),
  ],
  AmbientesController.prototype,
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
  AmbientesController.prototype,
  'delete',
  null,
);
exports.AmbientesController = AmbientesController = __decorate(
  [
    (0, common_1.Controller)('ambientes'),
    __metadata('design:paramtypes', [ambientes_service_1.AmbienteService]),
  ],
  AmbientesController,
);
//# sourceMappingURL=ambientes.controller.js.map
