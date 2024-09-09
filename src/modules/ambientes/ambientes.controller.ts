import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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

  // http://localhost:3000/123
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: AmbienteDTO) {
    return this.ambientesService.updateAbiente(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.ambientesService.deleteAmbiente(id);
  }
}
