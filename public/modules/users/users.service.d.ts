import { PrismaService } from 'src/database/PrismaService';
import { UserDTO } from './user.dto';
import { User } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    loginUser(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: User;
    }>;
    createUser(data: UserDTO): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        refreshToken: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getUserByRefreshToken(email: string): Promise<User | null>;
    generateAccessToken(user: User): string;
    generateRefreshToken(user: User): string;
    refreshAccessToken(refreshToken: string): Promise<{
        user: User;
        accessToken: string;
        newRefreshToken: string;
    }>;
    logout(id: string): Promise<{
        message: string;
    }>;
    findOne(id: string): Promise<{
        name: string;
        email: string;
        id: string;
        vistorias: {
            cliente: string;
        }[];
    }>;
    findAll(): Promise<({
        vistorias: {
            cliente: string;
        }[];
    } & {
        id: string;
        name: string;
        email: string;
        password: string;
        refreshToken: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    updateUser(id: string, data: UserDTO): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        refreshToken: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    desactiveUser(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        refreshToken: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getUserStatus(userId: string): Promise<{
        isActive: boolean;
    }>;
}
