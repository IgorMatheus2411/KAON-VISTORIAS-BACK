import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SubAmbienteService } from './sub-ambientes.service';
import { SubAmbienteDTO } from './sub-ambientes.dto';

@Controller('sub-ambientes')
export class SubAmbientesController {
  constructor(private readonly subAmbientesService: SubAmbienteService) {}

  @Post()
  async create(@Body() data: SubAmbienteDTO) {
    return this.subAmbientesService.createSubAmbiente(data);
  }

  @Get()
  async findAll() {
    return this.subAmbientesService.findAll();
  }

  // http://localhost:3000/123
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: SubAmbienteDTO) {
    return this.subAmbientesService.updateAbiente(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.subAmbientesService.deleteSubAmbiente(id);
  }
}
