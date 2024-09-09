import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { SubAmbienteDTO } from './sub-ambientes.dto';

@Injectable()
export class SubAmbienteService {
  constructor(private prisma: PrismaService) {}

  async createSubAmbiente(data: SubAmbienteDTO) {
    try {
      const SubAmbiente = await this.prisma.subAmbiente.create({
        data,
      });

      return SubAmbiente;
    } catch (error) {
      console.error('Erro ao criar sub-ambiente', error);
      throw new Error('Erro ao criar sub-ambiente');
    }
  }

  async findAll() {
    return this.prisma.subAmbiente.findMany({
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

  async updateAbiente(id: string, data: SubAmbienteDTO) {
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
