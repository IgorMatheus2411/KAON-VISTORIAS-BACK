import { PrismaService } from 'src/database/PrismaService';
import { AmbienteDTO } from './ambientes.dto';
export declare class AmbienteService {
    private prisma;
    constructor(prisma: PrismaService);
    createAmbiente(data: AmbienteDTO): Promise<{
        id: string;
        nome: string;
        vistoriaId: string;
        descricao: string | null;
    }>;
    findAll(vistoriaId: string): Promise<({
        vistoria: {
            cliente: string;
        };
        subAmbientes: {
            id: string;
            nome: string;
            ambienteId: string;
            vistoriaId: string;
            descricao: string | null;
        }[];
    } & {
        id: string;
        nome: string;
        vistoriaId: string;
        descricao: string | null;
    })[]>;
    findOne(id: string): Promise<{
        subAmbientes: {
            id: string;
            nome: string;
            ambienteId: string;
            vistoriaId: string;
            descricao: string | null;
        }[];
    } & {
        id: string;
        nome: string;
        vistoriaId: string;
        descricao: string | null;
    }>;
    updateAmbiente(id: string, data: Partial<AmbienteDTO>): Promise<{
        id: string;
        nome: string;
        vistoriaId: string;
        descricao: string | null;
    }>;
    deleteAmbiente(id: string): Promise<{
        id: string;
        nome: string;
        vistoriaId: string;
        descricao: string | null;
    }>;
}
