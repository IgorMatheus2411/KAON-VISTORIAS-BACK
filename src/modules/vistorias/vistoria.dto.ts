import {
  IsOptional,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class VistoriaDTO {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  area_vistoriada: string;

  @IsNotEmpty()
  @IsString()
  cliente: string;

  @IsNotEmpty()
  @IsDateString()
  data_agendamento: Date | string;

  @IsNotEmpty()
  @IsDateString()
  data_laudo: Date | string;

  @IsNotEmpty()
  @IsString()
  endereco: string;

  @IsNotEmpty()
  @IsBoolean()
  finalizada: boolean;

  @IsNotEmpty()
  @IsString()
  locador: string;

  @IsNotEmpty()
  @IsString()
  locatario: string;

  @IsNotEmpty()
  @IsString()
  mobiliado: string;

  @IsNotEmpty()
  @IsString()
  tipo_imovel: string;

  @IsNotEmpty()
  @IsString()
  tipo_vistoria: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
