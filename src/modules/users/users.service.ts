import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserDTO } from './user.dto';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zvcycdfkcmmakmhfikhe.supabase.co';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async loginUser(email: string, password: string) {
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios.');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(`Erro ao fazer login: ${error.message}`);
    }
    return data.user;
  }

  async createUser(data: UserDTO) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    return user;
  }

  async validatePassword(
    storedPassword: string,
    inputPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, storedPassword); // bcrypt já faz a comparação diretamente
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const isValidPassword = await this.validatePassword(
      user.password,
      password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Senha inválida');
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

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

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ accessToken: string; newRefreshToken: string }> {
    try {
      const payload = jwt.verify(refreshToken, 'seu-segredo-refresh') as any;
      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
      });

      if (!user || user.refreshToken !== refreshToken) {
        throw new Error('Refresh token inválido');
      }

      // Gerar novo refresh token e access token
      const newAccessToken = this.generateAccessToken(user);
      const newRefreshToken = this.generateRefreshToken(user);

      // Atualiza o refresh token no banco
      await this.prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: newRefreshToken },
      });

      return { accessToken: newAccessToken, newRefreshToken };
    } catch (error) {
      // Primeiro logue o erro no console
      console.log('Erro ao renovar token:', error);

      // Depois lance um novo erro
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
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        // Excluir password e refreshToken
        vistorias: {
          select: {
            cliente: true,
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
