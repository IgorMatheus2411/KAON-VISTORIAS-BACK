import { Controller } from '@nestjs/common';
import { SubAmbientesService } from './sub-ambientes.service';

@Controller('sub-ambientes')
export class SubAmbientesController {
  constructor(private readonly subAmbientesService: SubAmbientesService) {}
}
