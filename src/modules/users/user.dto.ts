import { IsNotEmpty, IsEmail, MinLength, IsOptional } from 'class-validator';

export class UserDTO {
  @IsOptional()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
  password: string;
}
