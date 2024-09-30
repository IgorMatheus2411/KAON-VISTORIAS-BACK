import { Injectable } from '@nestjs/common';
import { FotosDTO } from './fotos.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class FotosService {
  constructor(private prisma: PrismaService) {}

  async createFotos(data: FotosDTO) {
    try {
      const fotos = await this.prisma.foto.create({
        data,
      });

      return fotos;
    } catch (error) {
      console.error('Erro ao subir foto', error);
      throw new Error('Erro ao subir foto');
    }
  }

  async findAll() {
    return this.prisma.foto.findMany({
      include: {
        ambiente: {
          select: {
            id: true, // Puxa apenas o campo 'cliente' da vistoria
          },
        },
        subAmbiente: {
          select: {
            id: true, // Puxa apenas o campo 'cliente' da vistoria
          },
        },
      },
    });
  }

  async findAllByAmbienteId(id: string) {
    return this.prisma.foto.findMany({ where: { ambienteId: id } });
  }

  async findAllBySubAmbienteId(id: string) {
    return this.prisma.foto.findMany({ where: { subAmbienteId: id } });
  }

  async updateFotos(id: string, data: FotosDTO) {
    const fotosExists = await this.prisma.ambiente.findUnique({
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

  async deletFoto(id: string) {
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
}
