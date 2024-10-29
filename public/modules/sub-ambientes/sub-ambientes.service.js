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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubAmbienteService = void 0;
const common_1 = require("@nestjs/common");
const PrismaService_1 = require("../../database/PrismaService");
let SubAmbienteService = class SubAmbienteService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSubAmbiente(data) {
        try {
            const SubAmbiente = await this.prisma.subAmbiente.create({
                data: {
                    nome: data.nome,
                    descricao: data.descricao,
                    ambienteId: data.ambienteId,
                    vistoriaId: data.vistoriaId,
                },
            });
            return SubAmbiente;
        }
        catch (error) {
            console.error('Erro ao criar sub-ambiente', error);
            throw new Error('Erro ao criar sub-ambiente');
        }
    }
    async findAll(ambienteId) {
        return this.prisma.subAmbiente.findMany({
            where: {
                ambienteId: ambienteId,
            },
            include: {
                fotos: {
                    select: {
                        id: true,
                    },
                },
                ambiente: {
                    select: {
                        nome: true,
                    },
                },
                vistoria: {
                    select: {
                        cliente: true,
                    },
                },
            },
        });
    }
    async findOne(id) {
        return this.prisma.subAmbiente.findUnique({
            where: { id },
        });
    }
    async updateSubAmbiente(id, data) {
        const SubAmbienteExists = await this.prisma.subAmbiente.findUnique({
            where: {
                id,
            },
        });
        if (!SubAmbienteExists) {
            throw new Error('sub-ambiente não existe!');
        }
        return await this.prisma.subAmbiente.update({
            data,
            where: {
                id,
            },
        });
    }
    async deleteSubAmbiente(id) {
        const SubAmbienteExists = await this.prisma.subAmbiente.findUnique({
            where: {
                id,
            },
        });
        if (!SubAmbienteExists) {
            throw new Error('sub-ambiente não existe!');
        }
        return await this.prisma.subAmbiente.delete({
            where: {
                id,
            },
        });
    }
};
exports.SubAmbienteService = SubAmbienteService;
exports.SubAmbienteService = SubAmbienteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [PrismaService_1.PrismaService])
], SubAmbienteService);
//# sourceMappingURL=sub-ambientes.service.js.map