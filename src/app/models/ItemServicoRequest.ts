
export interface ItemServicoRequest {
  horarioInicio: string;   // ex: "08:00"
  horarioFim: string;      // ex: "12:00"
  quantidade: number;
  funcionarioId: number;
  servicoId: number;
}