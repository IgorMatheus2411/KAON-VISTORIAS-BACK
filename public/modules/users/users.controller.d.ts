import { UsersService } from './users.service';
import { UserDTO } from './user.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    login(userDto: UserDTO): Promise<{
        accessToken: string;
        refreshToken: string;
        user: import(".prisma/client").User;
    }>;
    logout(id: string): Promise<{
        message: string;
    }>;
    create(data: UserDTO): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        refreshToken: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOne(id: string): Promise<{
        name: string;
        email: string;
        id: string;
        vistorias: {
            cliente: string;
        }[];
    }>;
    getUserStatus(req: any): Promise<{
        isActive: boolean;
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
    update(id: string, data: UserDTO): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        refreshToken: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    desactiveUserById(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        refreshToken: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
