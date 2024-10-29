"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const PrismaService_1 = require("../../database/PrismaService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = 'https://zvcycdfkcmmakmhfikhe.supabase.co';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseServiceRoleKey);
const jwtSecret = process.env.JWT_SECRET || 'seu-segredo-de-jwt';
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || 'seu-segredo-refresh';
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async loginUser(email, password) {
        if (!email || !password) {
            throw new Error('Email e senha são obrigatórios.');
        }
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error || !data.user) {
            throw new common_1.UnauthorizedException('Erro ao fazer login: ' + (error?.message || 'Usuário não encontrado.'));
        }
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('Usuário não encontrado no banco de dados.');
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('Usuário está inativo.');
        }
        const accessToken = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);
        await this.prisma.user.update({
            where: { email },
            data: { refreshToken },
        });
        return { accessToken, refreshToken, user };
    }
    async createUser(data) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        const user = await this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
            },
        });
        const refreshToken = this.generateRefreshToken(user);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { refreshToken },
        });
        return user;
    }
    async getUserByRefreshToken(email) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        return user;
    }
    generateAccessToken(user) {
        return jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
            expiresIn: '15m',
        });
    }
    generateRefreshToken(user) {
        return jwt.sign({ id: user.id, email: user.email }, jwtRefreshSecret, {
            expiresIn: '7d',
        });
    }
    async refreshAccessToken(refreshToken) {
        let decoded;
        try {
            decoded = jwt.verify(refreshToken, jwtRefreshSecret);
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException('Refresh token inválido.');
        }
        const user = await this.prisma.user.findUnique({
            where: { id: decoded.id },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Usuário não encontrado.');
        }
        const accessToken = this.generateAccessToken(user);
        const newRefreshToken = this.generateRefreshToken(user);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: newRefreshToken },
        });
        return { user, accessToken, newRefreshToken };
    }
    async logout(id) {
        await this.prisma.user.update({
            where: { id },
            data: { refreshToken: null },
        });
        await supabase.auth.signOut();
        return { message: 'Logout realizado com sucesso.' };
    }
    async findOne(id) {
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
    async updateUser(id, data) {
        const userExists = await this.prisma.user.findUnique({ where: { id } });
        if (!userExists) {
            throw new Error('Usuário não existe!');
        }
        return await this.prisma.user.update({
            where: { id },
            data,
        });
    }
    async desactiveUser(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new Error('Usuário não existe!');
        }
        const isActive = !user.isActive;
        return await this.prisma.user.update({
            where: { id },
            data: { isActive, refreshToken: null },
        });
    }
    async getUserStatus(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { isActive: true },
        });
        if (!user) {
            throw new Error('Usuário não encontrado!');
        }
        return { isActive: user.isActive };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [PrismaService_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map