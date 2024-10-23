import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('login')
  async login(@Body() userDto: UserDTO) {
    try {
      console.log('Login request:', userDto);
      return await this.userService.loginUser(userDto.email, userDto.password);
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  @Post('refresh-token')
  async refreshAccessToken(@Body('refreshToken') refreshToken: string) {
    return this.userService.refreshAccessToken(refreshToken);
  }

  @Post('logout')
  async logout(@Body('userId') userId: string) {
    return this.userService.logout(userId);
  }

  @Post()
  async create(@Body() data: UserDTO) {
    return this.userService.createUser(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  // http://localhost:3000/123
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UserDTO) {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
