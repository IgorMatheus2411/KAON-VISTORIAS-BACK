import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { VistoriaService } from './vistorias.service';
import { VistoriaDTO } from './vistoria.dto';

@Controller('vistorias')
export class VistoriasController {
  constructor(private readonly vistoriaService: VistoriaService) {}

  @Post()
  async create(@Body() data: VistoriaDTO) {
    return this.vistoriaService.createVistoria(data);
  }

  @Get()
  async findAll() {
    return this.vistoriaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.vistoriaService.findOne(id);
  }

  @Patch(':id')
  async updateVistoria(
    @Param('id') id: string,
    @Body() data: Partial<VistoriaDTO>, // Usa Partial para permitir campos opcionais
  ) {
    return this.vistoriaService.updateVistoria(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.vistoriaService.delete(id);
  }
}
