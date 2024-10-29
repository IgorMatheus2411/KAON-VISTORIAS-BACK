import { VistoriaService } from './vistorias.service';
import { VistoriaDTO } from './vistoria.dto';
export declare class VistoriasController {
    private readonly vistoriaService;
    constructor(vistoriaService: VistoriaService);
    create(data: VistoriaDTO): Promise<{
        id: string;
        area_vistoriada: string;
        cliente: string;
        data_agendamento: Date;
        data_laudo: Date;
        endereco: string;
        finalizada: boolean;
        locador: string;
        locatario: string;
        mobiliado: string;
        tipo_imovel: string;
        tipo_vistoria: string;
        userId: string | null;
    }>;
    findAll(userId: string): Promise<({
        sub_ambientes: {
            id: string;
            nome: string;
            ambienteId: string;
            vistoriaId: string;
            descricao: string | null;
        }[];
        ambientes: {
            id: string;
            nome: string;
            vistoriaId: string;
            descricao: string | null;
        }[];
        Foto: {
            id: string;
            url: string;
            vistoriaId: string;
            ambienteId: string | null;
            subAmbienteId: string | null;
        }[];
    } & {
        id: string;
        area_vistoriada: string;
        cliente: string;
        data_agendamento: Date;
        data_laudo: Date;
        endereco: string;
        finalizada: boolean;
        locador: string;
        locatario: string;
        mobiliado: string;
        tipo_imovel: string;
        tipo_vistoria: string;
        userId: string | null;
    })[]>;
    findOne(id: string): Promise<{
        sub_ambientes: {
            id: string;
            nome: string;
            ambienteId: string;
            vistoriaId: string;
            descricao: string | null;
        }[];
        ambientes: {
            id: string;
            nome: string;
            vistoriaId: string;
            descricao: string | null;
        }[];
    } & {
        id: string;
        area_vistoriada: string;
        cliente: string;
        data_agendamento: Date;
        data_laudo: Date;
        endereco: string;
        finalizada: boolean;
        locador: string;
        locatario: string;
        mobiliado: string;
        tipo_imovel: string;
        tipo_vistoria: string;
        userId: string | null;
    }>;
    updateVistoria(id: string, data: Partial<VistoriaDTO>): Promise<{
        id: string;
        area_vistoriada: string;
        cliente: string;
        data_agendamento: Date;
        data_laudo: Date;
        endereco: string;
        finalizada: boolean;
        locador: string;
        locatario: string;
        mobiliado: string;
        tipo_imovel: string;
        tipo_vistoria: string;
        userId: string | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        area_vistoriada: string;
        cliente: string;
        data_agendamento: Date;
        data_laudo: Date;
        endereco: string;
        finalizada: boolean;
        locador: string;
        locatario: string;
        mobiliado: string;
        tipo_imovel: string;
        tipo_vistoria: string;
        userId: string | null;
    }>;
}
