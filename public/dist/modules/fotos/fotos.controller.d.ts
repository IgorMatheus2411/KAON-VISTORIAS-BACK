import { FotosService } from './fotos.service';
import { FotosDTO } from './fotos.dto';
export declare class FotosController {
    private readonly fotoService;
    constructor(fotoService: FotosService);
    create(data: FotosDTO): Promise<{
        id: string;
        url: string;
        vistoriaId: string;
        ambienteId: string | null;
        subAmbienteId: string | null;
    }>;
    getFotosBySubambienteId(subAmbienteId: string): Promise<({
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
    update(id: string, data: FotosDTO): Promise<{
        id: string;
        url: string;
        vistoriaId: string;
        ambienteId: string | null;
        subAmbienteId: string | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        url: string;
        vistoriaId: string;
        ambienteId: string | null;
        subAmbienteId: string | null;
    }>;
    deleteAllBySubAmbienteId(subAmbienteId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
