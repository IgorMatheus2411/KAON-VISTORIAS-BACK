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
exports.FotosService = void 0;
const common_1 = require("@nestjs/common");
const PrismaService_1 = require("../../database/PrismaService");
let FotosService = class FotosService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createFotos(data) {
        try {
            const fotos = await this.prisma.foto.create({
                data,
            });
            return fotos;
        }
        catch (error) {
            console.error('Erro ao subir foto', error);
            throw new Error('Erro ao subir foto');
        }
    }
    async findAll(subAmbienteId) {
        return this.prisma.foto.findMany({
            where: {
                subAmbienteId: subAmbienteId,
            },
            include: {
                ambiente: {
                    select: {
                        id: true,
                    },
                },
                subAmbiente: {
                    select: {
                        id: true,
                    },
                },
            },
        });
    }
    async findAllByAmbienteId(id) {
        return this.prisma.foto.findMany({ where: { ambienteId: id } });
    }
    async findAllBySubAmbienteId(id) {
        return this.prisma.foto.findMany({ where: { subAmbienteId: id } });
    }
    async updateFotos(id, data) {
        const fotosExists = await this.prisma.foto.findUnique({
            where: {
                id,
            },
        });
        if (!fotosExists) {
            throw new Error('Foto não encontrada!');
        }
        return await this.prisma.foto.update({
            data,
            where: {
                id,
            },
        });
    }
    async deleteFoto(id) {
        const fotosExists = await this.prisma.foto.findUnique({
            where: {
                id,
            },
        });
        if (!fotosExists) {
            throw new Error('Foto não encontrada!');
        }
        return await this.prisma.foto.delete({
            where: {
                id,
            },
        });
    }
    async deleteAllFotosBySubAmbienteId(subAmbienteId) {
        const fotos = await this.prisma.foto.findMany({
            where: {
                subAmbienteId,
            },
        });
        if (fotos.length === 0) {
            throw new Error('Nenhuma foto encontrada para este subambiente!');
        }
        return await this.prisma.foto.deleteMany({
            where: {
                subAmbienteId,
            },
        });
    }
};
exports.FotosService = FotosService;
exports.FotosService = FotosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [PrismaService_1.PrismaService])
], FotosService);
//# sourceMappingURL=fotos.service.js.map