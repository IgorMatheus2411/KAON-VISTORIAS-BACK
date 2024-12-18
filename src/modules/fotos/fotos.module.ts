import { Module } from '@nestjs/common';
import { FotosService } from './fotos.service';
import { FotosController } from './fotos.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [FotosController],
  providers: [FotosService, PrismaService],
})
export class FotosModule {}
