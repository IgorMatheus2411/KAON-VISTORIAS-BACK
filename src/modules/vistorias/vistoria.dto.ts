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
  userId: string;
  // Não inclui sub_ambientes e ambientes aqui, pois serão gerenciados em APIs separadas
};
