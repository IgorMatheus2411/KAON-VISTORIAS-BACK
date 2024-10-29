import { AmbienteService } from './ambientes.service';
import { AmbienteDTO } from './ambientes.dto';
export declare class AmbientesController {
    private readonly ambientesService;
    constructor(ambientesService: AmbienteService);
    create(data: AmbienteDTO): Promise<{
        id: string;
        nome: string;
        vistoriaId: string;
        descricao: string | null;
    }>;
    getAmbientesByVistoria(vistoriaId: string): Promise<({
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
    update(id: string, data: Partial<AmbienteDTO>): Promise<{
        id: string;
        nome: string;
        vistoriaId: string;
        descricao: string | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        nome: string;
        vistoriaId: string;
        descricao: string | null;
    }>;
}
