import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserDTO } from './user.dto';
import { promisify } from 'util';
import { randomBytes, scrypt as scryptCallback } from 'crypto';
import * as jwt from 'jsonwebtoken';

const scrypt = promisify(scryptCallback);

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: UserDTO) {
    try {
      const salt = randomBytes(16).toString('hex');
      const derivedKey = (await scrypt(data.password, salt, 64)) as Buffer;
      const hashedPassword = derivedKey.toString('hex');

      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: `${salt}:${hashedPassword}`,
        },
      });
      return user;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw new Error('Erro ao criar usuário');
    }
  }

  async validatePassword(
    storedPassword: string,
    inputPassword: string,
  ): Promise<boolean> {
    const [salt, hashedPassword] = storedPassword.split(':');
    const derivedKey = (await scrypt(inputPassword, salt, 64)) as Buffer;
    return derivedKey.toString('hex') === hashedPassword;
  }

  async login(email: string, password: string): Promise<string> {
    // Encontrar o usuário pelo email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Validar a senha fornecida
    const isValidPassword = await this.validatePassword(
      user.password,
      password,
    );

    if (!isValidPassword) {
      throw new Error('Senha inválida');
    }

    // Gerar um token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email }, // Payload do token
      'seu-segredo-de-jwt', // Segredo para assinatura do token (mantenha isso em um ambiente seguro)
      { expiresIn: '1h' }, // Configuração do tempo de expiração do token
    );

    return token;
  }

  async findOne(id: string) {
    return this.prisma.user.findMany({
      where: {
        id,
      },
      include: {
        vistorias: {
          select: {
            cliente: true, // Puxa apenas o campo 'cliente' da vistoria
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        vistorias: {
          select: {
            cliente: true, // Puxa apenas o campo 'cliente' da vistoria
          },
        },
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
