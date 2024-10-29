import { FotosDTO } from './fotos.dto';
import { PrismaService } from 'src/database/PrismaService';
export declare class FotosService {
    private prisma;
    constructor(prisma: PrismaService);
    createFotos(data: FotosDTO): Promise<{
        id: string;
        url: string;
        vistoriaId: string;
        ambienteId: string | null;
        subAmbienteId: string | null;
    }>;
    findAll(subAmbienteId: string): Promise<({
        ambiente: {
            id: string;
        };
        subAmbiente: {
            id: string;
        };
    } & {
        id: string;
        url: string;
        vistoriaId: string;
        ambienteId: string | null;
        subAmbienteId: string | null;
    })[]>;
    findAllByAmbienteId(id: string): Promise<{
        id: string;
        url: string;
        vistoriaId: string;
        ambienteId: string | null;
        subAmbienteId: string | null;
    }[]>;
    findAllBySubAmbienteId(id: string): Promise<{
        id: string;
        url: string;
        vistoriaId: string;
        ambienteId: string | null;
        subAmbienteId: string | null;
    }[]>;
    updateFotos(id: string, data: FotosDTO): Promise<{
        id: string;
        url: string;
        vistoriaId: string;
        ambienteId: string | null;
        subAmbienteId: string | null;
    }>;
    deleteFoto(id: string): Promise<{
        id: string;
        url: string;
        vistoriaId: string;
        ambienteId: string | null;
        subAmbienteId: string | null;
    }>;
    deleteAllFotosBySubAmbienteId(subAmbienteId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
