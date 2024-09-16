import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class SubAmbienteDTO {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  ambienteId: string;

  @IsNotEmpty()
  @IsString()
  vistoriaId: string;

  @IsOptional()
  @IsString()
  descricao?: string;
}
