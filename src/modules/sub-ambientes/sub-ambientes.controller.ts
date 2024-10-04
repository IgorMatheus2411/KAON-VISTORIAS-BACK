import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SubAmbienteService } from './sub-ambientes.service';
import { SubAmbienteDTO } from './sub-ambientes.dto';

@Controller('subambientes')
export class SubAmbientesController {
  constructor(private readonly subAmbientesService: SubAmbienteService) {}

  @Post()
  async create(@Body() data: SubAmbienteDTO) {
    return this.subAmbientesService.createSubAmbiente(data);
  }

  @Get(':ambienteId')
  async getSubAmbienteByAmbienteId(@Param('ambienteId') ambienteId: string) {
    return this.subAmbientesService.findAll(ambienteId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.subAmbientesService.findOne(id);
  }

  // http://localhost:3000/123
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Partial<SubAmbienteDTO>) {
    return this.subAmbientesService.updateSubAmbiente(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.subAmbientesService.deleteSubAmbiente(id);
  }
}
