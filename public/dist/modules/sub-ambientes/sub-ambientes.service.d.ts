import { PrismaService } from 'src/database/PrismaService';
import { SubAmbienteDTO } from './sub-ambientes.dto';
export declare class SubAmbienteService {
    private prisma;
    constructor(prisma: PrismaService);
    createSubAmbiente(data: SubAmbienteDTO): Promise<{
        id: string;
        nome: string;
        ambienteId: string;
        vistoriaId: string;
        descricao: string | null;
    }>;
    findAll(ambienteId: string): Promise<({
        vistoria: {
            cliente: string;
        };
        ambiente: {
            nome: string;
        };
        fotos: {
            id: string;
        }[];
    } & {
        id: string;
        nome: string;
        ambienteId: string;
        vistoriaId: string;
        descricao: string | null;
    })[]>;
    findOne(id: string): Promise<{
        id: string;
        nome: string;
        ambienteId: string;
        vistoriaId: string;
        descricao: string | null;
    }>;
    updateSubAmbiente(id: string, data: Partial<SubAmbienteDTO>): Promise<{
        id: string;
        nome: string;
        ambienteId: string;
        vistoriaId: string;
        descricao: string | null;
    }>;
    deleteSubAmbiente(id: string): Promise<{
        id: string;
        nome: string;
        ambienteId: string;
        vistoriaId: string;
        descricao: string | null;
    }>;
}
