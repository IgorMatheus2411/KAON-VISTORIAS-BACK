import { Body, Controller, Post } from '@nestjs/common';
import { VistoriaService } from './vistorias.service';
import { VistoriaDTO } from './vistoria.dto';
@Controller('vistorias')
export class VistoriasController {
  constructor(private readonly vistoriaService: VistoriaService) {}

  @Post()
  async create(@Body() data: VistoriaDTO) {
    return this.vistoriaService.createVistoria(data);
  }
}
