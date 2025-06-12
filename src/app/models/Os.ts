import { Cliente } from "./Cliente";
import { Veiculo } from "./Veiculo";

export class OrdemServico {
    numero?: number;
    data?: Date; 
    precoFinal?: number; 
    status?: string; 
    placaVeiculo?: String;
    cliente?: Cliente;

  }
  