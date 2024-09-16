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
  }

  async validatePassword(
    storedPassword: string,
    inputPassword: string,
  ): Promise<boolean> {
    const [salt, hashedPassword] = storedPassword.split(':');
    const derivedKey = (await scrypt(inputPassword, salt, 64)) as Buffer;
    return derivedKey.toString('hex') === hashedPassword;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Usuário não encontrado');

    const isValidPassword = await this.validatePassword(
      user.password,
      password,
    );
    if (!isValidPassword) throw new Error('Senha inválida');

    // Gerar tokens
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    // Armazenar o refresh token
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return { accessToken, refreshToken };
  }

  generateAccessToken(user: any): string {
    return jwt.sign({ id: user.id, email: user.email }, 'seu-segredo-de-jwt', {
      expiresIn: '15m',
    });
  }

  generateRefreshToken(user: any): string {
    return jwt.sign({ id: user.id, email: user.email }, 'seu-segredo-refresh', {
      expiresIn: '7d',
    });
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const payload = jwt.verify(refreshToken, 'seu-segredo-refresh') as any;
      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
      });

      if (!user || user.refreshToken !== refreshToken) {
        throw new Error('Refresh token inválido');
      }

      return this.generateAccessToken(user);
    } catch {
      throw new Error('Erro ao renovar token');
    }
  }

  async logout(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
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
