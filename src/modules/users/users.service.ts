import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserDTO } from './user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: UserDTO) {
    try {
      const user = await this.prisma.user.create({
        data,
      });

      return user;
    } catch (error) {
      console.error('Erro ao criar usuario', error);
      throw new Error('Erro ao criar usuario');
    }
  }

  async findOne(id: string) {
    return this.prisma.user.findMany({
      where: {
        id,
      },
    });
  }

  async updateUser(id: string, data: UserDTO) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new Error('Usuario não existe!');
    }

    return await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async deleteUser(id: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new Error('Usuario não existe!');
    }

    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
