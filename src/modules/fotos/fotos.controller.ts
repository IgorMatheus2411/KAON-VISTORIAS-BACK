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
import { fotosDTO } from './fotos.dto';

@Controller('fotos')
export class FotosController {
  constructor(private readonly fotoService: FotosService) {}

  @Post()
  async create(@Body() data: fotosDTO) {
    return this.fotoService.createFotos(data);
  }

  @Get()
  async findAll() {
    return this.fotoService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: fotosDTO) {
    return this.fotoService.updateFotos(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.fotoService.deletFoto(id);
  }
}
