import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService'; // Ajuste o caminho conforme necessário
import { UserDTO } from './user.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';
import { User } from '@prisma/client';

// Configurações do Supabase
const supabaseUrl = 'https://zvcycdfkcmmakmhfikhe.supabase.co';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Configurações dos segredos JWT
const jwtSecret = process.env.JWT_SECRET || 'seu-segredo-de-jwt';
const jwtRefreshSecret =
  process.env.JWT_REFRESH_SECRET || 'seu-segredo-refresh';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async loginUser(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string; user: User }> {
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios.');
    }

    // Tentar autenticar o usuário no Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      throw new UnauthorizedException(
        'Erro ao fazer login: ' + (error?.message || 'Usuário não encontrado.'),
      );
    }

    // Verificar se o usuário está ativo no banco de dados
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException(
        'Usuário não encontrado no banco de dados.',
      );
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Usuário está inativo.');
    }

    // Gerar o accessToken e o refreshToken
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    // Atualizar o refreshToken no banco de dados
    await this.prisma.user.update({
      where: { email },
      data: { refreshToken },
    });

    return { accessToken, refreshToken, user };
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

    // Geração de refreshToken ao criar usuário
    const refreshToken = this.generateRefreshToken(user);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return user;
  }

  async getUserByRefreshToken(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email }, // Busca diretamente pelo refreshToken
    });
    return user;
  }

  generateAccessToken(user: User): string {
    return jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: '15m',
    });
  }

  generateRefreshToken(user: User): string {
    return jwt.sign({ id: user.id, email: user.email }, jwtRefreshSecret, {
      expiresIn: '7d',
    });
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ user: User; accessToken: string; newRefreshToken: string }> {
    // Verifique o refreshToken e valide-o usando jsonwebtoken
    let decoded: any;
    try {
      decoded = jwt.verify(refreshToken, jwtRefreshSecret); // Decodifica e verifica o token
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Refresh token inválido.');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }

    // Gerar novos tokens
    const accessToken = this.generateAccessToken(user);
    const newRefreshToken = this.generateRefreshToken(user);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    // Retornar o usuário junto com os novos tokens
    return { user, accessToken, newRefreshToken };
  }

  async logout(id: string) {
    await this.prisma.user.update({
      where: { id },
      data: { refreshToken: null },
    });
    await supabase.auth.signOut();

    return { message: 'Logout realizado com sucesso.' };
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
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
            cliente: true,
          },
        },
      },
    });
  }

  async updateUser(id: string, data: UserDTO) {
    // Verifica se o usuário existe com base no ID
    const userExists = await this.prisma.user.findUnique({ where: { id } });

    if (!userExists) {
      throw new Error('Usuário não existe!');
    }

    // Atualiza o usuário com os dados fornecidos
    return await this.prisma.user.update({
      where: { id }, // Use o ID para atualizar o usuário
      data,
    });
  }

  async desactiveUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error('Usuário não existe!');
    }

    // Atualizar o campo isActive para false em vez de deletar o usuário
    const isActive = !user.isActive; // Inverte o status
    return await this.prisma.user.update({
      where: { id },
      data: { isActive, refreshToken: null },
    });
  }

  async getUserStatus(userId: string): Promise<{ isActive: boolean }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { isActive: true },
    });

    if (!user) {
      throw new Error('Usuário não encontrado!');
    }

    return { isActive: user.isActive };
  }
}
