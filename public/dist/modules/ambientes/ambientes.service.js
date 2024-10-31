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
Object.defineProperty(exports, '__esModule', { value: true });
exports.AmbienteService = void 0;
const common_1 = require('@nestjs/common');
const PrismaService_1 = require('../../database/PrismaService');
let AmbienteService = class AmbienteService {
  constructor(prisma) {
    this.prisma = prisma;
  }
  async createAmbiente(data) {
    try {
      const ambiente = await this.prisma.ambiente.create({
        data,
      });
      return ambiente;
    } catch (error) {
      console.error('Erro ao criar Ambiente', error);
      throw new Error('Erro ao criar Ambiente');
    }
  }
  async findAll(vistoriaId) {
    return this.prisma.ambiente.findMany({
      where: {
        vistoriaId: vistoriaId,
      },
      include: {
        subAmbientes: true,
        vistoria: {
          select: {
            cliente: true,
          },
        },
      },
    });
  }
  async findOne(id) {
    return this.prisma.ambiente.findUnique({
      where: {
        id,
      },
      include: {
        subAmbientes: true,
      },
    });
  }
  async updateAmbiente(id, data) {
    const ambienteExists = await this.prisma.ambiente.findUnique({
      where: { id },
    });
    if (!ambienteExists) {
      throw new Error('Ambiente não existe!');
    }
    return await this.prisma.ambiente.update({
      data,
      where: {
        id,
      },
    });
  }
  async deleteAmbiente(id) {
    const ambienteExists = await this.prisma.ambiente.findUnique({
      where: {
        id,
      },
    });
    if (!ambienteExists) {
      throw new Error('Ambiente não existe!');
    }
    return await this.prisma.ambiente.delete({
      where: {
        id,
      },
    });
  }
};
exports.AmbienteService = AmbienteService;
exports.AmbienteService = AmbienteService = __decorate(
  [
    (0, common_1.Injectable)(),
    __metadata('design:paramtypes', [PrismaService_1.PrismaService]),
  ],
  AmbienteService,
);
//# sourceMappingURL=ambientes.service.js.map
