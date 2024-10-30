import { Module } from '@nestjs/common';
import { AmbienteService } from './ambientes.service';
import { AmbientesController } from './ambientes.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [AmbientesController],
  providers: [AmbienteService, PrismaService],
})
export class AmbientesModule {}
