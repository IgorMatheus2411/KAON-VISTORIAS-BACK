import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { VistoriaDTO } from './vistoria.dto';

@Injectable()
export class VistoriaService {
  constructor(private prisma: PrismaService) {}

  async createVistoria(data: VistoriaDTO) {
    try {
      const vistoria = await this.prisma.vistoria.create({
        data,
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

  async update(id: string, data: VistoriaDTO) {
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
