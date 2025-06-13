import { Marca } from "./marca";

export interface TelaModelo {
  id?: number;
  nome: string;
  marca?: Marca;
}
