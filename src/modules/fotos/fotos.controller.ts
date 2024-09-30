import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FotosService } from './fotos.service';
import { FotosDTO } from './fotos.dto';

@Controller('foto')
export class FotosController {
  constructor(private readonly fotoService: FotosService) {}

  @Post()
  async create(@Body() data: FotosDTO) {
    return this.fotoService.createFotos(data);
  }

  @Get()
  async findAll() {
    return this.fotoService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: FotosDTO) {
    return this.fotoService.updateFotos(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.fotoService.deletFoto(id);
  }
}
