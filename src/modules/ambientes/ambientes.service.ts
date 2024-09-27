import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { AmbienteDTO } from './ambientes.dto';

@Injectable()
export class AmbienteService {
  constructor(private prisma: PrismaService) {}

  async createAmbiente(data: AmbienteDTO) {
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

  async findAll() {
    return this.prisma.ambiente.findMany({
      include: {
        subAmbientes: true,
        vistoria: {
          select: {
            cliente: true, // Puxa apenas o campo 'cliente' da vistoria
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.ambiente.findUnique({
      where: {
        id,
      },
      include: {
        subAmbientes: true,
      },
    });
  }

  async updateAmbiente(id: string, data: Partial<AmbienteDTO>) {
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

  async deleteAmbiente(id: string) {
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
}
