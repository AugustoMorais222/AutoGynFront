import { Cliente } from "./Cliente";
import { Veiculo } from "./Veiculo";

export interface OrdemServico {
  numero: number;
  data: string;
  precoFinal: number;
  status: string;
  placaVeiculo: Veiculo;
  cliente: Cliente;
}