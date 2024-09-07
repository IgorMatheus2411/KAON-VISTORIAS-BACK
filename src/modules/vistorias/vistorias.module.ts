import { Module } from '@nestjs/common';
import { VistoriaService } from './vistorias.service';
import { VistoriasController } from './vistorias.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [VistoriasController],
  providers: [VistoriaService, PrismaService],
})
export class VistoriasModule {}
