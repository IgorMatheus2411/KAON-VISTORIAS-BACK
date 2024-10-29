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
exports.VistoriaService = void 0;
const common_1 = require("@nestjs/common");
const PrismaService_1 = require("../../database/PrismaService");
let VistoriaService = class VistoriaService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createVistoria(data) {
        try {
            return await this.prisma.vistoria.create({
                data: {
                    area_vistoriada: data.area_vistoriada,
                    cliente: data.cliente,
                    data_agendamento: new Date(data.data_agendamento),
                    data_laudo: new Date(data.data_laudo),
                    endereco: data.endereco,
                    finalizada: data.finalizada,
                    locador: data.locador,
                    locatario: data.locatario,
                    mobiliado: data.mobiliado,
                    tipo_imovel: data.tipo_imovel,
                    tipo_vistoria: data.tipo_vistoria,
                    userId: data.userId,
                },
            });
        }
        catch (error) {
            console.error('Error creating vistoria:', error);
            throw new Error('Error creating vistoria');
        }
    }
    async findAll(userId) {
        return this.prisma.vistoria.findMany({
            where: {
                userId: userId,
            },
            include: {
                ambientes: true,
                sub_ambientes: true,
                Foto: true,
            },
        });
    }
    async findOne(id) {
        return this.prisma.vistoria.findUnique({
            where: {
                id,
            },
            include: {
                ambientes: true,
                sub_ambientes: true,
            },
        });
    }
    async updateVistoria(id, data) {
        const existingVistoria = await this.prisma.vistoria.findUnique({
            where: { id },
        });
        if (!existingVistoria) {
            throw new Error('Vistoria não existe!');
        }
        return await this.prisma.vistoria.update({
            where: { id },
            data: {
                ...data,
                data_agendamento: data.data_agendamento
                    ? new Date(data.data_agendamento)
                    : existingVistoria.data_agendamento,
                data_laudo: data.data_laudo
                    ? new Date(data.data_laudo)
                    : existingVistoria.data_laudo,
            },
        });
    }
    async delete(id) {
        const vistoriaExists = await this.prisma.vistoria.findUnique({
            where: {
                id,
            },
        });
        if (!vistoriaExists) {
            throw new Error('Vistoria não existe!');
        }
        return await this.prisma.vistoria.delete({
            where: {
                id,
            },
        });
    }
};
exports.VistoriaService = VistoriaService;
exports.VistoriaService = VistoriaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [PrismaService_1.PrismaService])
], VistoriaService);
//# sourceMappingURL=vistorias.service.js.map