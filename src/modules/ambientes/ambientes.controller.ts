import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AmbienteService } from './ambientes.service';
import { AmbienteDTO } from './ambientes.dto';

@Controller('ambientes')
export class AmbientesController {
  constructor(private readonly ambientesService: AmbienteService) {}

  @Post()
  async create(@Body() data: AmbienteDTO) {
    return this.ambientesService.createAmbiente(data);
  }

  @Get()
  async findAll() {
    return this.ambientesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ambientesService.findOne(id);
  }

  // http://localhost:3000/123
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Partial<AmbienteDTO>) {
    return this.ambientesService.updateAmbiente(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.ambientesService.deleteAmbiente(id);
  }
}
