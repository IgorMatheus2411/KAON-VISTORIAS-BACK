import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class AmbienteDTO {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  vistoriaId: string;

  @IsOptional()
  @IsString()
  descricao?: string;
}
