import { Module } from '@nestjs/common';
import { SubAmbienteService } from './sub-ambientes.service';
import { SubAmbientesController } from './sub-ambientes.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [SubAmbientesController],
  providers: [SubAmbienteService, PrismaService],
})
export class SubAmbientesModule {}
