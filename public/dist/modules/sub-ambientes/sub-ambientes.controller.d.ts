import { SubAmbienteService } from './sub-ambientes.service';
import { SubAmbienteDTO } from './sub-ambientes.dto';
export declare class SubAmbientesController {
  private readonly subAmbientesService;
  constructor(subAmbientesService: SubAmbienteService);
  create(data: SubAmbienteDTO): Promise<{
    id: string;
    nome: string;
    ambienteId: string;
    vistoriaId: string;
    descricao: string | null;
  }>;
  getSubAmbienteByAmbienteId(ambienteId: string): Promise<
    ({
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
    })[]
  >;
  findOne(id: string): Promise<{
    id: string;
    nome: string;
    ambienteId: string;
    vistoriaId: string;
    descricao: string | null;
  }>;
  update(
    id: string,
    data: Partial<SubAmbienteDTO>,
  ): Promise<{
    id: string;
    nome: string;
    ambienteId: string;
    vistoriaId: string;
    descricao: string | null;
  }>;
  delete(id: string): Promise<{
    id: string;
    nome: string;
    ambienteId: string;
    vistoriaId: string;
    descricao: string | null;
  }>;
}
