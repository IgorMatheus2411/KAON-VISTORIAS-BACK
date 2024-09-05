import { Controller } from '@nestjs/common';
import { AmbientesService } from './ambientes.service';

@Controller('ambientes')
export class AmbientesController {
  constructor(private readonly ambientesService: AmbientesService) {}
}
