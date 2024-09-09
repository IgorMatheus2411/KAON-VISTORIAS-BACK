import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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

  // http://localhost:3000/123
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: VistoriaDTO) {
    return this.vistoriaService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.vistoriaService.delete(id);
  }
}
