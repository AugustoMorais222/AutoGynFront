
export interface ItemServicoRequest {
  horarioInicio: string | null;   
  horarioFim: string | null;     
  quantidade: number;
  funcionarioId: number;
  servicoId: number;
}