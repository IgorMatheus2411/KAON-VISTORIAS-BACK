import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { VistoriaDTO } from './vistoria.dto';

// Define um tipo para campos atualizáveis, excluindo campos que não devem ser atualizados diretamente
@Injectable()
export class VistoriaService {
  constructor(private prisma: PrismaService) {}

  async createVistoria(data: VistoriaDTO) {
    try {
      return await this.prisma.vistoria.create({
        data: {
          area_vistoriada: data.area_vistoriada,
          cliente: data.cliente,
          data_agendamento: new Date(data.data_agendamento), // Converter para Date
          data_laudo: new Date(data.data_laudo), // Converter para Date
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
    } catch (error) {
      console.error('Error creating vistoria:', error);
      throw new Error('Error creating vistoria');
    }
  }

  async findAll(userId: string) {
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

  async findOne(id: string) {
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

  async updateVistoria(id: string, data: Partial<VistoriaDTO>) {
    // Verifica se a vistoria existe
    const existingVistoria = await this.prisma.vistoria.findUnique({
      where: { id },
    });

    if (!existingVistoria) {
      throw new Error('Vistoria não existe!');
    }

    // Realiza a atualização somente com os campos fornecidos
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

  async delete(id: string) {
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
}
