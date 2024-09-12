import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { VistoriaDTO } from './vistoria.dto';

@Injectable()
export class VistoriaService {
  constructor(private prisma: PrismaService) {}

  async createVistoria(data: VistoriaDTO) {
    try {
      const vistoria = await this.prisma.vistoria.create({
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

      return vistoria;
    } catch (error) {
      console.error('Error creating vistoria:', error);
      throw new Error('Error creating vistoria');
    }
  }

  async findAll() {
    return this.prisma.vistoria.findMany({
      include: {
        ambientes: true,
        sub_ambientes: true,
      },
    });
  }

  async update(id: string, data: Partial<VistoriaDTO>) {
    const vistoriaExists = await this.prisma.vistoria.findUnique({
      where: {
        id,
      },
    });

    if (!vistoriaExists) {
      throw new Error('Vistoria não existe!');
    }

    return await this.prisma.vistoria.update({
      data,
      where: {
        id,
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
