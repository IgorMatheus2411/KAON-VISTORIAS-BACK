import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class FotosDTO {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  vistoriaId: string;

  @IsOptional()
  @IsString()
  ambienteId?: string;

  @IsOptional()
  @IsString()
  subAmbienteId?: string;
}
