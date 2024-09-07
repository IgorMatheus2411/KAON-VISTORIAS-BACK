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
}
