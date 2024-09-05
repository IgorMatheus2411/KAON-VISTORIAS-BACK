import { Module } from '@nestjs/common';
import { SubAmbientesService } from './sub-ambientes.service';
import { SubAmbientesController } from './sub-ambientes.controller';

@Module({
  controllers: [SubAmbientesController],
  providers: [SubAmbientesService],
})
export class SubAmbientesModule {}
