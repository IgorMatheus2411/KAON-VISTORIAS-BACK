import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  HttpException,
  HttpStatus,
  Patch,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('login')
  async login(@Body() userDto: UserDTO) {
    try {
      const { email, password } = userDto;
      return await this.userService.loginUser(email, password);
    } catch (error) {
      console.error('Error during login:', error);
      throw new HttpException(
        'Erro ao fazer login. Verifique suas credenciais.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('logout')
  async logout(@Body('id') id: string) {
    try {
      await this.userService.logout(id);
      return { message: 'Logout realizado com sucesso.' }; // Adicione esta linha
    } catch (error) {
      console.error('Error during logout:', error);
      throw new HttpException(
        'Erro ao fazer logout.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(@Body() data: UserDTO) {
    try {
      return await this.userService.createUser(data);
    } catch (error) {
      console.error('Error during user creation:', error);
      throw new HttpException('Erro ao criar usuário.', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      console.error('Error during user retrieval:', error);
      throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
    }
  }

  @Get('status')
  async getUserStatus(@Request() req): Promise<{ isActive: boolean }> {
    const userId = req.user.id; // Assumindo que o ID do usuário está em req.user
    const { isActive } = await this.userService.getUserStatus(userId);

    if (!isActive) {
      // Se o usuário não estiver ativo, faça o logout
      await this.userService.logout(userId); // Chame o método de logout aqui
      throw new HttpException(
        'Usuário desativado. Logout realizado.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return { isActive };
  }

  @Get()
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      console.error('Error during users retrieval:', error);
      throw new HttpException(
        'Erro ao buscar usuários.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UserDTO) {
    try {
      return await this.userService.updateUser(id, data);
    } catch (error) {
      console.error('Error during user update:', error);
      throw new HttpException(
        'Erro ao atualizar usuário.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  async desactiveUserById(@Param('id') id: string) {
    try {
      return await this.userService.desactiveUser(id);
    } catch (error) {
      console.error('Error during user deletion:', error);
      throw new HttpException(
        'Erro ao deletar usuário.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
