import { Controller } from '@nestjs/common';
import { VistoriasService } from './vistorias.service';

@Controller('vistorias')
export class VistoriasController {
  constructor(private readonly vistoriasService: VistoriasService) {}
}
