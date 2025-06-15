import { Marca } from "./Marca";
import { Modelo } from "./Modelo";

export class Veiculo {
  placa?: string;
  modelo?: Modelo;
  marca?: Marca;
  quilometragem?: number; 
  chassi?: string;
  patrimonio?: string;
  anoModelo?: number;
  anoFabricacao?: number;
}