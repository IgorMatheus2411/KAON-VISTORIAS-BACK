import { Ambiente, SubAmbiente } from '@prisma/client';

export type VistoriaDTO = {
  id?: string;
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
  userId: string; // Usado para conectar o usuário existente
  sub_ambientes: SubAmbiente[];
  ambientes: Ambiente[];
};
