import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { SubAmbienteDTO } from './sub-ambientes.dto';

@Injectable()
export class SubAmbienteService {
  constructor(private prisma: PrismaService) {}

  async createSubAmbiente(data: SubAmbienteDTO) {
    try {
      const SubAmbiente = await this.prisma.subAmbiente.create({
        data: {
          nome: data.nome,
          descricao: data.descricao,
          ambiente: {
            connect: {
              id: data.ambienteId,
            },
          },
          vistoria: {
            connect: {
              id: data.vistoriaId, // ID da vistoria a ser conectada
            },
          },
        },
      });

      return SubAmbiente;
    } catch (error) {
      console.error('Erro ao criar sub-ambiente', error);
      throw new Error('Erro ao criar sub-ambiente');
    }
  }

  async findAll(ambienteId: string) {
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
            nome: true, // Puxa apenas o campo 'cliente' da vistoria
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.subAmbiente.findUnique({
      where: { id },
    });
  }

  async updateSubAmbiente(id: string, data: Partial<SubAmbienteDTO>) {
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

  async deleteSubAmbiente(id: string) {
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
}
